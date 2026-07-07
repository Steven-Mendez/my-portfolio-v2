import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ImageLightbox from "./ImageLightbox";

function setup() {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <ImageLightbox src="/projects/covers/x.webp" alt="Dashboard view" title="Dashboard view">
      <span>framed image</span>
    </ImageLightbox>,
  );
  return user;
}

const trigger = () => screen.getByRole("button", { name: "Zoom Dashboard view" });

describe("ImageLightbox — open behavior", () => {
  it("clicking the trigger opens a dialog with the title and image", async () => {
    // Scenario: Clicking a project image opens the lightbox
    const user = setup();
    await user.click(trigger());

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Dashboard view")).toBeInTheDocument();
    expect(within(dialog).getByRole("img", { name: "Dashboard view" })).toBeInTheDocument();
  });

  it("advertises interactivity on the trigger", () => {
    // Scenario: Trigger advertises interactivity
    setup();
    const button = trigger();
    expect(button.className).toContain("cursor-zoom-in");
    expect(within(button).getByText("Zoom")).toBeInTheDocument();
  });
});

describe("ImageLightbox — zoom controls", () => {
  it("zooms in and out within bounds, updating the indicator", async () => {
    // Scenario: Zoom in and out within bounds
    const user = setup();
    await user.click(trigger());

    const zoomIn = screen.getByRole("button", { name: "Zoom in" });
    const zoomOut = screen.getByRole("button", { name: "Zoom out" });
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(zoomOut).toBeDisabled();

    await user.click(zoomIn);
    expect(screen.getByText("150%")).toBeInTheDocument();
    expect(screen.getByTestId("lightbox-canvas").style.width).toBe("150%");
    expect(zoomOut).toBeEnabled();

    await user.click(zoomIn); // 200
    await user.click(zoomIn); // 250
    await user.click(zoomIn); // 300 — upper bound
    expect(screen.getByText("300%")).toBeInTheDocument();
    expect(zoomIn).toBeDisabled();

    await user.click(zoomOut);
    expect(screen.getByText("250%")).toBeInTheDocument();
  });

  it("reset returns to 100% and disables itself", async () => {
    // Scenario: Reset returns to fit
    const user = setup();
    await user.click(trigger());

    const reset = screen.getByRole("button", { name: "Reset zoom" });
    expect(reset).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(reset).toBeEnabled();

    await user.click(reset);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(reset).toBeDisabled();
  });

  it("reopening starts back at 100%", async () => {
    // Scenario: Reopening starts at 100%
    const user = setup();
    await user.click(trigger());
    await user.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByText("150%")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));
    await user.click(trigger());
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});

describe("ImageLightbox — dismissal & accessibility", () => {
  it("closes via the Close button and returns focus to the trigger", async () => {
    // Scenario: Close via button, Escape, and backdrop
    const user = setup();
    await user.click(trigger());
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger()).toHaveFocus();
  });

  it("closes via Escape", async () => {
    const user = setup();
    await user.click(trigger());
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger()).toHaveFocus();
  });

  it("labels every toolbar control", async () => {
    // Scenario: Dialog is labeled for assistive tech
    const user = setup();
    await user.click(trigger());

    for (const name of ["Zoom out", "Zoom in", "Reset zoom", "Close"]) {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    }
  });

  it("animates by default but not under prefers-reduced-motion", async () => {
    // Scenario: Reduced motion is honored
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { unmount } = render(
      <ImageLightbox src="/x.webp" alt="A" title="A">
        <span>frame</span>
      </ImageLightbox>,
    );
    await user.click(screen.getByRole("button", { name: "Zoom A" }));
    expect(screen.getByRole("dialog").className).toContain("animate-in");
    unmount();

    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia;
    try {
      render(
        <ImageLightbox src="/x.webp" alt="B" title="B">
          <span>frame</span>
        </ImageLightbox>,
      );
      await user.click(screen.getByRole("button", { name: "Zoom B" }));
      const dialog = screen.getByRole("dialog");
      expect(dialog.className).not.toContain("animate-in");
      for (const el of document.querySelectorAll('[data-state="open"]')) {
        expect(el.className).not.toContain("animate-in");
      }
    } finally {
      window.matchMedia = original;
    }
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
