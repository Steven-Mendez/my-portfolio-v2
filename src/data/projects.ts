/**
 * Selected projects, newest first. Years are the repositories' creation
 * dates on GitHub (Bidali: its first migration). Interview Agent's copy comes from
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
  /** A recorded walkthrough, for work that is not public or not live yet. */
  videoUrl?: string
}

export const projects: readonly Project[] = [
  {
    // Under NDA: no repository link; `videoUrl` is an early build on the
    // iPhone simulator. No `liveUrl` until it is deployed.
    slug: "bidali",
    title: "Bidali",
    year: "2026",
    summary: {
      en: "Last-mile delivery for Nicaragua, an internal WERN product. Businesses publish orders, nearby couriers take them from a pool and run the route, and the customer follows the delivery from the browser with a code and a phone number.",
      es: "Logística de última milla para Nicaragua, un producto interno de WERN. Los negocios publican pedidos, los repartidores cercanos los toman de un pool y recorren la ruta, y el cliente sigue la entrega desde el navegador con un código y su teléfono.",
    },
    built: {
      en: [
        "Rust and Axum API over PostgreSQL with PostGIS: a nine-state order machine, a proximity pool, offline batches and an append-only audit log.",
        "One SvelteKit app for the web and, through Tauri, for iOS and Android, with native plugins for background location and push.",
        "Google Cloud declared in Terraform, with Firebase for sign-in, Mapbox for routes and Bunny for photos and documents.",
      ],
      es: [
        "API en Rust y Axum sobre PostgreSQL con PostGIS: una máquina de nueve estados para el pedido, un pool por cercanía, lotes sin conexión y una bitácora de solo escritura.",
        "Una sola app en SvelteKit para la web y, a través de Tauri, para iOS y Android, con plugins nativos de ubicación en segundo plano y push.",
        "Google Cloud declarado en Terraform, con Firebase para el acceso, Mapbox para las rutas y Bunny para fotos y documentos.",
      ],
    },
    stack: [
      "Rust",
      "Axum",
      "PostGIS",
      "SvelteKit",
      "Tauri",
      "Firebase",
      "Mapbox",
      "Google Cloud",
      "Terraform",
    ],
    videoUrl: "https://youtu.be/Mk-9ScKfzTc",
  },
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
