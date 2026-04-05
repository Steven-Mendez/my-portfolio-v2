import dynamic from "next/dynamic"
import { Suspense } from "react"
import Navbar from "@/components/hero/Navbar"
import HeroLiquidGlass from "@/components/hero/HeroLiquidGlass"
import { Metadata } from "next"
import { portfolioData } from "@/lib/data"

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
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: portfolioData.seo.title,
  description: portfolioData.seo.description,
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": portfolioData.profile.fullName,
    "url": portfolioData.seo.url,
    "image": `${portfolioData.seo.url}${portfolioData.profile.avatarUrl}`,
    "sameAs": [
      portfolioData.socials.github,
      portfolioData.socials.linkedin
    ],
    "jobTitle": portfolioData.profile.role,
    "worksFor": {
      "@type": "Organization",
      "name": "WERN / Dupely"
    },
    "description": portfolioData.seo.description,
    "knowsAbout": portfolioData.seo.keywords,
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Universidad Nacional de Ingeniería (UNI)"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Managua",
      "addressCountry": "Nicaragua"
    }
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



      <Footer />
    </main>
  )
}
