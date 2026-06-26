"use client";

import { useEffect, useState } from "react";

import { portfolioData } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Token = { text: string; className: string };
type Line = Token[];

// JSON syntax-highlight palette, tuned for the very dark navy terminal bg.
const C = {
  prompt: "text-eyebrow", // shell prompt ($ ...)
  output: "text-emerald-400", // command output (→ ...)
  brace: "text-fg-secondary", // { } structural braces
  punct: "text-fg-faint", // : , [ ] and indentation
  key: "text-sky-300", // "property"
  str: "text-emerald-300", // "string value"
};

// `  "key": "value"[,]`
const kvString = (key: string, value: string, comma = true): Line => [
  { text: "  ", className: C.punct },
  { text: `"${key}"`, className: C.key },
  { text: ": ", className: C.punct },
  { text: `"${value}"`, className: C.str },
  ...(comma ? [{ text: ",", className: C.punct }] : []),
];

// `  "key": ["a", "b", "c"][,]`
const kvArray = (key: string, values: string[], comma = true): Line => {
  const tokens: Line = [
    { text: "  ", className: C.punct },
    { text: `"${key}"`, className: C.key },
    { text: ": ", className: C.punct },
    { text: "[", className: C.punct },
  ];
  values.forEach((v, i) => {
    tokens.push({ text: `"${v}"`, className: C.str });
    if (i < values.length - 1) tokens.push({ text: ", ", className: C.punct });
  });
  tokens.push({ text: "]", className: C.punct });
  if (comma) tokens.push({ text: ",", className: C.punct });
  return tokens;
};

// A "live" whoami that sells the Full Stack positioning. Built from the same
// single source of truth as the rest of the site.
const SCRIPT: Line[] = (() => {
  const { profile } = portfolioData;
  // Curated to span the full stack: capability focus, languages (incl. the C#
  // / .NET roots), and front → back → DB → cloud tooling. "select projects"
  // signals selectivity over availability.
  const focus = ["full-stack web apps", "real-time systems", "AI/LLM features"];
  const languages = ["TypeScript", "Python", "C#"];
  const stack = ["React/Next.js", "FastAPI/Django", "PostgreSQL", "AWS"];
  return [
    [{ text: "$ whoami", className: C.prompt }],
    [{ text: "→ steven_mendez", className: C.output }],
    [{ text: "$ cat profile.json", className: C.prompt }],
    [{ text: "{", className: C.brace }],
    kvString("name", profile.fullName),
    kvString("role", profile.role),
    kvString("based_in", `${profile.location} · ${profile.timezone}`),
    kvArray("focus", focus),
    kvArray("languages", languages),
    kvArray("stack", stack, false),
    [{ text: "}", className: C.brace }],
  ];
})();

const lineLength = (line: Line) => line.reduce((sum, t) => sum + t.text.length, 0);
const TOTAL = SCRIPT.reduce((sum, line) => sum + lineLength(line), 0);

export default function HeroTerminal() {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Single monotonic counter = total characters revealed so far. Driving the
  // whole transcript off one number keeps it Strict-Mode-safe (a double-invoked
  // effect just advances the same counter rather than racing per-line state).
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= TOTAL) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 22);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  const revealed = prefersReducedMotion ? TOTAL : count;
  const typing = revealed < TOTAL;

  // Distribute the revealed characters across lines, then across the tokens
  // within each line, in order — so the reveal cuts through colored tokens.
  let remaining = revealed;
  const display = SCRIPT.map((line) => {
    let lineRemaining = remaining;
    const parts = line.map((token) => {
      const shown = Math.max(0, Math.min(lineRemaining, token.text.length));
      lineRemaining -= token.text.length;
      return token.text.slice(0, shown);
    });
    remaining -= lineLength(line);
    return parts;
  });

  return (
    // Decorative: every fact here is also in the heading / about, so hide it
    // from assistive tech rather than narrate a half-typed transcript.
    <div
      aria-hidden
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c16]/80 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-fg-faint">
          steven@portfolio — ~/whoami
        </span>
      </div>
      <div className="min-h-[300px] px-5 py-5 font-mono text-[13px] leading-[1.85] sm:text-[13.5px]">
        {SCRIPT.map((line, i) => {
          const parts = display[i];
          if (!parts.some((p) => p.length > 0)) return null;
          return (
            <div key={i} className="break-words whitespace-pre-wrap">
              {line.map((token, j) =>
                parts[j] ? (
                  <span key={j} className={token.className}>
                    {parts[j]}
                  </span>
                ) : null
              )}
            </div>
          );
        })}
        {typing ? (
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-eyebrow" />
        ) : null}
      </div>
    </div>
  );
}
