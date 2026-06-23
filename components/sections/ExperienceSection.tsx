"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import GlassSurface from '../hero/GlassSurface';
import { Diamond, Building2 } from 'lucide-react';
import { portfolioData, type ExperienceItem as ExperienceItemType } from '@/lib/data';

function ExperienceItem({ exp, isLast }: { exp: ExperienceItemType, isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasBullets = exp.bullets.length > 0;

  return (
    <div className={`p-5 md:p-7 flex flex-col gap-4 ${!isLast ? 'border-b border-white/10' : ''}`}>
      
      {/* Header Block: Logo + Title/Company/Dates */}
      <div className="flex gap-4 items-start">
        {/* Logo */}
        <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 relative bg-white/5 rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.3)] overflow-hidden shrink-0 mt-0.5 flex items-center justify-center">
          {exp.confidential ? (
            <Building2 className="h-6 w-6 text-white/70" strokeWidth={1.75} aria-hidden />
          ) : (
            <Image src={exp.logoPath} alt={exp.company} fill sizes="(max-width: 768px) 48px, 56px" className="object-cover" />
          )}
        </div>
        
        {/* Title & Metadata */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full">
            <div>
              <h3 className="text-[17px] md:text-[18px] tracking-tight font-bold text-white leading-tight mb-1">
                {exp.title}
              </h3>
              
              <p className="text-[14.5px] text-[#cbd5e1] font-medium leading-snug">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f8fafc] hover:text-primary underline-offset-2 hover:underline transition-colors"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className="text-[#f8fafc]">{exp.company}</span>
                )}
                {exp.employmentType ? <><span className="font-black mx-1.5 opacity-40 text-[10px]">·</span> {exp.employmentType}</> : null}
                {exp.agency ? (
                  <>
                    <span className="font-black mx-1.5 opacity-40 text-[10px]">·</span>
                    via{' '}
                    {exp.agencyUrl ? (
                      <a
                        href={exp.agencyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#cbd5e1] hover:text-primary underline-offset-2 hover:underline transition-colors"
                      >
                        {exp.agency}
                      </a>
                    ) : (
                      exp.agency
                    )}
                  </>
                ) : null}
                {/* Desktop Date Inline */}
                <span className="hidden md:inline font-black mx-1.5 opacity-40 text-[10px]">·</span>
                <span className="hidden md:inline font-normal text-[#94a3b8]">{exp.period}</span>
              </p>
            </div>
            
            {/* Desktop Location / Duration (Optional right-aligned) */}
            <div className="hidden md:block text-right mt-1 md:mt-0">
               <p className="text-[14px] text-[#94a3b8] font-normal leading-snug">
                 {exp.location}
               </p>
            </div>
          </div>
          
          {/* Mobile Date & Location */}
          <p className="md:hidden text-[13.5px] text-[#94a3b8] font-normal leading-snug mt-1.5">
            {exp.period} <span className="font-black mx-1 opacity-40 text-[10px]">·</span> {exp.location}
          </p>
        </div>
      </div>
      
      {/* Description Body (Full Width) */}
      <div className="text-[14.5px] leading-[1.65] text-[#f1f5f9] font-normal mt-1">
        <p>{exp.summary}</p>

        {hasBullets && isExpanded ? (
          <ul className="mt-3 space-y-2">
            {exp.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {hasBullets ? (
          <button
            onClick={() => setIsExpanded((v) => !v)}
            aria-expanded={isExpanded}
            className="mt-2 inline-block text-white font-semibold hover:underline transition-colors focus:outline-none"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        ) : null}
      </div>
      
      {/* Skills Line (Full Width) */}
      <div className="flex items-start gap-2 mt-2 pt-3 border-t border-white/10">
        <Diamond size={14} className="text-white opacity-70 mt-[3px] flex-shrink-0" strokeWidth={2.5} />
        <strong className="text-[13.5px] text-white font-semibold tracking-tight leading-snug">
          {exp.skillsSummary.join(' • ')}
        </strong>
      </div>
      
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionTitle 
        title="Experience" 
      />
      
      <div className="w-full mx-auto">
        <GlassSurface className="rounded-2xl flex flex-col overflow-hidden p-0 border border-white/5">
          {portfolioData.experience.map((exp, i) => (
            <ExperienceItem
              key={exp.company}
              exp={exp}
              isLast={i === portfolioData.experience.length - 1}
            />
          ))}
        </GlassSurface>
      </div>
    </SectionWrapper>
  );
}
