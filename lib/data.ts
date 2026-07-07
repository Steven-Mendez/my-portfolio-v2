export const SITE_URL = "https://www.stevenampaiz.com";
const OG_IMAGE_PATH = "/opengraph-image";

// WERN is the freelancing agency Steven contracts through. Set this once the
// public URL (site or LinkedIn) is known and it will light up every "WERN" /
// "via WERN" reference as a link automatically. Empty string = render as text.
const WERN_URL = "https://www.upwork.com/agencies/wern/";

// The UNI degree title appears twice — the resume Education entry and the home
// Credentials list (the kind:"DEGREE" certification). Single-source it so the
// two surfaces can't drift apart.
const UNI_DEGREE = "B.S. in Computer Engineering";

export interface Profile {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  tagline: string;
  handle: string;
  avatarUrl: string;
  contactEmail: string;
  /** "Managua, Nicaragua" — shown in the contact section / footer. */
  location: string;
  /** "UTC-6" — shown in the footer locale line, hero terminal, and resume header. */
  timezone: string;
}

export interface About {
  title: string;
  /** Home-only lead statement for the About card — a short, punchy positioning
   *  line shown above the summary (the resume uses `resumeSummary` only). */
  headline: string;
  /** Shared "Professional Summary" — the single positioning paragraph rendered
   *  on BOTH the home About section and the resume (years + quantified
   *  achievements + value, in 3–4 lines). */
  resumeSummary: string;
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
  period: string;
  location: string;
  /** Achievement bullets — the single canonical source for home + resume. */
  bullets: string[];
  skillsSummary: string[];
  /** Engagements delivered under this entry (e.g. agency → client contracts),
   *  rendered as indented sub-roles beneath the umbrella entry. */
  children?: ExperienceItem[];
  /** 1–3 letters for the home experience monogram tile (e.g. "W", "EL"). */
  monogram?: string;
  /** CSS background (gradient/color) for the home experience monogram tile. */
  accent?: string;
}

export interface Project {
  title: string;
  description: string;
  label: string;
  /** Filter bucket surfaced by the Projects filter (e.g. "AI", "Web", "Data"). */
  category?: string;
  /** Card cover. Omit for finished projects so they don't show the
   *  "coming soon" placeholder reserved for in-progress work. */
  image?: string;
  /** Links the card to its individual case-study page at /projects/<slug>. */
  slug?: string;
  /** Public live URL, when one exists. */
  liveUrl?: string;
  /** Public source repository, when one exists. */
  repoUrl?: string;
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

export interface Credential {
  /** Year awarded (string so it can read "2021" or a range). */
  year: string;
  name: string;
  org: string;
  kind: "DEGREE" | "COURSE" | "CERTIFICATION";
  /** Public verification link (e.g. a Credly badge). */
  href?: string;
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
  /** Courses & certifications, surfaced in the Education & Credentials section. */
  certifications: Credential[];
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
      "Full-stack engineer with 3+ years building and shipping production software end to end — real-time backends, data pipelines, AI features (LLM/RAG), and the web interfaces in front of them. Comfortable owning a feature across the stack and optimizing for performance and reliability under real-world load. Works day-to-day across React/Next.js, Python (FastAPI/Django), and AWS, and is open to experimenting with and picking up new technologies as a problem demands.",
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
      company: "WERN",
      companyUrl: WERN_URL || undefined,
      logoPath: "/logos/wern_logo.webp",
      monogram: "W",
      accent: "linear-gradient(135deg,#3b5bff,#1e2a78)",
      title: "Freelance Software Engineer",
      period: "Dec 2024 - Present",
      location: "Remote",
      bullets: [
        "Delivered contract software engineering for WERN's clients, owning the work from data and APIs through to the interfaces users see.",
      ],
      skillsSummary: ["Python", "FastAPI", "Next.js", "React", "TypeScript", "LLMs", "AWS"],
      children: [
        {
          company: "Dupely",
          companyUrl: "https://dupely.io",
          logoPath: "/logos/dupely_logo.webp",
          monogram: "D",
          accent: "linear-gradient(135deg,#34d36b,#15a34a)",
          title: "Backend Engineer",
          employmentType: "Contract",
          period: "Dec 2025 - May 2026",
          location: "Remote",
          bullets: [
            "Built high-performance REST APIs in Python and FastAPI to serve real-time product data to the browser extension and mobile app.",
            "Designed and maintained multi-vendor data pipelines ingesting product details, pricing history, and availability from major marketplaces (Amazon, Walmart, eBay) — indexing 5K–10K products during the beta phase — with caching and fallback handling to reduce reliance on third-party providers.",
            "Delivered real-time backend events over Socket.IO and enrichment APIs (reviews, availability, similarity explanations) for a responsive client experience.",
            "Worked within a ~10-engineer team, integrating third-party data providers (Bright Data, Oxylabs, Keepa, BlueCart) and managing persistence across PostgreSQL, Redis, and Qdrant on AWS.",
          ],
          skillsSummary: ["Python", "FastAPI", "AWS", "PostgreSQL", "Redis", "Data Pipelines"],
        },
        {
          company: "E-Learning Platform",
          logoPath: "/logos/wern_logo.webp",
          monogram: "EL",
          accent: "linear-gradient(135deg,#8b6dff,#6d28d9)",
          confidential: true,
          title: "Full Stack & AI Engineer",
          employmentType: "Contract",
          period: "Dec 2024 - Nov 2025",
          location: "Remote",
          bullets: [
            "Integrated AI into the platform: LLM/RAG retrieval over learning content with vector search (pgvector) and agent/tool orchestration (LangChain/LangGraph) to ground assistant responses.",
            "Designed and shipped, end to end, a node-and-connector visual configuration tool (Next.js/React/TypeScript) that lets non-technical users configure conversational-agent behavior across scenarios.",
            "Contributed full-stack to building the platform — Django/Python (FastAPI) services and React/Next.js/TypeScript interfaces.",
          ],
          skillsSummary: ["LLMs", "RAG", "LangChain", "Python", "Django", "FastAPI", "Next.js", "React"],
        },
      ],
    },
    {
      company: "Universidad Nacional de Ingeniería (UNI)",
      logoPath: "/logos/universidad_nacional_de_ingenieria_nicaragua_logo.webp",
      monogram: "UNI",
      accent: "linear-gradient(135deg,#3b82f6,#1e40af)",
      title: "Systems Analyst",
      employmentType: "Full-time",
      period: "Jan 2023 - Dec 2024",
      location: "Managua, Nicaragua · On-site",
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
      title: "Interview Agent",
      description:
        "A real-time voice interviewer — one AI plans the interview from your CV and the job offer, a second conducts it by voice over WebRTC, and a third scores you 0–100 with evidence from your own answers.",
      label: "React · FastAPI · LangGraph · LiveKit · OpenAI",
      category: "AI",
      image: "/projects/covers/interview-agent.webp",
      slug: "interview-agent",
      repoUrl: "https://github.com/Steven-Mendez/interview-agent",
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
      resumeFeatured: true,
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
    { name: "English", level: "Professional (B2)" },
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
