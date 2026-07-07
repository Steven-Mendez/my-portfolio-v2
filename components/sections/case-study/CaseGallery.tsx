import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseMedia } from "@/lib/case-studies";

import { CASE_CONTAINER } from "./layout";
import MediaFrame from "./MediaFrame";

/** A compact grid of demos and screenshots that supports the story above
 *  without upstaging it. Renders nothing when a project has no gallery, so it's
 *  safe to drop into every case study. */
export default function CaseGallery({ items }: { items?: CaseMedia[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className={`${CASE_CONTAINER} pb-20 md:pb-28`}>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow className="tracking-[0.2em]">Media</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold leading-[1.1] tracking-tight text-white md:text-[34px]">
            Gallery &amp; demos
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
          {items.length} items
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <MediaFrame
            key={m.src ?? `${m.kind}-${i}`}
            media={m}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          />
        ))}
      </div>
    </section>
  );
}
