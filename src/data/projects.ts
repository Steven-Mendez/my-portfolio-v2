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
      en: "Home deliveries for Nicaragua, an internal WERN product. Businesses publish orders, nearby couriers deliver them and the customer follows the order on a map.",
      es: "Entregas a domicilio para Nicaragua, un producto interno de WERN. Los negocios publican pedidos, los repartidores cercanos los entregan y el cliente sigue su pedido en un mapa.",
    },
    built: {
      en: [
        "Rust and Axum API over PostgreSQL with PostGIS, designed to keep working when the courier loses signal.",
        "One SvelteKit app for the web and, through Tauri, for iOS and Android.",
        "Google Cloud declared in Terraform, with Firebase for sign-in, Mapbox for maps and Bunny for photos.",
      ],
      es: [
        "API en Rust y Axum sobre PostgreSQL con PostGIS, pensada para seguir funcionando cuando el repartidor pierde la señal.",
        "Una sola app en SvelteKit para la web y, a través de Tauri, para iOS y Android.",
        "Google Cloud declarado en Terraform, con Firebase para el acceso, Mapbox para los mapas y Bunny para las fotos.",
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
      en: "Practise job interviews by voice. It prepares the interview from your CV and the job offer, talks with you live and grades each answer using what you said.",
      es: "Practica entrevistas de trabajo por voz. Prepara la entrevista con tu CV y la oferta, conversa contigo en vivo y califica cada respuesta con lo que dijiste.",
    },
    built: {
      en: [
        "Three AI agents share the work: one plans, one interviews you by voice and one grades.",
        "React web app and FastAPI API, with the data in PostgreSQL.",
        "An unfinished interview still gets feedback per topic, but no overall score.",
      ],
      es: [
        "Tres agentes de IA se reparten el trabajo: uno planifica, otro te entrevista por voz y otro califica.",
        "App web en React y API en FastAPI, con los datos en PostgreSQL.",
        "Una entrevista incompleta igual recibe comentarios por tema, pero sin nota global.",
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
      en: "This site: a bilingual portfolio designed like an album booklet. It animates as you scroll and stays still when motion is turned off.",
      es: "Este mismo sitio: un portfolio bilingüe diseñado como el libreto de un disco. Se anima al hacer scroll y se queda quieto si el movimiento está desactivado.",
    },
    built: {
      en: [
        "Built with Astro, in English and Spanish.",
        "Every section uses the same type sizes and spacing.",
        "GSAP animations that switch off without JavaScript or with reduced motion.",
      ],
      es: [
        "Hecho con Astro, en inglés y español.",
        "Todas las secciones usan los mismos tamaños de letra y espacios.",
        "Animaciones con GSAP que se apagan sin JavaScript o con movimiento reducido.",
      ],
    },
    stack: ["Astro", "TypeScript", "Tailwind CSS", "GSAP"],
    liveUrl: "https://www.stevenampaiz.com",
  },
]
