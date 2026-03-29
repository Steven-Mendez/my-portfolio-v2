"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import GlassSurface from '../hero/GlassSurface';
import { Diamond } from 'lucide-react';

const experienceData = [
  {
    company: "Dupely",
    logoPath: "/logos/dupely_logo.jpeg",
    title: "Backend Engineer",
    contractType: "Contract",
    period: "Dec 2025 - Present",
    duration: "4 mos",
    location: "Remote",
    description: "Contracted through WERN as a Backend Engineer for a real-time shopping assistant (browser extension and mobile app) that detects price inflation and surfaces better-value product alternatives.\n\n• Programmed high-performance RESTful APIs using Python and FastAPI, focusing on the efficient injection and extraction of product data to serve real-time requests from the browser extension and mobile app.\n• Built and maintained robust data pipelines to continuously ingest product information, pricing history, and features from major marketplaces (Amazon, Walmart, eBay).\n• Executed end-to-end development based on technical requirements, including database management, query optimization, and ensuring fast data retrieval for end-users.",
    skillsSummary: "Python • FastAPI • AWS • React • Data Integration"
  },
  {
    company: "WERN",
    logoPath: "/logos/wern_logo.jpeg",
    title: "Full Stack Engineer",
    contractType: "Full-time",
    period: "Dec 2024 - Present",
    duration: "1 yr 4 mos",
    location: "Remote",
    description: "As an agency Fullstack Engineer, I am deployed to high-impact technology projects, specializing in full-stack development, cloud infrastructure, and Generative AI integrations.\n\n• Current Assignment (Dec 2025 - Present): Deployed to Dupely as a Backend Engineer, building scalable e-commerce data pipelines and AWS services.\n• Previous Assignment (Jan 2025 - Nov 2025): Deployed to a confidential B2B client in the EdTech sector. Built Generative AI features and LMS integrations utilizing Large Language Models (LLMs) and RAG architectures.\n• Developed scalable full-stack applications and REST APIs across multiple client environments using Python, FastAPI, Django, and React.",
    skillsSummary: "Python • FastAPI • Django • React • LLMs • RAG"
    },
  {
    company: "Universidad Nacional de Ingeniería (UNI)",
    logoPath: "/logos/universidad_nacional_de_ingenieria_nicaragua_logo.jpeg",
    title: "Full Stack Developer",
    contractType: "Full-time",
    period: "Feb 2023 - Dec 2024",
    duration: "1 yr 11 mos",
    location: "Managua, Nicaragua · On-site",
    description: "Played a key role in supporting and modernizing the university's mission-critical internal systems, specifically focusing on the core enterprise application used for budget management and vital administrative operations.\n\nKey responsibilities and achievements:\n- Maintained and enhanced a legacy ASP.NET enterprise system responsible for the university's financial and operational continuity.\n- Acted as a technical mentor within the team, introducing modern development practices and proposing new frontend architectures using React.js to improve maintainability and user experience.\n- Achieved significant system performance improvements by analyzing, refactoring, and optimizing complex Microsoft SQL Server queries.\n- Bridged the gap between legacy infrastructure and modern tech stacks, bringing a fresh perspective and scalable solutions to the engineering team's workflows.",
    skillsSummary: "C# • SQL Server • React • ASP.NET • Clean Architecture"
  }
];

function ExperienceItem({ exp, isLast }: { exp: typeof experienceData[0], isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Cut description cleanly on a full word around 90 characters for a perfect 1-liner
  const maxLength = 95;
  const isTruncatable = exp.description.length > maxLength;
  const shortDesc = isTruncatable 
    ? exp.description.substring(0, maxLength).split(' ').slice(0, -1).join(' ') + ' ' 
    : exp.description;

  return (
    <div className={`p-5 md:p-7 flex flex-col gap-4 ${!isLast ? 'border-b border-white/10' : ''}`}>
      
      {/* Header Block: Logo + Title/Company/Dates */}
      <div className="flex gap-4 items-start">
        {/* Logo */}
        <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 relative bg-white/5 rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.3)] overflow-hidden shrink-0 mt-0.5">
          <Image src={exp.logoPath} alt={exp.company} fill sizes="(max-width: 768px) 48px, 56px" className="object-cover" />
        </div>
        
        {/* Title & Metadata */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full">
            <div>
              <h3 className="text-[17px] md:text-[18px] tracking-tight font-bold text-white leading-tight mb-1">
                {exp.title}
              </h3>
              
              <p className="text-[14.5px] text-[#cbd5e1] font-medium leading-snug">
                <span className="text-[#f8fafc]">{exp.company}</span> 
                {exp.contractType ? <><span className="font-black mx-1.5 opacity-40 text-[10px]">·</span> {exp.contractType}</> : null}
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
      <div className="text-[14.5px] leading-[1.65] text-[#f1f5f9] font-normal whitespace-pre-wrap mt-1">
        {isExpanded ? exp.description : shortDesc}
        
        {isTruncatable && !isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            className="inline-block text-white font-semibold hover:underline transition-colors focus:outline-none"
          >
            ...show more
          </button>
        ) : null}
      </div>
      
      {/* Skills Line (Full Width) */}
      <div className="flex items-start gap-2 mt-2 pt-3 border-t border-white/10">
        <Diamond size={14} className="text-white opacity-70 mt-[3px] flex-shrink-0" strokeWidth={2.5} />
        <strong className="text-[13.5px] text-white font-semibold tracking-tight leading-snug">
          {exp.skillsSummary}
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
        subtitle="Professional Background & Career Impact" 
      />
      
      <div className="max-w-4xl mx-auto">
        <GlassSurface className="rounded-2xl flex flex-col overflow-hidden p-0 border border-white/5">
          {experienceData.map((exp, i) => (
            <ExperienceItem 
              key={i} 
              exp={exp} 
              isLast={i === experienceData.length - 1} 
            />
          ))}
        </GlassSurface>
      </div>
    </SectionWrapper>
  );
}
