import { MetadataRoute } from "next"
import { portfolioData } from "@/lib/data"
import { caseStudySlugs } from "@/lib/case-studies"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = portfolioData.seo.url

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${baseUrl}${portfolioData.seo.image}`],
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudySlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
