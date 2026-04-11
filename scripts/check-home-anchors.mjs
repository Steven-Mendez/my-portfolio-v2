import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

const roots = ["components", "app"]
const idPattern = /\sid="([^"]+)"/g

async function collectTsxFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectTsxFiles(fullPath)))
      continue
    }
    if (entry.isFile() && fullPath.endsWith(".tsx")) {
      files.push(fullPath)
    }
  }

  return files
}

async function extractIdsFromFile(filePath) {
  const content = await readFile(filePath, "utf8")
  const ids = []
  let match
  while ((match = idPattern.exec(content)) !== null) {
    ids.push(match[1])
  }
  return ids
}

async function run() {
  const counts = new Map()

  for (const root of roots) {
    const files = await collectTsxFiles(root)
    for (const filePath of files) {
      const ids = await extractIdsFromFile(filePath)
      for (const id of ids) {
        counts.set(id, (counts.get(id) || 0) + 1)
      }
    }
  }

  const duplicates = Array.from(counts.entries()).filter(([, count]) => count > 1)
  if (duplicates.length > 0) {
    const rendered = duplicates.map(([id, count]) => `${id}(${count})`).join(", ")
    throw new Error(`Duplicate static IDs found in source: ${rendered}`)
  }

  const aboutCount = counts.get("about") || 0
  if (aboutCount !== 1) {
    throw new Error(`Expected id="about" exactly once in source, found ${aboutCount}`)
  }

  console.log("Anchor source check passed")
}

run().catch((error) => {
  console.error("Anchor source check failed")
  console.error(error)
  process.exit(1)
})
