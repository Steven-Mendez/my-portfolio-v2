import type { MetadataRoute } from "next"
import { portfolioData } from "@/lib/data"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: portfolioData.seo.siteName,
    short_name: portfolioData.profile.fullName,
    description: portfolioData.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e10",
    theme_color: "#0e0e10",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  }
}
