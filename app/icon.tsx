import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Round badge: periwinkle circle, deep-navy letters (same palette as
          // the primary "VIEW EXPERIENCE" button). borderRadius 50% leaves the
          // corners transparent so it reads as a clean circle on any tab bar.
          borderRadius: "50%",
          background: "#b0c6ff",
          color: "#002d6e",
          fontSize: 300,
          fontWeight: 800,
          letterSpacing: -10,
          fontFamily: "sans-serif",
        }}
      >
        SM
      </div>
    ),
    size,
  )
}
