## Why

Steven confirmed LinkedIn as the current career source and approved the refined CV. The portfolio and chatbot still display superseded titles, dates, metrics, degree and language labels. He explicitly requested that the portfolio content also be updated after these discrepancies were explained.

## What Changes

- Promote the already reviewed CV career facts into canonical portfolio data, retaining the current visual presentation and company branding.
- Display WERN Jan 2025-Present with Dupely Dec 2025-Apr 2026 as its client; show the direct confidential US EdTech contract Mar-Dec 2025 as a separate consulting role, and UNI Feb 2023-Dec 2024.
- Share the approved summary, skills, B.Eng., English label and project highlights between portfolio and resume. Include contract context/confidentiality in chatbot knowledge.
- Correct Interview Agent's stale card/case-study architecture and scoring statements from its current public README: direct text context in PostgreSQL, three agents, evidence-based assessment, and partial interviews without a global score/verdict. Preserve the case-study block model, media and personal origin story; label historical report media where necessary.

## Capabilities

### New Capabilities

- `portfolio-profile`: Consistent, source-grounded career content across portfolio, resume and chatbot.

### Modified Capabilities

- `engineering-resume`: Resume and portfolio consume the same current career data while retaining route-specific presentation and chat isolation.

## Impact

`lib/data.ts`, `lib/resume-data.ts`, experience rendering/context formatting, Interview Agent content and relevant verification. No new dependencies or provider changes. Existing resume print content/layout and portfolio visual design remain covered by regression checks.

## Testing

Validate the proposal strictly before implementation. Verify current titles/periods, agency/direct-client attribution, degree/language labels and removal of superseded claims. Check the chatbot prompt includes employment and confidentiality context. Compare `/resume` text before/after canonical consolidation; inspect home and case-study routes at desktop and 390px, check updated Mermaid diagrams and chat isolation. Run typecheck, scoped lint, existing tests, diff checks, then archive after all scenarios pass.

## Approval

Authorized by Steven on 2026-10-07: “Me gustaria que tambien se actualizara”, following the explicit explanation that portfolio content still held the old facts. This applies the same previously approved, LinkedIn-confirmed content to the requested portfolio surfaces. No additional permission is needed for this reversible content update.
