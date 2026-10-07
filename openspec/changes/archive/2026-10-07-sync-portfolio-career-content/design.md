## Context

`portfolioData` feeds home sections, SEO and chatbot context, while the approved CV currently holds resume-only career overrides. The current public Interview Agent README also supersedes case-study claims about embeddings and mandatory global scores for incomplete interviews.

## Decisions

1. Keep `lib/data.ts` canonical for identity, shared summary/skills, career history, education/languages and project highlights. Move the reviewed resume facts into it; remove duplicate career arrays from `lib/resume-data.ts` and project them into resume-specific labels/context without changing rendered resume text.
2. Add optional `context` to an experience entry. Surface the direct/concurrent relationship on the independent consulting card and include context, employment type and confidentiality in the chat prompt. Only Dupely remains nested under WERN. A confidential client uses its neutral monogram, with no real logo or external client URL.
3. Keep current layout, links, visual effects and styling; only add the short contract context where needed. Canonical titles and dates match the confirmed LinkedIn profile; metrics remain self-reported approximate ranges.
4. Update Interview Agent's card and typed case-study blocks against https://github.com/Steven-Mendez/interview-agent read on 2026-10-07. Remove Qdrant/embedding/search tool claims from its text/tags/diagrams. Describe direct resume text, persisted plans/transcripts/assessments and evidence coverage. Current partial interviews have no global score or verdict. Historical screenshots retain their original pixels and are labelled as historical where their score conflicts with current behavior.
5. Compare complete normalized resume DOM text before and after consolidation. If identical, existing verified A4/Letter exports remain accurate, without a redundant print export. Preserve the print CSS.

## Risks

Current LinkedIn is confirmed self-report, not an employer audit. No new experience years, quantified adoption, model-quality improvement or privacy/deletion promises are inferred. The updated long role titles and independent card need responsive inspection. Diagram changes need a rendered check for syntax problems.

## Migration

Implement only after strict validation. Keep prior worktree edits intact. Archive once all specified checks pass.
