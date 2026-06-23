import React from 'react';
import { Metadata } from 'next';
import PrintButton from './PrintButton';
import { portfolioData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${portfolioData.profile.role} resume of ${portfolioData.profile.fullName}. Building React/Next.js front ends and Python (FastAPI/Django) back ends, with data-pipeline and LLM/RAG experience on AWS.`,
  alternates: {
    canonical: '/resume',
  },
};

export default function ResumePage() {
  const sectionTitleClass = "mb-1.5 border-b border-black pb-0.5 text-[13px] leading-none font-bold tracking-[0.05em] text-black uppercase";
  const rowClass = "flex items-baseline justify-between gap-4";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 0; }
          html, body {
            background: #ffffff !important;
          }
          body {
            padding-top: 1cm;
            padding-bottom: 1cm;
            padding-left: 1.5cm;
            padding-right: 1.5cm;
          }
          /* Force the white sheet (and colors) to print even when the browser's
             "Background graphics" option is off — otherwise the PDF exports with
             a transparent background. */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}} />
      <div className="min-h-screen bg-zinc-200/80 py-8 font-serif text-black print:block print:min-h-0 print:h-auto print:bg-white print:py-0">
        <main className="mx-auto max-w-[850px] bg-white px-9 py-7 shadow-[0_16px_40px_rgba(0,0,0,0.2)] ring-1 ring-black/10 print:max-w-none print:px-0 print:py-0 print:shadow-none print:ring-0">

          <div className="flex justify-end mb-3 print:hidden font-sans">
            <PrintButton />
          </div>

          <header className="mb-3 text-center">
            <h1 className="text-[42px] leading-none font-semibold tracking-[0.015em] text-black">Steven Mendez</h1>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-black/70">{portfolioData.profile.role}</p>
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[12px] leading-tight">
              <span>Managua, Nicaragua</span>
              <span>|</span>
              <a href={`mailto:${portfolioData.profile.contactEmail}`} className="text-black hover:underline">{portfolioData.profile.contactEmail}</a>
              <span>|</span>
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">linkedin.com/in/steven-mendez-dev</a>
              <span>|</span>
              <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">github.com/Steven-Mendez</a>
            </div>
          </header>

          <section className="mb-3">
            <h2 className={sectionTitleClass}>Professional Summary</h2>
            <p className="text-[11.5px] leading-[1.4] text-black">
              Full Stack Engineer who builds and ships production systems end to end — Python (FastAPI/Django) APIs and data
              pipelines on the back end, and React/Next.js interfaces on the front end. Starting from enterprise software
              (C#/.NET, SQL Server), I have evolved toward high-performance, data-intensive services with LLM/RAG integrations
              on AWS. I turn complex technical requirements into clean, efficient, and scalable full-stack solutions — owning
              the work from database query to user interface.
            </p>
          </section>

          <section className="mb-3">
            <h2 className={sectionTitleClass}>Technical Skills</h2>
            <div className="space-y-0.5 text-[11px] leading-[1.3]">
              <div><strong className="font-semibold">Languages &amp; Frameworks:</strong> Python (FastAPI, Django), C# (.NET), JavaScript/TypeScript (React, Next.js), SQL</div>
              <div><strong className="font-semibold">Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS</div>
              <div><strong className="font-semibold">AI &amp; Data:</strong> Generative AI integrations, LLMs, RAG, vector databases, data pipelines, web scraping</div>
              <div><strong className="font-semibold">Cloud &amp; Databases:</strong> AWS, PostgreSQL, Microsoft SQL Server, Redis, Docker</div>
              <div><strong className="font-semibold">Practices:</strong> REST API &amp; system design, microservices patterns, CI/CD, Clean Code</div>
            </div>
          </section>

          <section className="mb-3">
            <h2 className={sectionTitleClass}>Experience</h2>

            <article className="mb-2.5 text-[11.5px] text-black leading-[1.28]">
              <div className={rowClass}>
                <h3 className="font-bold text-[13px]">Dupely</h3>
                <span className="font-bold whitespace-nowrap text-[12px]">Dec 2025 – Apr 2026</span>
              </div>
              <div className={`${rowClass} mb-0.5`}>
                <p className="italic text-[12px]">Backend Engineer (Contract)</p>
                <span className="italic text-[12px] whitespace-nowrap">Remote</span>
              </div>
              <ul className="ml-4 list-disc list-outside space-y-0.5 text-[11px] leading-[1.28]">
                <li>Contracted through WERN as a Backend Engineer for a real-time shopping assistant (browser extension and mobile app) that detects price inflation and surfaces better-value product alternatives.</li>
                <li>Programmed high-performance RESTful APIs using Python and FastAPI for the efficient injection and extraction of product data to serve real-time requests.</li>
                <li>Built and maintained multi-vendor data pipelines that continuously ingest product information, pricing history, and features from major marketplaces (Amazon, Walmart, eBay), with caching and fallback handling to reduce third-party dependency.</li>
                <li>Delivered real-time events (Socket.IO) and enrichment APIs, and optimized queries and infrastructure for fast, reliable data retrieval.</li>
              </ul>
            </article>

            <article className="mb-2.5 text-[11.5px] text-black leading-[1.28]">
              <div className={rowClass}>
                <h3 className="font-bold text-[13px]">WERN</h3>
                <span className="font-bold whitespace-nowrap text-[12px]">Dec 2024 – Present</span>
              </div>
              <div className={`${rowClass} mb-0.5`}>
                <p className="italic text-[12px]">Full Stack &amp; AI Engineer</p>
                <span className="italic text-[12px] whitespace-nowrap">Remote</span>
              </div>
              <ul className="ml-4 list-disc list-outside space-y-0.5 text-[11px] leading-[1.28]">
                <li>As an agency engineer, deployed to high-impact technology projects spanning full-stack development, cloud infrastructure, and Generative AI integrations.</li>
                <li><strong>Assignment (Dec 2025 – Apr 2026):</strong> Deployed to Dupely, building scalable e-commerce data pipelines and AWS services.</li>
                <li><strong>Assignment (2025):</strong> For a confidential B2B client, built Generative AI features using LLMs and RAG architectures, and shipped front-end tooling in Next.js/React plus an embedded IDE assistant in VS Code (Webview API).</li>
                <li>Developed scalable full-stack applications and REST APIs across multiple client environments using Python, FastAPI, Django, React, and Next.js.</li>
              </ul>
            </article>

            <article className="text-[11.5px] text-black leading-[1.28]">
              <div className={rowClass}>
                <h3 className="font-bold text-[13px]">Universidad Nacional de Ingeniería</h3>
                <span className="font-bold whitespace-nowrap text-[12px]">Feb 2023 – Dec 2024</span>
              </div>
              <div className={`${rowClass} mb-0.5`}>
                <p className="italic text-[12px]">Systems Analyst &amp; Full Stack Developer</p>
                <span className="italic text-[12px] whitespace-nowrap">Managua, Nicaragua</span>
              </div>
              <ul className="ml-4 list-disc list-outside space-y-0.5 text-[11px] leading-[1.28]">
                <li>Played a key role in supporting and modernizing the university&apos;s mission-critical internal systems, focusing on the core enterprise application used for budget management and administrative operations.</li>
                <li>Maintained and enhanced a legacy ASP.NET enterprise system responsible for the university&apos;s financial and operational continuity.</li>
                <li>Proposed and prototyped new front-end architectures using React.js to improve maintainability and user experience, acting as a technical mentor introducing modern development practices.</li>
                <li>Achieved significant system performance improvements by analyzing, refactoring, and optimizing complex Microsoft SQL Server queries.</li>
              </ul>
            </article>
          </section>

          <section>
            <h2 className={sectionTitleClass}>Education</h2>
            <article className="text-[11.5px] leading-[1.3] text-black">
              <div className={rowClass}>
                <h3 className="text-[13px] font-bold">Universidad Nacional de Ingeniería</h3>
                <span className="text-[12px] font-bold whitespace-nowrap">March 2019 – Dec 2023</span>
              </div>
              <div className={rowClass}>
                <p className="italic text-[12px]">B.S. in Computer Engineering</p>
                <span className="italic text-[12px] whitespace-nowrap">Managua, Nicaragua</span>
              </div>
            </article>
          </section>

        </main>
      </div>
    </>
  );
}
