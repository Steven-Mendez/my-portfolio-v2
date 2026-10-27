/**
 * Profile content used by the hero. Ported from `../v2/lib/data.ts`
 * (profile, socials) and localized for `en` / `es`.
 */
import type { Lang } from "@/i18n/ui"
import type { Localized } from "./localized"

/** The downloadable CV: one source for the top bar and Contact. */
export interface Resume {
  href: string
  /** Language of the PDF itself, which may differ from the page's. */
  hreflang: Lang
  /** Name the browser saves the file as (`download` attribute). */
  fileName: string
  /** "YYYY-MM" */
  updated: string
}

export interface Profile {
  fullName: string
  firstName: string
  lastName: string
  /** Public contact address (from `../v2/lib/data.ts` `contactEmail`). */
  email: string
  socials: { github: string; linkedin: string }
  location: string
  /** Short form for tight spots (hero corner): "Managua (NI)". */
  city: string
  countryCode: string
  timezone: string
  /** IANA zone for the live local clock in the hero. */
  timeZoneId: string
  /** Year of the first lines of code (hobby, before any job). */
  codingSince: number
  resume: Localized<Resume>
  /** PENDIENTE DE STEVEN: undefined until he confirms; the hero then shows workMode. */
  availability?: Localized<string>
  /** Work arrangement, from the CV. */
  workMode: Localized<string>
}

// Both PDFs are built from `resume/cv-{en,es}.html` by `pnpm cv:build`.
const resume: Localized<Resume> = {
  en: {
    href: "/steven-mendez-cv-en.pdf",
    hreflang: "en",
    fileName: "Steven-Mendez-CV-EN.pdf",
    updated: "2026-10",
  },
  es: {
    href: "/steven-mendez-cv-es.pdf",
    hreflang: "es",
    fileName: "Steven-Mendez-CV-ES.pdf",
    updated: "2026-10",
  },
}

export const profile: Profile = {
  fullName: "Steven Mendez",
  firstName: "Steven",
  lastName: "Mendez",
  email: "stevenampaiz@gmail.com",
  socials: {
    github: "https://github.com/Steven-Mendez",
    linkedin: "https://linkedin.com/in/steven-mendez-dev",
  },
  location: "Managua, Nicaragua",
  city: "Managua",
  countryCode: "NI",
  // U+2212 MINUS SIGN.
  timezone: "UTC−6",
  timeZoneId: "America/Managua",
  codingSince: 2015,
  resume,
  workMode: { en: "Remote", es: "Remoto" },
}
