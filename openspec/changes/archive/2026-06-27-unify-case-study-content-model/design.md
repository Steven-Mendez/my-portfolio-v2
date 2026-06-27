## Context

Case studies live in `lib/case-studies.ts` (typed data) and render through a set
of components under `components/sections/case-study/`, composed by
`CaseStudyView` and served from `app/projects/[slug]/page.tsx` as fully static
pages.

Today `CaseSection` carries two competing content models:

- **Legacy:** `paragraphs?: string[]` + a single `media?: CaseMedia`, rendered
  by the legacy branch of `CaseStorySection` (`<p>{p}</p>` — plain text).
- **Rich:** `blocks?: CaseBlock[]`, rendered by `CaseBlocks` with the inline
  markdown tokenizer (`Inline` in `richText.tsx`).

The `portfolio` study uses the legacy shape; `ai-interview-simulator` uses
blocks. The inline tokenizer (`**bold**`, `*italic*`, `` `code` ``) is wired
**only** into `CaseBlocks`, so legacy paragraphs, the hero `overview`, headings,
and media captions render markup as literal characters. No markdown libraries
are installed, and there are no case-study tests.

Constraints: components are React Server Components (no client JS for prose);
authored content is trusted (it ships in the repo, not user input); pages are
statically generated and gated in CI on accessibility/SEO ≥ 95.

## Goals / Non-Goals

**Goals:**

- One content model: `blocks[]` is the only section body shape.
- Markdown (inline markup + links) is applied uniformly to every text surface.
- `portfolio` migrated to blocks; legacy fields removed from the type and the
  renderer.
- Preserve structured metadata fields and current SEO/JSON-LD output.
- Add Vitest coverage for the tokenizer and case-study rendering.

**Non-Goals:**

- Adopting `react-markdown` / a full remark/rehype pipeline.
- Block-level markdown (multi-paragraph markdown strings, fenced code blocks,
  images-via-markdown). Prose stays in typed `paragraph`/`list` blocks; only
  *inline* markup is universal.
- Visual redesign of any block; styling stays as-is.
- Making `heroMedia`/`gallery` repositionable as in-flow blocks (kept as
  dedicated fields for now).

## Decisions

### Decision 1: Single block-based section model (remove legacy)

Drop `paragraphs` and the per-section single `media` from `CaseSection`; keep
`blocks: CaseBlock[]` as the sole body. Rewrite the `portfolio` entry so each
former `paragraphs` array becomes a sequence of `{ type: "paragraph" }` blocks.
Delete the legacy branch in `CaseStorySection` so there is exactly one render
path (`CaseBlocks`).

- **Why:** the dual model is the root cause of divergence and of the markdown
  gap. One path means one place to evolve and test.
- **Alternative considered:** keep both paths during a transition. Rejected —
  it preserves the very duality we are removing, and there are only two studies
  to migrate, so the cost is trivial now.

### Decision 2: Hybrid markdown — extend the homegrown tokenizer with links

Keep the lightweight tokenizer in `richText.tsx` and add a fourth token for
`[text](url)`. Match order: `` `code` `` → `**bold**` → `[link](url)` →
`*italic*`, so bold is never read as two italics and code spans are taken
literally. External links (`http`/`https`/`//`) render with
`target="_blank" rel="noopener noreferrer"`; internal links render plainly.
Continue returning React elements (never `dangerouslySetInnerHTML`).

- **Why:** zero new dependencies, safe in RSC, keeps strong typing on the rich
  widgets (mermaid/media/table) that a generic markdown renderer would flatten.
- **Alternative considered:** `react-markdown` + `remark-gfm`. Rejected for now —
  adds bundle weight, needs AST→styled-component mapping and mermaid-fence
  handling, and dilutes the typed block contract. Revisit only if block-level
  markdown becomes a real need.

### Decision 3: Apply `Inline` to every text surface

Route all authored text through `Inline`: hero `overview` and headings
(`CaseHeader`), `heading`/`subheading` (`CaseStorySection`/`CaseBlocks`),
`paragraph`/`quote`/`list`/`table` (already via `CaseBlocks`), and media
`caption`/`description` (`MediaFrame`, `PlaceholderFrame`). For attributes that
must be plain strings (e.g. `next/image` `alt`), strip markup to text rather
than rendering elements.

- **Why:** delivers the "markdown is the standard" requirement consistently.
- **Note:** `alt` text needs a plain-string form of a marked-up caption — add a
  small `stripInline(text)` helper alongside `Inline`.

### Decision 4: Optional `kicker`/`heading` + index-based stable key

Make `kicker?` and `heading?` optional in `CaseSection`. `CaseStory` currently
keys sections by `kicker`; switch to a key that does not require it (section
index combined with a content fingerprint), since sections are authored, static,
and never reordered at runtime. `CaseStorySection` renders the `Eyebrow` only
when `kicker` is present and the `<h2>` only when `heading` is present.

- **Why:** lets a section be a stand-alone diagram/quote and removes a latent
  duplicate-key bug.

## Risks / Trade-offs

- **Link regex correctness** (nested brackets, parens in URLs) → keep the URL
  pattern conservative (no spaces/parens in the URL), cover edge cases in Vitest,
  and treat anything unmatched as literal text.
- **Tokenizer ordering regressions** (e.g. `**a**` vs `*a*`, code containing
  `*`) → lock current behavior with tests before extending, then add link cases.
- **Losing detail when migrating `portfolio`** → migration is a mechanical
  paragraph-array → paragraph-blocks transform; verify rendered text is
  unchanged via a render test and a visual check of `/projects/portfolio`.
- **`alt`/plain-string contexts rendering raw markers** → `stripInline` for any
  attribute or non-React-node sink; covered by a test.
- **CI accessibility/SEO gate (≥95)** → no structural/markup-semantics change is
  intended; run the existing Lighthouse/a11y checks after migration.

## Migration Plan

1. Add link support + `stripInline` to `richText.tsx` behind existing tests
   (write tokenizer tests first to pin current behavior).
2. Thread `Inline`/`stripInline` through `CaseHeader`, `CaseStorySection`,
   `CaseBlocks`, `MediaFrame`, `PlaceholderFrame`.
3. Make `kicker`/`heading` optional; update `CaseStory` keying and conditional
   rendering.
4. Rewrite the `portfolio` entry to `blocks[]`; remove `paragraphs`/legacy
   `media` from `CaseSection` and delete the legacy branch.
5. Run `tsc`, lint, Vitest, build, and the a11y/SEO checks; verify both
   `/projects/*` pages visually.

Rollback: the change is self-contained to `lib/case-studies.ts` and
`components/sections/case-study/`; revert the commit to restore the dual model.

## Open Questions

- Should internal links (`/...`, `#...`) use `next/link` for client routing, or
  is a plain `<a>` acceptable in static prose? (Leaning plain `<a>` for
  simplicity; revisit if SPA navigation matters.)
