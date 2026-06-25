"use client";

import Image from 'next/image';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import GlassSurface from '../hero/GlassSurface';
import { portfolioData, type ExperienceItem as ExperienceItemType } from '@/lib/data';

function ExperienceLogo({ exp, nested }: { exp: ExperienceItemType; nested?: boolean }) {
  const box = nested
    ? 'w-11 h-11 md:w-12 md:h-12 rounded-md text-[13px] md:text-sm'
    : 'w-14 h-14 md:w-16 md:h-16 rounded-md text-lg md:text-xl';

  // Confidential clients show a neutral monogram tile (no real logo to reveal).
  if (exp.confidential) {
    return (
      <div
        className={`${box} flex flex-shrink-0 items-center justify-center font-display font-bold tracking-tight text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)] ring-1 ring-white/15`}
        style={{ background: exp.accent ?? 'linear-gradient(135deg,#3f3f46,#18181b)' }}
        aria-hidden
      >
        {exp.monogram ?? exp.company.charAt(0)}
      </div>
    );
  }

  return (
    <div className={`${box} relative flex-shrink-0 overflow-hidden bg-white/5 shadow-[0_6px_20px_rgba(0,0,0,0.35)] ring-1 ring-white/10`}>
      <Image src={exp.logoPath} alt={exp.company} fill sizes="64px" className="object-cover" />
    </div>
  );
}

function ExperienceItem({ exp, isLast, isNested = false }: { exp: ExperienceItemType; isLast: boolean; isNested?: boolean }) {
  const hasChildren = !!exp.children && exp.children.length > 0;
  const showChips = !hasChildren && exp.skillsSummary.length > 0;
  const period = exp.period.replace(/\s*-\s*/, ' — ');

  return (
    <div className={`${isNested ? 'px-5 py-5 md:px-6 md:py-6' : 'p-5 md:p-7'} ${!isLast ? 'border-b border-white/10' : ''}`}>
      {/* Header: monogram + title/company + dates */}
      <div className="flex items-start gap-4">
        <ExperienceLogo exp={exp} nested={isNested} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h3 className={`${isNested ? 'text-[16px] md:text-[17px]' : 'text-[19px] md:text-[22px]'} font-display font-bold leading-tight tracking-tight text-white`}>
                {exp.title}
              </h3>
              <p className="mt-1 text-[14px] leading-snug md:text-[14.5px]">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className={isNested ? 'font-semibold text-primary' : 'font-semibold text-white'}>{exp.company}</span>
                )}
                {hasChildren ? <span className="text-[#8b97b4]"> · Agency</span> : null}
                {exp.confidential ? <span className="text-[#8b97b4]"> · Confidential</span> : null}
                {exp.employmentType ? <span className="text-[#8b97b4]"> · {exp.employmentType}</span> : null}
              </p>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <p className={isNested ? 'font-mono text-[11.5px] whitespace-nowrap text-[#7e8aa8]' : 'text-[13px] whitespace-nowrap text-[#94a3b8] md:text-[14px]'}>
                {period}
              </p>
              {!isNested ? <p className="mt-0.5 text-[13px] text-[#7e8aa8] md:text-[13.5px]">{exp.location}</p> : null}
            </div>
          </div>
        </div>
      </div>

      {/* Divider under header for umbrella / standalone entries */}
      {!isNested ? <div className="mt-4 h-px w-full bg-white/10" /> : null}

      {/* Bullets (always visible) */}
      {exp.bullets.length > 0 ? (
        <ul className={`${isNested ? 'mt-3' : 'mt-4'} space-y-2.5 text-[14px] leading-[1.6] text-[#d7dff2] md:text-[15px]`}>
          {exp.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-2.5">
              <span className="mt-[2px] select-none font-mono text-primary/75" aria-hidden>✳</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Tech chips */}
      {showChips ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.skillsSummary.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/60"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}

      {/* Nested client engagements */}
      {hasChildren ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/80">
              Clients delivered via {exp.company}
            </p>
            <p className="font-mono text-[11px] whitespace-nowrap uppercase tracking-[0.16em] text-[#8b97b4]">
              {exp.children!.length} {exp.children!.length === 1 ? 'Engagement' : 'Engagements'}
            </p>
          </div>
          <div className="mt-2 flex flex-col">
            {exp.children!.map((child, idx) => (
              <ExperienceItem
                key={child.company}
                exp={child}
                isLast={idx === exp.children!.length - 1}
                isNested
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionTitle title="Experience" />

      <div className="mx-auto w-full">
        <GlassSurface className="flex flex-col overflow-hidden rounded-2xl border border-white/5 p-0">
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
