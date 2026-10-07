import { portfolioData, type ExperienceItem } from "@/lib/data"

type ResumeExperience = Pick<
  ExperienceItem,
  | "company"
  | "title"
  | "period"
  | "location"
  | "employmentType"
  | "confidential"
  | "bullets"
  | "context"
> & { children?: ResumeExperience[] }

// Presentation-only projection. Career facts, summary, skills and credentials
// are shared with the portfolio and chatbot through lib/data.ts.
function toResumeExperience(item: ExperienceItem): ResumeExperience {
  return {
    company: item.confidential
      ? `${item.company} (confidential)`
      : item.company,
    title: item.title,
    period: item.period,
    location: item.location,
    employmentType: item.employmentType,
    bullets: item.bullets,
    context: item.context,
    children: item.children?.map(toResumeExperience),
  }
}

const interviewAgent = portfolioData.projects.find(
  (project) => project.resumeFeatured
)

export const resumeData = {
  headline: "Software Engineer | Full Stack & Backend",
  summary: portfolioData.about.resumeSummary,
  experience: portfolioData.experience.map(toResumeExperience),
  skillCategories: portfolioData.skills.categories,
  education: portfolioData.education,
  languages: portfolioData.languages,
  project: interviewAgent
    ? {
        title: interviewAgent.title,
        repoUrl: interviewAgent.repoUrl,
        bullets: interviewAgent.highlights ?? [],
      }
    : null,
  certifications: portfolioData.certifications.filter(
    (credential) => credential.kind === "CERTIFICATION"
  ),
}
