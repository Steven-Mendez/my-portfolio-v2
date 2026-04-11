"use client";

import React, { useMemo } from 'react';
import { portfolioData } from '@/lib/data';

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="relative z-10 mt-20 py-12 text-center text-[#d2dcff]/60 text-xs font-mono uppercase tracking-[0.2em] bg-transparent">
      © {year} {portfolioData.profile.fullName} — Software Developer
    </footer>
  );
}
