import React from 'react';
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-12 md:mb-16 text-center", className)}>
      <h2 className="text-3xl md:text-5xl font-bold text-[#f4f6ff] mb-2 tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-[#b4c4ff]/60 font-mono text-sm md:text-base tracking-[0.2em] uppercase">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
