import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#04020c] p-4 text-center">
      <h2 className="mb-2 text-6xl font-black text-white">404</h2>
      <p className="mb-4 text-xl font-bold text-white/80">Page Not Found</p>
      <p className="mb-8 max-w-md text-fg-muted">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild variant="ghost" size="lg">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
