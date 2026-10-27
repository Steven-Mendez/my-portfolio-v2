import type { Lang } from "./ui"

/** "2025-01" → "Jan 2025" / "Ene 2025". */
export function formatMonth(yearMonth: string, lang: Lang): string {
  const date = new Date(`${yearMonth}-01T00:00:00Z`)
  const label = new Intl.DateTimeFormat(lang, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
  // Spanish month abbreviations come back lowercase ("ene 2025").
  return label.charAt(0).toUpperCase() + label.slice(1)
}

const durationUnits: Record<
  Lang,
  { y: Record<"one" | "other", string>; m: Record<"one" | "other", string> }
> = {
  // English abbreviations do not take a plural.
  en: { y: { one: "yr", other: "yr" }, m: { one: "mo", other: "mo" } },
  es: { y: { one: "año", other: "años" }, m: { one: "mes", other: "meses" } },
}

/**
 * Length of a period, counting both end months: ("2025-12", "2026-04") →
 * "5 mo". Without `end` it runs to the build month, so a current role's
 * duration is recomputed on every deploy. Zero units are left out.
 */
export function formatDuration(
  start: string,
  end: string | undefined,
  lang: Lang,
  now = new Date()
): string {
  const [startYear, startMonth] = start.split("-").map(Number) as [
    number,
    number,
  ]
  const [endYear, endMonth] = end
    ? (end.split("-").map(Number) as [number, number])
    : [now.getFullYear(), now.getMonth() + 1]
  const total = (endYear - startYear) * 12 + (endMonth - startMonth) + 1
  const years = Math.floor(total / 12)
  const months = total % 12

  const plural = new Intl.PluralRules(lang)
  const units = durationUnits[lang]
  const pick = (n: number, forms: Record<"one" | "other", string>) =>
    `${n} ${plural.select(n) === "one" ? forms.one : forms.other}`

  const parts: string[] = []
  if (years > 0) parts.push(pick(years, units.y))
  if (months > 0) parts.push(pick(months, units.m))
  return parts.join(" ")
}
