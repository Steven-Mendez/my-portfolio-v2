/**
 * Structured data (JSON-LD) for search engines, built from the same content
 * the pages render. The home describes the site and its author; a write-up
 * is an Article by that author. Every node has a stable `@id` so the
 * graphs on different pages point at one Person and one WebSite.
 */
import type { Lang } from "@/i18n/ui"
import { getLocalizedPath, useTranslations } from "@/i18n/utils"
import { profile } from "./profile"
import type { Project } from "./projects"
import type { Writeup } from "./writeups"

export type JsonLd = Record<string, unknown>

const ids = (site: URL) => ({
  person: new URL("/#person", site).href,
  website: new URL("/#website", site).href,
})

function person(site: URL, lang: Lang): JsonLd {
  const t = useTranslations(lang)
  return {
    "@type": "Person",
    "@id": ids(site).person,
    name: profile.fullName,
    givenName: profile.firstName,
    familyName: profile.lastName,
    alternateName: [...profile.alternateNames],
    jobTitle: t("hero.role"),
    url: site.href,
    image: new URL(`/og/home-${lang}.jpg`, site).href,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressCountry: profile.countryCode,
    },
    sameAs: [
      profile.socials.github,
      profile.socials.linkedin,
      profile.socials.credly,
    ],
  }
}

export function homeJsonLd(site: URL, lang: Lang, pageUrl: URL): JsonLd {
  const t = useTranslations(lang)
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids(site).website,
        url: site.href,
        name: profile.fullName,
        alternateName: site.hostname.replace(/^www\./, ""),
        inLanguage: ["en", "es"],
        publisher: { "@id": ids(site).person },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl.href}#page`,
        url: pageUrl.href,
        name: t("meta.title"),
        description: t("meta.description"),
        inLanguage: lang,
        isPartOf: { "@id": ids(site).website },
        mainEntity: { "@id": ids(site).person },
      },
      person(site, lang),
    ],
  }
}

export function writeupJsonLd(
  site: URL,
  lang: Lang,
  pageUrl: URL,
  project: Project,
  writeup: Writeup
): JsonLd {
  const t = useTranslations(lang)
  const home = new URL(getLocalizedPath(lang), site).href
  // `updated` is "YYYY-MM"; schema.org wants a full ISO date, and a page
  // cannot have been modified before it was published.
  const revised = `${writeup.updated}-01`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl.href}#article`,
        headline: project.title,
        description: writeup.description[lang],
        url: pageUrl.href,
        mainEntityOfPage: pageUrl.href,
        image: new URL(`/og/${writeup.slug}-${lang}.jpg`, site).href,
        inLanguage: lang,
        datePublished: writeup.published,
        dateModified: revised > writeup.published ? revised : writeup.published,
        author: { "@id": ids(site).person },
        isPartOf: { "@id": ids(site).website },
      },
      {
        // The trail the page shows: the header's home link, the "all
        // work" link at the end (the list is a section of the home), the h1.
        "@type": "BreadcrumbList",
        "@id": `${pageUrl.href}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("nav.home"), item: home },
          {
            "@type": "ListItem",
            position: 2,
            name: t("nav.work"),
            item: `${home}#work`,
          },
          { "@type": "ListItem", position: 3, name: project.title },
        ],
      },
      person(site, lang),
    ],
  }
}
