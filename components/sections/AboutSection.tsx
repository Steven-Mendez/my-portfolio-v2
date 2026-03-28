"use client";

import React from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import ProfileCard from '../ProfileCard';

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionTitle 
        title="About Me" 
        subtitle="The Human Factor" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 max-w-5xl mx-auto mt-8 items-start">
        
        {/* Profile Card - Top on mobile, Right on desktop */}
        <div className="flex justify-center lg:justify-end lg:sticky lg:top-32 lg:order-last mt-4 lg:mt-0">
          <ProfileCard
            avatarUrl="/linkedin_photo.png"
            miniAvatarUrl="/linkedin_photo.png"
            name="Steven Mendez"
            title="Mid-Level Backend Engineer"
            handle="steven-mendez"
            status="Open to Work"
            contactText="Get in Touch"
            onContactClick={() => window.location.href = 'mailto:stevenampaiz@gmail.com'}
            showUserInfo={true}
            enableTilt={true}
            innerGradient="linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)"
            behindGlowColor="rgba(255, 255, 255, 0.05)"
          />
        </div>

        {/* Editorial Text & Chips - Bottom on mobile, Left on desktop */}
        <div className="flex flex-col space-y-10 md:space-y-16">
          
          <div className="space-y-6 md:space-y-8">
            <p className="text-xl md:text-3xl lg:text-4xl text-[#f4f6ff] font-light leading-snug tracking-tight drop-shadow-lg">
              I am a Backend Engineer specializing in building scalable APIs, cloud infrastructure, and AI-driven applications.
            </p>
            <p className="text-lg md:text-xl text-[#e2e8f0] font-normal leading-relaxed drop-shadow-md brightness-110">
              Currently, I focus on developing the backend services that power complex multi-vendor data pipelines and AI integrations. Whether I am building external integrations or optimizing internal database interactions, I thrive on translating technical requirements into clean, high-performance, and resilient code.
            </p>
          </div>

          {/* Integrated Contact Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <a href="mailto:stevenampaiz@gmail.com" className="flex items-center justify-center rounded-full px-4 py-2.5 md:px-6 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs md:text-sm font-medium">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              stevenampaiz@gmail.com
            </a>
            
            <a href="https://github.com/Steven-Mendez" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full px-4 py-2.5 md:px-6 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs md:text-sm font-medium">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </a>

            <a href="https://linkedin.com/in/steven-mendez-dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full px-4 py-2.5 md:px-6 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs md:text-sm font-medium">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>

            <a href="/resume.pdf" download="Steven_Mendez_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full px-4 py-2.5 md:px-6 md:py-3 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white backdrop-blur-md transition-all shadow-lg text-xs md:text-sm font-medium">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Resume (PDF)
            </a>
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
