"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Scrolls to the URL hash target after a soft (client-side) navigation.
 *
 * Next's App Router does not reliably scroll to a `/#section` anchor when you
 * navigate to it from another route via <Link> — the target section often
 * isn't mounted/laid out yet when Next attempts the jump (this home page defers
 * heavy WebGL/MagicBento work), so it ends up not scrolling at all. This bridges
 * that gap by re-trying across a few frames once the page mounts, and also
 * corrects same-page hash changes (navbar clicks) for the fixed navbar offset.
 */
export default function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash
      if (hash.length < 2) return

      const id = decodeURIComponent(hash.slice(1))
      let frame = 0
      let attempts = 0

      // The section may not exist yet (or may shift as deferred content mounts),
      // so poll a handful of frames before giving up.
      const tick = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
          return
        }
        if (attempts++ < 40) frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(frame)
    }

    // Run on mount (covers cross-route soft navigation + full loads)…
    const cleanup = scrollToHash()
    // …and on subsequent same-page hash changes (e.g. navbar links).
    window.addEventListener("hashchange", scrollToHash)
    return () => {
      cleanup?.()
      window.removeEventListener("hashchange", scrollToHash)
    }
  }, [pathname])

  return null
}
