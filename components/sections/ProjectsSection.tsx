"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';

// Dynamically import heavy interaction component
const MagicBento = dynamic(() => import('../MagicBento'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-white/5 rounded-3xl" />
});

const projectsData = [
  {
    color: '#0a0a1a',
    title: 'E-commerce Data Pipeline',
    description: 'Real-time product ingestion and price tracking system for major marketplaces.',
    label: 'Python | FastAPI | AWS',
    image: '/projects/placeholder.jpg'
  },
  {
    color: '#0a0a1a',
    title: 'GenAI LMS Integration',
    description: 'RAG-based features for educational platforms using LLMs and vector databases.',
    label: 'Python | LangChain | OpenAI',
    image: '/projects/placeholder.jpg'
  },
  {
    color: '#0a0a1a',
    title: 'Distributed Web Scraper',
    description: 'High-performance scraper for large-scale data extraction with proxy rotation.',
    label: 'FastAPI | Redis | Docker',
    image: '/projects/placeholder.jpg'
  },
  {
    color: '#0a0a1a',
    title: 'Portfolio v2',
    description: 'Liquid Glass aesthetics with Next.js and GSAP animations.',
    label: 'Next.js | GSAP | Tailwind',
    image: '/projects/placeholder.jpg'
  },
  {
    color: '#0a0a1a',
    title: 'Enterprise Budget System',
    description: 'Modernizing mission-critical financial software with optimized SQL queries.',
    label: '.NET | SQL Server | React',
    image: '/projects/placeholder.jpg'
  },
  {
    color: '#0a0a1a',
    title: 'Serverless Image Engine',
    description: 'Automated image processing pipeline with event-driven architecture.',
    label: 'AWS Lambda | S3 | Python',
    image: '/projects/placeholder.jpg'
  },
];

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <SectionTitle 
        title="Projects" 
        subtitle="Independent Projects & Technical Curiosity" 
      />
      <div className="flex justify-center">
        <MagicBento 
          items={projectsData} 
          glowColor="255, 255, 255" // Clean white spotlight glow to match glass
          enableTilt={true}
          enableStars={false}
          className="w-full"
        />
      </div>
    </SectionWrapper>
  );
}
