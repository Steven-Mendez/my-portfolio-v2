"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import { portfolioData } from '@/lib/data';

// Dynamically import heavy interaction component
const MagicBento = dynamic(() => import('../MagicBento'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-white/5 rounded-3xl" />
});

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <SectionTitle 
        title="Projects" 
      />
      <div className="flex justify-center">
        <MagicBento 
          items={portfolioData.projects} 
          glowColor="255, 255, 255" // Clean white spotlight glow to match glass
          enableTilt={true}
          enableStars={false}
          className="w-full"
        />
      </div>
    </SectionWrapper>
  );
}
