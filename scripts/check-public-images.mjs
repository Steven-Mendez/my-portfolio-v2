/**
 * Fails when a JPG, PNG or GIF sits in public/ outside the allowlist.
 *
 * Files in public/ are served as-is, so Astro never optimises them and
 * Lighthouse CI flags them (uses-optimized-images, modern-image-formats).
 * Page images belong in src/assets/ (astro:assets) or in public/ as
 * WebP/AVIF. Share cards and app icons stay raster on purpose: crawlers
 * and home screens expect JPG/PNG, and Lighthouse never audits them.
 *
 * Usage: node scripts/check-public-images.mjs [files...]
 * With no files it scans all of public/ (CI); lint-staged passes the
 * staged ones.
 */
import { readdirSync } from "node:fs"
import { join, relative, sep } from "node:path"

const RASTER = /\.(jpe?g|png|gif)$/i
const ALLOWED = [/^public\/og\//, /^public\/(apple-touch-icon|icon-\d+)\.png$/]

const files =
  process.argv.length > 2
    ? process.argv.slice(2)
    : readdirSync("public", { recursive: true }).map((file) =>
        join("public", file)
      )

const offenders = files
  .map((file) => relative(process.cwd(), file).split(sep).join("/"))
  .filter((file) => RASTER.test(file))
  .filter((file) => !ALLOWED.some((pattern) => pattern.test(file)))

if (offenders.length > 0) {
  console.error("Unoptimised images in public/:")
  for (const file of offenders) console.error(`  ${file}`)
  console.error(
    "\nConvert them to WebP/AVIF (e.g. `cwebp -q 80 in.jpg -o out.webp`)" +
      " or move them to src/assets/ so astro:assets optimises them." +
      "\nShare cards (public/og/) and app icons are the only exceptions."
  )
  process.exit(1)
}
