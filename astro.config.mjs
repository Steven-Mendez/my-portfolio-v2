// @ts-check
import { defineConfig, fontProviders } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"

/** Locales served by the site. `en` lives at `/`, `es` at `/es/`. */
const defaultLocale = "en"
const locales = ["en", "es"]

// https://astro.build/config
export default defineConfig({
  // Canonical production URL. Required by @astrojs/sitemap and used by
  // Astro.site for canonical/Open Graph URLs.
  site: "https://www.stevenampaiz.com",
  i18n: {
    defaultLocale,
    locales,
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Emits <xhtml:link rel="alternate" hreflang> pairs for / and /es/.
      i18n: {
        defaultLocale,
        locales: { en: "en", es: "es" },
      },
    }),
  ],
  // Self-hosted fonts via the Astro Fonts API (downloaded and served from
  // /_astro/fonts at build time, with metric-matched fallbacks).
  // https://docs.astro.build/en/guides/fonts/
  fonts: [
    {
      name: "Geist",
      cssVariable: "--font-geist",
      provider: fontProviders.fontsource(),
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      // Micro-labels only (the `meta` utility). One weight is enough: the
      // labels never change weight, so the static 500 file stays small.
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      provider: fontProviders.fontsource(),
      weights: [500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  // Prefetch internal links on hover for near-instant navigation.
  prefetch: true,
  build: {
    // Inline every stylesheet into the HTML so no CSS request blocks render.
    // Fine while the CSS is small; revisit if it grows past ~20 KB per page.
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
