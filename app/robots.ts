import { MetadataRoute } from "next"
import { portfolioData } from "@/lib/data"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = portfolioData.seo.url
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
