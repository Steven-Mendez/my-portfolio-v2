import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getCaseStudy, type CaseSection } from "@/lib/case-studies";

import CaseStory from "./CaseStory";

// Mermaid dynamically imports a heavy bundle in an effect; stub it so render
// tests stay synchronous and offline. The narrative text is what we assert on.
vi.mock("./Mermaid", () => ({
  default: () => <div data-testid="mermaid-stub" />,
}));

const para = (text: string): CaseSection["blocks"][number] => ({
  type: "paragraph",
  text,
});

// React logs duplicate/missing key problems via console.error.
function hasKeyWarning(spy: ReturnType<typeof vi.spyOn>): boolean {
  return spy.mock.calls.some((args: unknown[]) =>
    String(args[0]).toLowerCase().includes("key"),
  );
}

describe("CaseStory — optional kicker/heading", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("renders a section that omits the kicker, with no key warning", () => {
    // Scenario: Section without a kicker renders
    render(
      <CaseStory
        sections={[{ heading: "Has heading", blocks: [para("body one")] }]}
      />,
    );
    expect(screen.getByText("body one")).toBeInTheDocument();
    expect(screen.queryByText("Has heading")).toBeInTheDocument();
    expect(hasKeyWarning(errorSpy)).toBe(false);
  });

  it("renders a section that omits the heading", () => {
    // Scenario: Section without a heading renders
    const c = render(
      <CaseStory sections={[{ kicker: "CTX", blocks: [para("just body")] }]} />,
    ).container;
    expect(screen.getByText("just body")).toBeInTheDocument();
    expect(c.querySelector("h2")).toBeNull();
  });

  it("renders two sections sharing a kicker with distinct keys (no collision)", () => {
    // Scenario: Two sections may share a kicker
    render(
      <CaseStory
        sections={[
          { kicker: "SAME", blocks: [para("first body")] },
          { kicker: "SAME", blocks: [para("second body")] },
        ]}
      />,
    );
    expect(screen.getByText("first body")).toBeInTheDocument();
    expect(screen.getByText("second body")).toBeInTheDocument();
    expect(hasKeyWarning(errorSpy)).toBe(false);
  });
});

describe("CaseStory — both shipped studies render via blocks", () => {
  it("renders the portfolio narrative entirely from blocks", () => {
    // Scenario: Both shipped case studies use the block model
    const study = getCaseStudy("portfolio")!;
    render(<CaseStory sections={study.sections} />);
    expect(
      screen.getByText(/The easy path was a template/i),
    ).toBeInTheDocument();
    // "one file" is now bolded, so match the leading text node only.
    expect(
      screen.getByText(/All the text and data live in/i),
    ).toBeInTheDocument();
  });

  it("renders the interview-agent narrative from blocks", () => {
    // Scenario: Both shipped case studies use the block model
    const study = getCaseStudy("interview-agent")!;
    render(<CaseStory sections={study.sections} />);
    expect(
      screen.getByText(/I built this after a job interview/i),
    ).toBeInTheDocument();
  });
});
