/**
 * Smooth in-page anchor scrolling. One delegated click listener on
 * `document` (it survives view-transition swaps, so it is registered once
 * at module scope) turns same-page hash links (`#about`, `/#about`,
 * `/es/#about`) into an eased GSAP scroll, updates the hash without a native
 * jump, then hands focus to the target so keyboard and screen-reader users
 * land in the section.
 *
 * With `prefers-reduced-motion: reduce` the click is left alone and the
 * browser (via Astro's router) jumps as usual. Any wheel, touch, pointer or
 * key input during the tween kills it, so it never fights the user.
 *
 * Targets land just below the fixed top bar: the offset is its docked
 * height, published as `--header-h` on :root by `header.ts` (the same
 * variable drives `scroll-margin-top` for native jumps).
 */
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const INTERRUPTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const

let tween: gsap.core.Tween | undefined

function samePath(a: string, b: string): boolean {
  return a.replace(/\/$/, "") === b.replace(/\/$/, "")
}

function findTarget(hash: string): HTMLElement | null {
  const id = decodeURIComponent(hash.slice(1))
  if (!id) return null
  return document.getElementById(id)
}

function headerOffset(): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-h"
  )
  return parseFloat(value) || 0
}

function stopInterrupts() {
  for (const type of INTERRUPTS) removeEventListener(type, interrupt)
}

function interrupt() {
  tween?.kill()
  tween = undefined
  stopInterrupts()
}

function focusTarget(target: HTMLElement) {
  if (target.tabIndex < 0 && !target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1")
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
      once: true,
    })
  }
  target.focus({ preventScroll: true })
}

function onClick(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    reducedMotion.matches
  ) {
    return
  }

  const link = (event.target as Element | null)?.closest?.("a[href]")
  if (!(link instanceof HTMLAnchorElement)) return
  if (link.target && link.target !== "_self") return
  if (link.hasAttribute("download")) return

  const url = new URL(link.href, location.href)
  if (
    !url.hash ||
    url.origin !== location.origin ||
    url.search !== location.search ||
    !samePath(url.pathname, location.pathname)
  ) {
    return
  }

  const target = findTarget(url.hash)
  if (!target) return

  // Ours now: keep the browser and Astro's router from jumping.
  event.preventDefault()

  // Save where we are on the current entry, then add the new one in the
  // shape Astro's router expects so Back/Forward keep working.
  const state = history.state as { index?: number } | null
  if (state) {
    history.replaceState({ ...state, scrollX, scrollY }, "")
  }
  if (url.href !== location.href) {
    history.pushState(
      { index: (state?.index ?? 0) + 1, scrollX: 0, scrollY: 0 },
      "",
      url.href
    )
  }

  // `#top` is the body: scroll to 0 rather than to its (zero) offset.
  const isBody = target === document.body
  const offsetY = isBody ? 0 : headerOffset()
  const destination = isBody
    ? 0
    : target.getBoundingClientRect().top + window.scrollY - offsetY
  const distance = Math.abs(destination - window.scrollY)
  // Short hops stay quick, long ones get a little more room; never sluggish.
  const duration = gsap.utils.clamp(0.6, 1.4, 0.4 + Math.sqrt(distance) / 80)

  interrupt()
  for (const type of INTERRUPTS) {
    addEventListener(type, interrupt, { passive: true })
  }

  tween = gsap.to(window, {
    scrollTo: { y: isBody ? 0 : target, offsetY, autoKill: false },
    duration,
    ease: "power3.inOut",
    onComplete: () => {
      tween = undefined
      stopInterrupts()
      focusTarget(target)
    },
  })
}

// Capture phase, so this runs before Astro's router's own click handler,
// which then sees `defaultPrevented` and steps aside.
document.addEventListener("click", onClick, { capture: true })
