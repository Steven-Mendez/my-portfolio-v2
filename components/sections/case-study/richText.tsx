import * as React from "react";

// Lightweight inline markup for case-study copy: **bold**, *italic*, `code`, and
// [links](url). The content is authored in lib/case-studies.ts (trusted, not
// user input), so a small tokenizer is enough — no full Markdown parser. Match
// order is code → bold → link → italic, so a `**` pair is never mistaken for two
// italic markers and a `*` inside code/links is taken literally. A link's text
// holds no `]` and its URL no `)` or whitespace.
const TOKEN = /(`[^`]+`|\*\*[^*]+?\*\*|\[[^\]]+\]\([^)\s]+\)|\*[^*]+?\*)/g;

// Parses a single link token `[label](href)` into its parts, or null if the
// token is not a well-formed link.
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

// A link is external when it points off-site (http(s):// or protocol-relative
// //). Internal links (/path, #anchor) render as plain anchors.
function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}

/** Plain-text form of a marked-up string — markers removed, link labels kept.
 *  Use wherever a string (not React nodes) is required, e.g. an `alt`. */
export function stripInline(text: string): string {
  return text.replace(TOKEN, (token) => {
    if (token.startsWith("`")) return token.slice(1, -1);
    if (token.startsWith("**")) return token.slice(2, -2);
    if (token.startsWith("[")) {
      const m = LINK.exec(token);
      return m ? m[1] : token;
    }
    if (token.startsWith("*")) return token.slice(1, -1);
    return token;
  });
}

/** Renders a string with inline markup (**bold**, *italic*, `code`, and
 *  [links](url)) as React nodes. A real component (rather than a
 *  `renderInline()` helper) so React reconciles it by identity and it shows up
 *  in the tree. Safe in server components — returns elements, never
 *  dangerouslySetInnerHTML.
 *
 *  Each token is keyed by its start offset in the source string. The offset is
 *  unique (no two tokens begin at the same position) and stable across renders,
 *  so React keeps element identity correct even if the token list is ever
 *  sliced or filtered — unlike a bare array index. */
export function Inline({ text }: { text: string }): React.ReactElement {
  // Tag each token with where it starts in `text`. split() with a capturing
  // group keeps the delimiters, so a token's start offset is just the summed
  // length of every token before it — unique and stable, and accumulated in a
  // reduce so we never reassign a render-scope variable mid-render.
  const tokens = text
    .split(TOKEN)
    .filter((part) => part !== "")
    .reduce<{ key: number; value: string }[]>((acc, value) => {
      const prev = acc.at(-1);
      acc.push({ key: prev ? prev.key + prev.value.length : 0, value });
      return acc;
    }, []);

  return (
    <>
      {tokens.map(({ key, value }) => {
        if (value.startsWith("`") && value.endsWith("`")) {
          return (
            <code
              key={key}
              className="rounded-[5px] border border-white/10 bg-white/[0.06] px-[0.4em] py-[0.1em] font-mono text-[0.85em] text-[#cdd6ee]"
            >
              {value.slice(1, -1)}
            </code>
          );
        }
        if (value.startsWith("**") && value.endsWith("**")) {
          return (
            <strong key={key} className="font-semibold text-white">
              {value.slice(2, -2)}
            </strong>
          );
        }
        const link = value.startsWith("[") ? LINK.exec(value) : null;
        if (link) {
          const [, label, href] = link;
          return (
            <a
              key={key}
              href={href}
              className="font-medium text-accent-blue underline decoration-accent-blue/40 underline-offset-2 transition-colors hover:decoration-accent-blue"
              {...(isExternal(href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {label}
            </a>
          );
        }
        if (value.startsWith("*") && value.endsWith("*")) {
          return (
            <em key={key} className="text-fg-secondary">
              {value.slice(1, -1)}
            </em>
          );
        }
        return <React.Fragment key={key}>{value}</React.Fragment>;
      })}
    </>
  );
}
