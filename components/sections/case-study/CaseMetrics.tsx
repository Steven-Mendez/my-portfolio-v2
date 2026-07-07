import GlassSurface from "@/components/hero/GlassSurface";
import type { CaseMetric } from "@/lib/case-studies";

import { CASE_CONTAINER } from "./layout";

// Column tracks per metric count, so the slab stays balanced whether a project
// supplies two, three, or four headline numbers.
const COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** The headline numbers, set on a single glass slab that splits into columns on
 *  wider screens. Reusable with any list of metrics — the grid adapts to count. */
export default function CaseMetrics({ metrics }: { metrics: CaseMetric[] }) {
  if (metrics.length === 0) return null;

  const cols = COLS[metrics.length] ?? "sm:grid-cols-3";

  return (
    <section className={CASE_CONTAINER}>
      <GlassSurface
        as="div"
        className={`grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl sm:divide-x sm:divide-y-0 ${cols}`}
      >
        {metrics.map((m) => (
          <div key={m.label} className="px-7 py-7">
            <div className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {m.value}
            </div>
            <div className="mt-1.5 text-sm text-fg-muted">{m.label}</div>
          </div>
        ))}
      </GlassSurface>
    </section>
  );
}
