# image-lightbox Specification (delta)

## ADDED Requirements

### Requirement: Zoomable images open in a lightbox
Every project media image rendered through `MediaFrame` with a real image source (`media.src` set, `media.video` false, `media.placeholder` false) SHALL be an interactive trigger that opens a full-viewport lightbox dialog showing that image.

#### Scenario: Clicking a project image opens the lightbox
- **WHEN** a visitor clicks (or presses Enter/Space on) a project image in the case-study hero, gallery, or an inline story figure
- **THEN** a modal dialog opens showing the same image at large size over a dimmed backdrop, and the page behind it does not scroll

#### Scenario: Trigger advertises interactivity
- **WHEN** a visitor hovers or keyboard-focuses a zoomable project image
- **THEN** a "Zoom" affordance becomes visible and the pointer shows `cursor-zoom-in`, and the trigger exposes an accessible name of the form `Zoom <image description>`

### Requirement: Non-image media is not zoomable
Media items that are placeholders, have no `src`, or are marked as video SHALL NOT render a lightbox trigger; their existing rendering is unchanged.

#### Scenario: Placeholder media renders without a trigger
- **WHEN** a `MediaFrame` receives media with `placeholder: true` or no `src`
- **THEN** the placeholder frame renders exactly as before, with no button role and no zoom affordance

#### Scenario: Video media renders without a trigger
- **WHEN** a `MediaFrame` receives media with `video: true`
- **THEN** the frame renders with its play affordance as before and is not a lightbox trigger

### Requirement: Lightbox zoom controls
The open lightbox SHALL provide zoom-in, zoom-out, and reset controls that scale the image between a minimum of 100% and a bounded maximum, displaying the current zoom percentage; zoom SHALL reset to 100% whenever the lightbox closes.

#### Scenario: Zoom in and out within bounds
- **WHEN** the visitor activates "Zoom in" or "Zoom out"
- **THEN** the image scales by one step in that direction, the percentage indicator updates, and the control disables at its respective bound

#### Scenario: Reset returns to fit
- **WHEN** the visitor activates "Reset zoom" after zooming
- **THEN** the image returns to 100% and the reset control becomes disabled

#### Scenario: Reopening starts at 100%
- **WHEN** the visitor zooms in, closes the lightbox, and reopens it
- **THEN** the image is shown at 100%

### Requirement: Lightbox dismissal and accessibility
The lightbox SHALL be a proper modal dialog: it MUST trap focus, expose an accessible title derived from the image description, label every control, and close via the Close button, the Escape key, or clicking the backdrop; open/close animations SHALL be suppressed when the visitor prefers reduced motion.

#### Scenario: Close via button, Escape, and backdrop
- **WHEN** the visitor activates the Close button, presses Escape, or clicks the dimmed backdrop
- **THEN** the lightbox closes and focus returns to the triggering image

#### Scenario: Dialog is labeled for assistive tech
- **WHEN** the lightbox is open
- **THEN** the dialog exposes a title naming the image, and the zoom-in, zoom-out, reset, and close buttons each expose descriptive `aria-label`s

#### Scenario: Reduced motion is honored
- **WHEN** the visitor's system sets `prefers-reduced-motion: reduce`
- **THEN** the lightbox opens and closes without scale/fade animation
