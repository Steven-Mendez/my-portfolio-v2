export const SITE_URL = "https://www.stevenampaiz.com";
export const OG_IMAGE_PATH = "/opengraph-image";

// WERN is the freelancing agency Steven contracts through. Set this once the
// public URL (site or LinkedIn) is known and it will light up every "WERN" /
// "via WERN" reference as a link automatically. Empty string = render as text.
export const WERN_URL = "https://www.upwork.com/agencies/wern/";

export interface Profile {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  tagline: string;
  handle: string;
  avatarUrl: string;
  contactEmail: string;
}

export interface About {
  title: string;
  /** Punchy lead line — the large text on the home About section. */
  description1: string;
  /** Supporting paragraph. Home shows it below the lead; the resume joins
   *  description1 + description2 into the single "Professional Summary". */
  description2: string;
  /** Home-only "What I focus on" bullets (capability-level, no stack names —
   *  the stack lives in `skills`). */
  focusAreas: string[];
}

export interface SkillCategory {
  label: string;
  items: string[];
}

export interface Skills {
  /** Curated highlight chips shown on the home About section. */
  coreStack: string[];
  /** Full categorized breakdown shown on the resume. */
  categories: SkillCategory[];
}

export interface ExperienceItem {
  company: string;
  /** Public company/product URL, when one exists. */
  companyUrl?: string;
  logoPath: string;
  title: string;
  /** Anonymized client — render a neutral mark instead of a real logo. */
  confidential?: boolean;
  /** "Freelance" | "Contract" | "Full-time", etc. */
  employmentType?: string;
  /** Agency the engagement was sourced/managed through (e.g. "WERN"). */
  agency?: string;
  /** Public agency URL, when one exists. */
  agencyUrl?: string;
  period: string;
  location: string;
  /** One-line intro; shown on both home and resume. */
  summary: string;
  /** Achievement bullets — the single canonical source for home + resume. */
  bullets: string[];
  skillsSummary: string[];
}

export interface Project {
  title: string;
  description: string;
  label: string;
  image: string;
  /** Public live URL, when one exists. */
  liveUrl?: string;
  /** Public source repository, when one exists. */
  repoUrl?: string;
  /** Confidential client work — renders a non-clickable badge instead of links. */
  confidential?: boolean;
  /** Detailed achievement bullets, shown on the resume. */
  highlights?: string[];
  /** Featured as the resume's "Selected Project". */
  resumeFeatured?: boolean;
  /** Print-safe title used on the resume instead of the home card title. */
  resumeTitle?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface Seo {
  title: string;
  description: string;
  url: string;
  image: string;
  keywords: string[];
  siteName: string;
  locale: string;
  type: string;
}

export interface PortfolioData {
  profile: Profile;
  socials: { github: string; linkedin: string; upwork: string };
  about: About;
  skills: Skills;
  experience: ExperienceItem[];
  projects: Project[];
  education: EducationItem[];
  languages: LanguageItem[];
  seo: Seo;
}

export const portfolioData = {
  profile: {
    firstName: "STEVEN",
    lastName: "MENDEZ",
    fullName: "Steven Mendez",
    role: "Full Stack Engineer",
    tagline:
      "I build and ship software end to end — and own the outcome, not just the ticket.",
    handle: "steven-mendez",
    avatarUrl: "/linkedin_photo.png",
    contactEmail: "stevenampaiz@gmail.com",
  },
  socials: {
    github: "https://github.com/Steven-Mendez",
    linkedin: "https://linkedin.com/in/steven-mendez-dev",
    upwork: "https://www.upwork.com/freelancers/~0173f0f672925ee178",
  },
  about: {
    title: "About Me",
    description1:
      "I'm a full-stack engineer who builds and ships products end to end — and owns the outcome, not just the ticket.",
    description2:
      "I move across the stack and pick the tool that fits the problem in front of me, whether that's a real-time backend, an AI-powered feature, or the interface people actually use. I like ambiguous problems and seeing them through from first idea to production.",
    focusAreas: [
      "End-to-end delivery — from data and APIs to the UI",
      "Real-time systems and multi-vendor data pipelines",
      "AI-powered product features (LLM/RAG)",
    ],
  },
  skills: {
    coreStack: ["Python", "FastAPI", "Django", "React", "Next.js", "TypeScript", "PostgreSQL", "AWS"],
    categories: [
      { label: "Languages", items: ["TypeScript / JavaScript", "Python", "C#", "SQL"] },
      { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"] },
      { label: "Backend", items: ["FastAPI", "Django", "Flask", "ASP.NET", "REST APIs", "Socket.IO", "Pydantic", "SQLAlchemy"] },
      { label: "AI & Data", items: ["LLM/RAG integration", "LangChain/LangGraph", "vector databases (pgvector, Qdrant)", "data pipelines", "web scraping"] },
      { label: "Cloud & DevOps", items: ["AWS", "Docker", "CI/CD", "Git"] },
      { label: "Databases", items: ["PostgreSQL", "Microsoft SQL Server", "Redis"] },
    ],
  },
  experience: [
    {
      company: "Dupely",
      companyUrl: "https://dupely.io",
      logoPath: "/logos/dupely_logo.jpeg",
      title: "Backend Engineer",
      employmentType: "Contract",
      agency: "WERN",
      agencyUrl: WERN_URL || undefined,
      period: "Dec 2025 - May 2026",
      location: "Remote",
      summary:
        "Backend engineer for a real-time shopping assistant (browser extension and mobile app) that flags price inflation and surfaces better-value product alternatives.",
      bullets: [
        "Built high-performance REST APIs in Python and FastAPI to serve real-time product data to the browser extension and mobile app.",
        "Designed and maintained multi-vendor data pipelines ingesting product details, pricing history, and availability from major marketplaces (Amazon, Walmart, eBay) — indexing 5K–10K products during the beta phase — with caching and fallback handling to reduce reliance on third-party providers.",
        "Delivered real-time backend events over Socket.IO and enrichment APIs (reviews, availability, similarity explanations) for a responsive client experience.",
        "Worked within a ~10-engineer team, integrating third-party data providers (Bright Data, Oxylabs, Keepa, BlueCart) and managing persistence across PostgreSQL, Redis, and Qdrant on AWS.",
      ],
      skillsSummary: ["Python", "FastAPI", "AWS", "PostgreSQL", "Redis", "Data Pipelines"],
    },
    {
      company: "Confidential E-Learning Platform",
      logoPath: "/logos/wern_logo.jpeg",
      confidential: true,
      title: "Full Stack & AI Engineer",
      employmentType: "Contract",
      agency: "WERN",
      agencyUrl: WERN_URL || undefined,
      period: "Dec 2024 - Nov 2025",
      location: "Remote",
      summary:
        "Brought on through WERN primarily to integrate AI into a private e-learning platform, while also contributing full-stack to building the product.",
      bullets: [
        "Integrated AI into the platform: LLM/RAG retrieval over learning content with vector search (pgvector) and agent/tool orchestration (LangChain/LangGraph) to ground assistant responses.",
        "Designed and shipped, end to end, a node-and-connector visual configuration tool (Next.js/React/TypeScript) that lets non-technical users configure conversational-agent behavior across scenarios.",
        "Contributed full-stack to building the platform — Django/Python (FastAPI) services and React/Next.js/TypeScript interfaces.",
      ],
      skillsSummary: ["LLMs", "RAG", "LangChain", "Python", "Django", "FastAPI", "Next.js", "React"],
    },
    {
      company: "WERN",
      companyUrl: WERN_URL || undefined,
      logoPath: "/logos/wern_logo.jpeg",
      title: "Freelance Software Engineer",
      period: "Dec 2024 - Present",
      location: "Remote",
      summary:
        "The agency I freelance through — they source and manage client engagements, and I embed with each product team to ship features end to end.",
      bullets: [
        "Delivered contract software engineering for WERN's clients, owning the work from data and APIs through to the interfaces users see.",
        "Engagements include Dupely (a real-time shopping assistant) and a confidential AI-powered e-learning platform — backend services, data pipelines, AI/LLM features, and web interfaces.",
      ],
      skillsSummary: ["Python", "FastAPI", "Next.js", "React", "TypeScript", "LLMs", "AWS"],
    },
    {
      company: "Universidad Nacional de Ingeniería (UNI)",
      logoPath: "/logos/universidad_nacional_de_ingenieria_nicaragua_logo.jpeg",
      title: "Systems Analyst",
      employmentType: "Full-time",
      period: "Jan 2023 - Dec 2024",
      location: "Managua, Nicaragua · On-site",
      summary:
        "Supported and modernized the university's mission-critical internal systems — the core enterprise application for budget management and administrative operations.",
      bullets: [
        "Maintained and modernized the university's mission-critical ASP.NET / SQL Server budget system, used by 400–700 staff across the institution with peaks of 100–200 concurrent users.",
        "Optimized complex SQL Server queries over a decade of accumulated financial data — cutting a critical report from ~20 minutes to 15–30 seconds, and most heavy queries from ~5 minutes to under 10 seconds.",
        "Proposed and prototyped a React.js front-end architecture to modernize the legacy UI, improving maintainability and user experience.",
        "Mentored 5–10 interns, introducing modern development practices and clean-code standards to the team.",
      ],
      skillsSummary: ["C#", "ASP.NET", "SQL Server", "React", "Clean Architecture"],
    },
  ],
  projects: [
    {
      title: "Real-Time E-Commerce Data Pipeline",
      description:
        "Backend APIs and multi-vendor data pipelines powering a real-time shopping assistant — product ingestion, price tracking, caching, and live events.",
      label: "Python · FastAPI · AWS · Redis",
      image: "/projects/placeholder.jpg",
    },
    {
      title: "GenAI Retrieval Features",
      description:
        "LLM/RAG features for an enterprise platform — a contextual assistant, retrieval over domain content with vector search, and a modular agent-service architecture.",
      label: "Python · FastAPI · LangChain · pgvector",
      image: "/projects/placeholder.jpg",
      confidential: true,
    },
    {
      title: "Visual Agent-Configuration Tool",
      description:
        "A node-and-connector visual editor in Next.js/React to configure conversational-agent behavior across scenarios — built end to end.",
      label: "Next.js · React · TypeScript",
      image: "/projects/placeholder.jpg",
      confidential: true,
    },
    {
      title: "IDE Assistant Extension",
      description:
        "A VS Code extension embedding an in-editor assistant via the Webview API, reusing an existing assistant backend.",
      label: "TypeScript · React · VS Code API",
      image: "/projects/placeholder.jpg",
      confidential: true,
    },
    {
      title: "This Portfolio (v2)",
      description:
        "Liquid-glass UI with Next.js, WebGL/GSAP motion, full SEO and structured data, and CI-enforced security headers.",
      label: "Next.js · React · TypeScript · GSAP · WebGL",
      image: "/projects/placeholder.jpg",
      liveUrl: SITE_URL,
      resumeFeatured: true,
      resumeTitle: "Personal Portfolio",
      highlights: [
        "Designed and built a liquid-glass personal site with WebGL/GSAP motion, full SEO and structured data, and CI-enforced accessibility & SEO budgets (Lighthouse CI gated at ≥95); optimized the hero image from 19 MB to 446 KB (~98% smaller).",
      ],
    },
    {
      title: "Enterprise Budget System",
      description:
        "Modernized a mission-critical ASP.NET / SQL Server financial system; optimized complex queries and proposed a React.js front-end architecture.",
      label: "ASP.NET · SQL Server · React",
      image: "/projects/placeholder.jpg",
    },
  ],
  education: [
    {
      institution: "Universidad Nacional de Ingeniería",
      degree: "B.S. in Computer Engineering",
      period: "Mar 2019 - Dec 2023",
      location: "Managua, Nicaragua",
    },
  ],
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "Professional working proficiency (CEFR B2)" },
  ],
  seo: {
    title: "Steven Mendez | Full Stack Engineer",
    description:
      "Steven Mendez is a full-stack engineer who builds and ships production systems end to end — real-time backends, AI/LLM features, and the web interfaces in front of them. Experienced across React/Next.js, Python, and AWS.",
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
} satisfies PortfolioData;
