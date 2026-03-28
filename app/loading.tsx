import React from "react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#04020c]">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-white animate-spin"></div>
      </div>
    </div>
  )
}
