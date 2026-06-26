import React from 'react';
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function SectionWrapper({ 
  id, 
  children, 
  className,
  containerClassName 
}: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "relative py-16 md:py-24 flex flex-col items-center w-full overflow-hidden",
        className
      )}
    >
      {/* Gutter (px-6 md:px-12) + cap (max-w-7xl) live on the SAME element as the
          hero, so the content box is inset by the padding and its edges line up
          with the hero at every breakpoint (incl. >1280px). */}
      <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-12", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
