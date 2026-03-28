import React from 'react';
import { Metadata } from 'next';
import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Full Stack Engineer resume of Steven Mendez. Specializing in Python, FastAPI, AWS, and React.',
};

export default function ResumePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 0; } /* Removes all browser headers/footers */
          body { 
            /* Provide our own padding to replace the removed page margin */
            padding-top: 1cm;
            padding-bottom: 1cm;
            padding-left: 1.5cm;
            padding-right: 1.5cm;
            background: white;
          }
        }
      `}} />
      <div className="bg-gray-100 min-h-screen py-8 print:py-0 print:bg-white text-black font-serif print:min-h-0 print:h-auto print:block">
        <main className="max-w-[800px] mx-auto p-10 bg-white shadow-xl print:shadow-none print:p-0 print:block">
          
          {/* Print Controls */}
          <div className="flex justify-end mb-3 print:hidden font-sans">
            <PrintButton />
          </div>

          {/* 1. Header (H1) */}
          <header className="mb-2 text-center">
            <h1 className="text-2xl font-normal tracking-widest uppercase text-black">Steven Mendez</h1>
            <div className="text-[11px] mt-1 flex flex-wrap justify-center items-center gap-x-2 text-black">
              <span>Managua, Nicaragua</span>
              <span className="hidden sm:inline">•</span>
              <a href="mailto:stevenampaiz@gmail.com" className="hover:underline text-black">stevenampaiz@gmail.com</a>
              <span className="hidden sm:inline">•</span>
              <a href="https://linkedin.com/in/steven-mendez-dev" target="_blank" rel="noopener noreferrer" className="hover:underline text-black">linkedin.com/in/steven-mendez-dev</a>
              <span className="hidden sm:inline">•</span>
              <a href="https://github.com/Steven-Mendez" target="_blank" rel="noopener noreferrer" className="hover:underline text-black">github.com/Steven-Mendez</a>
            </div>
          </header>

          {/* 2. Professional Summary (H2) */}
          <section className="mb-2">
            <h2 className="text-[13px] font-bold border-b border-black pb-0 mb-1 text-black uppercase">Professional Summary</h2>
            <div className="text-[11px] leading-tight text-black text-justify space-y-1">
              <p>
                I am a Mid-Level Backend Engineer specializing in building scalable APIs, cloud infrastructure, and AI-driven applications. With a strong foundation in enterprise software development (.NET, C#, SQL Server), I have evolved my tech stack to focus on high-performance solutions using Python, FastAPI, and AWS.
              </p>
              <p>
                Currently, I focus on developing and maintaining robust backend services that power complex multi-vendor data pipelines and Generative AI integrations. My day-to-day involves programming high-performance APIs, implementing RAG architectures, and ensuring data flows reliably across distributed systems. I thrive on translating complex technical requirements into clean, efficient, and resilient backend solutions.
              </p>
            </div>
          </section>

          {/* 3. Skills (H2) */}
          <section className="mb-2">
            <h2 className="text-[13px] font-bold border-b border-black pb-0 mb-1 text-black uppercase">Technical Skills</h2>
            <div className="text-[11px] leading-tight space-y-0.5 text-black">
              <div><strong className="font-bold">Backend & APIs:</strong> Python (FastAPI, Django), C# (.NET Core), RESTful APIs Design</div>
              <div><strong className="font-bold">AI & Data:</strong> Generative AI integrations, LLMs (GPT, Claude), RAG architectures, Data Pipelines</div>
              <div><strong className="font-bold">Cloud & Databases:</strong> AWS (Lambda, S3, EC2), Microsoft SQL Server, PostgreSQL, Redis</div>
              <div><strong className="font-bold">Practices:</strong> System Design, Microservices, Clean Architecture, CI/CD, Mentorship</div>
              <div><strong className="font-bold">Frontend (Complementary):</strong> JavaScript/TypeScript, React, Next.js, Tailwind CSS</div>
            </div>
          </section>

          {/* 4. Experience (H2) */}
          <section className="mb-2">
            <h2 className="text-[13px] font-bold border-b border-black pb-0 mb-1 text-black uppercase">Experience</h2>
            
            {/* Dupely */}
            <article className="mb-2 text-[11px] text-black">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">Dupely</h3>
                <span className="font-bold">Dec 2025 – Present</span>
              </div>
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="italic">Software Engineer (Backend Focus)</p>
                <span className="italic">Remote</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-0.5 leading-tight">
                <li>Contracted through WERN as a Software Engineer for a real-time shopping assistant that detects price inflation and surfaces better-value product alternatives.</li>
                <li>Programmed high-performance RESTful APIs using Python and FastAPI, focusing on the efficient injection and extraction of product data to serve real-time requests.</li>
                <li>Built and maintained robust data pipelines to continuously ingest product information, pricing history, and features from major marketplaces.</li>
                <li>Executed end-to-end development based on technical requirements, including database management and query optimization for fast retrieval.</li>
              </ul>
            </article>

            {/* WERN */}
            <article className="mb-2 text-[11px] text-black">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">WERN</h3>
                <span className="font-bold">Dec 2024 – Present</span>
              </div>
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="italic">Backend & AI Engineer</p>
                <span className="italic">Remote</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-0.5 leading-tight">
                <li>As an agency Software Engineer, I am deployed to high-impact technology projects, specializing in backend development and Generative AI integrations.</li>
                <li><strong>Current Assignment (Dec 2025 - Present):</strong> Deployed to Dupely, building scalable e-commerce data pipelines and AWS services.</li>
                <li><strong>Previous Assignment (Jan 2025 - Nov 2025):</strong> Deployed to a confidential B2B client. Built Generative AI features and LMS integrations utilizing LLMs and RAG architectures.</li>
                <li>Developed scalable backend applications and REST APIs across multiple client environments using Python, FastAPI, and Django.</li>
              </ul>
            </article>

            {/* UNI */}
            <article className="mb-2 text-[11px] text-black">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">Universidad Nacional de Ingeniería</h3>
                <span className="font-bold">Feb 2023 – Dec 2024</span>
              </div>
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="italic">System Analyst & Full Stack Developer</p>
                <span className="italic">Managua, Nicaragua</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-0.5 leading-tight">
                <li>Played a key role in supporting and modernizing the university&apos;s mission-critical internal systems, specifically focusing on the core enterprise application used for budget management and vital administrative operations.</li>
                <li>Maintained and enhanced a legacy ASP.NET enterprise system responsible for the university&apos;s financial and operational continuity.</li>
                <li>Acted as a technical mentor within the team, introducing modern development practices and proposing new frontend architectures using React.js to improve maintainability and user experience.</li>
                <li>Achieved significant system performance improvements by analyzing, refactoring, and optimizing complex Microsoft SQL Server queries.</li>
                <li>Bridged the gap between legacy infrastructure and modern tech stacks, bringing a fresh perspective and scalable solutions to the engineering team&apos;s workflows.</li>
              </ul>
            </article>
          </section>

          {/* 5. Education (H2) */}
          <section className="mb-2">
            <h2 className="text-[13px] font-bold border-b border-black pb-0 mb-1 text-black uppercase">Education</h2>
            <article className="text-[11px] text-black">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">Universidad Nacional de Ingeniería</h3>
                <span className="font-bold">March 2019 – Dec 2023</span>
              </div>
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="italic">B.S. in Computer Engineering</p>
                <span className="italic">Managua, Nicaragua</span>
              </div>
            </article>
          </section>

        </main>
      </div>
    </>
  );
}
