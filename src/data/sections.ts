/**
 * The page's sections in order, for the top bar, the mobile index and the
 * footer. The hero is the page itself ("Home"), so it is not listed here.
 * `index` is the single source of the section numbers ("01" to "06").
 */
import type { UiKey } from "@/i18n/ui"

export interface SectionLink {
  /** Translation key of the label. */
  label: UiKey
  href: `#${string}`
  /** Two-digit section number. */
  index: string
}

export const sections: readonly SectionLink[] = [
  { label: "nav.about", href: "#about", index: "01" },
  { label: "nav.experience", href: "#experience", index: "02" },
  { label: "nav.work", href: "#work", index: "03" },
  { label: "nav.stack", href: "#stack", index: "04" },
  { label: "nav.education", href: "#education", index: "05" },
  { label: "nav.contact", href: "#contact", index: "06" },
]

/** Number of a section by its href: `sectionIndex("#contact")` → "06". */
export function sectionIndex(href: SectionLink["href"]): string {
  const section = sections.find((s) => s.href === href)
  if (!section) throw new Error(`Unknown section: ${href}`)
  return section.index
}
