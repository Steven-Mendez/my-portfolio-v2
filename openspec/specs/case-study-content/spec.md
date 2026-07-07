# case-study-content Specification

## Purpose
TBD - created by archiving change unify-case-study-content-model. Update Purpose after archive.
## Requirements
### Requirement: Single block-based section model

A case-study section SHALL express its body exclusively through an ordered list
of typed content blocks (`blocks[]`). The legacy `paragraphs[]` field and the
legacy per-section single `media` field SHALL NOT be part of the section model.
The supported block types SHALL be: `paragraph`, `subheading`, `quote`, `list`,
`table`, `mermaid`, and `media`.

#### Scenario: Section renders from blocks only

- **WHEN** a case study defines a section with a `blocks[]` array
- **THEN** the section renders each block in order through the shared
  case-study block components
- **AND** no legacy `paragraphs` or per-section `media` branch is used

#### Scenario: Legacy section fields are not accepted

- **WHEN** the `CaseSection` type is inspected
- **THEN** it exposes no `paragraphs` field and no top-level `media` field
- **AND** all body content is carried by `blocks[]`

#### Scenario: Both shipped case studies use the block model

- **WHEN** the `portfolio` and `interview-agent` case studies render
- **THEN** both produce their narrative entirely from `blocks[]`
- **AND** the `portfolio` study's prose appears with its sections intact after
  migration

### Requirement: Optional section kicker and heading

A section SHALL allow `kicker` and `heading` to be omitted, and the renderer
SHALL produce a valid section (e.g. a stand-alone diagram or quote) when either
or both are absent. The render key for a section SHALL remain stable and unique
without relying on `kicker` being present or unique.

#### Scenario: Section without a kicker renders

- **WHEN** a section omits `kicker`
- **THEN** the section renders its blocks without an eyebrow label
- **AND** React reports no duplicate-key or missing-key warning

#### Scenario: Section without a heading renders

- **WHEN** a section omits `heading`
- **THEN** the section renders its blocks without a heading element

#### Scenario: Two sections may share a kicker

- **WHEN** two sections in the same case study use the same `kicker` value (or
  both omit it)
- **THEN** both sections render with stable, distinct keys and no key collision

### Requirement: Universal inline markdown

The inline markup tokenizer SHALL support `**bold**`, `*italic*`, `` `code` ``,
and links in `[text](url)` form, and SHALL be applied to every authored text
surface: the hero `overview`, section `heading`, `subheading` block text,
`paragraph` text, `quote` text, `list` items, `table` cells, and media
`caption` and `description` text. Authored content is trusted (not user input),
so the renderer SHALL return React elements and SHALL NOT use
`dangerouslySetInnerHTML`.

#### Scenario: Bold, italic, and code render everywhere

- **WHEN** any supported text surface contains `**bold**`, `*italic*`, or
  `` `code` ``
- **THEN** the markup renders as `<strong>`, `<em>`, and `<code>` respectively
- **AND** this holds for the hero overview, headings, captions, and
  descriptions, not only for rich blocks

#### Scenario: Inline link renders as an anchor

- **WHEN** a text surface contains `[Anthropic](https://anthropic.com)`
- **THEN** the renderer produces an `<a>` element whose visible text is
  `Anthropic` and whose `href` is `https://anthropic.com`
- **AND** an external link opens safely (e.g. `target="_blank"` with
  `rel="noopener noreferrer"`)

#### Scenario: Bold is matched before italic

- **WHEN** a text surface contains `**strong**`
- **THEN** the `**` pair renders as a single bold span and is never mistaken
  for two italic markers

#### Scenario: Plain text passes through unchanged

- **WHEN** a text surface contains no markup tokens
- **THEN** the text renders verbatim with no extra elements

#### Scenario: No raw HTML injection

- **WHEN** any text surface is rendered
- **THEN** the output is built from React elements and never via
  `dangerouslySetInnerHTML`

### Requirement: Reusable recomposable rendering components

The system SHALL expose every case-study building block as an independently
importable component so a `/projects/[slug]` page can recompose them into a
custom arrangement without forking the default layout. A block type used by
only one case study SHALL still be available to every case study through the
shared block renderer.

#### Scenario: Components are individually importable

- **WHEN** a page imports from the case-study components index
- **THEN** each building block is available as a named export
- **AND** the default `CaseStudyView` composes them in the standard order

#### Scenario: A single-use block type is globally available

- **WHEN** a block type (e.g. `table` or `mermaid`) is currently used by only
  one case study
- **THEN** any other case study can use the same block type with no code change

### Requirement: Structured metadata preserved for SEO

The system SHALL keep the top-level structured fields as typed fields on the
case study, not folded into free-form blocks, so page metadata and JSON-LD
generation continue to work unchanged. These fields are `metrics`, `tags`,
`stack`, `seoDescription`, `heroMedia`, and `gallery`.

#### Scenario: JSON-LD and metadata still build

- **WHEN** a `/projects/[slug]` page is generated
- **THEN** title, description, tags/keywords, and JSON-LD are produced from the
  structured fields exactly as before this change

