"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-2", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

// Buttons (not anchors) — the filter pages in place without changing the URL,
// so each control is a real focusable button rather than an <a href="#">.
const paginationLinkBase =
  "inline-flex shrink-0 items-center justify-center rounded-full font-mono text-xs tracking-[0.06em] outline-none transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40"

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: {
  isActive?: boolean
  size?: "icon" | "default"
} & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        paginationLinkBase,
        size === "icon" ? "size-10" : "h-10 gap-1.5 px-4",
        isActive
          ? "bg-primary font-bold text-primary-foreground shadow-lg"
          : "border border-white/15 bg-white/5 text-white/80 backdrop-blur-md hover:-translate-y-0.5 hover:border-white/35 hover:text-white",
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="icon"
      className={className}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="sr-only">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="icon"
      className={className}
      {...props}
    >
      <ChevronRight className="size-4" />
      <span className="sr-only">Next</span>
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-10 items-center justify-center text-white/50",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
