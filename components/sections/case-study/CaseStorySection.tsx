import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseSection } from "@/lib/case-studies";

import CaseBlocks from "./CaseBlocks";
import { Inline } from "./richText";

/** One story beat in a centred, single-column reading measure (~680px),
 *  left-aligned with a ragged right edge — never justified — so the page reads
 *  like a clean editorial article. A light, large heading sits over a bright
 *  body with a generous paragraph rhythm. A section supplies its body as rich
 *  `blocks` (prose, lists, tables, diagrams, media); `kicker` and `heading` are
 *  optional, so a section can be a stand-alone diagram or quote. Reused for
 *  every section a project defines. */
export default function CaseStorySection({ section }: { section: CaseSection }) {
  const { kicker, heading, blocks } = section;

  return (
    <section className="mx-auto max-w-[680px]">
      {kicker && <Eyebrow className="tracking-[0.2em]">{kicker}</Eyebrow>}
      {heading && (
        <h2 className="mt-5 text-[28px] font-medium leading-[1.1] tracking-tight text-white md:text-[40px]">
          <Inline text={heading} />
        </h2>
      )}

      {blocks.length > 0 && <CaseBlocks blocks={blocks} />}
    </section>
  );
}
