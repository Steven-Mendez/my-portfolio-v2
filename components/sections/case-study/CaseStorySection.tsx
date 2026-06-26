import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseSection } from "@/lib/case-studies";

import CaseBlocks from "./CaseBlocks";
import MediaFrame from "./MediaFrame";

/** One story beat in a centred, single-column reading measure (~680px),
 *  left-aligned with a ragged right edge — never justified — so the page reads
 *  like a clean editorial article. A light, large heading sits over a bright
 *  body with a generous paragraph rhythm. A section may supply rich `blocks`
 *  (prose, lists, tables, diagrams, media) or the simpler `paragraphs` + single
 *  `media` shape. Reused for every section a project defines. */
export default function CaseStorySection({ section }: { section: CaseSection }) {
  const { kicker, heading, paragraphs, media, blocks } = section;

  return (
    <section className="mx-auto max-w-[680px]">
      <Eyebrow className="tracking-[0.2em]">{kicker}</Eyebrow>
      <h2 className="mt-5 text-[28px] font-medium leading-[1.1] tracking-tight text-white md:text-[40px]">
        {heading}
      </h2>

      {blocks && blocks.length > 0 && <CaseBlocks blocks={blocks} />}

      {paragraphs && paragraphs.length > 0 && (
        <div className="mt-8 space-y-7 text-[18px] leading-[1.7] text-foreground/90 md:text-[19px]">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}

      {media && (
        <div className="mt-10">
          <MediaFrame media={media} sizes="(min-width: 768px) 680px, 100vw" />
        </div>
      )}
    </section>
  );
}
