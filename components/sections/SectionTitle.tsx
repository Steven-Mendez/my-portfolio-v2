import React from 'react';
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

interface SectionTitleProps {
  title: string;
  /** Mono kicker rendered above the title (e.g. "CAREER", "ABOUT"). */
  eyebrow?: string;
  /** Optional mono line rendered below the title. */
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionTitle({
  title,
  eyebrow,
  subtitle,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {/* Reference style: a large left title with the mono kicker inline to its
          right, baseline-aligned. Shared by every section so they all match. */}
      <div
        className={cn(
          "flex flex-wrap items-baseline gap-x-4 gap-y-1.5",
          align === "center" && "justify-center text-center"
        )}
      >
        <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {eyebrow ? (
          <Eyebrow className="text-[12px] tracking-[0.24em]">{eyebrow}</Eyebrow>
        ) : null}
      </div>
      {subtitle ? (
        <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-eyebrow/70 md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
