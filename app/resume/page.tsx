import type { Metadata } from "next"
import { portfolioData } from "@/lib/data"
import { resumeData } from "@/lib/resume-data"
import PrintButton from "./PrintButton"
import styles from "./resume.module.css"

const stripUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

export const metadata: Metadata = {
  title: "Resume",
  description: `${portfolioData.profile.fullName} — ${resumeData.headline}. ${resumeData.summary}`,
  alternates: { canonical: "/resume" },
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <ul className={styles.bullets}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function ResumePage() {
  const { profile, socials, seo } = portfolioData
  const { education, languages } = resumeData
  const project = resumeData.project

  return (
    <div className={styles.shell}>
      <main id="main" className={styles.sheet}>
        <div className={styles.tools}>
          <PrintButton />
        </div>

        <header className={styles.header}>
          <h1>{profile.fullName}</h1>
          <p className={styles.headline}>{resumeData.headline}</p>
          <div className={styles.contact}>
            <span>{profile.location}</span>
            <a href={`mailto:${profile.contactEmail}`}>
              {profile.contactEmail}
            </a>
          </div>
          <div className={styles.links}>
            {[socials.linkedin, socials.github, seo.url].map((url) => (
              <a key={url} href={url}>
                {stripUrl(url)}
              </a>
            ))}
          </div>
          <p className={styles.summary}>{resumeData.summary}</p>
        </header>

        <section className={styles.section} aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          {resumeData.experience.map((experience) => (
            <article
              key={experience.company}
              className={`${styles.job} ${experience.children?.length ? "" : styles.jobWithoutChildren}`}
            >
              <div className={styles.row}>
                <h3>
                  {experience.company}
                  {experience.children?.length ? (
                    <span>
                      {` | ${experience.title}`}
                      {experience.employmentType
                        ? ` (${experience.employmentType})`
                        : ""}
                    </span>
                  ) : null}
                </h3>
                <span className={styles.date}>{experience.period}</span>
              </div>
              {experience.children?.length ? (
                <p className={styles.context}>
                  {experience.location}
                  {experience.context ? ` · ${experience.context}` : ""}
                </p>
              ) : (
                <div className={styles.row}>
                  <p>
                    {experience.title}
                    {experience.employmentType
                      ? ` | ${experience.employmentType}`
                      : ""}
                  </p>
                  <span className={styles.date}>
                    {experience.location.replace(" · On-site", "")}
                  </span>
                </div>
              )}
              {!experience.children?.length && experience.context ? (
                <p className={styles.context}>{experience.context}</p>
              ) : null}
              <Bullets items={experience.bullets} />
              {experience.children?.map((engagement) => (
                <div key={engagement.company} className={styles.engagement}>
                  <div className={styles.row}>
                    <h4>
                      {engagement.company}
                      <span>
                        {engagement.confidential
                          ? " (confidential client)"
                          : ""}
                        {` | ${engagement.title}`}
                        {engagement.employmentType
                          ? ` (${engagement.employmentType})`
                          : ""}
                      </span>
                    </h4>
                    <span className={styles.date}>{engagement.period}</span>
                  </div>
                  <Bullets items={engagement.bullets} />
                </div>
              ))}
            </article>
          ))}
        </section>

        {project ? (
          <section
            className={`${styles.section} ${styles.project}`}
            aria-labelledby="project-title"
          >
            <h2 id="project-title">Selected Project</h2>
            <p>
              <strong>{project.title}</strong>
              {project.repoUrl ? (
                <>
                  {" "}
                  | <a href={project.repoUrl}>{stripUrl(project.repoUrl)}</a>
                </>
              ) : null}
            </p>
            <Bullets items={project.bullets} />
          </section>
        ) : null}

        <section
          className={`${styles.section} ${styles.skills}`}
          aria-labelledby="skills-title"
        >
          <h2 id="skills-title">Technical Skills</h2>
          {resumeData.skillCategories.map((category) => (
            <p key={category.label}>
              <strong>{category.label}:</strong> {category.items.join(", ")}
            </p>
          ))}
        </section>

        <section
          className={`${styles.section} ${styles.education}`}
          aria-labelledby="education-title"
        >
          <h2 id="education-title">Education</h2>
          {education.map((entry) => (
            <div key={entry.institution}>
              <div className={styles.row}>
                <h3>{entry.institution}</h3>
                <span className={styles.date}>{entry.period}</span>
              </div>
              <p>{entry.degree}</p>
            </div>
          ))}
        </section>

        <section
          className={`${styles.section} ${styles.additional}`}
          aria-labelledby="additional-title"
        >
          <h2 id="additional-title">Additional Information</h2>
          <p>
            <strong>Certifications:</strong>{" "}
            {resumeData.certifications.map((credential, index) => (
              <span key={credential.name}>
                {index ? "; " : ""}
                {credential.href ? (
                  <a href={credential.href}>{credential.name}</a>
                ) : (
                  credential.name
                )}
                {` (${credential.org}, ${credential.year})`}
              </span>
            ))}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {languages
              .map((language) => `${language.name}: ${language.level}`)
              .join(" | ")}
          </p>
        </section>
      </main>
    </div>
  )
}
