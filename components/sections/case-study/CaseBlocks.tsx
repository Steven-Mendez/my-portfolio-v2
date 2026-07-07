import type { CaseBlock } from "@/lib/case-studies";

import Mermaid from "./Mermaid";
import MediaFrame from "./MediaFrame";
import { Inline } from "./richText";

const PROSE = "text-[18px] leading-[1.7] text-foreground/90 md:text-[19px]";

/** Stable, content-derived key for a block. The blocks are authored, static
 *  case-study data that never reorders or filters, so a content key is both
 *  stable and unique among siblings (no two authored sibling blocks are
 *  byte-identical) — and, unlike the array index, it follows the block if the
 *  data is ever reordered. */
function blockKey(block: CaseBlock): string {
  switch (block.type) {
    case "paragraph":
    case "subheading":
    case "quote":
      return `${block.type}:${block.text}`;
    case "list":
      return `list:${block.items.join("|")}`;
    case "table":
      return `table:${block.headers.join("|")}`;
    case "mermaid":
      return `mermaid:${block.code}`;
    case "media":
      return `media:${JSON.stringify(block.media)}`;
  }
}

/** Renders a section's rich `blocks` — prose, sub-headings, lists, tables, live
 *  Mermaid diagrams, and placeholder media — in order, with a single shared
 *  vertical rhythm. The reading measure is set by the parent section. */
export default function CaseBlocks({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <div className="mt-8 flex flex-col gap-8">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={blockKey(block)} className={PROSE}>
                <Inline text={block.text} />
              </p>
            );

          case "subheading":
            return (
              <h3
                key={blockKey(block)}
                className="pt-2 text-[21px] font-medium leading-[1.2] tracking-tight text-white md:text-[25px]"
              >
                <Inline text={block.text} />
              </h3>
            );

          case "quote":
            return (
              <blockquote key={blockKey(block)} className="border-l-2 border-accent-blue py-1 pl-5 md:pl-6">
                <p className="text-[22px] font-medium leading-[1.35] tracking-tight text-white md:text-[28px]">
                  <Inline text={block.text} />
                </p>
                {block.attribution && (
                  <footer className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                    {block.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "list":
            return (
              <ul key={blockKey(block)} className="flex flex-col gap-4">
                {block.items.map((item, j) => (
                  <li key={j} className={`relative pl-6 ${PROSE}`}>
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.85em] size-1.5 -translate-y-1/2 rounded-full bg-accent-blue"
                    />
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={blockKey(block)}
                className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03]">
                      {block.headers.map((h) => (
                        <th
                          key={h}
                          className="whitespace-nowrap px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-eyebrow"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr
                        key={r}
                        className="border-b border-white/[0.06] align-top last:border-0"
                      >
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="px-4 py-3 leading-relaxed text-fg-secondary first:font-medium first:text-white"
                          >
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "mermaid":
            return (
              <figure key={blockKey(block)}>
                <div className="rounded-2xl border border-white/10 bg-[#0b0e18] p-4 md:p-6">
                  <Mermaid code={block.code} title={block.caption} />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 font-mono text-xs leading-relaxed text-fg-muted">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "media":
            return (
              <MediaFrame
                key={blockKey(block)}
                media={block.media}
                sizes="(min-width: 1152px) 1056px, 100vw"
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
