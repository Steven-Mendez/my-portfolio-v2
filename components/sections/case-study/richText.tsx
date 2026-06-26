import * as React from "react";

// Lightweight inline markup for case-study copy: **bold**, *italic*, `code`.
// The content is authored in lib/case-studies.ts (trusted, not user input), so
// a small tokenizer is enough — no full Markdown parser. Bold is matched before
// italic so a `**` pair is never mistaken for two italic markers.
const TOKEN = /(`[^`]+`|\*\*[^*]+?\*\*|\*[^*]+?\*)/g;

/** Turn a string with inline markup into React nodes. Safe in server
 *  components — it returns elements, never dangerouslySetInnerHTML. */
export function renderInline(text: string): React.ReactNode {
  return text
    .split(TOKEN)
    .filter((part) => part !== "")
    .map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="rounded-[5px] border border-white/10 bg-white/[0.06] px-[0.4em] py-[0.1em] font-mono text-[0.85em] text-[#cdd6ee]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="text-fg-secondary">
            {part.slice(1, -1)}
          </em>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}
