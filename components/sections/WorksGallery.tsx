"use client";

import React from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import MagicBento from '../MagicBento';

const worksData = [
  {
    color: '#0a0a1a',
    title: 'FinTech Dashboard',
    description: 'High-performance React dashboard with real-time WebSocket updates. Optimized rendering for 10k+ data points.',
    label: 'React | TypeScript | D3.js',
  },
  {
    color: '#0a0a1a',
    title: 'E-commerce API',
    description: 'Full stack e-commerce solution with FastAPI backend, React frontend, and Redis caching.',
    label: 'Python | FastAPI | React',
  },
  {
    color: '#0a0a1a',
    title: 'AI Image Processor',
    description: 'Serverless architecture for heavy image processing using AWS Lambda and S3.',
    label: 'Node.js | AWS | Terraform',
  },
  {
    color: '#0a0a1a',
    title: 'Portfolio v2',
    description: 'Liquid glass aesthetic with GSAP animations and Next.js 14 App Router.',
    label: 'Next.js | GSAP | Tailwind',
  },
  {
    color: '#0a0a1a',
    title: 'Auth Microservice',
    description: 'Robust JWT-based authentication system with OAuth2 integration and rate limiting.',
    label: 'Go | PostgreSQL | Redis',
  },
  {
    color: '#0a0a1a',
    title: 'Task Management',
    description: 'Collaborative task manager with real-time syncing and offline support.',
    label: 'React | Firebase | PWA',
  },
];

export default function WorksGallery() {
  return (
    <SectionWrapper id="works">
      <SectionTitle 
        title="Works" 
        subtitle="Narrative & Evidence Based Projects" 
      />
      <div className="flex justify-center">
        <MagicBento 
          items={worksData} 
          glowColor="0, 80, 255" // Matching the blue from ColorBends
          enableTilt={true}
          className="max-w-6xl"
        />
      </div>
    </SectionWrapper>
  );
}
