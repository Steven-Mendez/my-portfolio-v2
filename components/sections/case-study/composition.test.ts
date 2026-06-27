import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import * as blocks from "./index";

const BUILDING_BLOCKS = [
  "MediaFrame",
  "PlaceholderFrame",
  "Mermaid",
  "CaseHeader",
  "CaseMetrics",
  "CaseStory",
  "CaseStorySection",
  "CaseBlocks",
  "CaseGallery",
  "CaseCTA",
] as const;

describe("case-study components are reusable and recomposable", () => {
  it("exports each building block from the barrel index", () => {
    // Scenario: Components are individually importable
    for (const name of BUILDING_BLOCKS) {
      expect(blocks[name as keyof typeof blocks]).toBeTypeOf("function");
    }
  });

  it("CaseStudyView composes the shared building blocks", () => {
    // Scenario: Components are individually importable (default composition)
    const src = readFileSync(
      resolve(process.cwd(), "components/sections/CaseStudyView.tsx"),
      "utf8",
    );
    for (const name of [
      "CaseHeader",
      "CaseMetrics",
      "CaseStory",
      "CaseGallery",
      "CaseCTA",
    ]) {
      expect(src).toContain(name);
    }
  });
});
