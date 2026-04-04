import dynamic from "next/dynamic"
import { Suspense } from "react"
import Navbar from "@/components/hero/Navbar"
import HeroLiquidGlass from "@/components/hero/HeroLiquidGlass"
import { Metadata } from "next"

// Dynamically import heavy sections
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"), {
  loading: () => <div className="min-h-[600px] w-full animate-pulse bg-white/5" />
})
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  loading: () => <div className="min-h-[600px] w-full animate-pulse bg-white/5" />
})
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  loading: () => <div className="min-h-[600px] w-full animate-pulse bg-white/5" />
})


// Dynamically import heavy WebGL/Canvas components
import ColorBendsWrapper from "@/components/ColorBendsWrapper"

export const metadata: Metadata = {
  title: "Steven Mendez | Mid-Level Backend & Gen AI Engineer",
  description: "Explore the portfolio of Steven Mendez, a Mid-Level Backend Engineer specialized in Python, FastAPI, AWS, and Generative AI. Building scalable data pipelines and AI solutions.",
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Steven Mendez",
    "url": "https://stevenmendez.dev",
    "image": "https://stevenmendez.dev/linkedin_photo.png",
    "sameAs": [
      "https://github.com/Steven-Mendez",
      "https://linkedin.com/in/steven-mendez-dev"
    ],
    "jobTitle": "Mid-Level Backend Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Dupely / WERN"
    },
    "description": "Mid-Level Backend Engineer specializing in Python, FastAPI, AWS, and Generative AI. Expert in building scalable data pipelines and RAG architectures.",
    "knowsAbout": ["Python", "FastAPI", "AWS", "Generative AI", "LLMs", "RAG", "Data Pipelines", "React", "SQL Server"]
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Component */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ColorBendsWrapper
          colors={["#04020c", "#0050FF", "#5a5e40"]}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
          autoRotate={0}
        />
      </div>

      {/* FIXED Navbar */}
      <Navbar />

      {/* 1. Hero Header */}
      <section id="hero" className="min-h-screen">
        <HeroLiquidGlass />
      </section>

      {/* 2. Experience (Profesional) */}
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-[600px] w-full animate-pulse bg-white/5" />}>
          <ExperienceSection />
        </Suspense>
      </div>

      {/* 3. Projects (Personal) */}
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-[600px] w-full animate-pulse bg-white/5" />}>
          <ProjectsSection />
        </Suspense>
      </div>

      {/* 4. About Me (Human) */}
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-[600px] w-full animate-pulse bg-white/5" />}>
          <AboutSection />
        </Suspense>
      </div>



      <footer className="py-12 text-center text-[#d2dcff]/20 text-xs font-mono uppercase tracking-[0.2em] bg-transparent">
        © 2026 Steven Mendez — Software Developer
      </footer>
    </main>
  )
}
