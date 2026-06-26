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
  /** Public path, e.g. "/projects/media/diagram.png". Omitted for placeholders. */
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

/** A unit of rich section content. Sections built from `blocks` can mix prose,
 *  lists, tables, live Mermaid diagrams, and placeholder media; the legacy
 *  `paragraphs` + single `media` shape still works for simpler case studies.
 *  Text fields accept lightweight inline markup: **bold**, *italic*, `code`. */
export type CaseBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "mermaid"; code: string; caption?: string }
  | { type: "media"; media: CaseMedia };

export interface CaseSection {
  /** Mono kicker, e.g. "CONTEXT". */
  kicker: string;
  heading: string;
  /** Simple prose body. Used when a section has no rich `blocks`. */
  paragraphs?: string[];
  /** Rich, mixed content (prose, lists, tables, diagrams, media). When present,
   *  it replaces `paragraphs` + `media` for this section. */
  blocks?: CaseBlock[];
  /** Optional supporting figure rendered under the prose (legacy shape). */
  media?: CaseMedia;
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
  "ai-interview-simulator": {
    slug: "ai-interview-simulator",
    title: "AI Interview Simulator",
    category: "AI",
    year: "2026",
    role: "Full-Stack & AI Engineer",
    overview:
      "A voice app to practice technical interviews. You give it your CV and a job description, set up the interviewer, and then talk through a real interview with an AI. When you finish, a second AI gives you a clear report on how you did, with examples from your own answers. It runs on your own computer to keep your data private, and you can move it to the cloud by changing a setting — no rewrite needed.",
    seoDescription:
      "AI Interview Simulator — a voice app to practice technical interviews on your own computer. An AI talks with you by voice, using your CV and the job, then gives a clear report with examples. Built with React, FastAPI, LangGraph, Qdrant, and Ollama.",
    stack: "REACT · FASTAPI · LANGGRAPH · QDRANT · OLLAMA",
    tags: ["React", "TanStack Start", "FastAPI", "LangGraph", "Qdrant", "Ollama", "Docker"],
    repoUrl: "https://github.com/Steven-Mendez/ai-interview-simulator",
    metrics: [
      { value: "100%", label: "runs on your computer" },
      { value: "Voice", label: "you speak, it speaks back" },
      { value: "2 AIs", label: "one asks, one scores" },
    ],
    heroMedia: {
      kind: "VIDEO",
      placeholder: true,
      video: true,
      description:
        "A 30–60 second demo of a live voice interview: upload a CV, start, speak a few answers, and see the final report. Keep this at the top — it is the hook.",
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
            text: "Every frustration from that call became a design choice — I wanted mine to be everything that bot was not. It waits until you have truly finished before it replies, and answers one sentence at a time, so a turn feels like a real conversation instead of a fight to be heard.",
          },
        ],
      },
      {
        kicker: "WHAT I BUILT",
        heading: "A voice interviewer, plus an AI that scores you",
        blocks: [
          {
            type: "paragraph",
            text: "You give it your CV and a job description, then talk through a real voice interview. Four parts work together on every turn:",
          },
          {
            type: "list",
            items: [
              "**Listen** — your speech becomes text with Faster-Whisper.",
              "**Lead** — a LangGraph agent asks questions matched to your CV and the job (searched with Qdrant).",
              "**Speak** — its replies are spoken back to you with Piper.",
              "**Score** — when you finish, a second AI writes a report that links each point to something you actually said, not just a number.",
            ],
          },
          {
            type: "media",
            media: {
              kind: "VIDEO",
              placeholder: true,
              video: true,
              description:
                "A short clip of a live voice interview: your speech goes to the AI, and its replies are spoken back. Something the reader can hear.",
            },
          },
        ],
      },
      {
        kicker: "ARCHITECTURE",
        heading: "Local first, and easy to move to the cloud",
        blocks: [
          {
            type: "paragraph",
            text: "FastAPI backend (data in SQLModel + Alembic), React + TanStack Start front end, with the AI models running locally on Ollama. Docker Compose runs the API, database, vector store, and speech services together.",
          },
          {
            type: "paragraph",
            text: "One rule holds it together: **every part talks through a clear interface.** Speech-to-text, text-to-speech, and turn detection are used only through `STTProvider`, `TTSProvider`, and `TurnDetector`, and a setting picks which one. Moving the model, vector store, or database to the cloud is a config change — not a rewrite.",
          },
          {
            type: "mermaid",
            caption:
              "How the parts fit together: the front end, the gateway, the two AIs, the parts you can swap, and storage.",
            code: `flowchart TB
    subgraph client["Frontend — React + TanStack Start"]
        UI["Voice room UI<br/>(microphone capture)"]
        CAP["PCM capture worklet<br/>16 kHz mono Int16"]
    end

    subgraph backend["Backend — async FastAPI"]
        GW["WebSocket Gateway<br/>/sessions/{id}/voice"]
        GRAPH["AI orchestration<br/>LangChain + LangGraph"]
        EVAL["Evaluator agent<br/>evidence-backed report"]
    end

    subgraph contracts["Swappable providers (by contract)"]
        STT["STTProvider<br/>Faster-Whisper / cloud"]
        TTS["TTSProvider<br/>Piper / cloud"]
        TURN["TurnDetector<br/>VAD + silence + semantic"]
        LLM["LLM<br/>Ollama (local) / cloud"]
    end

    subgraph data["Persistence & memory"]
        VEC["Qdrant<br/>vector store (CV + JD)"]
        DB["SQLModel + Alembic<br/>SQLite local / Postgres cloud"]
    end

    OBS["LangSmith<br/>tracing + per-stage latency"]

    UI --> CAP --> GW
    GW <--> GRAPH
    GRAPH --> EVAL
    GRAPH <--> STT
    GRAPH <--> TTS
    GRAPH <--> TURN
    GRAPH <--> LLM
    GRAPH <--> VEC
    GRAPH <--> DB
    GW -.traces.-> OBS
    GRAPH -.traces.-> OBS`,
          },
          { type: "subheading", text: "How a single turn works" },
          {
            type: "mermaid",
            caption:
              "One turn, step by step. Sound streams both ways, so the wait feels short. When the interview ends, the second AI runs.",
            code: `sequenceDiagram
    participant U as You
    participant GW as Gateway (WS)
    participant T as TurnDetector
    participant S as STT (Faster-Whisper)
    participant G as Graph (LangGraph + LLM)
    participant V as TTS (Piper)

    Note over U,V: Setup: CV + job description → ingested into Qdrant
    U->>GW: Audio stream (PCM 16 kHz)
    GW->>T: Audio buffer + partial transcript
    GW->>S: Audio windows
    S-->>GW: Partial transcript (pseudo-streaming)
    T-->>GW: End of turn detected
    GW->>G: Final turn transcript
    G-->>GW: Interviewer reply (sentence by sentence)
    GW->>V: Sentence 1
    V-->>GW: Audio for sentence 1
    GW-->>U: Audio (starts speaking before generation finishes)
    Note over GW,V: Streaming on both legs = low perceived latency
    Note over G: On finish → evaluator generates evidence-backed report`,
          },
        ],
      },
      {
        kicker: "TRADE-OFFS",
        heading: "The hard choices, and what they cost",
        blocks: [
          {
            type: "paragraph",
            text: "**Ollama native, not in Docker.** On Apple Silicon, Docker cannot use the GPU, so Ollama in Docker runs CPU-only and crawls. Running it natively uses the Apple GPU (Metal) and is far faster. *Cost:* no single `docker compose up` — but for real use, the speed is worth it.",
          },
          {
            type: "paragraph",
            text: "**Turn detection: a simple rule, not a big model.** By default the app uses a light rule over the words so far — no heavy model, no restrictive license bundled in. You can opt into a stronger model instead; I documented the trade-off for each:",
          },
          {
            type: "table",
            headers: ["Model", "Input", "Size / placement", "License"],
            rows: [
              ["Pipecat Smart Turn v3", "Audio / waveform", "~8M params, CPU", "BSD-2-Clause — permissive"],
              [
                "LiveKit turn-detector",
                "Text (partial transcript)",
                "~0.1B (Qwen2.5-0.5B), INT8 ONNX, CPU",
                "Code Apache-2.0; weights under restricted LiveKit license",
              ],
              ["TEN Turn Detection", "Text", "8B (Qwen2.5-7B), GPU only", "Apache-2.0 with extra restrictions"],
            ],
          },
          {
            type: "paragraph",
            text: "They take different inputs — some audio, some text — so the `TurnDetector` interface carries **both**. Any of them drops in without touching the rest of the app.",
          },
          {
            type: "paragraph",
            text: "**Voice is an optional extra.** It installs on demand (`uv sync --extra voice`) and loads only when needed, so the text-only version and the tests stay small and fast. *Cost:* voice users run one extra install step.",
          },
        ],
      },
      {
        kicker: "OUTCOME",
        heading: "Private by default, measured, and free to run",
        blocks: [
          {
            type: "paragraph",
            text: "Because the AI runs locally, no data leaves your computer and there is no per-request bill. The same code runs on a laptop or in the cloud, with no change to the app logic.",
          },
          {
            type: "paragraph",
            text: "And I **measure it instead of guessing.** The app times each step — `turn_detection_ms`, `stt_ms`, `graph_ms`, `tts_ms`, plus time-to-first-audio — sends them to LangSmith, and warns me when a step runs slow. On a local GPU the interviewer replies about 1–3 seconds after you stop (≈0.7–1s in the cloud).",
          },
          {
            type: "media",
            media: {
              kind: "REPORT",
              placeholder: true,
              description:
                "The final report: each point links back to a moment in the interview, not just a score. The end result the reader wants to see.",
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
              "**Clear interfaces from the start** let the app run both locally and in the cloud without writing the code twice.",
              "**How fast it *feels* beats the total time.** Speaking back one sentence at a time helped more than any other speed fix.",
              "**Measure before optimizing.** Timing each step in LangSmith showed the real slow point, instead of guessing.",
            ],
          },
        ],
      },
    ],
    gallery: [
      {
        kind: "DASHBOARD",
        placeholder: true,
        description: "The session overview screen.",
      },
      {
        kind: "SCORING",
        placeholder: true,
        description: "The score for each skill.",
      },
      {
        kind: "CODE",
        placeholder: true,
        description: "The pipeline that loads the CV and job into Qdrant.",
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
      "This is the website you are reading right now. I built it to show my work as a full-stack developer. Most of my strongest projects come from freelance jobs, and I cannot show many of them because of NDAs — which is a real shame.",
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
        paragraphs: [
          "I did not want a ready-made theme with stock animations. I wanted my own site to show how I work as a developer: with care for speed, small details, and clean code.",
          "So I treated it like a real product, not a quick demo. Every part has a reason, and every choice — from the layout to the last byte — was made on purpose.",
        ],
      },
      {
        kicker: "THE PROCESS",
        heading: "A clear spec, AI agents, and solid tools",
        paragraphs: [
          "Yes, I write code — that is what I do. But I have changed the way I develop, adapting to the modern era. Today I work with AI agents in a Spec-Driven way: first I write a clear, detailed spec of what I want, then the agents help me turn it into code. I review, test, and guide each step, so the result still matches my taste and standards.",
          "I also use proven tools instead of building everything from zero — like shadcn/ui and Radix for the components and Tailwind for the styles. My job is to pick them well, connect them, and make them feel like one site.",
        ],
      },
      {
        kicker: "HOW IT'S BUILT",
        heading: "The tools behind the site",
        paragraphs: [
          "The site runs on Next.js with React and TypeScript, and Tailwind CSS for the styles. Every page is built ahead of time, so it loads fast and search engines and AI assistants can read it without running any code.",
          "All the text and data live in one file. The same source feeds the whole site, including a résumé page that is ready to print. I change it in one place, and it updates everywhere.",
        ],
      },
      {
        kicker: "THE LOOK",
        heading: "Liquid glass, with my own electric colors",
        paragraphs: [
          "The look is inspired by “Liquid Glass”, the design Apple introduced with the iPhone 17, its newest phone at the time. Many people did not like it — I did. I did not copy it; I took the idea of soft, see-through glass and gave it my own electric colors, the tones I like most, so the site feels alive.",
          "The glass comes from one shared building block that I reuse on every card and panel, with design tokens for the colors and spacing, so everything matches and is easy to change later.",
        ],
      },
      {
        kicker: "QUALITY",
        heading: "Quality is checked, not just promised",
        paragraphs: [
          "I did not just hope the site was fast — I measured it. Every change runs automatic checks before it goes live: code style, types, a full build, and page tests. Lighthouse also checks accessibility and SEO, and the build fails if the score drops below 95.",
          "Then I optimized the details most sites ignore: images are compressed (the hero went from 19 MB to about 446 KB), security headers keep safe defaults, and the page opens almost instantly with no jumpy layout.",
        ],
      },
    ],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
