import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      // Dark square backdrop (iOS masks apple-touch-icons with its own squircle
      // and fills transparency with black, so we paint the dark theme color)
      // with the periwinkle SM circle centered on top.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0e10",
        }}
      >
        <div
          style={{
            width: "84%",
            height: "84%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#b0c6ff",
            color: "#002d6e",
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: -4,
            fontFamily: "sans-serif",
          }}
        >
          SM
        </div>
      </div>
    ),
    size,
  )
}
