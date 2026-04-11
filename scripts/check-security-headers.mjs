const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000"

const requiredHeaders = [
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
]

async function run() {
  const response = await fetch(`${baseUrl}/`, { redirect: "manual" })

  if (!response.ok) {
    throw new Error(`Failed to fetch / for header checks: ${response.status}`)
  }

  for (const headerName of requiredHeaders) {
    const value = response.headers.get(headerName)
    if (!value) {
      throw new Error(`Missing required security header: ${headerName}`)
    }
  }

  const csp = response.headers.get("content-security-policy") || ""

  if (csp.includes("'unsafe-eval'")) {
    throw new Error("CSP must not include 'unsafe-eval'")
  }

  if (!csp.includes("script-src")) {
    throw new Error("CSP must include script-src directive")
  }

  console.log("Security headers check passed")
}

run().catch((error) => {
  console.error("Security headers check failed")
  console.error(error)
  process.exit(1)
})
