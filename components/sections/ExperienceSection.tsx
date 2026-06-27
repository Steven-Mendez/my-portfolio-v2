"use client";

import Image from 'next/image';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import GlassSurface from '../hero/GlassSurface';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
    // Top-level entries are wrapped by their own GlassSurface card (padding +
    // hover live there); nested client rows keep inline padding + a divider.
    <div className={isNested ? `px-5 py-5 md:px-6 md:py-6 ${!isLast ? 'border-b border-white/10' : ''}` : undefined}>
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
                {hasChildren ? <span className="text-fg-muted"> · Agency</span> : null}
                {exp.confidential ? <span className="text-fg-muted"> · Confidential</span> : null}
                {exp.employmentType ? <span className="text-fg-muted"> · {exp.employmentType}</span> : null}
              </p>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <p className={isNested ? 'font-mono text-[11.5px] whitespace-nowrap text-fg-faint' : 'font-mono text-[12px] whitespace-nowrap text-fg-muted md:text-[12.5px]'}>
                {period}
              </p>
              {!isNested ? <p className="mt-0.5 text-[13px] text-fg-faint md:text-[13.5px]">{exp.location}</p> : null}
            </div>
          </div>
        </div>
      </div>

      {/* Divider under header for umbrella / standalone entries */}
      {!isNested ? <Separator className="mt-4 bg-white/10" /> : null}

      {/* Bullets (always visible) */}
      {exp.bullets.length > 0 ? (
        <ul className={`${isNested ? 'mt-3' : 'mt-4'} space-y-2.5 text-[14px] leading-[1.6] text-fg-secondary md:text-[15px]`}>
          {exp.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5">
              <span className="mt-[2px] select-none font-mono text-accent-blue" aria-hidden>✳</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Tech chips */}
      {showChips ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.skillsSummary.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="h-auto rounded-md border-[rgba(150,172,255,0.18)] bg-[rgba(124,152,255,0.08)] px-2.5 py-1 font-mono text-[11px] tracking-[0.04em] text-white/70"
            >
              {skill}
            </Badge>
          ))}
        </div>
      ) : null}

      {/* Nested client engagements — accent-tinted to read as a sub-cluster */}
      {hasChildren ? (
        <div className="mt-5 rounded-2xl border border-primary/25 bg-[rgba(124,152,255,0.07)] p-4 md:p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-eyebrow">
              Clients delivered via {exp.company}
            </p>
            <p className="font-mono text-[11px] whitespace-nowrap uppercase tracking-[0.16em] text-fg-muted">
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
      <SectionTitle title="Experience" eyebrow="Career" />

      {/* Each role is its own glass card with a hover lift — matches the design
          reference's separated, gap-spaced cards (vs. one monolithic panel). */}
      <div className="mx-auto flex w-full flex-col gap-4 md:gap-[18px]">
        {portfolioData.experience.map((exp) => (
          <GlassSurface
            key={exp.company}
            as="article"
            interactive
            className="overflow-hidden rounded-2xl p-5 md:p-7"
          >
            <ExperienceItem exp={exp} isLast />
          </GlassSurface>
        ))}
      </div>
    </SectionWrapper>
  );
}
