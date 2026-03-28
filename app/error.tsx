"use client"

import React, { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#04020c] p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-white">Something went wrong!</h2>
      <p className="mb-8 max-w-md text-[#d2dcff]/60">
        An unexpected error occurred. We&apos;ve been notified and are working on a fix.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#04020c] transition-transform hover:scale-105"
      >
        Try again
      </button>
    </div>
  )
}
