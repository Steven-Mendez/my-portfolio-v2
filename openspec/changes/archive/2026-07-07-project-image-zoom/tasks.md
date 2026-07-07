# Tasks: project-image-zoom

## 1. ImageLightbox component

- [x] 1.1 Create `components/sections/case-study/ImageLightbox.tsx` (`"use client"`):
      Radix `Dialog.Root` with `Dialog.Trigger asChild` wrapping a `<button>` around
      `children`, `cursor-zoom-in`, hover/focus "Zoom" badge (`Maximize2`), and
      `aria-label={`Zoom ${title}`}` — mirroring `Mermaid.tsx:125-141`
- [x] 1.2 Implement the dialog surface: Portal + Overlay (`bg-black/85 backdrop-blur-sm`)
      + Content (`h-[90vh] w-[94vw] max-w-[1400px]`), toolbar with `Dialog.Title`,
      zoom out / percentage / zoom in / reset / close buttons using Mermaid's
      `TOOL_BTN` styling and `ZOOM_MIN=1, ZOOM_MAX=3, ZOOM_STEP=0.5` bounds
- [x] 1.3 Render the image body: scrollable pane with next/image (`sizes="94vw"`,
      `object-contain`) inside a width-scaled wrapper (`width: zoom*100%`); reset zoom
      on `onOpenChange(false)`
- [x] 1.4 Honor reduced motion: with `usePrefersReducedMotion()`, omit the
      `animate-in/out` data-state classes on Overlay/Content
- [x] 1.5 Export `ImageLightbox` from `components/sections/case-study/index.ts`

## 2. MediaFrame integration

- [x] 2.1 In `MediaFrame.tsx`, wrap the image frame (not the `<figcaption>`) in
      `<ImageLightbox>` when `media.src && !media.video && !media.placeholder`,
      passing `src`, `alt`/`title` from `stripInline(media.caption) || media.kind`
- [x] 2.2 Leave the placeholder and video branches byte-for-byte unchanged (no trigger,
      no button role)

## 3. Tests (cover every spec scenario)

- [x] 3.1 `ImageLightbox.test.tsx` — open behavior: click trigger opens dialog with
      title and image; trigger has accessible name `Zoom <description>` and zoom badge
      (Scenarios: "Clicking a project image opens the lightbox", "Trigger advertises
      interactivity")
- [x] 3.2 `ImageLightbox.test.tsx` — zoom controls: in/out step the percentage
      indicator and disable at 100%/300%; reset returns to 100% and disables; close +
      reopen starts at 100% (Scenarios: "Zoom in and out within bounds", "Reset returns
      to fit", "Reopening starts at 100%")
- [x] 3.3 `ImageLightbox.test.tsx` — dismissal & a11y: Close button and Escape close
      the dialog and return focus to the trigger; toolbar buttons expose aria-labels;
      with `matchMedia` reporting reduced motion, Overlay/Content lack `animate-in`
      classes (Scenarios: "Close via button, Escape, and backdrop", "Dialog is labeled
      for assistive tech", "Reduced motion is honored")
- [x] 3.4 `MediaFrame.test.tsx` — integration & exclusions: plain image renders a
      lightbox trigger; `video: true` and `placeholder: true`/no-src media render no
      button role and keep existing affordances (Scenarios: "Placeholder media renders
      without a trigger", "Video media renders without a trigger")

## 4. Verification

- [x] 4.1 `npm test` — full Vitest suite green
- [x] 4.2 `npm run lint` and `npx tsc --noEmit` (or the repo's typecheck script) pass
- [x] 4.3 Manual check in `npm run dev`: hero, gallery, and inline figures zoom on a
      case-study page; scroll lock, Escape, backdrop close, and reduced-motion behavior
      verified in the browser
