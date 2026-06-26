import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// The mono "kicker" label used above section titles and as the hero role tag.
// One tracking/size/colour source so every eyebrow matches.
const eyebrowVariants = cva(
  "font-mono font-medium uppercase",
  {
    variants: {
      tone: {
        accent: "text-eyebrow",
        muted: "text-fg-muted",
      },
      size: {
        default: "text-[11px] tracking-[0.2em]",
        sm: "text-[10px] tracking-[0.18em]",
      },
    },
    defaultVariants: {
      tone: "accent",
      size: "default",
    },
  }
)

function Eyebrow({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof eyebrowVariants>) {
  return (
    <p
      data-slot="eyebrow"
      className={cn(eyebrowVariants({ tone, size }), className)}
      {...props}
    />
  )
}

export { Eyebrow }
