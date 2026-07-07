// Individual, SEO-indexable project case studies. Each renders at
// /projects/<slug> with its own metadata + JSON-LD. Content here is REAL —
// drawn from the live site and the public repositories — not placeholder copy.

export interface CaseMetric {
  /** Headline value, e.g. "≥95" or "Voice". */
  value: string;
  /** What the value measures. */
  label: string;
}

/** A framed media item — a screenshot, diagram, or demo still. Real assets live
 *  under /public/projects/media. When `placeholder` is set, no image is loaded:
 *  the frame renders an empty styled slot carrying `description`, marking exactly
 *  where to drop a real capture without touching the layout. */
export interface CaseMedia {
  /** Public path, e.g. "/projects/media/diagram.webp". Omitted for placeholders. */
  src?: string;
  /** Mono caption shown beneath the frame. */
  caption?: string;
  /** Short badge label rendered on the frame, e.g. "DIAGRAM", "VIDEO". */
  kind: string;
  /** Renders a play affordance over the frame when true. */
  video?: boolean;
  /** When true, renders an empty "drop media here" slot instead of an image. */
  placeholder?: boolean;
  /** Inside-frame guidance shown for placeholders — what asset belongs here. */
  description?: string;
  /** Tags the slot as nice-to-have rather than required. */
  optional?: boolean;
}

/** A unit of rich section content. A section's body is an ordered list of these
 *  blocks, mixing prose, lists, tables, live Mermaid diagrams, and media. Any
 *  block type is available to every case study, even if only one uses it today.
 *  Text fields accept lightweight inline markup: **bold**, *italic*, `code`,
 *  and [links](url). */
export type CaseBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "mermaid"; code: string; caption?: string }
  | { type: "media"; media: CaseMedia };

export interface CaseSection {
  /** Mono kicker, e.g. "CONTEXT". Optional — omit for an untitled section. */
  kicker?: string;
  /** Section heading. Optional — omit for a stand-alone diagram or quote. */
  heading?: string;
  /** The section body: an ordered, mixed list of content blocks (prose, lists,
   *  tables, diagrams, media). The single, canonical way to author a section. */
  blocks: CaseBlock[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** Short category, e.g. "AI", "Web". */
  category: string;
  year: string;
  role: string;
  /** Hero paragraph — what the project is, in one breath. */
  overview: string;
  /** Meta description for the page (<=160 chars ideal). */
  seoDescription: string;
  /** Mono stack line, e.g. "REACT · FASTAPI · LANGGRAPH". */
  stack: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Real, factual highlights — no invented benchmarks. */
  metrics: CaseMetric[];
  /** Optional lead media (e.g. a hero demo), shown between metrics and story. */
  heroMedia?: CaseMedia;
  sections: CaseSection[];
  /** Optional demo/screenshot gallery rendered after the story. */
  gallery?: CaseMedia[];
}

const caseStudies: Record<string, CaseStudy> = {
  "interview-agent": {
    slug: "interview-agent",
    title: "Interview Agent",
    category: "AI",
    year: "2026",
    role: "Full-Stack & AI Engineer",
    overview:
      "A voice app to practice technical interviews, end to end. Upload your CV and paste the job offer — one AI plans a session tailored to both, a second conducts it with you by voice in the browser, in real time, and when you finish a third rules like a hiring committee: hired or not, a 0–100 score, and strengths and concerns drawn from your own answers. It interviews in English or Spanish, and you choose the interviewer's name, voice, and persona.",
    seoDescription:
      "Interview Agent — practice technical interviews by voice. One AI plans the session from your CV and the job offer, one interviews you in real time over WebRTC, and one scores you with evidence from your own answers.",
    stack: "TANSTACK START · FASTAPI · LANGGRAPH · LIVEKIT · OPENAI",
    tags: [
      "React",
      "TanStack Start",
      "FastAPI",
      "LangGraph",
      "LiveKit",
      "OpenAI",
      "Qdrant",
      "PostgreSQL",
      "Docker",
    ],
    repoUrl: "https://github.com/Steven-Mendez/interview-agent",
    metrics: [
      { value: "3 AIs", label: "one plans, one interviews, one scores" },
      { value: "Real-time", label: "voice over WebRTC — it listens and speaks back" },
      { value: "0–100", label: "hiring score backed by your own answers" },
      { value: "EN · ES", label: "full interviews in English or Spanish" },
    ],
    heroMedia: {
      src: "/projects/media/interview-agent-live.webp",
      kind: "LIVE INTERVIEW",
      caption:
        "A live session: the conversation is transcribed in real time while the interviewer tracks which of the planned topics are already covered.",
    },
    sections: [
      {
        kicker: "CONTEXT",
        heading: "When the interviewer was a bot",
        blocks: [
          {
            type: "paragraph",
            text: "I built this after a job interview where I never spoke to a person. Being interviewed by a bot was deeply frustrating — it was slow to answer, quick to talk over me, and cut my answers short before I could finish. It is the kind of AI-led first interview people joke about online, until it happens to you.",
          },
          {
            type: "quote",
            text: "I had just been interviewed by an AI. So I built a better one to practice with.",
          },
          {
            type: "paragraph",
            text: "Every frustration from that call became a design choice — I wanted mine to be everything that bot was not. It waits until you have truly finished before it replies, and it starts speaking the moment it has something to say, so a turn feels like a real conversation instead of a fight to be heard.",
          },
        ],
      },
      {
        kicker: "WHAT I BUILT",
        heading: "Three AIs, one interview",
        blocks: [
          {
            type: "paragraph",
            text: "You upload your CV as a PDF and paste the job offer. From there, three agents hand the work to each other:",
          },
          {
            type: "list",
            items: [
              "**Plan** — a planner reads your CV and the offer, then designs the session: who the interviewer is, what the interview should probe, and 4–6 ordered milestones it must cover.",
              "**Interview** — a real-time voice agent conducts it in your browser. It transcribes as you speak, asks follow-ups grounded in your CV — which it can search mid-conversation — and checks milestones off as you cover them.",
              "**Score** — when it ends, an evaluator reads the full transcript against the plan and rules like a hiring committee: hired or not, a 0–100 score, and strengths and concerns, each backed by something you actually said.",
            ],
          },
        ],
      },
      {
        kicker: "ARCHITECTURE",
        heading: "A voice worker and an API around one database",
        blocks: [
          {
            type: "paragraph",
            text: "The app is two processes sharing one PostgreSQL database. A **FastAPI** backend serves the REST API and the compiled **TanStack Start** SPA; a separate **voice worker**, built on LiveKit Agents, joins each interview room over **WebRTC**. When you upload a CV, the backend converts the PDF to markdown, embeds it with OpenAI's `text-embedding-3-small`, and indexes it in **Qdrant**; the planner then writes the interview plan and its milestones to Postgres, and the browser connects to the room where the interviewer is waiting.",
          },
          {
            type: "paragraph",
            text: "Inside a turn: **Silero VAD** plus a **turn-detection model** decide that you have actually finished speaking — the one thing the bot that interviewed me got wrong — then **AssemblyAI** transcribes the turn, a **LangGraph** agent running on OpenAI models decides what to say, and **Cartesia** speaks it back, streaming, so the reply starts before it is fully written. The agent carries three tools: search your CV in Qdrant, mark a milestone complete, and end the interview.",
          },
          {
            type: "mermaid",
            caption:
              "How the parts fit together: the browser, the WebRTC room, the voice worker's pipeline, the planner and evaluator behind the API, and storage.",
            code: `flowchart TB
    subgraph client["Frontend — TanStack Start SPA"]
        UI["Interview room UI<br/>livekit-client"]
    end

    subgraph rtc["LiveKit — WebRTC"]
        ROOM["Room per interview<br/>audio both ways + live transcript"]
    end

    subgraph worker["Voice worker — LiveKit Agents"]
        VAD["Silero VAD<br/>+ turn detector"]
        STT["STT<br/>AssemblyAI streaming"]
        GRAPH["Interviewer agent<br/>LangGraph + OpenAI"]
        TTS["TTS<br/>Cartesia / Inworld"]
    end

    subgraph api["Backend — FastAPI under /api"]
        PLANNER["Planner<br/>designs persona + milestones"]
        EVAL["Evaluator<br/>hired · score · evidence"]
    end

    subgraph data["Storage"]
        VEC["Qdrant<br/>CV chunks, deleted after scoring"]
        DB["PostgreSQL<br/>plan · transcript · evaluation"]
    end

    UI <--> ROOM
    ROOM <--> VAD
    VAD --> STT --> GRAPH --> TTS --> ROOM
    UI -->|REST /api| PLANNER
    PLANNER --> VEC
    PLANNER --> DB
    GRAPH <--> VEC
    GRAPH --> DB
    GRAPH -->|on close| EVAL
    EVAL --> DB`,
          },
          { type: "subheading", text: "How a single turn works" },
          {
            type: "mermaid",
            caption:
              "One turn, step by step. The reply streams to speech as it is written, so the wait feels short. When the interview ends, the evaluator runs on its own.",
            code: `sequenceDiagram
    participant U as You (browser)
    participant R as LiveKit room (WebRTC)
    participant W as Voice worker
    participant G as Interviewer agent (LangGraph)
    participant Q as Qdrant

    Note over U,Q: Setup: CV + job offer → plan with 4–6 milestones
    U->>R: Mic audio
    R->>W: Audio stream
    W->>W: Silero VAD + turn detector: you finished
    W->>W: AssemblyAI STT → final transcript
    W->>G: Your turn + milestone status
    G->>Q: search_resume (when it needs your CV)
    Q-->>G: Relevant CV chunks
    G-->>W: Reply, streamed as it is written
    W-->>R: Cartesia TTS audio
    R-->>U: The interviewer speaks
    Note over G: Tools: complete_milestone · end_interview
    Note over W: On close → evaluator scores the transcript`,
          },
        ],
      },
      {
        kicker: "TRADE-OFFS",
        heading: "The hard choices, and what they cost",
        blocks: [
          {
            type: "paragraph",
            text: "**I stopped hand-rolling the voice plumbing.** An early version tried to own the whole audio path — capture, silence rules, my own turn heuristics. It taught me a lot, and it was never going to feel human. Now WebRTC and LiveKit Agents handle echo, interruptions, and reconnection, and end-of-turn is decided by a purpose-built turn-detection model on top of Silero VAD — the exact part the bot that interviewed me got wrong. *Cost:* a hosted dependency I do not control. *Gain:* every hour not spent on audio plumbing went into the interview itself.",
          },
          {
            type: "paragraph",
            text: "**Two model tiers, on purpose.** The interviewer sits in the latency path, so it runs on a small, fast OpenAI model with reasoning turned off — a shorter wait before it starts talking. The planner and the evaluator have no one waiting on them, so they run on a stronger model with reasoning effort set high. The interviewer can afford to be quick rather than brilliant *because* the planner already did the thinking: the persona, the focus areas, and the milestones are decided before the call starts.",
          },
          {
            type: "paragraph",
            text: "**The \"LLM\" is actually a graph.** LiveKit expects a language model in its pipeline; I hand it a LangGraph agent disguised as one. Only text the graph explicitly streams is spoken — tool calls and their results never reach the voice, and a filter drops accidental JSON before it can be read aloud. The graph keeps no memory of its own: each turn, the milestone status is re-injected as context, because the voice framework rebuilds the conversation from the transcript. *Cost:* a stricter contract to respect. *Gain:* the interviewer can use tools mid-sentence without ever mumbling raw JSON at you.",
          },
        ],
      },
      {
        kicker: "OUTCOME",
        heading: "A verdict with evidence, not a vibe",
        blocks: [
          {
            type: "paragraph",
            text: "Every session ends the way a real hiring loop does: with a decision. The evaluator reads the whole transcript against the plan and returns hired-or-not, a 0–100 score on an anchored rubric, and strengths and concerns that each point back to something you said — or failed to say. It is deliberately strict: milestones you never reached count against you, and leaving early is treated as missing evidence, not a pass.",
          },
          {
            type: "paragraph",
            text: "It also cleans up after itself. The interview has hard limits — a session cap with a spoken warning near the end, an idle timeout, and detection of a closed tab — and whichever way it ends, the evaluation runs on its own. The moment scoring completes, your CV's chunks are **deleted from the vector store**, so the most personal document in the system does not outlive its one job.",
          },
          {
            type: "paragraph",
            text: "This is the part I cared about most. The bot ignored what I said. This one is built around it. The report quotes you back to yourself — every point ties to a moment in your own interview — so you walk away feeling heard, not graded by a stranger. You can freeze, ramble, and start over with no one watching. That was the goal: do the awkward reps here, in private, so the real interview is not the first time you have had the conversation.",
          },
          {
            type: "paragraph",
            text: "I have not taken it into a real interview yet — but I built it for exactly that moment, and I trust it to get me there ready.",
          },
          {
            type: "media",
            media: {
              src: "/projects/media/interview-agent-report.webp",
              kind: "REPORT",
              caption:
                "The final report of a session I abandoned early — on purpose. 8/100, not hired, and every concern points at what was actually missing. It is strict because the real thing is.",
            },
          },
        ],
      },
      {
        kicker: "WHAT I LEARNED",
        heading: "Three things I learned",
        blocks: [
          {
            type: "list",
            items: [
              "**Don't rebuild solved problems.** My hand-rolled audio pipeline taught me why WebRTC, VAD, and turn detection are their own discipline — and that my time was better spent on the agents than on the plumbing.",
              "**How fast it feels beats how smart it is.** Turning reasoning off on the interviewer and streaming its reply into speech did more for the conversation than any smarter model would have.",
              "**Structured outputs turn LLM calls into functions.** The planner and evaluator return validated schemas with retries, which is what lets both run unattended — no human checks the output before it ships to the screen.",
            ],
          },
        ],
      },
    ],
    gallery: [
      {
        src: "/projects/media/interview-agent-new-interview.webp",
        kind: "NEW INTERVIEW",
        caption: "Where every session starts: a resume and a job offer.",
      },
      {
        src: "/projects/media/interview-agent-lobby.webp",
        kind: "LOBBY",
        caption:
          "The room before the call: one click, microphone access, and the interviewer greets you first.",
      },
    ],
  },

  "portfolio": {
    slug: "portfolio",
    title: "This Portfolio",
    category: "Web",
    year: "2026",
    role: "Designer & Engineer",
    overview:
      "This is the website you are reading right now. Most of my strongest work is freelance and locked behind NDAs, so I cannot show it. That left one honest option: make the site itself the proof of how I build.",
    seoDescription:
      "The site you are on now — a fast, fully static Next.js portfolio with a glass design system and accessibility & SEO checked in CI on every change.",
    stack: "NEXT.JS · REACT · TYPESCRIPT · TAILWIND",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/Steven-Mendez/my-portfolio-v2",
    metrics: [
      { value: "≥95", label: "accessibility & SEO score (checked in CI)" },
      { value: "0", label: "layout shift while the page loads" },
      { value: "100%", label: "static — every page built ahead of time" },
      { value: "~98%", label: "smaller hero image (19 MB → 446 KB)" },
    ],
    sections: [
      {
        kicker: "THE IDEA",
        heading: "A site that works like the things I build",
        blocks: [
          {
            type: "paragraph",
            text: "The easy path was a template. Grab a theme, drop in my projects, ship a demo over a weekend — that is what most portfolios are. But a site that *says* I care about quality, built on someone else's quick demo, proves nothing. So I gave myself a harder rule: the site has to **be** the proof, not just claim it.",
          },
          {
            type: "quote",
            text: "I treated my own portfolio like a real product, not a quick demo.",
          },
          {
            type: "paragraph",
            text: "I held it to the same bar I hold client work to: real care for **speed**, **small details**, and **clean code**. Every choice — *from the layout to the last byte* — had to earn its place.",
          },
        ],
      },
      {
        kicker: "THE PROCESS",
        heading: "Taste is the part you cannot outsource",
        blocks: [
          {
            type: "paragraph",
            text: "Agents write code now, and good libraries hand me components for free. Neither of them knows what *good* looks like, or when a thing is ready to ship. That judgment is mine — and it is the part of this job that matters most.",
          },
          {
            type: "paragraph",
            text: "So I treat AI like a fast, tireless team, and I stay the one in charge. I work **Spec-Driven**, in three steps:",
          },
          {
            type: "list",
            items: [
              "**I set the standard** — I write a clear, exact spec of what *good* means here, down to the detail.",
              "**Agents build to it** — they turn that spec into code, fast.",
              "**I hold the line** — I review, test, and push back until the result meets my taste, not only the spec.",
            ],
          },
          {
            type: "paragraph",
            text: "I lean on proven parts instead of reinventing them — [shadcn/ui](https://ui.shadcn.com) and [Radix](https://www.radix-ui.com) for components, [Tailwind](https://tailwindcss.com) for styling. Choosing the right ones, wiring them together, and making them feel like *one* site is the real skill. The pieces are off the shelf; the judgment is not.",
          },
        ],
      },
      {
        kicker: "HOW IT'S BUILT",
        heading: "The tools behind the site",
        blocks: [
          {
            type: "paragraph",
            text: "The site runs on [Next.js](https://nextjs.org) with [React](https://react.dev) and [TypeScript](https://www.typescriptlang.org), and **Tailwind CSS** for the styles. Every page is built ahead of time, so it loads fast and search engines and AI assistants can read it without running any code.",
          },
          {
            type: "table",
            headers: ["Tool", "Role"],
            rows: [
              ["Next.js", "App framework, static-first rendering"],
              ["React + TypeScript", "UI, with types end to end"],
              ["Tailwind CSS", "Styling from design tokens"],
              ["shadcn/ui + Radix", "Accessible component primitives"],
            ],
          },
          { type: "subheading", text: "One source of truth" },
          {
            type: "paragraph",
            text: "All the text and data live in **one file** — `lib/data.ts`. The same source feeds the whole site, including a résumé page that is ready to print. I change it in one place, and it updates everywhere.",
          },
        ],
      },
      {
        kicker: "THE LOOK",
        heading: "Liquid glass, with my own electric colors",
        blocks: [
          {
            type: "paragraph",
            text: "The look is inspired by *Liquid Glass*, the design Apple introduced with the iPhone 17, its newest phone at the time. Many people did not like it — I did. I did not copy it; I took the idea of soft, see-through glass and gave it my own **electric colors**, the tones I like most, so the site feels alive.",
          },
          {
            type: "paragraph",
            text: "The glass comes from **one shared building block** that I reuse on every card and panel, with `design tokens` for the colors and spacing, so everything matches and is easy to change later.",
          },
        ],
      },
      {
        kicker: "QUALITY",
        heading: "Quality is checked, not just promised",
        blocks: [
          {
            type: "paragraph",
            text: "A standard only means something if something enforces it. So I did not just hope the site was fast — I **measured** it. Every change runs automatic checks before it goes live:",
          },
          {
            type: "list",
            items: [
              "**Lint & format** — a consistent code style on every commit.",
              "**Types** — a full `tsc` type-check, no `any` slipping through.",
              "**Build & tests** — a production build plus the page test suite.",
              "**Lighthouse** — accessibility and SEO, and the build *fails* if the score drops below **95**.",
            ],
          },
          {
            type: "paragraph",
            text: "Then I optimized the details most sites ignore: images are compressed (the hero went from **19 MB** to about **446 KB**), security headers keep safe defaults, and the page opens almost instantly with *no jumpy layout*.",
          },
        ],
      },
      {
        kicker: "WHAT I LEARNED",
        heading: "What it cost, and what surprised me",
        blocks: [
          {
            type: "list",
            items: [
              "**It cost real time.** A template ships in a weekend; this did not. For a personal site with no client waiting, I had to keep asking whether the extra polish was worth it. I believe it was — but it is a fair question.",
              "**The agents were never the bottleneck — my judgment was.** They built fast. The slow part was deciding what *good* meant, then reviewing and pushing back until it was right. The work moved from typing to taste, which is exactly where I want it.",
              "**Knowing when to stop was the hardest part.** A site about caring for quality can quietly turn into polishing forever. Shipping meant deciding that *good enough* really was good enough — and letting go.",
            ],
          },
          {
            type: "paragraph",
            text: "And it did the job I built it for. Clients on Upwork reached out — and what they singled out was the quality, the care in the details. The site was the proof, so I did not have to claim it.",
          },
        ],
      },
    ],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
