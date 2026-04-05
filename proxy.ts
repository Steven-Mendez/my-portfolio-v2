import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

/** Hostnames that may send credentialed / cross-origin requests to this app. */
function isAllowedOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin)
    return (
      hostname === "stevenmendez.dev" ||
      hostname === "www.stevenmendez.dev" ||
      hostname.endsWith(".vercel.app")
    )
  } catch {
    return false
  }
}

export function proxy(request: NextRequest) {
  const res = NextResponse.next()
  const origin = request.headers.get("origin")

  if (origin && isAllowedOrigin(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin)
    const vary = res.headers.get("Vary")
    res.headers.set("Vary", vary ? `${vary}, Origin` : "Origin")
  }

  return res
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|pdf)$).*)",
  ],
}
