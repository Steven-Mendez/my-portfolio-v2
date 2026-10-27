import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from "astro:i18n"
import { defaultLang, languages, ui, type Lang, type UiKey } from "./ui"

export const locales = Object.keys(languages) as Lang[]

export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages
}

/** Locale of a URL: its first path segment if it is a locale, else default. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/")
  return isLang(first) ? first : defaultLang
}

/** `t(key)` for a locale, falling back to the default locale's string. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key]
  }
}

/** Path without its locale prefix, e.g. `/es/about/` → `about/`. */
function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  if (isLang(segments[0])) segments.shift()
  const rest = segments.join("/")
  return rest && pathname.endsWith("/") ? `${rest}/` : rest
}

/** Relative URL of `path` in `lang`: `("es", "")` → `/es/`, `("en", "")` → `/`. */
export function getLocalizedPath(lang: Lang, path = ""): string {
  return getRelativeLocaleUrl(lang, path)
}

/** Whether `url` is the locale's home page (`/` or `/es/`). */
export function isHomePath(url: URL, lang: Lang): boolean {
  const home = getRelativeLocaleUrl(lang, "")
  return url.pathname.replace(/\/$/, "") === home.replace(/\/$/, "")
}

/**
 * Link to a section of the home page: the bare hash on the home page itself
 * (`#work`), the home path plus the hash anywhere else (`/es/#work`).
 */
export function sectionHref(url: URL, lang: Lang, hash: `#${string}`): string {
  if (isHomePath(url, lang)) return hash
  return `${getRelativeLocaleUrl(lang, "").replace(/\/?$/, "/")}${hash}`
}

/** Relative URL of the current page in another locale. */
export function getAlternatePath(url: URL, lang: Lang): string {
  return getRelativeLocaleUrl(lang, stripLocale(url.pathname))
}

/** Absolute URL of the current page in another locale (for hreflang). */
export function getAlternateUrl(url: URL, lang: Lang): string {
  return getAbsoluteLocaleUrl(lang, stripLocale(url.pathname))
}

/** Replaces each `{key}` in a UI string: `fill("PDF · {size}", { size })`. */
export function fill(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  )
}

/** A number with its noun: `count(3, "role", "roles")` → "3 roles". */
export function count(n: number, one: string, other: string): string {
  return `${n} ${n === 1 ? one : other}`
}

/** Splits "a **b** c" into parts; plain text only, never HTML (no set:html). */
export function emphasis(text: string): { text: string; strong: boolean }[] {
  // Odd segments sit between a pair of `**`. An unpaired `**` stays literal.
  const segments = text.split("**")
  if (segments.length % 2 === 0) return [{ text, strong: false }]
  return segments
    .map((part, i) => ({ text: part, strong: i % 2 === 1 }))
    .filter((part) => part.text !== "")
}
