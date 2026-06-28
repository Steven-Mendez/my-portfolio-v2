"use client"

import { useSyncExternalStore } from "react"

// The animated full-viewport WebGL backdrop is the single heaviest thing on the
// page. Beyond honoring prefers-reduced-motion, we also fall back to the static
// gradient on small (phone-sized) viewports, where a full-screen fragment shader
// is the biggest battery/perf cost and the motion is least noticeable. The comma
// makes this a logical OR — `matches` is true if EITHER condition holds.
const QUERY = "(prefers-reduced-motion: reduce), (max-width: 768px)"

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(QUERY)
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

// The server can't know the viewport or motion preference, so it renders the
// "WebGL allowed" baseline; useSyncExternalStore swaps in the real value on the
// client during hydration without a mismatch.
function getServerSnapshot() {
  return false
}

/** True when the animated WebGL backdrop should be skipped in favor of the
 *  static gradient: reduced-motion is requested, or the viewport is phone-sized. */
export function useReducedWebGL() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
