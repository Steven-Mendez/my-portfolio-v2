"use client";

import React from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import GlassSurface from '../hero/GlassSurface';
import { Badge } from '@/components/ui/badge';
import { Eyebrow } from '@/components/ui/eyebrow';
import { portfolioData } from '@/lib/data';
import ProfileCard from '../ProfileCard';

export default function AboutSection() {
  const { coreStack } = portfolioData.skills;
  const { languages } = portfolioData;

  return (
    <SectionWrapper id="about" className="pb-10 md:pb-14">
      <SectionTitle title={portfolioData.about.title} eyebrow="Profile" />

      <div className="grid w-full mx-auto gap-8 lg:gap-10 lg:grid-cols-[minmax(280px,380px)_1fr] lg:items-stretch">
        <div className="flex h-full justify-center lg:block">
          <ProfileCard
            className="about-profile-card"
            avatarUrl={portfolioData.profile.avatarUrl}
            avatarAlt={`${portfolioData.profile.fullName} — ${portfolioData.profile.role}`}
            handle={portfolioData.profile.handle}
            contactText="Get in Touch"
            onContactClick={() => window.location.href = `mailto:${portfolioData.profile.contactEmail}`}
            showUserInfo={true}
            enableTilt={true}
            innerGradient="linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)"
            behindGlowColor="rgba(255, 255, 255, 0.05)"
          />
        </div>

        <GlassSurface as="div" className="relative overflow-hidden rounded-3xl p-8 md:p-10 lg:h-full">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_45%)]" />

          <div className="relative space-y-6 lg:flex lg:h-full lg:flex-col lg:justify-center lg:space-y-7">
            <h3 className="text-2xl font-semibold leading-[1.15] tracking-tight text-white md:text-[2rem] lg:text-[2.4rem]">
              {portfolioData.about.headline}
            </h3>

            <div className="h-px w-full bg-linear-to-r from-white/40 via-white/10 to-transparent" />

            <p className="max-w-[70ch] text-base leading-relaxed text-fg-secondary md:text-[17px]">
              {portfolioData.about.resumeSummary}
            </p>

            <div className="grid gap-6 pt-1 md:grid-cols-2">
              <div>
                <Eyebrow tone="muted" className="mb-3">Languages</Eyebrow>
                <ul className="space-y-2 text-sm text-fg-secondary md:text-[15px]">
                  {languages.map((lang) => (
                    <li key={lang.name} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                      <span>
                        <span className="font-medium text-white">{lang.name}</span>
                        <span className="text-[13px] text-fg-muted"> · {lang.level}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Eyebrow tone="muted" className="mb-3">Core stack</Eyebrow>
                <div className="flex flex-wrap gap-2">
                  {coreStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="h-auto rounded-full border-[rgba(150,172,255,0.2)] bg-[rgba(124,152,255,0.08)] px-3 py-1 text-xs font-normal text-fg-secondary md:text-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassSurface>
      </div>
    </SectionWrapper>
  );
}
