## Why

The current resume hides strong production-engineering evidence behind a long summary, verbose bullets and a portfolio project. Its 10.5px body text prints at approximately 7.9pt. Steven requested research into Big Tech resumes and selected Software Engineer — Full Stack / Backend as the target.

## What Changes

- Present an English, single-column resume with a short summary, experience first, focused skills, one substantial engineering project and compact education/credentials.
- Rewrite achievement bullets to show action, system, contribution and documented outcome, using user-confirmed current LinkedIn titles, dates, agency/client relationships, degree and language labels; preserve confidentiality and approximate metric ranges.
- Feature Interview Agent with a repository link and architecture verified against its current public README; do not repeat the portfolio case study's outdated vector-search claims.
- Use readable print typography (10–11pt body), normal margins and a one-page A4/US Letter layout. Keep real selectable text and useful links.
- Keep the change scoped to resume presentation/content; the homepage, case studies, chatbot knowledge and historical canonical data retain their current content.

## Capabilities

### New Capabilities

- `engineering-resume`: A concise, evidence-based resume for Software Engineer — Full Stack / Backend applications, with readable browser and print output.

### Modified Capabilities

None.

## Impact

`app/resume/page.tsx`, a small typed resume presentation module referencing canonical identity/links with resume-only, source-documented LinkedIn career records, and relevant verification. No new production dependencies, API changes, deployment or LinkedIn edits. The earlier change excluding the chat from `/resume` must remain intact.

## Testing

Verify source fidelity for roles, dates, contract attribution, degree, language level and metric ranges. Inspect the browser at mobile and desktop sizes; verify links and absence of chat. Export and visually inspect one-page A4 and Letter PDFs at 100% scale, extract text to check completeness/order, and run typecheck, scoped lint and relevant existing tests. Do not claim universal ATS compatibility from text extraction alone.

## Publication follow-up

Steven requested committing and pushing the reviewed changes to production on 2026-10-07. The existing `public/resume.pdf` download still contains the superseded career facts. Replace it with the verified A4 export without changing its reviewed content or format; confirm byte equality with that export and one-page selectable text before publication.

## Approval

Status: approved by Steven on 2026-10-07: “Sí, aplícalo en /resume”. Implementation may proceed against this reviewed content and format. Steven subsequently requested an Astra subagent to refine wording within the same factual scope.

Source reconciliation: Steven confirmed on 2026-10-07 “Sí, usa LinkedIn como fuente actual” after being shown the WERN, Dupely, EdTech and UNI discrepancies. Resume-only career records may supersede older portfolio records. EdTech is a direct independent contract and must not remain under WERN.
