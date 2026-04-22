import React from 'react';
import { Metadata } from 'next';
import PrintButton from './PrintButton';
import { portfolioData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Backend Engineer resume of Steven Mendez. Specializing in Python, FastAPI, AWS, and AI-enabled backend systems.',
  alternates: {
    canonical: '/resume',
  },
};

export default function ResumePage() {
  const sectionTitleClass = "mb-1 border-b border-black pb-0.5 text-[13px] leading-none font-bold tracking-[0.05em] text-black uppercase";
  const rowClass = "flex items-baseline justify-between gap-4";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 0; }
          body { 
            padding-top: 1cm;
            padding-bottom: 1cm;
            padding-left: 1.5cm;
            padding-right: 1.5cm;
            background: white;
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
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 text-[12px] leading-tight">
              <a href={`mailto:${portfolioData.profile.contactEmail}`} className="text-black hover:underline">{portfolioData.profile.contactEmail}</a>
              <span>|</span>
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">linkedin.com/in/steven-mendez-dev</a>
              <span>|</span>
              <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">github.com/Steven-Mendez</a>
            </div>
          </header>

          <section className="mb-3">
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

          <section className="mb-3">
            <h2 className={sectionTitleClass}>Experience</h2>
            
            <article className="mb-2.5 text-[11.5px] text-black leading-[1.28]">
              <div className={rowClass}>
                <h3 className="font-bold text-[13px]">Dupely</h3>
                <span className="font-bold whitespace-nowrap text-[12px]">Dec 2025 – Apr 2026</span>
              </div>
              <div className={`${rowClass} mb-0.5`}>
                <p className="italic text-[12px]">Backend Engineer</p>
                <span className="italic text-[12px] whitespace-nowrap">Remote</span>
              </div>
              <ul className="ml-4 list-disc list-outside space-y-0.5 text-[11px] leading-[1.28]">
                <li>Contracted through WERN as a Software Engineer for a real-time shopping assistant that detects price inflation and surfaces better-value product alternatives.</li>
                <li>Programmed high-performance RESTful APIs using Python and FastAPI, focusing on the efficient injection and extraction of product data to serve real-time requests.</li>
                <li>Built and maintained robust data pipelines to continuously ingest product information, pricing history, and features from major marketplaces.</li>
                <li>Executed end-to-end development based on technical requirements, including database management and query optimization for fast retrieval.</li>
              </ul>
            </article>

            <article className="mb-2.5 text-[11.5px] text-black leading-[1.28]">
              <div className={rowClass}>
                <h3 className="font-bold text-[13px]">WERN</h3>
                <span className="font-bold whitespace-nowrap text-[12px]">Dec 2024 – Present</span>
              </div>
              <div className={`${rowClass} mb-0.5`}>
                <p className="italic text-[12px]">Backend & AI Engineer</p>
                <span className="italic text-[12px] whitespace-nowrap">Remote</span>
              </div>
              <ul className="ml-4 list-disc list-outside space-y-0.5 text-[11px] leading-[1.28]">
                <li>At WERN, I contribute to high-impact client projects focused on backend development, cloud infrastructure, and Generative AI integrations.</li>
                <li><strong>Assignment (Dec 2025 - Apr 2026):</strong> Deployed to Dupely, building scalable e-commerce data pipelines and AWS services.</li>
                <li><strong>Previous Assignment (Jan 2025 - Nov 2025):</strong> Deployed to a confidential B2B client. Built GenAI features and LMS integrations using LLMs and RAG architectures.</li>
                <li>Developed scalable backend applications and REST APIs across multiple client environments using Python, FastAPI, and Django.</li>
              </ul>
            </article>

            <article className="text-[11.5px] text-black leading-[1.28]">
              <div className={rowClass}>
                <h3 className="font-bold text-[13px]">Universidad Nacional de Ingeniería</h3>
                <span className="font-bold whitespace-nowrap text-[12px]">Feb 2023 – Dec 2024</span>
              </div>
              <div className={`${rowClass} mb-0.5`}>
                <p className="italic text-[12px]">Systems Analyst</p>
                <span className="italic text-[12px] whitespace-nowrap">Managua, Nicaragua</span>
              </div>
              <ul className="ml-4 list-disc list-outside space-y-0.5 text-[11px] leading-[1.28]">
                <li>Played a key role in supporting and modernizing the university&apos;s mission-critical internal systems, specifically focusing on the core enterprise application used for budget management and vital administrative operations.</li>
                <li>Maintained and enhanced a legacy ASP.NET enterprise system responsible for the university&apos;s financial and operational continuity.</li>
                <li>Acted as a technical mentor within the team, introducing modern development practices and proposing new frontend architectures using React.js to improve maintainability and user experience.</li>
                <li>Achieved significant system performance improvements by analyzing, refactoring, and optimizing complex Microsoft SQL Server queries.</li>
                <li>Bridged the gap between legacy infrastructure and modern tech stacks, bringing a fresh perspective and scalable solutions to the engineering team&apos;s workflows.</li>
              </ul>
            </article>
          </section>

          <section>
            <h2 className={sectionTitleClass}>Skills</h2>
            <div className="space-y-0.5 text-[11px] leading-[1.28]">
              <div><strong className="font-semibold">Languages:</strong> Python, C#, JavaScript/TypeScript, SQL, HTML/CSS, Bash</div>
              <div><strong className="font-semibold">Tools:</strong> AWS (Lambda, S3, EC2), Git, Docker, PostgreSQL, SQL Server, Redis</div>
              <div><strong className="font-semibold">Frameworks/Libraries:</strong> FastAPI, Django, .NET, React, Next.js, Tailwind CSS</div>
              <div><strong className="font-semibold">Concepts:</strong> Backend Architecture, REST APIs, Data Pipelines, GenAI Integrations, RAG, CI/CD</div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
