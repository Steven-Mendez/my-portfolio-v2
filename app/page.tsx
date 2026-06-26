import Navbar from "@/components/hero/Navbar"
import HeroLiquidGlass from "@/components/hero/HeroLiquidGlass"
import { Metadata } from "next"
import { portfolioData } from "@/lib/data"

// Sections SSR for SEO/LCP; the heavy WebGL/Canvas work is deferred inside
// ColorBendsWrapper and ProjectsSection (MagicBento) via their own client-only
// dynamic imports, so a duplicate Suspense boundary here is unnecessary.
import ExperienceSection from "@/components/sections/ExperienceSection"
import TechMarquee from "@/components/sections/TechMarquee"
import ProjectsSection from "@/components/sections/ProjectsSection"
import AboutSection from "@/components/sections/AboutSection"
import CredentialsSection from "@/components/sections/CredentialsSection"
import ContactSection from "@/components/sections/ContactSection"
import SiteBackground from "@/components/SiteBackground"
import HashScroll from "@/components/HashScroll"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: portfolioData.seo.title,
  description: portfolioData.seo.description,
}

// Static JSON-LD — depends only on module-level portfolioData, so it is built
// once at module scope instead of being rebuilt on every render.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": portfolioData.profile.fullName,
  "url": portfolioData.seo.url,
  "image": `${portfolioData.seo.url}${portfolioData.profile.avatarUrl}`,
  "sameAs": [
    portfolioData.socials.github,
    portfolioData.socials.linkedin,
    portfolioData.socials.upwork
  ],
  "jobTitle": portfolioData.profile.role,
  "email": portfolioData.profile.contactEmail,
  "worksFor": {
    "@type": "Organization",
    "name": "WERN"
  },
  "description": portfolioData.seo.description,
  "knowsAbout": portfolioData.seo.keywords,
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": portfolioData.education[0].institution
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Managua",
    "addressCountry": "Nicaragua"
  }
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen w-full overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Restores hash scrolling after soft navigation from sub-routes. */}
      <HashScroll />

      {/* Signature animated WebGL backdrop (shared with case-study pages). */}
      <SiteBackground />

      {/* FIXED Navbar */}
      <Navbar />

      {/* 1. Hero Header */}
      <section id="hero" className="min-h-screen">
        <HeroLiquidGlass />
      </section>

      {/* Tech marquee — bridges hero → projects */}
      <TechMarquee />

      {/* 2. Projects (Personal) */}
      <div className="relative z-10">
        <ProjectsSection />
      </div>

      {/* 3. Experience (Profesional) */}
      <div className="relative z-10">
        <ExperienceSection />
      </div>

      {/* 4. About Me (Human) */}
      <div className="relative z-10">
        <AboutSection />
      </div>

      {/* 5. Education & Credentials */}
      <div className="relative z-10">
        <CredentialsSection />
      </div>

      {/* 6. Contact */}
      <div className="relative z-10">
        <ContactSection />
      </div>

      <Footer />
    </main>
  )
}
