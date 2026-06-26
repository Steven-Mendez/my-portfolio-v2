import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/lib/case-studies";

/** GitHub logo mark — lucide dropped its brand icons, so we inline the official
 *  mark, sized to sit inline with the button label. */
function GithubMark() {
  return (
    <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/** The case-study lead: category/year/role line, title, overview, tags, and the
 *  live/source CTAs — all centred in a narrow column, like an editorial article
 *  opener, so the project reads as a focused hero rather than a wide banner.
 *  Reused as the opening block of every project. */
export default function CaseHeader({ study }: { study: CaseStudy }) {
  return (
    <header className="mx-auto max-w-3xl px-6 pb-12 pt-28 text-center md:pb-16 md:pt-36">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.12em] text-eyebrow">
        <span>{study.category}</span>
        <span className="text-fg-faint">/</span>
        <span className="text-accent-blue">{study.year}</span>
        <span className="text-fg-faint">/</span>
        <span className="text-fg-muted">{study.role}</span>
      </div>

      <h1 className="mt-6 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
        {study.title}
      </h1>

      {/* Lead reads like the body paragraphs — left-aligned (ragged right),
          same size/leading/colour and width — not centred like the rest of the
          hero, so a long paragraph stays comfortable to read. */}
      <p className="mx-auto mt-7 max-w-[680px] text-left text-[18px] leading-[1.7] text-foreground/90 md:text-[19px]">
        {study.overview}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {study.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="h-auto rounded-lg border-[rgba(150,172,255,0.18)] bg-[rgba(124,152,255,0.08)] px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-fg-secondary"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {(study.liveUrl || study.repoUrl) && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {study.liveUrl && (
            <Button asChild size="sm">
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-3.5" />
                View live
              </a>
            </Button>
          )}
          {study.repoUrl && (
            <Button asChild variant={study.liveUrl ? "ghost" : "solid"} size="sm">
              <a href={study.repoUrl} target="_blank" rel="noopener noreferrer">
                <GithubMark />
                View on GitHub
              </a>
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
