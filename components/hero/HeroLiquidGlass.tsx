"use client";

import { ArrowRight } from "lucide-react"
import ProfileCard from "../ProfileCard"
import { portfolioData } from "@/lib/data"

export default function HeroLiquidGlass() {
  return (
    <section 
      className="relative z-10 pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-center justify-between min-h-[90vh] font-space"
      aria-labelledby="hero-title"
    >
      <div className="w-full md:w-1/2 animate-in slide-in-from-bottom-8 duration-700 fade-in">
        {/* Role tag styled like Stitch module headers */}
        <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-primary/40"></span>
            <p className="font-mono text-sm tracking-[0.2em] uppercase text-primary">
              {portfolioData.profile.role}
            </p>
        </div>

        {/* Massive Name matching Stitch's typography scale */}
        <h1 
          id="hero-title" 
          className="text-6xl md:text-[6rem] lg:text-[7.5rem] font-bold leading-[0.9] tracking-tighter text-foreground"
        >
          {portfolioData.profile.firstName} <br/> <span className="text-white">{portfolioData.profile.lastName}</span>
        </h1>
        
        {/* Restored CTAs styled to fit the new aesthetic */}
        <div className="flex flex-wrap items-center gap-3 mt-12 md:mt-20">
            <a 
              href="#experience" 
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-4 md:py-3 text-[10px] md:text-xs tracking-[0.2em] font-bold hover:scale-[1.02] transition-all rounded-full group shadow-lg"
            >
                VIEW EXPERIENCE
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full px-4 py-2.5 md:px-5 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs font-medium group">
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </a>

            <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full px-4 py-2.5 md:px-5 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs font-medium group">
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 text-[#0077b5] transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>

            <a href="/resume.pdf" download={`${portfolioData.profile.fullName.replace(' ', '_')}_Resume.pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full px-4 py-2.5 md:px-5 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs font-medium group">
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 text-emerald-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Resume (PDF)
            </a>
        </div>
      </div>

      {/* Right Side - Profile Card */}
      <div className="w-full md:w-1/2 flex justify-center lg:justify-end animate-in slide-in-from-right-8 duration-700 fade-in delay-300 fill-mode-both relative z-20">
          <ProfileCard
            avatarUrl={portfolioData.profile.avatarUrl}
            handle={portfolioData.profile.handle}
            contactText="Get in Touch"
            onContactClick={() => window.location.href = `mailto:${portfolioData.profile.contactEmail}`}
            showUserInfo={true}
            enableTilt={true}
            innerGradient="linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)"
            behindGlowColor="rgba(255, 255, 255, 0.05)"
          />
      </div>
    </section>
  )
}
