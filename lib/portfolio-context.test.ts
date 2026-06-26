import { describe, expect, it } from "vitest";

import { portfolioData } from "@/lib/data";
import { buildSystemPrompt, OWNER_NAME } from "@/lib/portfolio-context";

describe("buildSystemPrompt", () => {
  const prompt = buildSystemPrompt();

  it("embeds the on-topic guardrail and redirect instruction", () => {
    // Scenario: Guardrail is enforced via the system prompt
    expect(prompt).toMatch(/only answer questions about/i);
    expect(prompt).toMatch(/redirect/i);
    expect(prompt).toMatch(/decline/i);
    expect(prompt).toContain(OWNER_NAME);
  });

  it("includes the bio, skills, experience, projects, and contact sections", () => {
    // Scenario: System prompt is built from the single context module
    expect(prompt).toContain("## Bio");
    expect(prompt).toContain("## Skills");
    expect(prompt).toContain("## Experience");
    expect(prompt).toContain("## Projects");
    expect(prompt).toContain("## Education");
    expect(prompt).toContain("## Contact");
  });

  it("is sourced from lib/data.ts, with no fabricated facts", () => {
    // Scenario: No duplicated or fabricated portfolio facts — every value below
    // comes straight from the canonical portfolioData.
    expect(prompt).toContain(portfolioData.profile.fullName);
    expect(prompt).toContain(portfolioData.profile.role);
    expect(prompt).toContain(portfolioData.profile.contactEmail);
    expect(prompt).toContain(portfolioData.experience[0].company);
    expect(prompt).toContain(portfolioData.projects[0].title);
    expect(prompt).toContain(portfolioData.skills.categories[0].items[0]);
  });
});
