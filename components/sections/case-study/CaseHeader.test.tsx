import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { CaseStudy } from "@/lib/case-studies";

import CaseHeader from "./CaseHeader";

function makeStudy(overrides: Partial<CaseStudy>): CaseStudy {
  return {
    slug: "x",
    title: "X",
    category: "Web",
    year: "2026",
    role: "Engineer",
    overview: "plain overview",
    seoDescription: "d",
    stack: "S",
    tags: ["A"],
    metrics: [],
    sections: [],
    ...overrides,
  } as CaseStudy;
}

describe("CaseHeader — universal inline markup", () => {
  it("renders bold, code, and links in the hero overview (not just rich blocks)", () => {
    // Scenario: Bold, italic, and code render everywhere
    const c = render(
      <CaseHeader
        study={makeStudy({
          overview: "I built **this** with `code` and a [link](https://x.com)",
        })}
      />,
    ).container;

    expect(c.querySelector("strong")?.textContent).toBe("this");
    expect(c.querySelector("code")?.textContent).toBe("code");
    const link = c.querySelector("a[href='https://x.com']");
    expect(link?.textContent).toBe("link");
  });

  it("renders markup in the title", () => {
    const c = render(
      <CaseHeader study={makeStudy({ title: "Plain *and* fancy" })} />,
    ).container;
    expect(c.querySelector("h1 em")?.textContent).toBe("and");
  });
});
