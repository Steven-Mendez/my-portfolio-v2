import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

import styles from "./HeroLiquidGlass.module.css"

type GlassSurfaceProps<T extends ElementType = "div"> = {
  as?: T
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">

export default function GlassSurface<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: GlassSurfaceProps<T>) {
  const Comp = (as ?? "div") as ElementType

  return (
    <Comp className={cn(styles.glassSurface, className)} {...props}>
      {children}
    </Comp>
  )
}
