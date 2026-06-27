"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(QUERY)
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

// The server can't know the user's motion preference, so it always renders the
// "motion allowed" baseline; useSyncExternalStore swaps in the real value on the
// client without the extra mount-effect render a useState+useEffect pair causes.
function getServerSnapshot() {
  return false
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
