export const SITE_URL = "https://stevenampaiz.com";
export const OG_IMAGE_PATH = "/opengraph-image";

export const portfolioData = {
  profile: {
    firstName: "STEVEN",
    lastName: "MENDEZ",
    fullName: "Steven Mendez",
    role: "Backend Engineer",
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
    description1: "I am a Backend Engineer focused on building scalable APIs, cloud services, and data-intensive integrations.",
    description2: "My work centers on backend systems for multi-vendor data pipelines and AI-powered features. I build APIs with Python/FastAPI, integrate external platforms, and optimize database operations so data flows reliably into production systems.",
  },
  experience: [
    {
      company: "Dupely",
      logoPath: "/logos/dupely_logo.jpeg",
      title: "Backend Engineer",
      contractType: "Contract",
      period: "Dec 2025 - Apr 2026",
      location: "Remote",
      description: "Contracted through WERN as a Backend Engineer for a real-time shopping assistant (browser extension and mobile app) that detects price inflation and surfaces better-value product alternatives.\n\n• Programmed high-performance RESTful APIs using Python and FastAPI, focusing on the efficient injection and extraction of product data to serve real-time requests from the browser extension and mobile app.\n• Built and maintained robust data pipelines to continuously ingest product information, pricing history, and features from major marketplaces (Amazon, Walmart, eBay).\n• Executed end-to-end development based on technical requirements, including database management, query optimization, and ensuring fast data retrieval for end-users.",
      skillsSummary: ["Python", "FastAPI", "AWS", "React", "Data Integration"]
    },
    {
      company: "WERN",
      logoPath: "/logos/wern_logo.jpeg",
      title: "Backend & AI Engineer",
      contractType: "Full-time",
      period: "Dec 2024 - Present",
      location: "Remote",
      description: "At WERN, I contribute to high-impact client projects focused on backend development, cloud infrastructure, and Generative AI integrations.\n\n• Assignment (Dec 2025 - Apr 2026): Deployed to Dupely as a Backend Engineer, building e-commerce data pipelines and AWS services.\n• Previous Assignment (Jan 2025 - Nov 2025): Deployed to a confidential B2B client in the EdTech sector, where I built GenAI features and LMS integrations using LLMs and RAG architectures.\n• Built and maintained scalable backend services and REST APIs across client environments using Python, FastAPI, Django, and React.",
      skillsSummary: ["Python", "FastAPI", "Django", "React", "LLMs", "RAG"]
      },
    {
      company: "Universidad Nacional de Ingeniería (UNI)",
      logoPath: "/logos/universidad_nacional_de_ingenieria_nicaragua_logo.jpeg",
      title: "Systems Analyst",
      contractType: "Full-time",
      period: "Feb 2023 - Dec 2024",
      location: "Managua, Nicaragua · On-site",
      description: "Played a key role in supporting and modernizing the university's mission-critical internal systems, specifically focusing on the core enterprise application used for budget management and vital administrative operations.\n\nKey responsibilities and achievements:\n- Maintained and enhanced a legacy ASP.NET enterprise system responsible for the university's financial and operational continuity.\n- Acted as a technical mentor within the team, introducing modern development practices and proposing new frontend architectures using React.js to improve maintainability and user experience.\n- Achieved significant system performance improvements by analyzing, refactoring, and optimizing complex Microsoft SQL Server queries.\n- Bridged the gap between legacy infrastructure and modern tech stacks, bringing a fresh perspective and scalable solutions to the engineering team's workflows.",
      skillsSummary: ["C#", "SQL Server", "React", "ASP.NET", "Clean Architecture"]
    }
  ],
  projects: [
    {
      title: 'E-commerce Data Pipeline',
      description: 'Real-time product ingestion and price tracking system for major marketplaces.',
      label: 'Python | FastAPI | AWS',
      image: '/projects/placeholder.jpg'
    },
    {
      title: 'GenAI LMS Integration',
      description: 'RAG-based features for educational platforms using LLMs and vector databases.',
      label: 'Python | LangChain | OpenAI',
      image: '/projects/placeholder.jpg'
    },
    {
      title: 'Distributed Web Scraper',
      description: 'High-performance scraper for large-scale data extraction with proxy rotation.',
      label: 'FastAPI | Redis | Docker',
      image: '/projects/placeholder.jpg'
    },
    {
      title: 'Portfolio v2',
      description: 'Liquid Glass aesthetics with Next.js and GSAP animations.',
      label: 'Next.js | GSAP | Tailwind',
      image: '/projects/placeholder.jpg'
    },
    {
      title: 'Enterprise Budget System',
      description: 'Modernizing mission-critical financial software with optimized SQL queries.',
      label: '.NET | SQL Server | React',
      image: '/projects/placeholder.jpg'
    },
    {
      title: 'Serverless Image Engine',
      description: 'Automated image processing pipeline with event-driven architecture.',
      label: 'AWS Lambda | S3 | Python',
      image: '/projects/placeholder.jpg'
    },
  ],
  seo: {
    title: "Steven Mendez | Backend & AI Engineer",
    description: "Explore the portfolio of Steven Mendez, a Backend Engineer specialized in Python, FastAPI, AWS, and AI-enabled backend systems.",
    url: SITE_URL,
    image: OG_IMAGE_PATH,
    keywords: [
      "Backend Engineer",
      "Python Developer",
      "FastAPI",
      "AWS Cloud Architect",
      "Generative AI Specialist",
      "LLMs & RAG Architectures",
      "Data Pipelines Engineer",
      "Scalable API Design",
      "Nicaragua Tech Talent",
      "Remote Backend Developer"
    ],
    twitterHandle: "@Steven-Mendez",
    siteName: "Steven Mendez Portfolio",
    locale: "en_US",
    type: "website"
  }
};
