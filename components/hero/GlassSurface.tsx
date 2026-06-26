import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

import styles from "./HeroLiquidGlass.module.css"

type GlassSurfaceProps<T extends ElementType = "div"> = {
  as?: T
  className?: string
  /** Adds the shared hover affordance (accent border + subtle lift). */
  interactive?: boolean
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">

export default function GlassSurface<T extends ElementType = "div">({
  as,
  className,
  interactive,
  children,
  ...props
}: GlassSurfaceProps<T>) {
  const Comp = (as ?? "div") as ElementType

  return (
    <Comp
      className={cn(
        styles.glassSurface,
        interactive &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-glass-border-hover",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
