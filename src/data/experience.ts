/**
 * Work history, newest first. Facts taken from Steven's LinkedIn
 * (linkedin.com/in/steven-mendez-dev, read 2026-10-24), his CV and the v2
 * data he confirmed on 2026-10-07. Quantities are self-reported. Plain
 * statements only: no closing flourishes.
 *
 * Figures: wrap a figure in `**` to set it in ink (see `emphasis()` in
 * `@/i18n/utils`). At most one `**` per bullet, and only for results, never
 * for counts of things.
 *
 * Order: the current role first, then by end date, latest first. A client
 * project done through an agency gets its own entry when it stands on its
 * own (Dupely); its `terms` line names the agency ("Contract via WERN").
 */
import type { Localized } from "./localized"

export interface ExperienceEntry {
  /** Short label for cross-references ("used at" in Stack). */
  short: string
  company: Localized<string>
  companyUrl?: string
  role: Localized<string>
  /** Contract and place, from the CV. */
  terms: Localized<string>
  /** "YYYY-MM". */
  start: string
  /** "YYYY-MM"; omitted while the role is current. */
  end?: string
  /** One sentence on what the place is and what the role was. */
  summary: Localized<string>
  bullets: Localized<readonly string[]>
  stack: readonly string[]
}

// PENDIENTE DE STEVEN: each `terms` line comes from the CV; he validates it.
export const experience: readonly ExperienceEntry[] = [
  {
    short: "WERN",
    company: { en: "WERN", es: "WERN" },
    companyUrl: "https://www.upwork.com/agencies/wern/",
    role: { en: "Full Stack Engineer", es: "Ingeniero Full Stack" },
    terms: { en: "Contract · Remote", es: "Contrato · Remoto" },
    start: "2025-01",
    summary: {
      en: "Build front ends, backends, cloud infrastructure and generative AI features for the clients of WERN, a development agency.",
      es: "Construyo front ends, backends, infraestructura en la nube y funcionalidades de IA generativa para los clientes de WERN, una agencia de desarrollo.",
    },
    bullets: {
      en: [
        "Build Python services and REST APIs with FastAPI, Django and Flask across 3 to 5 client codebases.",
        "Build the React and Angular front ends that sit on top of those services.",
        "Deploy to AWS (Lambda, ECS, S3, RDS, SQS) and define the infrastructure with Docker, Terraform and CI.",
        "Add LLM and RAG features to client products, with vector search on pgvector and Qdrant.",
      ],
      es: [
        "Desarrollo servicios en Python y APIs REST con FastAPI, Django y Flask en 3 a 5 bases de código de clientes.",
        "Construyo las interfaces en React y Angular que consumen esos servicios.",
        "Despliego en AWS (Lambda, ECS, S3, RDS, SQS) y defino la infraestructura con Docker, Terraform y CI.",
        "Integro funcionalidades con LLMs y RAG en productos de clientes, con búsqueda vectorial en pgvector y Qdrant.",
      ],
    },
    stack: [
      "Python",
      "FastAPI",
      "Django",
      "Flask",
      "React",
      "Angular",
      "AWS",
      "Docker",
      "Terraform",
      "RAG",
      "pgvector",
      "Qdrant",
    ],
  },
  {
    short: "Dupely",
    company: { en: "Dupely", es: "Dupely" },
    companyUrl: "https://dupely.io",
    role: { en: "Back End Developer", es: "Desarrollador Backend" },
    terms: {
      en: "Contract via WERN · Remote",
      es: "Contrato a través de WERN · Remoto",
    },
    start: "2025-12",
    end: "2026-04",
    summary: {
      en: "Built the backend behind the beta of Dupely, a startup whose shopping assistant (browser extension and mobile app) flags price inflation.",
      es: "Construí el backend de la beta de Dupely, una startup cuyo asistente de compras (extensión de navegador y app móvil) detecta la inflación de precios.",
    },
    bullets: {
      en: [
        "Built the FastAPI services that serve product and price data to the extension and the app in real time.",
        "Built the product, price-history and attribute ingestion pipelines for Amazon, Walmart and eBay: official APIs where available, in-house scraping and providers such as Bright Data and Oxylabs elsewhere.",
        "Contributed to the PostgreSQL schema, migrations and query tuning, and proposed a Redis cache-aside design for product data.",
      ],
      es: [
        "Construí los servicios FastAPI que entregan productos y precios en tiempo real a la extensión y a la app.",
        "Construí los pipelines de ingesta de productos, historial de precios y atributos de Amazon, Walmart y eBay: APIs oficiales cuando existían y, si no, scraping propio y proveedores como Bright Data y Oxylabs.",
        "Colaboré en el esquema PostgreSQL, las migraciones y el ajuste de consultas, y propuse un diseño de caché en Redis (cache-aside) para los datos de producto.",
      ],
    },
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "AWS", "ETL"],
  },
  {
    short: "EdTech",
    company: { en: "US EdTech company", es: "Empresa EdTech de EE. UU." },
    role: {
      en: "Full Stack & AI Engineer",
      es: "Ingeniero Full Stack e IA",
    },
    terms: {
      en: "Direct contract · Remote",
      es: "Contrato directo · Remoto",
    },
    start: "2025-03",
    end: "2025-12",
    summary: {
      en: "Worked directly with a US EdTech company, alongside WERN, on its LLM evaluation and AI features. The name is under NDA.",
      es: "Trabajé por contrato directo con una EdTech de EE. UU., en paralelo a WERN, en la evaluación de LLMs y funcionalidades de IA. El nombre está bajo NDA.",
    },
    bullets: {
      en: [
        "Built an LLM benchmark and evaluation harness that runs models through 20 to 50 computer-use tasks and scores their output.",
        "Integrated LLM and RAG features into the LMS, retrieving learning content with pgvector.",
        "Shipped front end and backend features in two-week sprints, inside the client's team and production codebase.",
      ],
      es: [
        "Construí un benchmark y harness de evaluación de LLM que ejecuta 20 a 50 tareas de computer use con los modelos y califica sus resultados.",
        "Integré funcionalidades con LLMs y RAG en el LMS, con pgvector para recuperar el contenido de aprendizaje.",
        "Entregué funcionalidades de front end y backend en sprints de dos semanas, dentro del equipo del cliente y en su código de producción.",
      ],
    },
    stack: [
      "Python",
      "React",
      "TypeScript",
      "LLM evaluation",
      "RAG",
      "pgvector",
    ],
  },
  {
    short: "UNI",
    company: {
      en: "Universidad Nacional de Ingeniería",
      es: "Universidad Nacional de Ingeniería",
    },
    role: {
      en: "Full Stack Developer & Systems Analyst",
      es: "Desarrollador Full Stack y Analista de Sistemas",
    },
    terms: {
      en: "Full-time · On site, Managua",
      es: "Tiempo completo · Presencial, Managua",
    },
    start: "2023-02",
    end: "2024-12",
    summary: {
      en: "Maintained the budget and fixed-asset systems of the university where I studied, and built its warehouse and helpdesk systems.",
      es: "Mantuve los sistemas de presupuesto y activo fijo de la universidad donde estudié, y construí los de bodega y helpdesk.",
    },
    bullets: {
      en: [
        "Built the warehouse and helpdesk systems end to end: .NET backend, React front end and internal integrations.",
        "Maintained and extended the legacy budget (ASP.NET Web Forms) and fixed-asset (ASP.NET MVC) systems, both on SQL Server.",
        "Cut the slowest report from **6 minutes to under 15 seconds** by rewriting its queries and adding indexes.",
        "Mentored **8** backend interns.",
      ],
      es: [
        "Construí de punta a punta los sistemas de bodega y helpdesk: backend en .NET, front end en React e integraciones internas.",
        "Mantuve y amplié los sistemas heredados de presupuesto (ASP.NET Web Forms) y activo fijo (ASP.NET MVC), ambos sobre SQL Server.",
        "Reduje el reporte más lento de **6 minutos a menos de 15 segundos** reescribiendo sus consultas y añadiendo índices.",
        "Fui mentor de **8** pasantes de backend.",
      ],
    },
    stack: ["C#", ".NET", "ASP.NET", "React", "SQL Server", "CI/CD"],
  },
]

/** The role held now: the first entry without an end date. */
export function currentEntry(): ExperienceEntry | undefined {
  return experience.find((entry) => entry.end === undefined)
}

/** Full years elapsed since a "YYYY-MM" month, as of `now` (build time). */
export function fullYearsSince(yearMonth: string, now = new Date()): number {
  const [year, month] = yearMonth.split("-").map(Number) as [number, number]
  let years = now.getFullYear() - year
  if (now.getMonth() + 1 < month) years -= 1
  return years
}

/**
 * First start and last end over every entry. While a role is current,
 * `endYear` is the build year, so it is recomputed on each deploy.
 */
export function careerSpan(): {
  start: string
  startYear: number
  current: boolean
  endYear: number
} {
  const periods = experience
  const start = periods.map((p) => p.start).sort()[0]!
  const current = periods.some((p) => p.end === undefined)
  const lastEnd = periods
    .map((p) => p.end)
    .filter((end): end is string => end !== undefined)
    .sort()
    .at(-1)
  const endYear = current
    ? new Date().getFullYear()
    : Number(lastEnd?.slice(0, 4) ?? start.slice(0, 4))
  return { start, startYear: Number(start.slice(0, 4)), current, endYear }
}
