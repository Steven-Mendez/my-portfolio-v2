"use client";

import React from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionTitle 
        title="About Me" 
        subtitle="The Human Factor" 
      />
      
      <div className="flex flex-col w-full mx-auto space-y-10 md:space-y-16">
          
          <div className="space-y-6 md:space-y-8">
            <p className="text-xl md:text-3xl lg:text-4xl text-[#f4f6ff] font-light leading-snug tracking-tight drop-shadow-lg">
              I am a Backend Engineer specializing in building scalable APIs, cloud infrastructure, and AI-driven applications.
            </p>
            <p className="text-lg md:text-xl text-[#e2e8f0] font-normal leading-relaxed drop-shadow-md brightness-110">
              Currently, I focus on developing the backend services that power complex multi-vendor data pipelines and AI integrations. Whether I am building external integrations or optimizing internal database interactions, I thrive on translating technical requirements into clean, high-performance, and resilient code.
            </p>
          </div>
      </div>
    </SectionWrapper>
  );
}
