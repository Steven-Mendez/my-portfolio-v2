/**
 * Selected personal projects, newest first. Years are the repositories'
 * creation dates on GitHub. Interview Agent's copy comes from
 * `../v2/lib/data.ts` and `../v2/lib/case-studies.ts`.
 */
import type { Localized } from "./localized"

export interface Project {
  /** URL segment of its write-up: `/work/<slug>/` (see `writeups.ts`). */
  slug: string
  title: string
  year: string
  /** One sentence on what it is. */
  summary: Localized<string>
  /** Two or three lines on how it was built. */
  built: Localized<readonly string[]>
  stack: readonly string[]
  repoUrl?: string
  liveUrl?: string
}

export const projects: readonly Project[] = [
  {
    slug: "interview-agent",
    title: "Interview Agent",
    year: "2026",
    summary: {
      en: "Voice interview practice. It plans the interview from your CV and the job description, runs it live and grades every answer with evidence from the transcript.",
      es: "Práctica de entrevistas por voz. Prepara la entrevista a partir del CV y la oferta, la conduce en vivo y califica cada respuesta con evidencia de la transcripción.",
    },
    built: {
      en: [
        "Three LangGraph agents split the work: a planner, an interviewer that talks over LiveKit and an evaluator.",
        "React front end and FastAPI backend, with plans, transcripts and evaluations stored in PostgreSQL.",
        "An unfinished interview still gets feedback on each criterion, but no overall score or verdict.",
      ],
      es: [
        "Tres agentes en LangGraph se reparten el trabajo: un planificador, un entrevistador que habla por LiveKit y un evaluador.",
        "Front end en React y backend en FastAPI, con planes, transcripciones y evaluaciones guardados en PostgreSQL.",
        "Una entrevista incompleta también recibe feedback por criterio, aunque sin nota global ni veredicto.",
      ],
    },
    stack: ["React", "FastAPI", "LangGraph", "LiveKit", "OpenAI", "PostgreSQL"],
    repoUrl: "https://github.com/Steven-Mendez/interview-agent",
    liveUrl: "https://interview-agent-lime-seven.vercel.app",
  },
  {
    // PENDIENTE DE STEVEN: no `repoUrl` until he says the repo is public.
    // No Lighthouse figures until they are measured on v3.
    slug: "portfolio",
    title: "Portfolio",
    year: "2026",
    summary: {
      en: "This site: a static, bilingual portfolio laid out like an album booklet. It moves as you scroll and settles into a still page when motion isn't available.",
      es: "Este mismo sitio: un portfolio estático y bilingüe pensado como el libreto de un disco. Se anima al hacer scroll y, si el movimiento no está disponible, queda como una página quieta.",
    },
    built: {
      en: [
        "Static Astro build with English and Spanish routes and a view transition when you switch languages.",
        "Every section shares one type scale and one vertical rhythm.",
        "GSAP motion as progressive enhancement: with JavaScript off or reduced motion on, nothing moves.",
      ],
      es: [
        "Build estático en Astro con rutas en inglés y español y una view transition al cambiar de idioma.",
        "Todas las secciones comparten una sola escala tipográfica y un mismo ritmo vertical.",
        "Movimiento con GSAP como mejora progresiva: sin JavaScript o con movimiento reducido, nada se mueve.",
      ],
    },
    stack: ["Astro", "TypeScript", "Tailwind CSS", "GSAP"],
    liveUrl: "https://www.stevenampaiz.com",
  },
]
