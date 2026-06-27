import { describe, expect, it, vi } from "vitest";

// The page module imports CaseStudyView, which pulls in the WebGL background.
// Metadata generation doesn't need it, so stub it to keep the import light.
vi.mock("@/components/sections/CaseStudyView", () => ({ default: () => null }));

import { generateMetadata } from "./page";
import { getCaseStudy } from "@/lib/case-studies";

function params(slug: string) {
  return { params: Promise.resolve({ slug }) };
}

describe("project page metadata — built from structured fields", () => {
  it("derives title, description, canonical, and social images from the study", async () => {
    // Scenario: JSON-LD and metadata still build
    const study = getCaseStudy("portfolio")!;
    const meta = await generateMetadata(params("portfolio"));

    expect(meta.title).toBe(`${study.title} — ${study.role}`);
    expect(meta.description).toBe(study.seoDescription);
    expect(meta.alternates?.canonical).toBe(`/projects/${study.slug}`);
    expect(meta.openGraph?.images).toBeTruthy();
    expect(meta.twitter?.description).toBe(study.seoDescription);
  });

  it("returns empty metadata for an unknown slug", async () => {
    const meta = await generateMetadata(params("does-not-exist"));
    expect(meta).toEqual({});
  });
});
