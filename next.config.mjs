/** @type {import('next').NextConfig} */
/**
 * CSP tuned for App Router, JSON-LD, Tailwind (inline styles), WebGL canvas,
 * and Vercel Analytics / Speed Insights.
 */
const isDev = process.env.NODE_ENV === "development"

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  // Keep 'unsafe-inline' for current JSON-LD injection strategy. React's dev
  // mode needs 'unsafe-eval' for debugging features (it never uses eval() in
  // production), so it is added only in development.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.vercel-insights.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ")

/** Feature policy: disable powerful APIs this site does not use. */
const permissionsPolicy = [
  "accelerometer=()",
  "autoplay=()",
  "battery=()",
  "bluetooth=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "fullscreen=()",
  "gamepad=()",
  "geolocation=()",
  "gyroscope=()",
  "interest-cohort=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "picture-in-picture=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "serial=()",
  "sync-xhr=()",
  "usb=()",
  "web-share=()",
  "xr-spatial-tracking=()",
].join(", ")

const nextConfig = {
  // cacheComponents (PPR) is intentionally left off. This site is fully static — all
  // content comes from lib/data.ts with no request-time data — so PPR has nothing to
  // partially prerender. With it enabled, the home page's client islands deferred the
  // entire <main> to the loading.tsx fallback, so the served HTML shipped no content
  // (invisible to ATS, AI agents, and crawlers that don't execute JS).
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // Next.js 16 defaults to [75]; the profile photo renders at 90, so both
    // allowed qualities must be listed or the value is coerced to the nearest.
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "0" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "Permissions-Policy", value: permissionsPolicy },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ],
      },
    ]
  },
}

export default nextConfig
