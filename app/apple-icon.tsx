import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0e10",
          color: "#5b8cff",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -4,
          fontFamily: "sans-serif",
        }}
      >
        SM
      </div>
    ),
    size,
  )
}
