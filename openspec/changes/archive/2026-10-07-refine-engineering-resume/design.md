## Context

Resume content currently renders directly from `portfolioData`, also consumed by homepage sections and chatbot context. A local change removing chat from the root layout already exists and must be preserved. Repo instructions require human approval of the validated proposal before implementation.

## Goals / Non-Goals

Goals: present credible engineering achievements clearly, show correct agency and direct-contract attribution, feature a stronger project and make the printed resume legible on one page.

Non-goals: changing the homepage biography, changing LinkedIn, inventing metrics, applying for jobs, deploying, or claiming this document guarantees interviews/ATS acceptance.

## Decisions

1. Keep a small typed resume presentation module that references the existing `portfolioData` profile and links, while keeping user-confirmed current LinkedIn career records in resume-only typed fields. Keep concise resume wording separately from longer website copy. This follows the existing `resumeTitle` presentation precedent and avoids broad edits to homepage/chatbot content. Explicitly document the source for each curated achievement.
2. Preserve reverse chronology. WERN remains the umbrella agency for Dupely; the EdTech engagement is a separate independent consulting role, explicitly labelled as a direct confidential contract. Do not imply that all overlapping roles were delivered through WERN.
3. Use a short summary followed by Experience, Selected Project, Technical Skills, Education and Additional Information. Full Stack / Backend remains the main positioning; AI is supported by concrete application work rather than presented as ML research.
4. Feature Interview Agent instead of the portfolio. Its public README verifies a three-agent voice application with FastAPI, React/TanStack Start, LiveKit, LangGraph, OpenAI and PostgreSQL. The local case study is stale regarding Qdrant, so project copy must not take that claim from it.
5. Use a white, single-column sheet, standard headings, actual text and links, restrained black/gray typography, 10–11pt print body and about 12.7mm margins. Make date/contact rows wrap on mobile. Use CSS print sizing rather than shrinking a long resume with browser scaling.
6. The PDF draft is a content/layout review artifact authored independently with ReportLab. It is not proof of the eventual browser print layout; A4 and Letter browser exports must be checked after implementation.

## Risks / Trade-offs

- Authenticated LinkedIn was read on 2026-10-07. Steven confirmed it is the current source. Profile claims are user-reported evidence, not independent performance audits.
- Current numerical claims are self-reported in LinkedIn. Preserve approximations and before/after timings; do not derive exaggerated percentages or assume experimental benchmarks.
- One-page selection omits the generic portfolio bullet and old course detail. Keep both Big Data credentials compactly, and use LinkedIn’s English full-professional-proficiency label without assigning a new CEFR level.
- Page fit depends on fonts and print settings. Inspect A4 and Letter at 100% after implementation, and reduce wording before reducing type size.
- Curated resume wording can drift. Reference canonical identity/URLs and source-documented resume career records and document the claim inventory for review.

## Migration Plan

After explicit approval, implement the presentation module and `/resume` layout, validate, and archive this change only when all scenarios pass. Reverting those resume files restores the old resume without reverting the separate chat-scope fix.

## Open Questions

Resolved: Steven confirmed current LinkedIn dates/titles/attribution on 2026-10-07. Education reads B.Eng. in Computer Engineering; no claim of formally certified US degree equivalence is added.
