import type { CaseSection } from "@/lib/case-studies";

import CaseStorySection from "./CaseStorySection";

/** Stable, unique key for a section. Sections are authored, static data that
 *  never reorders at runtime, so the index guarantees uniqueness even when two
 *  sections share a kicker (or omit it); a content fingerprint is appended so
 *  the key stays meaningful and survives a reorder of the source data. */
function sectionKey(section: CaseSection, index: number): string {
  const fingerprint =
    section.kicker ?? section.heading ?? section.blocks[0]?.type ?? "section";
  return `${index}:${fingerprint}`;
}

/** The narrative body — a stack of story sections with a generous vertical
 *  rhythm between them. Each section keeps its prose in a single readable
 *  column, so the page reads like an article. Reusable with whatever set of
 *  sections a project supplies. */
export default function CaseStory({ sections }: { sections: CaseSection[] }) {
  if (sections.length === 0) return null;

  return (
    <article className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div className="flex flex-col gap-20 md:gap-28">
        {sections.map((s, i) => (
          <CaseStorySection key={sectionKey(s, i)} section={s} />
        ))}
      </div>
    </article>
  );
}
