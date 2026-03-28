import Link from "next/link"
import React from "react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#04020c] p-4 text-center">
      <h2 className="mb-2 text-6xl font-black text-white">404</h2>
      <p className="mb-4 text-xl font-bold text-white/80">Page Not Found</p>
      <p className="mb-8 max-w-md text-[#d2dcff]/60">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/40"
      >
        Go Home
      </Link>
    </div>
  )
}
