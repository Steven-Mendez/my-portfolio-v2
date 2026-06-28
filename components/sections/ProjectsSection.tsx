"use client";

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import SectionWrapper from './SectionWrapper';
import { Eyebrow } from '@/components/ui/eyebrow';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { portfolioData } from '@/lib/data';
import type { BentoCardLayout } from '../MagicBento';

// Dynamically import heavy interaction component.
// ssr stays enabled (the default) so the project titles/descriptions render into the
// initial HTML — visible to ATS, AI agents, and crawlers. The component is still
// code-split, and its heavy GSAP/particle interactivity only runs after hydration
// (inside useEffect), so SSR stays cheap.
const MagicBento = dynamic(() => import('../MagicBento'), {
  loading: () => <div className="h-[400px] w-full animate-pulse bg-white/5 rounded-3xl" />,
});

const PAGE_SIZE = 4;
const ALL = 'All';

// The explicit bento is a 12-column grid (see `.card-grid[data-explicit-layout]`
// in MagicBento.css). Each cell sets a card's column span (`cs`, 1–12) and row
// span (`rs`), so ANY card on ANY page can be made wider/taller — that's how you
// make an element stand out more or less, purely the developer's call. One
// variant is picked per page index, so a multi-page grid mutates as you paginate.
type Cell = { c: number; r: number; cs: number; rs: number };

const LAYOUTS: Record<number, Cell[][]> = {
  1: [[{ c: 1, r: 1, cs: 12, rs: 1 }]],
  // e.g. for two cards the default weights them 2:1 (8 vs 4 cols); swap to the
  // equal (6/6) or mirror (4/8) variant — or just edit a `cs` — to re-weight them.
  2: [
    [{ c: 1, r: 1, cs: 8, rs: 2 }, { c: 9, r: 1, cs: 4, rs: 2 }],
    [{ c: 1, r: 1, cs: 6, rs: 2 }, { c: 7, r: 1, cs: 6, rs: 2 }],
    [{ c: 1, r: 1, cs: 4, rs: 2 }, { c: 5, r: 1, cs: 8, rs: 2 }],
  ],
  3: [
    [{ c: 1, r: 1, cs: 6, rs: 2 }, { c: 7, r: 1, cs: 6, rs: 1 }, { c: 7, r: 2, cs: 6, rs: 1 }],
    [{ c: 1, r: 1, cs: 3, rs: 2 }, { c: 4, r: 1, cs: 6, rs: 2 }, { c: 10, r: 1, cs: 3, rs: 2 }],
    [{ c: 1, r: 1, cs: 6, rs: 1 }, { c: 1, r: 2, cs: 6, rs: 1 }, { c: 7, r: 1, cs: 6, rs: 2 }],
  ],
  4: [
    [{ c: 1, r: 1, cs: 6, rs: 2 }, { c: 7, r: 1, cs: 6, rs: 1 }, { c: 7, r: 2, cs: 3, rs: 1 }, { c: 10, r: 2, cs: 3, rs: 1 }],
    [{ c: 7, r: 1, cs: 6, rs: 2 }, { c: 1, r: 1, cs: 6, rs: 1 }, { c: 1, r: 2, cs: 3, rs: 1 }, { c: 4, r: 2, cs: 3, rs: 1 }],
    [{ c: 1, r: 1, cs: 6, rs: 1 }, { c: 7, r: 1, cs: 6, rs: 1 }, { c: 1, r: 2, cs: 6, rs: 1 }, { c: 7, r: 2, cs: 6, rs: 1 }],
  ],
};

function getBentoLayout(count: number, page: number): BentoCardLayout[] {
  const variants = LAYOUTS[Math.min(Math.max(count, 1), 4)];
  const cells = variants[page % variants.length];
  return cells.map((cell) => ({
    gc: `${cell.c} / span ${cell.cs}`,
    gr: `${cell.r} / span ${cell.rs}`,
  }));
}

export default function ProjectsSection() {
  const projects = portfolioData.projects;

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(projects.flatMap((p) => (p.category ? [p.category] : []))))],
    [projects]
  );

  const [category, setCategory] = useState<string>(ALL);
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () => (category === ALL ? projects : projects.filter((p) => p.category === category)),
    [projects, category]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);
  const layout = getBentoLayout(pageItems.length, current);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(0);
  };

  return (
    <SectionWrapper id="projects">
      {/* Header: large title + kicker on the left, shadcn Select filter on the right. */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-5 md:mb-16">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
          <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
            Projects
          </h2>
          <Eyebrow className="text-[12px] tracking-[0.24em]">Selected Work</Eyebrow>
        </div>

        <div className="flex items-center gap-3">
          <Eyebrow tone="muted" size="sm" className="hidden text-eyebrow/70 sm:block">
            Filter
          </Eyebrow>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger
              aria-label="Filter projects by category"
              className="h-auto rounded-full border-[rgba(150,172,255,0.2)] bg-[rgba(124,152,255,0.08)] px-4 py-2.5 font-mono text-[11px] tracking-[0.1em] text-white/90 shadow-none backdrop-blur-md transition-colors hover:border-[rgba(150,172,255,0.4)] focus-visible:ring-white/20 data-[state=open]:border-[rgba(150,172,255,0.4)] [&_svg]:text-white/60"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-[11rem] border-white/10">
              <SelectGroup>
                {categories.map((c) => (
                  <SelectItem key={c} value={c} className="font-mono text-xs tracking-[0.06em]">
                    {c === ALL ? 'All projects' : c}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <MagicBento
        key={category}
        items={pageItems}
        cardLayout={layout}
        glowColor="255, 255, 255" // Clean white spotlight glow to match glass
        effects={{ tilt: true, stars: false }}
        className="w-full"
      />

      {pageCount > 1 ? (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={current === 0}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink isActive={i === current} onClick={() => setPage(i)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={current === pageCount - 1}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </SectionWrapper>
  );
}
