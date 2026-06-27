## 1. Pin current tokenizer behavior (tests first)

- [x] 1.1 Add `components/sections/case-study/richText.test.tsx` covering the
      existing tokenizer: `**bold**` → `<strong>`, `*italic*` → `<em>`,
      `` `code` `` → `<code>`, plain text passthrough, and bold-before-italic
      (`**x**` is one bold span, not two italics)
- [x] 1.2 Run `pnpm test` and confirm the new richText tests pass against
      current code before changing it

## 2. Extend inline markdown with links + plain-string helper

- [x] 2.1 Add a link token `[text](url)` to the tokenizer in `richText.tsx`
      with match order `code` → `bold` → `link` → `italic`
- [x] 2.2 Render links as `<a>`; external (`http`/`https`/`//`) get
      `target="_blank" rel="noopener noreferrer"`, internal render plainly
- [x] 2.3 Add a `stripInline(text)` helper that returns the plain-text form of a
      marked-up string (for `alt` and other string-only sinks)
- [x] 2.4 Extend `richText.test.tsx`: link → anchor with correct `href`/text,
      external link safety attrs, URL-with-parens/edge cases treated as literal,
      and `stripInline` removes all markers (covers spec: *Universal inline
      markdown*, *No raw HTML injection*)

## 3. Apply markdown to every text surface

- [x] 3.1 Render the hero `overview` and (if marked up) the title in
      `CaseHeader.tsx` through `Inline`
- [x] 3.2 Render section `heading` and `subheading` text through `Inline`
      (`CaseStorySection.tsx` / `CaseBlocks.tsx`)
- [x] 3.3 Render media `caption` through `Inline` and use `stripInline` for the
      `next/image` `alt` in `MediaFrame.tsx`
- [x] 3.4 Render placeholder `description` through `Inline` in
      `PlaceholderFrame.tsx`
- [x] 3.5 Add a test asserting markup renders on a non-block surface (e.g. the
      hero overview) — covers spec: *Bold, italic, and code render everywhere*

## 4. Collapse to a single block-based section model

- [x] 4.1 In `lib/case-studies.ts`, remove `paragraphs?` and the per-section
      `media?` field from `CaseSection`; keep `blocks: CaseBlock[]` as the body
- [x] 4.2 Make `kicker?` and `heading?` optional on `CaseSection`
- [x] 4.3 Delete the legacy `paragraphs`/`media` branch in
      `CaseStorySection.tsx`; render `Eyebrow` only when `kicker` is present and
      `<h2>` only when `heading` is present
- [x] 4.4 Update `CaseStory.tsx` to key sections without relying on `kicker`
      (stable index + content fingerprint), so duplicate/absent kickers are safe
- [x] 4.5 Add tests: section without `kicker` renders (no key warning), section
      without `heading` renders, two sections sharing a kicker render with
      distinct keys (covers spec: *Optional section kicker and heading*)

## 5. Migrate the portfolio case study

- [x] 5.1 Rewrite the `portfolio` entry in `lib/case-studies.ts`, converting
      each `paragraphs[]` array into a sequence of `{ type: "paragraph" }`
      blocks (preserve exact copy)
- [x] 5.2 Add a test that both `portfolio` and `ai-interview-simulator` render
      their narrative entirely through the block path with text intact (covers
      spec: *Both shipped case studies use the block model*)

## 6. Verify metadata + reusability preserved

- [x] 6.1 Add/confirm a test that `app/projects/[slug]` metadata + JSON-LD still
      build from the structured fields (covers spec: *Structured metadata
      preserved for SEO*)
- [x] 6.2 Confirm the case-study components index still exports each building
      block and `CaseStudyView` composes them (covers spec: *Reusable,
      recomposable rendering components*)

## 7. Full verification gate

- [x] 7.1 Run `pnpm lint` and `tsc --noEmit` clean
- [x] 7.2 Run `pnpm test` — all case-study + tokenizer specs pass
- [x] 7.3 Run `pnpm build` and the a11y/SEO (Lighthouse) check; confirm score
      stays ≥ 95
- [x] 7.4 Visually verify `/projects/portfolio` and
      `/projects/ai-interview-simulator` render unchanged (text, links, layout)
