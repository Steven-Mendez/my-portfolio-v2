import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Inline, stripInline } from "./richText";

// Render a marked-up string and return the container for DOM assertions.
function renderInline(text: string) {
  return render(<Inline text={text} />).container;
}

describe("Inline — existing markup", () => {
  it("renders **bold** as <strong>", () => {
    // Scenario: Bold, italic, and code render everywhere
    const c = renderInline("a **strong** word");
    const strong = c.querySelector("strong");
    expect(strong).not.toBeNull();
    expect(strong?.textContent).toBe("strong");
  });

  it("renders *italic* as <em>", () => {
    // Scenario: Bold, italic, and code render everywhere
    const c = renderInline("an *emphatic* word");
    const em = c.querySelector("em");
    expect(em).not.toBeNull();
    expect(em?.textContent).toBe("emphatic");
  });

  it("renders `code` as <code>", () => {
    // Scenario: Bold, italic, and code render everywhere
    const c = renderInline("call `useState` here");
    const code = c.querySelector("code");
    expect(code).not.toBeNull();
    expect(code?.textContent).toBe("useState");
  });

  it("passes plain text through unchanged with no extra elements", () => {
    // Scenario: Plain text passes through unchanged
    const c = renderInline("just plain text");
    expect(c.textContent).toBe("just plain text");
    expect(c.querySelector("strong, em, code, a")).toBeNull();
  });

  it("matches bold before italic — `**x**` is one bold span, not two italics", () => {
    // Scenario: Bold is matched before italic
    const c = renderInline("**strong**");
    expect(c.querySelector("strong")?.textContent).toBe("strong");
    expect(c.querySelector("em")).toBeNull();
  });

  it("treats code spans literally — `*` inside code is not italic", () => {
    const c = renderInline("`a * b`");
    expect(c.querySelector("code")?.textContent).toBe("a * b");
    expect(c.querySelector("em")).toBeNull();
  });
});

describe("Inline — links", () => {
  it("renders [text](url) as an anchor with correct text and href", () => {
    // Scenario: Inline link renders as an anchor
    const c = renderInline("see [Anthropic](https://anthropic.com) docs");
    const a = c.querySelector("a");
    expect(a).not.toBeNull();
    expect(a?.textContent).toBe("Anthropic");
    expect(a?.getAttribute("href")).toBe("https://anthropic.com");
  });

  it("opens external links safely with target/rel", () => {
    // Scenario: Inline link renders as an anchor (external safety)
    const a = renderInline("[x](https://example.com)").querySelector("a");
    expect(a?.getAttribute("target")).toBe("_blank");
    expect(a?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("renders internal links as plain anchors (no target/rel)", () => {
    const a = renderInline("[home](/about)").querySelector("a");
    expect(a?.getAttribute("href")).toBe("/about");
    expect(a?.getAttribute("target")).toBeNull();
    expect(a?.getAttribute("rel")).toBeNull();
  });

  it("treats malformed links (URL with whitespace) as literal text", () => {
    // Scenario: anything unmatched is literal text
    const c = renderInline("[bad](http://a b)");
    expect(c.querySelector("a")).toBeNull();
    expect(c.textContent).toBe("[bad](http://a b)");
  });

  it("does not use dangerouslySetInnerHTML (returns React elements)", () => {
    // Scenario: No raw HTML injection
    const c = renderInline("**a** [b](https://x.com) `c`");
    // Markup became real elements, and raw markers are gone from the text.
    expect(c.querySelector("strong")).not.toBeNull();
    expect(c.querySelector("a")).not.toBeNull();
    expect(c.querySelector("code")).not.toBeNull();
    expect(c.textContent).toBe("a b c");
  });
});

describe("stripInline", () => {
  it("removes all markers and keeps link labels", () => {
    expect(
      stripInline("**bold** *it* `code` and [label](https://x.com)"),
    ).toBe("bold it code and label");
  });

  it("leaves plain text untouched", () => {
    expect(stripInline("nothing to strip")).toBe("nothing to strip");
  });
});
