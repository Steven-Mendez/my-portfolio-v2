## Why

Case studies currently carry **two parallel content models**: a legacy
`paragraphs[] + media` shape and a rich `blocks[]` shape. Each existing case
study uses a different one (`portfolio` = legacy, `ai-interview-simulator` =
blocks), so the data structure is both rigid (fixed slots) and forked (two ways
to say the same thing). Worse, the lightweight inline markup (`**bold**`,
`*italic*`, `` `code` ``) only renders inside the rich `blocks` path — the
`portfolio` study literally cannot bold a word, and the hero `overview`,
headings, and media captions ignore markup everywhere. We want one flexible
model where any element is reusable by any case study, and markdown is the
universal authoring standard.

## What Changes

- **BREAKING (internal data shape):** Collapse `CaseSection` to a single
  block-based body. Remove the legacy `paragraphs[]` and per-section single
  `media` fields; `blocks[]` becomes the only way to express section content.
- Make `kicker` and `heading` on a section **optional**, with a stable render
  key that does not depend on `kicker` being present and unique.
- **Markdown becomes the standard (hybrid approach):** extend the homegrown
  inline tokenizer with **links** `[text](url)` (keeping `**bold**`, `*italic*`,
  `` `code` ``) and apply it to **every text surface** — hero `overview`,
  section `heading`, `subheading` blocks, list items, table cells, quotes,
  paragraphs, and media `caption`/`description`. No `react-markdown` dependency.
- Keep typed blocks only for rich widgets (`mermaid`, `media`, `table`); prose
  blocks carry markdown.
- Migrate the `portfolio` case study from the legacy shape to `blocks[]`.
- Keep structured top-level metadata fields (`metrics`, `tags`, `stack`,
  `seoDescription`, `heroMedia`, `gallery`) as-is — they feed SEO/JSON-LD.
- Add Vitest coverage for the extended tokenizer and for both case studies
  rendering through the single block path.

## Capabilities

### New Capabilities
- `case-study-content`: The data model and rendering contract for project case
  studies — the unified block-based section model, the universal markdown
  authoring rules (inline markup + links applied to all text surfaces), and the
  reusable rendering components every `/projects/[slug]` page composes.

### Modified Capabilities
<!-- No existing baseline spec covers case studies (only portfolio-chatbot), so
     there are no requirement-level modifications to existing capabilities. -->

## Impact

- **Types / data:** `lib/case-studies.ts` — `CaseSection` and `CaseBlock`
  definitions change; the `portfolio` entry is rewritten to `blocks[]`.
- **Components:** `components/sections/case-study/` — `richText.tsx` (`Inline`
  gains links), `CaseStorySection.tsx` (drops the legacy `paragraphs`/`media`
  branch), `CaseBlocks.tsx`, `CaseHeader.tsx` (overview/headings via `Inline`),
  `MediaFrame.tsx` / `PlaceholderFrame.tsx` (captions/descriptions via `Inline`).
- **Tests:** new Vitest specs under the project's test setup for the tokenizer
  and case-study rendering. No markdown libraries added.
- **No user-facing routing or SEO/JSON-LD changes**; `app/projects/[slug]`
  metadata generation is unaffected.
