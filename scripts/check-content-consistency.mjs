import { readFile } from "node:fs/promises"

/**
 * Locks in the Full Stack repositioning so the role label cannot silently drift
 * back across the multiple surfaces that carry it (data, about eyebrow, footer,
 * resume). Source-text assertions, in the same spirit as check-home-anchors.mjs.
 */
const checks = [
  {
    file: "lib/data.ts",
    mustInclude: ['role: "Full Stack Engineer"'],
  },
  {
    file: "components/sections/AboutSection.tsx",
    mustNotInclude: ["Backend Engineer"],
  },
  {
    file: "components/sections/ContactSection.tsx",
    // The contact CTA carries the role label; it must derive from profile.role,
    // never a hardcoded job title.
    mustInclude: ["profile.role"],
    mustNotInclude: ["Software Developer", "Backend Engineer"],
  },
  {
    file: "app/resume/page.tsx",
    // Resume metadata must derive from profile.role; stale self-labels banned.
    mustInclude: ["${portfolioData.profile.role}"],
    mustNotInclude: ["Software Developer", "Software Engineer", "Backend Engineer resume"],
  },
]

async function run() {
  const failures = []

  for (const check of checks) {
    let content
    try {
      content = await readFile(check.file, "utf8")
    } catch {
      failures.push(`${check.file}: file not found`)
      continue
    }

    for (const needle of check.mustInclude || []) {
      if (!content.includes(needle)) {
        failures.push(`${check.file}: expected to contain ${JSON.stringify(needle)}`)
      }
    }
    for (const needle of check.mustNotInclude || []) {
      if (content.includes(needle)) {
        failures.push(`${check.file}: must not contain ${JSON.stringify(needle)} (role drift)`)
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(`Content consistency check failed:\n - ${failures.join("\n - ")}`)
  }

  console.log("Content consistency check passed")
}

run().catch((error) => {
  console.error("Content consistency check failed")
  console.error(error)
  process.exit(1)
})
