"use client";

import React from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import { portfolioData } from '@/lib/data';

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionTitle 
        title={portfolioData.about.title} 
      />
      
      <div className="flex flex-col w-full mx-auto space-y-10 md:space-y-16">
          
          <div className="space-y-6 md:space-y-8">
            <p className="text-xl md:text-3xl lg:text-4xl text-[#f4f6ff] font-light leading-snug tracking-tight drop-shadow-lg">
              {portfolioData.about.description1}
            </p>
            <p className="text-lg md:text-xl text-[#e2e8f0] font-normal leading-relaxed drop-shadow-md brightness-110">
              {portfolioData.about.description2}
            </p>
          </div>
      </div>
    </SectionWrapper>
  );
}
