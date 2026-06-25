"use client";

import { ArrowRight } from "lucide-react"
import { portfolioData } from "@/lib/data"

export default function HeroLiquidGlass() {
  return (
    <section 
      className="relative z-10 pt-32 pb-16 px-6 sm:pt-40 sm:pb-20 md:pt-48 md:pb-24 md:px-12 max-w-7xl mx-auto flex items-center min-h-[85vh] md:min-h-[90vh] font-space"
      aria-labelledby="hero-title"
    >
      <div className="w-full max-w-88 sm:max-w-2xl md:max-w-4xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
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
          className="text-4xl sm:text-5xl md:text-[6rem] lg:text-[7.5rem] font-bold leading-[0.95] md:leading-[0.9] tracking-tighter text-foreground"
        >
          {portfolioData.profile.firstName} <br/> <span className="text-white">{portfolioData.profile.lastName}</span>
        </h1>
        
        {/* Restored CTAs styled to fit the new aesthetic */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 mt-10 md:mt-20">
            <a 
              href="#experience" 
              className="w-full sm:w-auto justify-center flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 md:py-3 text-[10px] md:text-xs tracking-[0.14em] md:tracking-[0.2em] font-bold hover:scale-[1.02] transition-all rounded-full group shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
                VIEW EXPERIENCE
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center rounded-full px-4 py-2.5 md:px-5 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs font-medium group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </a>

            <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center rounded-full px-4 py-2.5 md:px-5 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs font-medium group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 text-[#0077b5] transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>

            <a href={portfolioData.socials.upwork} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center rounded-full px-4 py-2.5 md:px-5 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs font-medium group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 text-[#14a800] transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/></svg>
              Upwork
            </a>

            <a href="/resume" className="w-full sm:w-auto flex items-center justify-center rounded-full px-4 py-2.5 md:px-5 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs font-medium group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 text-emerald-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Resume
            </a>
        </div>
      </div>
    </section>
  )
}
