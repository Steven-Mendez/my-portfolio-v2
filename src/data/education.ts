/**
 * Degree, course and certifications, newest first. From LinkedIn, the CV
 * (degree dates) and v2.
 *
 * PENDIENTE DE STEVEN: the issue months of the Arcitura certifications and
 * the C# course. Until then only the year is known.
 */
import type { Localized } from "./localized"

export interface EducationEntry {
  kind: "degree" | "course" | "cert"
  name: Localized<string>
  org: string
  /** "YYYY" or "YYYY-MM" */
  start?: string
  /** "YYYY" or "YYYY-MM" */
  end: string
  /** Extra line under the name (length, place). */
  detail?: Localized<string>
  /** Public verification page. */
  href?: string
  /** Name of the site behind `href` ("Verify on Credly"). */
  platform?: string
}

export const education: readonly EducationEntry[] = [
  {
    kind: "degree",
    name: {
      en: "B.Eng. in Computer Engineering",
      es: "Ingeniería en Computación",
    },
    org: "Universidad Nacional de Ingeniería",
    start: "2019-03",
    end: "2023-12",
    detail: {
      en: "Five-year program. Managua, Nicaragua.",
      es: "Programa de cinco años. Managua, Nicaragua.",
    },
  },
  {
    kind: "course",
    name: {
      en: "Application Development with Visual C#",
      es: "Desarrollo de aplicaciones con Visual C#",
    },
    org: "UNI Posgrado",
    end: "2022",
  },
  {
    kind: "cert",
    name: {
      en: "Certified Big Data Consultant",
      es: "Certified Big Data Consultant",
    },
    org: "Arcitura Education",
    end: "2021",
    href: "https://www.credly.com/badges/a57aa250-4085-454b-a0be-c7dd7a880048",
    platform: "Credly",
  },
  {
    kind: "cert",
    name: {
      en: "Certified Big Data Professional",
      es: "Certified Big Data Professional",
    },
    org: "Arcitura Education",
    end: "2021",
    href: "https://www.credly.com/badges/354d5191-214d-415f-9e4e-43e805d9175b",
    platform: "Credly",
  },
]

/** Year a credential was awarded. */
export function credentialYear(e: EducationEntry): string {
  return e.end.slice(0, 4)
}

/** First and last year over all credentials (start if known, else end). */
export function educationSpan(): { startYear: number; endYear: number } {
  const starts = education.map((e) => Number((e.start ?? e.end).slice(0, 4)))
  const ends = education.map((e) => Number(e.end.slice(0, 4)))
  return { startYear: Math.min(...starts), endYear: Math.max(...ends) }
}
