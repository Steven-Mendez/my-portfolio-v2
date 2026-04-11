const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000"
const startupTimeoutMs = Number(process.env.SMOKE_STARTUP_TIMEOUT_MS || 45_000)
const retryIntervalMs = Number(process.env.SMOKE_RETRY_INTERVAL_MS || 1_000)

const routes = ["/", "/resume"]

async function waitForServer() {
  const startedAt = Date.now()
  let lastError = "Unknown startup error"

  while (Date.now() - startedAt < startupTimeoutMs) {
    try {
      const response = await fetch(`${baseUrl}/`, { redirect: "manual" })
      if (response.ok) return
      lastError = `Server responded with status ${response.status}`
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
    }

    await new Promise((resolve) => setTimeout(resolve, retryIntervalMs))
  }

  throw new Error(`Server did not become ready: ${lastError}`)
}

async function assertRoute(route) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" })
  if (!response.ok) {
    throw new Error(`Route ${route} failed with status ${response.status}`)
  }
}

async function run() {
  await waitForServer()

  for (const route of routes) {
    await assertRoute(route)
  }

  console.log(`Smoke routes passed: ${routes.join(", ")}`)
}

run().catch((error) => {
  console.error("Smoke route check failed")
  console.error(error)
  process.exit(1)
})
