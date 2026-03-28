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
        "relative py-24 md:py-32 px-6 md:px-12 flex flex-col items-center justify-center min-h-screen w-full snap-start",
        className
      )}
    >
      <div className={cn("w-full max-w-7xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
