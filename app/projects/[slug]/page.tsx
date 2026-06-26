import { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyView from "@/components/sections/CaseStudyView";
import { caseStudySlugs, getCaseStudy } from "@/lib/case-studies";
import { portfolioData, SITE_URL } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const url = `${SITE_URL}/projects/${study.slug}`;
  const title = `${study.title} — ${study.role}`;

  return {
    title,
    description: study.seoDescription,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${study.title} | ${portfolioData.profile.fullName}`,
      description: study.seoDescription,
      images: [portfolioData.seo.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | ${portfolioData.profile.fullName}`,
      description: study.seoDescription,
      images: [portfolioData.seo.image],
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": study.repoUrl ? "SoftwareSourceCode" : "CreativeWork",
    name: study.title,
    headline: study.title,
    description: study.seoDescription,
    url: `${SITE_URL}/projects/${study.slug}`,
    dateCreated: study.year,
    ...(study.repoUrl ? { codeRepository: study.repoUrl } : {}),
    ...(study.liveUrl ? { sameAs: study.liveUrl } : {}),
    keywords: study.tags.join(", "),
    author: {
      "@type": "Person",
      name: portfolioData.profile.fullName,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CaseStudyView study={study} />
    </>
  );
}

export const dynamicParams = false;
