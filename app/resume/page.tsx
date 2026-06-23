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
  const sectionTitleClass =
    "mb-2 border-b border-zinc-300 pb-1 text-[11.5px] leading-none font-bold tracking-[0.14em] text-zinc-900 uppercase";
  const rowClass = "flex items-baseline justify-between gap-4";
  const bulletListClass =
    "mt-1 ml-[15px] list-disc list-outside space-y-[3px] text-[10.5px] leading-[1.4] text-zinc-800 marker:text-zinc-400";

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
            padding-left: 1.4cm;
            padding-right: 1.4cm;
          }
          /* Keep a job/project block from being split across two pages. */
          .resume-block {
            break-inside: avoid;
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
      <div className="min-h-screen bg-zinc-200/80 py-8 font-sans text-zinc-900 print:block print:h-auto print:min-h-0 print:bg-white print:py-0">
        <main className="mx-auto max-w-[820px] bg-white px-10 py-9 shadow-[0_16px_40px_rgba(0,0,0,0.2)] ring-1 ring-black/10 print:max-w-none print:px-0 print:py-0 print:shadow-none print:ring-0">

          <div className="mb-4 flex justify-end font-sans print:hidden">
            <PrintButton />
          </div>

          {/* ---------- Header ---------- */}
          <header className="mb-4 border-b-2 border-zinc-900 pb-3 text-center">
            <h1 className="text-[34px] leading-none font-bold tracking-[0.02em] text-zinc-900">
              Steven Mendez
            </h1>
            <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {portfolioData.profile.role}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10.5px] leading-tight text-zinc-700">
              <span>Managua, Nicaragua (UTC&#8722;6)</span>
              <span className="text-zinc-300">|</span>
              <a href={`mailto:${portfolioData.profile.contactEmail}`} className="text-zinc-700 hover:underline">{portfolioData.profile.contactEmail}</a>
              <span className="text-zinc-300">|</span>
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:underline">linkedin.com/in/steven-mendez-dev</a>
              <span className="text-zinc-300">|</span>
              <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:underline">github.com/Steven-Mendez</a>
              <span className="text-zinc-300">|</span>
              <a href={portfolioData.seo.url} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:underline">stevenampaiz.com</a>
            </div>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.1em] text-zinc-500">
              Remote &middot; Available for US time zones, flexible for EU
            </p>
          </header>

          {/* ---------- Summary ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Professional Summary</h2>
            <p className="text-[11px] leading-[1.45] text-zinc-800">
              Full Stack Engineer with 3+ years building and shipping production systems &mdash; Python (FastAPI/Django) APIs
              and data pipelines on the back end, and React/Next.js interfaces on the front end. I work across the full
              lifecycle: optimizing SQL over large datasets, integrating LLM/RAG features, and deploying services on AWS.
              I turn complex requirements into clean, scalable solutions and own the work from database to UI.
            </p>
          </section>

          {/* ---------- Skills ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Technical Skills</h2>
            <div className="space-y-[3px] text-[10.5px] leading-[1.35] text-zinc-800">
              <div><strong className="font-semibold text-zinc-900">Languages:</strong> TypeScript / JavaScript, Python, C#, SQL</div>
              <div><strong className="font-semibold text-zinc-900">Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3</div>
              <div><strong className="font-semibold text-zinc-900">Backend:</strong> FastAPI, Django, Flask, ASP.NET, REST APIs, Socket.IO, Pydantic, SQLAlchemy</div>
              <div><strong className="font-semibold text-zinc-900">AI &amp; Data:</strong> LLM/RAG integration, LangChain/LangGraph, vector databases (pgvector, Qdrant), data pipelines, web scraping</div>
              <div><strong className="font-semibold text-zinc-900">Cloud &amp; DevOps:</strong> AWS, Docker, CI/CD, Git</div>
              <div><strong className="font-semibold text-zinc-900">Databases:</strong> PostgreSQL, Microsoft SQL Server, Redis</div>
            </div>
          </section>

          {/* ---------- Experience ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Experience</h2>

            <article className="resume-block mb-3">
              <div className={rowClass}>
                <h3 className="text-[12.5px] font-bold text-zinc-900">Dupely</h3>
                <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">Dec 2025 &ndash; May 2026</span>
              </div>
              <div className={`${rowClass} mt-0.5`}>
                <p className="text-[11px] italic text-zinc-600">Backend Engineer &middot; Contract via WERN</p>
                <span className="text-[11px] italic whitespace-nowrap text-zinc-600">Remote</span>
              </div>
              <ul className={bulletListClass}>
                <li>Built high-performance REST APIs in Python and FastAPI to serve real-time product data to a shopping-assistant browser extension and mobile app that flag price inflation and surface better-value alternatives.</li>
                <li>Designed and maintained multi-vendor data pipelines ingesting product details, pricing history, and availability from major marketplaces (Amazon, Walmart, eBay) &mdash; indexing 5K&ndash;10K products during the beta phase &mdash; with caching and fallback handling to reduce reliance on third-party providers.</li>
                <li>Delivered real-time backend events over Socket.IO and enrichment APIs (reviews, availability, similarity explanations) for a responsive client experience.</li>
                <li>Worked within a ~10-engineer team, integrating third-party data providers (Bright Data, Keepa) and managing persistence across PostgreSQL, Redis, and Qdrant on AWS.</li>
              </ul>
            </article>

            <article className="resume-block mb-3">
              <div className={rowClass}>
                <h3 className="text-[12.5px] font-bold text-zinc-900">Confidential B2B Platform</h3>
                <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">Dec 2024 &ndash; Nov 2025</span>
              </div>
              <div className={`${rowClass} mt-0.5`}>
                <p className="text-[11px] italic text-zinc-600">Full Stack &amp; AI Engineer &middot; via WERN</p>
                <span className="text-[11px] italic whitespace-nowrap text-zinc-600">Remote</span>
              </div>
              <ul className={bulletListClass}>
                <li>Built full-stack features for an AI-powered B2B platform &mdash; user-facing interfaces in Next.js, React, and TypeScript backed by Python (FastAPI/Django) services.</li>
                <li>Designed and shipped, end to end, a node-and-connector visual configuration tool (Next.js/React/TypeScript) that lets non-technical users configure conversational-agent behavior across scenarios &mdash; a core part of the platform.</li>
                <li>Integrated LLM/RAG capabilities: retrieval over domain content with vector search (pgvector) and agent/tool orchestration (LangChain/LangGraph) to ground assistant responses.</li>
              </ul>
            </article>

            <article className="resume-block">
              <div className={rowClass}>
                <h3 className="text-[12.5px] font-bold text-zinc-900">Universidad Nacional de Ingeniería (UNI)</h3>
                <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">Feb 2023 &ndash; Dec 2024</span>
              </div>
              <div className={`${rowClass} mt-0.5`}>
                <p className="text-[11px] italic text-zinc-600">Systems Analyst</p>
                <span className="text-[11px] italic whitespace-nowrap text-zinc-600">Managua, Nicaragua &middot; On-site</span>
              </div>
              <ul className={bulletListClass}>
                <li>Maintained and modernized the university&apos;s mission-critical ASP.NET / SQL Server budget system, used by 400&ndash;700 staff across the institution with peaks of 100&ndash;200 concurrent users.</li>
                <li>Optimized complex SQL Server queries over a decade of accumulated financial data &mdash; cutting a critical report from ~20 minutes to 15&ndash;30 seconds, and most heavy queries from ~5 minutes to under 10 seconds.</li>
                <li>Proposed and prototyped a React.js front-end architecture to modernize the legacy UI, improving maintainability and user experience.</li>
                <li>Mentored 5&ndash;10 interns, introducing modern development practices and clean-code standards to the team.</li>
              </ul>
            </article>
          </section>

          {/* ---------- Projects ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Selected Project</h2>
            <article className="resume-block">
              <div className={rowClass}>
                <h3 className="text-[12px] font-bold text-zinc-900">
                  Personal Portfolio{' '}
                  <a href={portfolioData.seo.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-normal italic text-zinc-600 hover:underline">stevenampaiz.com</a>
                </h3>
                <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">Next.js &middot; React &middot; TypeScript &middot; GSAP &middot; WebGL</span>
              </div>
              <ul className={bulletListClass}>
                <li>Designed and built a liquid-glass personal site with WebGL/GSAP motion, full SEO and structured data, and CI-enforced accessibility &amp; SEO budgets (Lighthouse CI gated at &ge;95); optimized the hero image from 19&nbsp;MB to 446&nbsp;KB (~98% smaller).</li>
              </ul>
            </article>
          </section>

          {/* ---------- Education ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Education</h2>
            <article className="resume-block">
              <div className={rowClass}>
                <h3 className="text-[12px] font-bold text-zinc-900">Universidad Nacional de Ingeniería</h3>
                <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">Mar 2019 &ndash; Dec 2023</span>
              </div>
              <div className={`${rowClass} mt-0.5`}>
                <p className="text-[11px] italic text-zinc-600">B.S. in Computer Engineering</p>
                <span className="text-[11px] italic whitespace-nowrap text-zinc-600">Managua, Nicaragua</span>
              </div>
            </article>
          </section>

          {/* ---------- Languages ---------- */}
          <section>
            <h2 className={sectionTitleClass}>Languages</h2>
            <p className="text-[10.5px] leading-[1.4] text-zinc-800">
              <strong className="font-semibold text-zinc-900">Spanish</strong> &mdash; Native
              <span className="mx-2 text-zinc-300">|</span>
              <strong className="font-semibold text-zinc-900">English</strong> &mdash; Professional working proficiency (CEFR&nbsp;B2)
            </p>
          </section>

        </main>
      </div>
    </>
  );
}
