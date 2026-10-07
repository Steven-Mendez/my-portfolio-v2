// Individual, SEO-indexable project case studies. Each renders at
// /projects/<slug> with its own metadata + JSON-LD. Content here is REAL —
// drawn from the live site and the public repositories — not placeholder copy.

export interface CaseMetric {
  /** Headline value, e.g. "≥95" or "Voice". */
  value: string
  /** What the value measures. */
  label: string
}

/** A framed media item — a screenshot, diagram, or demo still. Real assets live
 *  under /public/projects/media. When `placeholder` is set, no image is loaded:
 *  the frame renders an empty styled slot carrying `description`, marking exactly
 *  where to drop a real capture without touching the layout. */
export interface CaseMedia {
  /** Public path, e.g. "/projects/media/diagram.webp". Omitted for placeholders. */
  src?: string
  /** Mono caption shown beneath the frame. */
  caption?: string
  /** Short badge label rendered on the frame, e.g. "DIAGRAM", "VIDEO". */
  kind: string
  /** Renders a play affordance over the frame when true. */
  video?: boolean
  /** When true, renders an empty "drop media here" slot instead of an image. */
  placeholder?: boolean
  /** Inside-frame guidance shown for placeholders — what asset belongs here. */
  description?: string
  /** Tags the slot as nice-to-have rather than required. */
  optional?: boolean
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
  | { type: "media"; media: CaseMedia }

export interface CaseSection {
  /** Mono kicker, e.g. "CONTEXT". Optional — omit for an untitled section. */
  kicker?: string
  /** Section heading. Optional — omit for a stand-alone diagram or quote. */
  heading?: string
  /** The section body: an ordered, mixed list of content blocks (prose, lists,
   *  tables, diagrams, media). The single, canonical way to author a section. */
  blocks: CaseBlock[]
}

export interface CaseStudy {
  slug: string
  title: string
  /** Short category, e.g. "AI", "Web". */
  category: string
  year: string
  role: string
  /** Hero paragraph — what the project is, in one breath. */
  overview: string
  /** Meta description for the page (<=160 chars ideal). */
  seoDescription: string
  /** Mono stack line, e.g. "REACT · FASTAPI · LANGGRAPH". */
  stack: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  /** Real, factual highlights — no invented benchmarks. */
  metrics: CaseMetric[]
  /** Optional lead media (e.g. a hero demo), shown between metrics and story. */
  heroMedia?: CaseMedia
  sections: CaseSection[]
  /** Optional demo/screenshot gallery rendered after the story. */
  gallery?: CaseMedia[]
}

const caseStudies: Record<string, CaseStudy> = {
  "interview-agent": {
    slug: "interview-agent",
    title: "Interview Agent",
    category: "AI",
    year: "2026",
    role: "Full-Stack & AI Engineer",
    overview:
      "A voice application for technical interview practice. A planner prepares the session from your CV and job description, an interviewer conducts it in the browser, and an evaluator assesses your answers against the plan. Feedback ties each criterion to transcript evidence; partial sessions show what was covered without a global score or verdict. Interviews support English and Spanish, with configurable voices and interviewer personas.",
    seoDescription:
      "Interview Agent: a three-agent voice interview application using React, FastAPI, LiveKit, LangGraph and PostgreSQL, with transcript-based assessments and recoverable interview sessions.",
    stack: "TANSTACK START · FASTAPI · LANGGRAPH · LIVEKIT · OPENAI",
    tags: [
      "React",
      "TanStack Start",
      "FastAPI",
      "LangGraph",
      "LiveKit",
      "OpenAI",
      "PostgreSQL",
      "Docker",
    ],
    repoUrl: "https://github.com/Steven-Mendez/interview-agent",
    metrics: [
      { value: "3 agents", label: "planning, voice interview, evaluation" },
      {
        value: "Real-time",
        label: "voice over WebRTC — it listens and speaks back",
      },
      {
        value: "Evidence",
        label: "feedback grounded in the interview transcript",
      },
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
        heading: "Three agents, one interview",
        blocks: [
          {
            type: "paragraph",
            text: "You upload your CV as a PDF and paste the job offer. From there, three agents hand the work to each other:",
          },
          {
            type: "list",
            items: [
              "**Plan** — the planner reads the CV and job description, then prepares an interviewer persona and milestones in the selected language.",
              "**Interview** — a voice agent uses LiveKit to conduct the session in the browser, with the complete CV, job description and plan available as context.",
              "**Evaluate** — after the session closes and its transcript is sealed, the evaluator reviews criterion-level evidence. Partial or insufficient interviews receive feedback without a global score or hiring verdict.",
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
            text: "The application combines a **React/TanStack Start** frontend, a **FastAPI** API and a **LiveKit Agents** voice worker. **PostgreSQL** holds the extracted CV text, interview plans, milestones, transcripts and assessments. The planner, interviewer and evaluator receive the CV and job description directly as text context. The browser joins the interview room over **WebRTC**.",
          },
          {
            type: "paragraph",
            text: "**LiveKit Agents** handles speech recognition, synthesis and turn detection. **LangGraph** coordinates interview decisions using OpenAI models, and validated decisions are persisted before a question is delivered. Confirmed answers retain their text versions and provenance, so corrections and uncertain recordings remain distinguishable. Evaluation uses a sealed transcript rather than an unfinished stream of live captions.",
          },
          {
            type: "mermaid",
            caption:
              "How the parts fit together: the browser, the WebRTC room, the voice worker's pipeline, the planner and evaluator behind the API, and storage.",
            code: `flowchart TB
    subgraph client["Frontend — React / TanStack Start"]
        UI["Interview UI"]
    end
    subgraph rtc["LiveKit — WebRTC"]
        ROOM["Audio room"]
    end
    subgraph worker["Voice worker"]
        VOICE["LiveKit Agents<br/>recognition, synthesis, turn detection"]
        GRAPH["Interviewer<br/>LangGraph + OpenAI"]
    end
    subgraph backend["FastAPI"]
        API["Interview lifecycle API"]
        PLANNER["Planner<br/>persona and milestones"]
        EVAL["Evaluator<br/>criterion evidence and feedback"]
    end
    DB["PostgreSQL<br/>CV text, plans, transcripts, assessments"]
    UI <--> ROOM
    ROOM <--> VOICE
    VOICE <--> GRAPH
    UI --> API
    API <--> DB
    API --> PLANNER
    PLANNER --> API
    API --> GRAPH
    VOICE -->|session closure and transcript| API
    API --> EVAL
    EVAL --> API`,
          },
          { type: "subheading", text: "How a single turn works" },
          {
            type: "mermaid",
            caption:
              "Conceptual turn flow: confirmed answers and validated decisions are persisted before question delivery. Assessment follows session closure and transcript sealing.",
            code: `sequenceDiagram
    participant U as Candidate (browser)
    participant R as LiveKit room
    participant W as Voice worker
    participant G as Interviewer (LangGraph)
    participant S as Persisted interview state
    Note over U,S: Setup: full CV and job description in context, with an interview plan
    U->>R: Spoken answer
    R->>W: Audio stream
    W->>W: Turn detection and transcription
    W->>S: Confirmed answer and text version
    W->>G: Confirmed turn and milestone state
    G->>S: Validated interview decision
    G-->>W: Next question
    W-->>R: Synthesized speech
    R-->>U: Interviewer audio
    Note over W,S: Close session, seal transcript, request evaluation`,
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
            text: "**Keep a session’s configuration stable.** Each interview stores its language, voice, models, level and limits. Reconnecting preserves the original start time and consumed budget. A repeat interview gets a fresh plan while retaining the source CV and job description, and remains linked to the original run. That makes the session history useful for comparing practice attempts.",
          },
          {
            type: "paragraph",
            text: "**Treat interview decisions as persisted state.** LangGraph decisions are validated and committed before question delivery. An uncertain or interrupted question is not automatically repeated; an explicit replay can use the saved question without creating a new model decision. Transcript corrections and assessment attempts retain their earlier versions, so recovery does not silently overwrite the session’s history.",
          },
        ],
      },
      {
        kicker: "OUTCOME",
        heading: "Feedback you can trace to your answers",
        blocks: [
          {
            type: "paragraph",
            text: "The report distinguishes topic coverage from demonstrated ability. It links each assessed criterion to transcript evidence and suggests what to practice. An incomplete recording or an abandoned session remains visibly incomplete: missing audio is not treated as a wrong answer, and partial or insufficient interviews do not receive a global score or verdict.",
          },
          {
            type: "paragraph",
            text: "Plans, transcripts and evaluation attempts are persisted in PostgreSQL. The History view groups repeat interviews and retains earlier feedback when a new assessment is requested. Recoverable requests preserve their identities and previous results, rather than replacing an earlier assessment after an uncertain response.",
          },
          {
            type: "paragraph",
            text: "This is the part I cared about most. The report gives me specific answers to review and topics to practice again. I can pause, revisit feedback and repeat the same role with a fresh interview plan. The goal is to practice the difficult conversations before facing them in a real hiring process.",
          },
          {
            type: "paragraph",
            text: "I built it to make practice useful before a real interview: a session I can review, repeat and learn from.",
          },
          {
            type: "media",
            media: {
              src: "/projects/media/interview-agent-report.webp",
              kind: "REPORT",
              caption:
                "Historical report from an earlier scoring flow. The current application shows criterion feedback for partial interviews without a global score or verdict.",
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

  portfolio: {
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
}

export const caseStudySlugs = Object.keys(caseStudies)

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug]
}
