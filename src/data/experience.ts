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
      en: "Development agency; client projects end to end, among them Dupely (below); now on WERN's internal products.",
      es: "Agencia de desarrollo; proyectos de clientes de punta a punta, entre ellos Dupely (abajo); hoy en sus productos internos.",
    },
    bullets: {
      en: [
        "Took features from first endpoint to production across client codebases by building Python REST APIs (FastAPI, Django, Flask) and the React interfaces on top of them.",
        "Ran client workloads on AWS (Lambda, ECS, S3, RDS, SQS, CloudWatch) with the infrastructure defined in Docker and Terraform and CI pipelines handling deployment.",
        "Added LLM and RAG features to client products with vector retrieval on pgvector and Qdrant.",
      ],
      es: [
        "Llevé funcionalidades del primer endpoint a producción en varios codebases de clientes construyendo APIs REST en Python (FastAPI, Django, Flask) y sus interfaces en React.",
        "Diseñé y operé la infraestructura en AWS (Lambda, ECS, S3, RDS, SQS, CloudWatch) de los proyectos de clientes, definida en Docker y Terraform, con despliegues por pipelines de CI.",
        "Añadí funcionalidades LLM y RAG a productos de clientes con recuperación vectorial sobre pgvector y Qdrant.",
      ],
    },
    stack: [
      "Python",
      "FastAPI",
      "Django",
      "Flask",
      "React",
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
      en: "Shopping-assistant startup (browser extension and mobile app) that flags price inflation and better-value alternatives.",
      es: "Startup de asistente de compras (extensión y app móvil) que detecta inflación de precios y mejores alternativas.",
    },
    bullets: {
      en: [
        "Built the backend the beta launched on: FastAPI services serving product and pricing data in real time.",
        "Built the product, pricing-history, and attribute ingestion pipelines for Amazon, Walmart, and eBay: official APIs where available, in-house scraping and providers such as Bright Data and Oxylabs elsewhere.",
        "Contributed to the PostgreSQL schema, migrations, and product-lookup query performance; proposed a Redis cache-aside design for product data.",
      ],
      es: [
        "Construí el backend con el que se lanzó la beta: servicios FastAPI que sirven productos y precios en tiempo real.",
        "Construí los pipelines de ingesta de productos, historial de precios y atributos de Amazon, Walmart y eBay: APIs oficiales cuando existían y, si no, scraping propio y proveedores como Bright Data y Oxylabs.",
        "Colaboré en el esquema de PostgreSQL, las migraciones y el rendimiento de las consultas de búsqueda; propuse un diseño de caché en Redis (cache-aside) para datos de productos.",
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
      en: "Direct contract held alongside WERN with their authorization. The company's name is under NDA.",
      es: "Contrato directo en paralelo a WERN y con su autorización. El nombre de la empresa está bajo NDA.",
    },
    bullets: {
      en: [
        "Built an LLM benchmark and evaluation harness that runs models through 20-50 computer-use tasks and scores their output.",
        "Delivered Generative AI features and LMS integrations on LLMs and RAG, retrieving learning content with pgvector, from the user interface to the services behind it.",
        "Shipped full-stack features into the client's production codebase on two-week sprints inside their engineering team.",
      ],
      es: [
        "Construí un benchmark y harness de evaluación de LLM que ejecuta 20-50 tareas de computer-use con los modelos y califica sus resultados.",
        "Entregué funcionalidades de IA generativa e integraciones con el LMS sobre LLM y RAG, recuperando contenido de aprendizaje con pgvector, desde la interfaz hasta los servicios.",
        "Entregué funcionalidades full stack en el código de producción del cliente en sprints de dos semanas.",
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
      en: "Responsible for the university's budget and fixed-asset systems; also built its warehouse and helpdesk systems.",
      es: "Responsable de los sistemas de presupuesto y activo fijo; construí los de bodega y helpdesk.",
    },
    bullets: {
      en: [
        "Maintained and extended two legacy ASP.NET / SQL Server systems, budget (Web Forms) and fixed assets (MVC); cut the budget system's heaviest report from **6 minutes to 7-15 seconds** by rewriting and indexing queries.",
        "Built the warehouse and helpdesk systems end to end: .NET backend, React front end, integrations.",
        "Restored CI/CD after the on-premise servers were renewed, rotating credentials and repointing deployments.",
        "Mentored **8** interns on backend fundamentals and Git.",
      ],
      es: [
        "Mantuve y amplié dos sistemas heredados en ASP.NET / SQL Server, presupuesto (Web Forms) y activo fijo (MVC); reduje el reporte más pesado del presupuesto de **6 minutos a 7-15 segundos** optimizando consultas.",
        "Construí de punta a punta los sistemas de bodega y helpdesk: backend .NET, front end React e integraciones.",
        "Restauré el CI/CD tras la renovación de los servidores on-premise: roté credenciales y reapunté despliegues.",
        "Mentoré a **8** pasantes en fundamentos de backend y Git.",
      ],
    },
    stack: ["C#", ".NET", "ASP.NET", "React", "SQL Server", "CI/CD"],
  },
]

/** The role held now: the first entry without an end date. */
export function currentEntry(): ExperienceEntry | undefined {
  return experience.find((entry) => entry.end === undefined)
}

/** Full months elapsed since a "YYYY-MM" month, as of `now` (build time). */
export function fullMonthsSince(yearMonth: string, now = new Date()): number {
  const [year, month] = yearMonth.split("-").map(Number) as [number, number]
  return (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month)
}

/** Full years elapsed since a "YYYY-MM" month, as of `now` (build time). */
export function fullYearsSince(yearMonth: string, now = new Date()): number {
  return Math.floor(fullMonthsSince(yearMonth, now) / 12)
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
