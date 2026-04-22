"use client";

import React from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import { portfolioData } from '@/lib/data';
import ProfileCard from '../ProfileCard';

export default function AboutSection() {
  const focusAreas = [
    "Scalable backend APIs and service design",
    "Multi-vendor integrations and data pipelines",
    "Production reliability and query optimization",
  ];

  const coreStack = ["Python", "FastAPI", "AWS", "PostgreSQL", "SQL Server", "RAG"];

  return (
    <SectionWrapper id="about">
      <SectionTitle 
        title={portfolioData.about.title} 
      />
      
      <div className="grid w-full mx-auto gap-12 md:gap-16 lg:grid-cols-[minmax(280px,360px)_1fr] items-center">
        <div className="flex justify-center lg:justify-start">
          <ProfileCard
            avatarUrl={portfolioData.profile.avatarUrl}
            handle={portfolioData.profile.handle}
            contactText="Get in Touch"
            onContactClick={() => window.location.href = `mailto:${portfolioData.profile.contactEmail}`}
            showUserInfo={true}
            enableTilt={true}
            innerGradient="linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)"
            behindGlowColor="rgba(255, 255, 255, 0.05)"
          />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/25 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />

          <div className="relative space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/90">
                Backend Engineer
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-[#f4f6ff] font-light leading-snug tracking-tight">
                {portfolioData.about.description1}
              </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-white/40 via-white/10 to-transparent" />

            <p className="text-base md:text-lg text-[#dbe5ff] font-normal leading-relaxed">
              {portfolioData.about.description2}
            </p>

            <div className="grid gap-6 pt-1 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-white/70">What I focus on</p>
                <ul className="space-y-2 text-sm md:text-[15px] text-slate-100/95">
                  {focusAreas.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-white/70">Core stack</p>
                <div className="flex flex-wrap gap-2">
                  {coreStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs md:text-sm text-slate-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
