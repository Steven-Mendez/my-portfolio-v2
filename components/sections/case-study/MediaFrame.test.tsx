import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { CaseMedia } from "@/lib/case-studies";

import MediaFrame from "./MediaFrame";

const image: CaseMedia = {
  kind: "screenshot",
  src: "/projects/covers/x.webp",
  caption: "The **agent** dashboard",
};

describe("MediaFrame — lightbox integration", () => {
  it("wraps a plain image in a zoom trigger named after the caption", () => {
    render(<MediaFrame media={image} sizes="100vw" />);
    expect(
      screen.getByRole("button", { name: "Zoom The agent dashboard" }),
    ).toBeInTheDocument();
  });

  it("keeps the caption outside the trigger", () => {
    const { container } = render(<MediaFrame media={image} sizes="100vw" />);
    const caption = container.querySelector("figcaption");
    expect(caption).toBeInTheDocument();
    expect(caption?.closest("button")).toBeNull();
  });

  it("falls back to the media kind for uncaptioned images", () => {
    render(<MediaFrame media={{ kind: "screenshot", src: "/x.webp" }} sizes="100vw" />);
    expect(screen.getByRole("button", { name: "Zoom screenshot" })).toBeInTheDocument();
  });

  it("does not make video media a trigger", () => {
    // Scenario: Video media renders without a trigger
    const { container } = render(
      <MediaFrame media={{ ...image, video: true }} sizes="100vw" />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    // The play affordance still renders.
    expect(container.querySelector(".fill-current")).toBeInTheDocument();
  });

  it("does not make placeholder or src-less media a trigger", () => {
    // Scenario: Placeholder media renders without a trigger
    const { container: placeholder } = render(
      <MediaFrame media={{ kind: "screenshot", placeholder: true }} sizes="100vw" />,
    );
    expect(placeholder.querySelector("button")).toBeNull();
    expect(placeholder.querySelector("img")).toBeNull();

    const { container: srcless } = render(
      <MediaFrame media={{ kind: "screenshot" }} sizes="100vw" />,
    );
    expect(srcless.querySelector("button")).toBeNull();
  });
});
