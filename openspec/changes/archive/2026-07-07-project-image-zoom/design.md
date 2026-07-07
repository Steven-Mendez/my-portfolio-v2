# Design: project-image-zoom

## Context

Project screenshots flow through a single component,
`components/sections/case-study/MediaFrame.tsx` — a **server component** that renders a
glass-bordered `aspect-[16/10]` next/image frame for the case-study hero
(`CaseStudyView.tsx`), the gallery (`CaseGallery.tsx`), and inline story figures. The
repo already ships a full-viewport zoom dialog for Mermaid diagrams
(`Mermaid.tsx:124-199`) built directly on the unified `radix-ui` Dialog primitive with
zoom in/out/reset state (`ZOOM_MIN/MAX/STEP`), a `TOOL_BTN` toolbar style, and
`data-[state=*]` tw-animate transitions. Stack: Next.js 16 App Router, React 19,
Tailwind v4, no framer-motion.

## Goals / Non-Goals

**Goals:**
- One integration point (`MediaFrame`) so hero, gallery, and inline figures all zoom.
- Visual and interaction parity with the Mermaid zoom dialog (same overlay, toolbar,
  affordance, focus ring conventions).
- Keep `MediaFrame` a server component where possible; ship the minimum client JS.
- Honor `prefers-reduced-motion`.

**Non-Goals:**
- Zooming the home-page bento covers (`MagicBento.tsx`) — those cards are navigation
  links to the case study and stay that way.
- Pinch/drag-to-pan gestures, image carousels/next-prev navigation, or video playback.
- Changing `CaseMedia`'s data shape or captions/SEO output.

## Decisions

1. **New client component `ImageLightbox.tsx`, `MediaFrame` stays server.**
   `ImageLightbox` is a `"use client"` component that owns the Dialog + zoom state and
   renders `Dialog.Trigger asChild` around a `<button>` wrapping `children` (the
   existing frame markup passed from the server component). `MediaFrame` conditionally
   wraps the frame: interactive images get the lightbox, video/placeholder paths are
   untouched. *Alternative considered:* making `MediaFrame` itself a client component —
   rejected; it would pull `Inline`/`richText` rendering into the client bundle for
   every figure, zoomable or not.

2. **Radix Dialog directly, mirroring `Mermaid.tsx`, not `components/ui/dialog.tsx`.**
   The shadcn wrapper is sized for small centered content (`max-w-sm`, built-in close
   layout); the Mermaid pattern is the proven full-viewport zoom surface
   (`h-[90vh] w-[94vw] max-w-[1400px]`, `bg-black/85 backdrop-blur-sm` overlay). Escape,
   focus trap, scroll lock, and focus return come free from Radix.

3. **Zoom = width-scaling inside an `overflow-auto` pane, same as Mermaid.**
   State `zoom` (1 → 3, step 0.5 — same step as Mermaid; a lower max than Mermaid's 4
   because photos get soft past 300%) sets
   `style={{ width: `${zoom * 100}%` }}` on the image wrapper inside the scrollable
   body; at 100% the image fits with `object-contain`. `onOpenChange(false)` resets
   zoom. *Alternative:* CSS `transform: scale()` — rejected because it doesn't grow the
   scrollable area, so panning to edges breaks.

4. **Lightbox image uses next/image with `sizes="94vw"` and `object-contain`.**
   Reuses the already-optimized asset pipeline; no `unoptimized` full-res fetch needed
   for 1400px-max display. Alt/title derive from `stripInline(media.caption)` with a
   fallback to `media.kind`.

5. **Reduced motion via `usePrefersReducedMotion()`.**
   When true, omit the `animate-in/out` utility classes on Overlay/Content so
   open/close is instant.

6. **Testing at the `MediaFrame` level with Vitest + Testing Library.**
   Tests assert: trigger button + accessible name for plain images; no trigger for
   video/placeholder; open via click shows dialog with title and toolbar; zoom buttons
   change the percentage indicator and disable at bounds; close resets zoom. next/image
   renders as `<img>` under jsdom; Radix portals are reachable via `screen`.

## Risks / Trade-offs

- [Nested interactive content — a `<button>` wrapping the frame could conflict with
  future links inside figures] → Frame content is purely presentational today; keep the
  trigger wrapping only the image frame, never the `<figcaption>`.
- [jsdom lacks real layout, so "image scales" cannot be visually asserted] → Assert the
  contract instead: wrapper `style.width` and the percentage indicator text.
- [Radix Dialog animations rely on `tw-animate-css` `data-state` classes; conditional
  omission for reduced motion could drift from Mermaid's look] → Extract shared class
  constants only if duplication becomes a maintenance issue; for now copy Mermaid's
  strings verbatim to preserve parity.
- [Large source screenshots at 300% zoom may look soft] → Acceptable; assets are
  1600w+ webp covers and the goal is legibility of UI detail, not pixel-perfect crops.

## Open Questions

- None blocking. (If a future case study embeds real `<video>` media, the lightbox can
  be extended with a video branch; explicitly out of scope now.)
