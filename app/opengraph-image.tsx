import { ImageResponse } from "next/og"
import { portfolioData } from "@/lib/data"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 20%, #1f3b87 0%, #04020c 55%, #04020c 100%)",
          color: "#f8fafc",
          padding: "56px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          {portfolioData.profile.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: -2 }}>
            {portfolioData.profile.fullName}
          </div>
          <div style={{ fontSize: 32, opacity: 0.9, maxWidth: "85%" }}>
            {portfolioData.seo.description}
          </div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.85 }}>{portfolioData.seo.url}</div>
      </div>
    ),
    size,
  )
}
