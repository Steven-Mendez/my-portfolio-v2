import type { CaseSection } from "@/lib/case-studies";

import CaseStorySection from "./CaseStorySection";

/** The narrative body — a stack of story sections with a generous vertical
 *  rhythm between them. Each section keeps its prose in a single readable
 *  column, so the page reads like an article. Reusable with whatever set of
 *  sections a project supplies. */
export default function CaseStory({ sections }: { sections: CaseSection[] }) {
  if (sections.length === 0) return null;

  return (
    <article className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div className="flex flex-col gap-20 md:gap-28">
        {sections.map((s) => (
          <CaseStorySection key={s.kicker} section={s} />
        ))}
      </div>
    </article>
  );
}
