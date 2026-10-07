export const SITE_URL = "https://www.stevenampaiz.com"
const OG_IMAGE_PATH = "/opengraph-image"

// WERN is the freelancing agency Steven contracts through. Set this once the
// public URL (site or LinkedIn) is known and it will light up every "WERN" /
// "via WERN" reference as a link automatically. Empty string = render as text.
const WERN_URL = "https://www.upwork.com/agencies/wern/"

// The UNI degree title appears twice — the resume Education entry and the home
// Credentials list (the kind:"DEGREE" certification). Single-source it so the
// two surfaces can't drift apart.
const UNI_DEGREE = "Bachelor of Engineering (B.Eng.), Computer Engineering"

export interface Profile {
  firstName: string
  lastName: string
  fullName: string
  role: string
  tagline: string
  handle: string
  avatarUrl: string
  contactEmail: string
  /** "Managua, Nicaragua" — shown in the contact section / footer. */
  location: string
  /** "UTC-6" — shown in the footer locale line, hero terminal, and resume header. */
  timezone: string
}

export interface About {
  title: string
  /** Home-only lead statement for the About card — a short, punchy positioning
   *  line shown above the summary (the resume uses `resumeSummary` only). */
  headline: string
  /** Shared "Professional Summary" — the single positioning paragraph rendered
   *  on BOTH the home About section and the resume (years + quantified
   *  achievements + value, in 3–4 lines). */
  resumeSummary: string
  /** Home-only "What I focus on" bullets (capability-level, no stack names —
   *  the stack lives in `skills`). */
  focusAreas: string[]
}

export interface SkillCategory {
  label: string
  items: string[]
}

export interface Skills {
  /** Curated highlight chips shown on the home About section. */
  coreStack: string[]
  /** Full categorized breakdown shown on the resume. */
  categories: SkillCategory[]
}

export interface ExperienceItem {
  company: string
  /** Public company/product URL, when one exists. */
  companyUrl?: string
  logoPath: string
  title: string
  /** Anonymized client — render a neutral mark instead of a real logo. */
  confidential?: boolean
  /** "Freelance" | "Contract" | "Full-time", etc. */
  employmentType?: string
  period: string
  location: string
  /** Contract relationship or other source-confirmed role context. */
  context?: string
  /** Achievement bullets — the single canonical source for home + resume. */
  bullets: string[]
  skillsSummary: string[]
  /** Engagements delivered under this entry (e.g. agency → client contracts),
   *  rendered as indented sub-roles beneath the umbrella entry. */
  children?: ExperienceItem[]
  /** 1–3 letters for the home experience monogram tile (e.g. "W", "EL"). */
  monogram?: string
  /** CSS background (gradient/color) for the home experience monogram tile. */
  accent?: string
}

export interface Project {
  title: string
  description: string
  label: string
  /** Filter bucket surfaced by the Projects filter (e.g. "AI", "Web", "Data"). */
  category?: string
  /** Card cover. Omit for finished projects so they don't show the
   *  "coming soon" placeholder reserved for in-progress work. */
  image?: string
  /** Links the card to its individual case-study page at /projects/<slug>. */
  slug?: string
  /** Public live URL, when one exists. */
  liveUrl?: string
  /** Public source repository, when one exists. */
  repoUrl?: string
  /** Detailed achievement bullets, shown on the resume. */
  highlights?: string[]
  /** Featured as the resume's "Selected Project". */
  resumeFeatured?: boolean
  /** Print-safe title used on the resume instead of the home card title. */
  resumeTitle?: string
}

export interface EducationItem {
  institution: string
  degree: string
  period: string
  location: string
}

export interface Credential {
  /** Year awarded (string so it can read "2021" or a range). */
  year: string
  name: string
  org: string
  kind: "DEGREE" | "COURSE" | "CERTIFICATION"
  /** Public verification link (e.g. a Credly badge). */
  href?: string
}

export interface LanguageItem {
  name: string
  level: string
}

export interface Seo {
  title: string
  description: string
  url: string
  image: string
  keywords: string[]
  siteName: string
  locale: string
  type: string
}

export interface PortfolioData {
  profile: Profile
  socials: { github: string; linkedin: string; upwork: string }
  about: About
  skills: Skills
  experience: ExperienceItem[]
  projects: Project[]
  education: EducationItem[]
  /** Courses & certifications, surfaced in the Education & Credentials section. */
  certifications: Credential[]
  languages: LanguageItem[]
  seo: Seo
}

export const portfolioData = {
  profile: {
    firstName: "STEVEN",
    lastName: "MENDEZ",
    fullName: "Steven Mendez",
    role: "Full Stack Engineer",
    tagline:
      "I build for the web — backends, the apps on top, and the bits in between.",
    handle: "steven-mendez",
    avatarUrl: "/linkedin_photo.webp",
    contactEmail: "stevenampaiz@gmail.com",
    location: "Managua, Nicaragua",
    timezone: "UTC-6",
  },
  socials: {
    github: "https://github.com/Steven-Mendez",
    linkedin: "https://linkedin.com/in/steven-mendez-dev",
    upwork: "https://www.upwork.com/freelancers/~0173f0f672925ee178",
  },
  about: {
    title: "About Me",
    headline: "Professional Summary",
    resumeSummary:
      "Software engineer with 3+ years of experience building production web applications and backend APIs. Works across Python, React, .NET, and AWS, with experience in SQL optimization, data pipelines, and LLM/RAG integration.",
    focusAreas: [
      "End-to-end delivery — from data and APIs to the UI",
      "Backend APIs, data pipelines, and SQL optimization",
      "LLM evaluation and retrieval-augmented product features",
    ],
  },
  skills: {
    coreStack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      ".NET",
      "PostgreSQL",
      "AWS",
      "LLM/RAG",
    ],
    categories: [
      {
        label: "Languages",
        items: ["Python", "TypeScript/JavaScript", "C#", "SQL"],
      },
      {
        label: "Backend & Data",
        items: [
          "FastAPI",
          "Django",
          "Flask",
          "ASP.NET",
          "PostgreSQL",
          "SQL Server",
          "Redis",
          "REST APIs",
        ],
      },
      {
        label: "Frontend",
        items: ["React", "Angular", "Next.js"],
      },
      {
        label: "Cloud & Tools",
        items: [
          "AWS (Lambda, ECS, S3, RDS, SQS, CloudWatch)",
          "Docker",
          "Terraform",
          "CI/CD",
          "Git",
        ],
      },
      {
        label: "AI Applications",
        items: [
          "LLM/RAG integration",
          "LangChain",
          "LangGraph",
          "pgvector",
          "Qdrant",
          "LiveKit",
        ],
      },
    ],
  },
  // Current LinkedIn career facts read and confirmed by Steven on 2026-10-07.
  // Shared with the CV and chatbot; performance quantities remain self-reported.
  experience: [
    {
      company: "WERN",
      companyUrl: WERN_URL || undefined,
      logoPath: "/logos/wern_logo.webp",
      monogram: "W",
      accent: "linear-gradient(135deg,#3b5bff,#1e2a78)",
      skillsSummary: [
        "Python",
        "FastAPI",
        "React",
        "Angular",
        "AWS",
        "Terraform",
        "LLM/RAG",
      ],
      title: "Full Stack Engineer",
      employmentType: "Contract",
      period: "Jan 2025 - Present",
      location: "Remote",
      bullets: [
        "Built Python APIs and React/Angular interfaces across 3-5 client codebases, with AWS deployments, Docker/Terraform infrastructure, and LLM/RAG integrations.",
      ],
      context: "Client engagement through WERN:",
      children: [
        {
          company: "Dupely",
          companyUrl: "https://dupely.io",
          logoPath: "/logos/dupely_logo.webp",
          monogram: "D",
          accent: "linear-gradient(135deg,#34d36b,#15a34a)",
          skillsSummary: [
            "Python",
            "FastAPI",
            "PostgreSQL",
            "Redis",
            "AWS",
            "Data Pipelines",
          ],
          title: "Back End Developer",
          employmentType: "Contract through WERN",
          period: "Dec 2025 - Apr 2026",
          location: "Remote",
          bullets: [
            "Built FastAPI product and pricing endpoints for browser-extension and mobile clients, with pipelines using official Amazon, Walmart, and eBay APIs.",
            "Owned PostgreSQL schema design, migrations, and query performance; implemented caching for product data.",
          ],
        },
      ],
    },
    {
      company: "US EdTech Client",
      logoPath: "",
      monogram: "EL",
      accent: "linear-gradient(135deg,#8b6dff,#6d28d9)",
      confidential: true,
      skillsSummary: ["Python", "React", "LLM Evaluation", "RAG", "pgvector"],
      title: "Full Stack & AI Engineer (Independent Consultant)",
      employmentType: "Self-employed",
      period: "Mar 2025 - Dec 2025",
      location: "Remote",
      bullets: [
        "Built an LLM benchmark and evaluation harness covering 20-50 computer-use tasks; evaluation runs informed shipping decisions.",
        "Integrated LLM/RAG features into a learning management system using pgvector to retrieve learning content.",
        "Contributed production frontend and backend features in two-week sprints.",
      ],
      context: "Direct client contract, concurrent with WERN.",
    },
    {
      company: "Universidad Nacional de Ingeniería (UNI)",
      logoPath: "/logos/universidad_nacional_de_ingenieria_nicaragua_logo.webp",
      monogram: "UNI",
      accent: "linear-gradient(135deg,#3b82f6,#1e40af)",
      skillsSummary: ["C#", ".NET", "ASP.NET", "React", "SQL Server", "CI/CD"],
      title: "Full Stack Developer & Systems Analyst (.NET / React)",
      employmentType: "Full-time",
      period: "Feb 2023 - Dec 2024",
      location: "Managua, Nicaragua",
      bullets: [
        "Built a warehouse inventory system end to end with .NET and React.",
        "Maintained an ASP.NET/SQL Server budget system through two annual budget cycles; reduced its heaviest report’s runtime from 6 minutes to 7-15 seconds.",
        "Mentored approximately 8 developers.",
      ],
    },
  ],
  projects: [
    {
      title: "Interview Agent",
      description:
        "A voice interview application with three agents: a planner uses your CV and job description, an interviewer conducts the session through LiveKit, and an evaluator assesses your answers using transcript evidence. Partial interviews receive criterion feedback without a global score or verdict.",
      label: "React · FastAPI · LangGraph · LiveKit · OpenAI",
      category: "AI",
      image: "/projects/covers/interview-agent.webp",
      slug: "interview-agent",
      repoUrl: "https://github.com/Steven-Mendez/interview-agent",
      resumeFeatured: true,
      highlights: [
        "Built a three-agent voice interview application: a planner uses a CV and job description, an interviewer conducts the interview through LiveKit, and an evaluator assesses answers using transcript evidence.",
        "Implemented a React frontend and FastAPI backend with LangGraph/OpenAI orchestration and PostgreSQL persistence for plans, transcripts, and evaluations.",
      ],
    },
    {
      title: "Portfolio",
      description:
        "Liquid-glass UI with Next.js, WebGL/GSAP motion, full SEO and structured data, and CI-enforced security headers.",
      label: "Next.js · React · TypeScript · GSAP · WebGL",
      category: "Web",
      image: "/projects/covers/portfolio.webp",
      slug: "portfolio",
      liveUrl: SITE_URL,
      resumeFeatured: false,
      resumeTitle: "Personal Portfolio",
      highlights: [
        "Designed and built a liquid-glass personal site with WebGL/GSAP motion, full SEO and structured data, and CI-enforced accessibility & SEO budgets (Lighthouse CI gated at ≥95); optimized the hero image from 19 MB to 446 KB (~98% smaller).",
      ],
    },
  ],
  education: [
    {
      institution: "Universidad Nacional de Ingeniería",
      degree: UNI_DEGREE,
      period: "Mar 2019 - Dec 2023",
      location: "Managua, Nicaragua",
    },
  ],
  certifications: [
    {
      year: "2023",
      name: UNI_DEGREE,
      org: "Universidad Nacional de Ingeniería (UNI) · Managua, Nicaragua",
      kind: "DEGREE",
    },
    {
      year: "2022",
      name: "Application Development with Visual C#",
      org: "UNI Posgrado · Computing & Systems",
      kind: "COURSE",
    },
    {
      year: "2021",
      name: "Certified Big Data Consultant",
      org: "Arcitura Education",
      kind: "CERTIFICATION",
      href: "https://www.credly.com/badges/a57aa250-4085-454b-a0be-c7dd7a880048",
    },
    {
      year: "2021",
      name: "Certified Big Data Professional",
      org: "Arcitura Education",
      kind: "CERTIFICATION",
      href: "https://www.credly.com/badges/354d5191-214d-415f-9e4e-43e805d9175b",
    },
  ],
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "Full professional proficiency" },
  ],
  seo: {
    title: "Steven Mendez | Full Stack Engineer",
    description:
      "Steven Mendez is a software engineer with 3+ years building production web applications and backend APIs across Python, React, .NET, and AWS, with experience in SQL optimization, data pipelines, and LLM/RAG integration.",
    url: SITE_URL,
    image: OG_IMAGE_PATH,
    keywords: [
      "Full Stack Engineer",
      "Software Engineer",
      "React Developer",
      "Next.js Developer",
      "TypeScript Developer",
      "Python Developer",
      "FastAPI",
      "Django",
      "AWS",
      "LLMs & RAG Architectures",
      "Remote Full Stack Engineer",
    ],
    siteName: "Steven Mendez Portfolio",
    locale: "en_US",
    type: "website",
  },
} satisfies PortfolioData
