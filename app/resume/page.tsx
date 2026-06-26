import React from 'react';
import { Metadata } from 'next';
import PrintButton from './PrintButton';
import { portfolioData } from '@/lib/data';

const stripUrl = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

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
  const featuredProject = portfolioData.projects.find((p) => p.resumeFeatured);

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
              {portfolioData.profile.fullName}
            </h1>
            <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {portfolioData.profile.role}
            </p>
            <p className="mt-1.5 text-[10.5px] leading-tight text-zinc-600">{portfolioData.profile.location} ({portfolioData.profile.timezone})</p>
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10.5px] leading-tight text-zinc-700">
              <a href={`mailto:${portfolioData.profile.contactEmail}`} className="text-zinc-700 hover:underline">{portfolioData.profile.contactEmail}</a>
              <span className="text-zinc-300">|</span>
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:underline">{stripUrl(portfolioData.socials.linkedin)}</a>
              <span className="text-zinc-300">|</span>
              <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:underline">{stripUrl(portfolioData.socials.github)}</a>
              <span className="text-zinc-300">|</span>
              <a href={portfolioData.seo.url} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:underline">{stripUrl(portfolioData.seo.url)}</a>
            </div>
          </header>

          {/* ---------- Summary ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Professional Summary</h2>
            <p className="text-[11px] leading-[1.45] text-zinc-800">
              {portfolioData.about.resumeSummary}
            </p>
          </section>

          {/* ---------- Skills ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Technical Skills</h2>
            <div className="space-y-[3px] text-[10.5px] leading-[1.35] text-zinc-800">
              {portfolioData.skills.categories.map((cat) => (
                <div key={cat.label}>
                  <strong className="font-semibold text-zinc-900">{cat.label}:</strong> {cat.items.join(', ')}
                </div>
              ))}
            </div>
          </section>

          {/* ---------- Experience ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Experience</h2>

            {portfolioData.experience.map((exp, i) => (
              <article
                key={exp.company}
                className={`resume-block${i < portfolioData.experience.length - 1 ? ' mb-3' : ''}`}
              >
                <div className={rowClass}>
                  <h3 className="text-[12.5px] font-bold text-zinc-900">
                    {exp.companyUrl ? (
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-900 hover:underline">{exp.company}</a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">{exp.period}</span>
                </div>
                <div className={`${rowClass} mt-0.5`}>
                  <p className="text-[11px] italic text-zinc-600">
                    {exp.title}
                    {exp.employmentType ? ` · ${exp.employmentType}` : ''}
                  </p>
                  <span className="text-[11px] italic whitespace-nowrap text-zinc-600">{exp.location}</span>
                </div>
                {exp.bullets.length > 0 ? (
                  <ul className={bulletListClass}>
                    {exp.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}

                {exp.children && exp.children.length > 0 ? (
                  <div className="mt-2 ml-3 space-y-2 border-l border-zinc-300 pl-3">
                    {exp.children.map((child) => (
                      <div key={child.company} className="resume-block">
                        <div className={rowClass}>
                          <h4 className="text-[11.5px] font-bold text-zinc-900">
                            {child.title}
                            <span className="font-semibold text-zinc-600">
                              {' — '}
                              {child.companyUrl ? (
                                <a href={child.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{child.company}</a>
                              ) : (
                                child.company
                              )}
                              {child.confidential ? ' · Confidential' : ''}
                              {child.employmentType ? ` · ${child.employmentType}` : ''}
                            </span>
                          </h4>
                          <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">{child.period}</span>
                        </div>
                        <ul className={bulletListClass}>
                          {child.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </section>

          {/* ---------- Projects ---------- */}
          {featuredProject ? (
            <section className="mb-3.5">
              <h2 className={sectionTitleClass}>Selected Project</h2>
              <article className="resume-block">
                <div className={rowClass}>
                  <h3 className="text-[12px] font-bold text-zinc-900">
                    {featuredProject.resumeTitle ?? featuredProject.title}
                    {featuredProject.liveUrl ? (
                      <>
                        {' '}
                        <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-normal italic text-zinc-600 hover:underline">
                          {featuredProject.liveUrl.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                      </>
                    ) : null}
                  </h3>
                  <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">{featuredProject.label}</span>
                </div>
                {featuredProject.highlights && featuredProject.highlights.length > 0 ? (
                  <ul className={bulletListClass}>
                    {featuredProject.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </section>
          ) : null}

          {/* ---------- Education ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Education</h2>
            {portfolioData.education.map((edu) => (
              <article key={edu.institution} className="resume-block">
                <div className={rowClass}>
                  <h3 className="text-[12px] font-bold text-zinc-900">{edu.institution}</h3>
                  <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">{edu.period}</span>
                </div>
                <div className={`${rowClass} mt-0.5`}>
                  <p className="text-[11px] italic text-zinc-600">{edu.degree}</p>
                  <span className="text-[11px] italic whitespace-nowrap text-zinc-600">{edu.location}</span>
                </div>
              </article>
            ))}
          </section>

          {/* ---------- Certifications & Courses ---------- */}
          <section className="mb-3.5">
            <h2 className={sectionTitleClass}>Certifications &amp; Courses</h2>
            <div className="space-y-1.5">
              {portfolioData.certifications.flatMap((cert) =>
                cert.kind !== 'DEGREE'
                  ? [
                      <article key={cert.name} className="resume-block">
                        <div className={rowClass}>
                          <h3 className="text-[12px] font-bold text-zinc-900">
                            {cert.href ? (
                              <a href={cert.href} target="_blank" rel="noopener noreferrer" className="text-zinc-900 hover:underline">{cert.name}</a>
                            ) : (
                              cert.name
                            )}
                          </h3>
                          <span className="text-[11px] font-semibold whitespace-nowrap text-zinc-700">{cert.year}</span>
                        </div>
                        <p className="text-[11px] italic text-zinc-600">{cert.org}</p>
                      </article>,
                    ]
                  : [],
              )}
            </div>
          </section>

          {/* ---------- Languages ---------- */}
          <section>
            <h2 className={sectionTitleClass}>Languages</h2>
            <p className="text-[10.5px] leading-[1.4] text-zinc-800">
              {portfolioData.languages.map((lang, i) => (
                <React.Fragment key={lang.name}>
                  {i > 0 ? <span className="mx-2 text-zinc-300">|</span> : null}
                  <strong className="font-semibold text-zinc-900">{lang.name}</strong> — {lang.level}
                </React.Fragment>
              ))}
            </p>
          </section>

        </main>
      </div>
    </>
  );
}
