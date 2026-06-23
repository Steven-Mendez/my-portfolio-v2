export const SITE_URL = "https://www.stevenampaiz.com";
export const OG_IMAGE_PATH = "/opengraph-image";

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

export interface ExperienceItem {
  company: string;
  logoPath: string;
  title: string;
  contractType: string;
  period: string;
  location: string;
  description: string;
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
  socials: { github: string; linkedin: string };
  about: { title: string; description1: string; description2: string };
  experience: ExperienceItem[];
  projects: Project[];
  seo: Seo;
}

export const portfolioData = {
  profile: {
    firstName: "STEVEN",
    lastName: "MENDEZ",
    fullName: "Steven Mendez",
    role: "Full Stack Engineer",
    tagline:
      "I build products end to end — Python (FastAPI/Django) APIs and data pipelines, React/Next.js front ends, and LLM/RAG-powered features.",
    handle: "steven-mendez",
    avatarUrl: "/linkedin_photo.png",
    contactEmail: "stevenampaiz@gmail.com",
  },
  socials: {
    github: "https://github.com/Steven-Mendez",
    linkedin: "https://linkedin.com/in/steven-mendez-dev",
  },
  about: {
    title: "About Me",
    description1:
      "I am a Full Stack Engineer who ships features end to end — Python (FastAPI/Django) APIs and data pipelines on the back end, and React/Next.js interfaces on the front end.",
    description2:
      "On the back end I build REST APIs with Python/FastAPI and Django, design multi-vendor data pipelines, and optimize database queries so data flows reliably into production. I've also delivered LLM/RAG-powered features for enterprise clients, and I build front ends with React and Next.js — from internal enterprise tooling to this site.",
  },
  experience: [
    {
      company: "Dupely",
      logoPath: "/logos/dupely_logo.jpeg",
      title: "Backend Engineer",
      contractType: "Contract",
      period: "Dec 2025 - May 2026",
      location: "Remote",
      description:
        "Contracted through WERN as a Backend Engineer for a real-time shopping assistant (browser extension and mobile app) that detects price inflation and surfaces better-value product alternatives.\n\n• Programmed high-performance RESTful APIs using Python and FastAPI for the efficient injection and extraction of product data, serving real-time requests from the browser extension and mobile app.\n• Built and maintained multi-vendor data pipelines that continuously ingest product information, pricing history, and features from major marketplaces (Amazon, Walmart, eBay), with fallback handling and caching to reduce third-party dependency.\n• Implemented real-time backend events (Socket.IO) and enrichment APIs (reviews, availability, similarity explanations); led query optimization and infrastructure clean-up to keep data retrieval fast and the service stable.",
      skillsSummary: ["Python", "FastAPI", "AWS", "PostgreSQL", "Redis", "Data Pipelines"],
    },
    {
      company: "WERN",
      logoPath: "/logos/wern_logo.jpeg",
      title: "Full Stack & AI Engineer",
      contractType: "Full-time",
      period: "Dec 2024 - Present",
      location: "Remote",
      description:
        "At WERN, I deliver high-impact client engagements spanning full-stack development, cloud infrastructure, and Generative AI — building scalable REST APIs and React/Next.js front ends across client environments with Python, FastAPI, Django, React, and TypeScript.\n\n• Assignment (Dec 2025 - May 2026): Deployed to Dupely as a Backend Engineer, building e-commerce data pipelines and AWS services.\n• Previous assignment (2025): For a confidential B2B client, built LLM/RAG-powered features (retrieval over domain content with vector search and agent/tool orchestration) and shipped front-end tooling in Next.js/React and an embedded IDE assistant in VS Code (Webview API).\n• Worked across the stack — Python/FastAPI/Django services, PostgreSQL/vector databases, and React/Next.js/TypeScript interfaces.",
      skillsSummary: ["Python", "FastAPI", "Django", "Next.js", "React", "TypeScript", "LLMs", "RAG"],
    },
    {
      company: "Universidad Nacional de Ingeniería (UNI)",
      logoPath: "/logos/universidad_nacional_de_ingenieria_nicaragua_logo.jpeg",
      title: "Systems Analyst",
      contractType: "Full-time",
      period: "Feb 2023 - Dec 2024",
      location: "Managua, Nicaragua · On-site",
      description:
        "Supported and modernized the university's mission-critical internal systems, focusing on the core enterprise application used for budget management and vital administrative operations.\n\n• Maintained and enhanced a legacy ASP.NET enterprise system responsible for the university's financial and operational continuity.\n• Proposed and prototyped new front-end architectures in React.js to improve maintainability and user experience, introducing modern development practices to the team as a technical mentor.\n• Refactored and optimized complex Microsoft SQL Server queries for measurable performance gains.\n• Bridged legacy infrastructure with modern stacks, bringing scalable solutions to the engineering team's workflows.",
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
      label: "Next.js · React · TypeScript · GSAP",
      image: "/projects/placeholder.jpg",
      liveUrl: SITE_URL,
    },
    {
      title: "Enterprise Budget System",
      description:
        "Modernized a mission-critical ASP.NET / SQL Server financial system; optimized complex queries and proposed a React.js front-end architecture.",
      label: "ASP.NET · SQL Server · React",
      image: "/projects/placeholder.jpg",
    },
  ],
  seo: {
    title: "Steven Mendez | Full Stack Engineer",
    description:
      "Steven Mendez is a Full Stack Engineer building React/Next.js front ends and Python (FastAPI/Django) back ends, with data-pipeline and LLM/RAG experience on AWS.",
    url: SITE_URL,
    image: OG_IMAGE_PATH,
    keywords: [
      "Full Stack Engineer",
      "React Developer",
      "Next.js Developer",
      "TypeScript Developer",
      "Python Developer",
      "FastAPI",
      "Django",
      "AWS",
      "LLMs & RAG Architectures",
      "Remote Full Stack Developer",
    ],
    siteName: "Steven Mendez Portfolio",
    locale: "en_US",
    type: "website",
  },
} satisfies PortfolioData;
