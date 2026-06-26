import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Portfolio button language: pill-shaped glass / periwinkle actions, matching
// the hand-rolled anchors used across the hero, nav and footer.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all outline-none select-none shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Periwinkle solid — the primary call to action.
        solid:
          "bg-primary text-primary-foreground font-bold hover:-translate-y-0.5 hover:bg-primary/90",
        // Glass pill — secondary actions and social links.
        ghost:
          "border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/40",
        // Bordered mono action — nav-style label.
        "pill-link":
          "border border-white/15 bg-transparent font-mono uppercase tracking-[0.18em] text-white/90 shadow-none hover:border-white/40 hover:text-white",
        link: "text-accent-blue underline-offset-4 shadow-none hover:underline",
        // Stock-shadcn-compatible variants used by vendored components
        // (AI Elements / shadcn primitives expect `default` and `outline`).
        default:
          "bg-foreground text-background font-semibold hover:bg-foreground/90",
        outline:
          "border border-border bg-transparent text-foreground shadow-none hover:bg-foreground/10",
      },
      size: {
        default: "px-6 py-3 text-xs tracking-[0.08em]",
        sm: "px-4 py-2.5 text-[11px] tracking-[0.08em]",
        lg: "px-7 py-3.5 text-sm tracking-[0.08em]",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-4",
        // Smaller icon button used by vendored components.
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "solid",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
