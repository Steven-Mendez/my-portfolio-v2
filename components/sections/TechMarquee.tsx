// A full-bleed, slowly scrolling tech strip between the hero and experience —
// mirrors the design reference's marquee. Purely decorative (every item also
// appears in the About "core stack"), so it's hidden from assistive tech.

// Truthful subset — every entry also lives in `skills.categories`/`coreStack`.
const MARQUEE_ITEMS = [
  "Python",
  "FastAPI",
  "Django",
  "React",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Docker",
  "LLM / RAG",
  "LangChain",
  "pgvector",
  "Socket.IO",
] as const;

// Render the list twice so the -50% translate loops seamlessly. Built once at
// module scope — it depends only on MARQUEE_ITEMS, never on render-time state.
const MARQUEE_LOOP = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function TechMarquee() {
  return (
    <div
      aria-hidden
      className="relative z-10 overflow-hidden border-y border-[rgba(150,172,255,0.12)] bg-[rgba(14,18,42,0.5)] py-4 backdrop-blur-md"
    >
      <div className="marquee-track flex w-max gap-[52px] whitespace-nowrap font-mono text-sm tracking-[0.12em] text-fg-faint">
        {MARQUEE_LOOP.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-[52px]">
            {item}
            <span className="text-accent-blue/40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
