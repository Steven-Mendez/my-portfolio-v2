import React from "react"

export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center py-20">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-white/70 animate-spin"></div>
      </div>
    </div>
  )
}
