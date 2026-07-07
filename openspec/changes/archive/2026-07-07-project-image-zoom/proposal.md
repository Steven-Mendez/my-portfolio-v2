# Proposal: project-image-zoom

## Why

Project screenshots (case-study hero, gallery, and inline media figures) render inside
fixed `aspect-[16/10]` frames at a size where UI detail is often illegible — visitors
cannot inspect the work being showcased. The Mermaid diagram block already offers a
full-viewport zoom lightbox, so images are now the inconsistent exception.

## What Changes

- Add an image lightbox: clicking/activating any project image with a real source
  (`media.src`, non-video) opens a full-viewport overlay showing the image large.
- The lightbox supports zoom in / zoom out / reset controls and closes via button,
  Escape, or overlay click — mirroring the existing Mermaid zoom dialog UX.
- `MediaFrame` becomes the single integration point, so hero media, gallery items, and
  inline story media all gain zoom with one change. Placeholders and video media are
  excluded (no zoom affordance).
- A hover/focus "Zoom" affordance signals interactivity, consistent with the Mermaid
  block's `cursor-zoom-in` + badge pattern.
- Accessible by default: dialog semantics (Radix), `Dialog.Title`, labeled controls,
  focus trap, and scroll lock; zoom transition respects `prefers-reduced-motion`.

## Capabilities

### New Capabilities

- `image-lightbox`: full-viewport zoomable lightbox for project media images, triggered
  from any `MediaFrame` with a real image source; covers open/close behavior, zoom
  controls, exclusions (video/placeholder), and accessibility requirements.

### Modified Capabilities

<!-- none — case-study-content requirements are unchanged; MediaFrame's rendering
     contract (figure, alt text, caption, badges) stays intact. -->

## Impact

- **Code**:
  - New `components/sections/case-study/ImageLightbox.tsx` (client component, Radix
    Dialog + next/image, patterned on `Mermaid.tsx:124-199`).
  - `components/sections/case-study/MediaFrame.tsx` wraps the image frame in the
    lightbox trigger when `media.src && !media.video && !media.placeholder`.
  - Export from `components/sections/case-study/index.ts`.
- **Dependencies**: none added — reuses `radix-ui` Dialog, `lucide-react` icons,
  `hooks/usePrefersReducedMotion.ts`.
- **Testing**: Vitest + Testing Library component tests colocated in
  `components/sections/case-study/` covering trigger rendering, exclusions, open/close,
  zoom controls, and a11y labels (Radix portal content queried via `screen`).
- **Systems/SEO**: no data-model, routing, or metadata changes; `MagicBento` home cards
  keep navigating to the case study (out of scope for zoom).
