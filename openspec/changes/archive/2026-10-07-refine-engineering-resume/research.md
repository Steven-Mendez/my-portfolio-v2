# Resume research and verification

Research date: 2026-10-07. Target selected by Steven: Software Engineer — Full Stack / Backend. This is a review of public hiring guidance, not a set of privately verified resumes of hired employees. No universal Big Tech resume template or guaranteed ATS score was established.

## Employer evidence and its application

| Employer | Primary source and limits | Decision for Steven's resume |
| --- | --- | --- |
| Google | [Resume Overview handout](https://services.google.com/fh/files/misc/resumetipshandout2016.pdf), historical 2016 document with student examples: concise, relevant achievements, metrics/context, reverse chronology and readable type. Its student one-page advice is not proof that every experienced Google applicant must use one page. | Choose one page for Steven's selected content; prioritize the SQL before/after timings and production-system scope. |
| Meta | [Get that job at Facebook](https://engineering.fb.com/2012/07/20/uncategorized/get-that-job-at-facebook/), official but historical 2012 engineering guidance: list skills you can defend and be ready to discuss the work in your resume. Current Meta Careers hiring pages failed with access/rate-limit errors. | Keep a short supported skill list; use actual engineering work. Do not present old interview logistics as current policy. |
| Anthropic | [Careers / How we hire](https://www.anthropic.com/careers), current: demonstrated ability matters; independent work and open-source contributions can be prominent. Engineers should apply in their engineering discipline. | Feature the public Interview Agent project, explaining the implemented system. Do not relabel application integration as ML research or model training. |
| OpenAI | [Interview guide](https://openai.com/interview-guide/), current: results, learning new domains, communication and collaboration; engineering assessment includes solution/code quality and performance. This is hiring guidance, not a published resume template. | Show SQL optimization, delivered APIs/applications and team contribution. Be able to explain trade-offs in the project. |
| Amazon | [Recruiter resume tips](https://www.aboutamazon.com/news/workplace/amazon-job-application-resume-writing-tips), published 2024: simple text-first presentation, achievements and relevant measurements, adapted to the role. | Remove decorative/low-signal content; use action, system, contribution and outcome without making up a metric for every bullet. |

These sources support clarity and relevant evidence. Choosing this section order, featuring Interview Agent, and curating the skill groups are editorial judgments for Steven's target, not employer-mandated rules.

## Source inventory

- `lib/data.ts`: canonical identity, URLs and credentials. Older career records conflict with the current LinkedIn profile and remain unchanged outside the resume. Neither source is an independent employer/performance audit.
- `lib/case-studies.ts`: helpful project context, but Interview Agent's Qdrant/RAG architecture is outdated relative to its current public repository.
- [Interview Agent current repository](https://github.com/Steven-Mendez/interview-agent): verifies the planner/interviewer/evaluator workflow, React/TanStack Start frontend, FastAPI, LiveKit, LangGraph, OpenAI and PostgreSQL. Its current README says the resume is passed directly as text, without embeddings/vector storage. It describes persisted transcripts and evaluations. The draft makes no measured-latency, adoption or benchmark claims.
- [Steven's LinkedIn](https://www.linkedin.com/in/steven-mendez-dev/): initial access reached a sign-in wall; the authenticated full profile was subsequently read on 2026-10-07. Steven confirmed “Sí, usa LinkedIn como fuente actual” after discrepancies were presented. This supersedes the initial access limitation and older portfolio career claims.
- `app/resume/page.tsx`: current 10.5px body becomes about 7.9pt in print (CSS conversion: 96px = 72pt), and the long summary/skills precede experience.

## Current career source and safeguards

- WERN: Full Stack Engineer, Contract, Jan 2025-Present. Python backend work across 3-5 client codebases; React/Angular interfaces; AWS deployments. Dupely is an agency client, not direct employment.
- Dupely: Back End Developer, Contract through WERN, Dec 2025-Apr 2026. Product/pricing FastAPI endpoints for extension/mobile clients; Amazon/Walmart/eBay ingestion through official APIs; PostgreSQL schema, migrations, query performance and caching. Omit older 5K-10K-product and team-size metrics absent from the current profile.
- Independent consulting: Full Stack & AI Engineer (Independent Consultant), Mar 2025-Dec 2025. Direct confidential US EdTech engagement alongside WERN with agency approval. LLM evaluation harness covering 20-50 computer-use tasks, evaluation-informed shipping decisions, LMS LLM/RAG integration with pgvector and production UI/backend contributions.
- UNI: Full Stack Developer & Systems Analyst (.NET / React), Full-time, Feb 2023-Dec 2024. Built warehouse inventory end to end; supported ASP.NET/SQL Server budget software through two annual cycles; heaviest report reduced from 6 minutes to 7-15 seconds; mentored around 8 developers. Omit conflicting older timings and usage counts.
- Education: Bachelor of Engineering (B.Eng.), Computer Engineering, Mar 2019-Dec 2023. Do not claim independently certified US equivalence.
- Languages: English full professional proficiency; Spanish native. No CEFR level inferred from LinkedIn's label.
- Keep the two Arcitura credentials and verified Interview Agent architecture. Do not total overlapping contracts to inflate years of experience or derive exaggerated percentages from approximate metrics.

## Verification limits

LinkedIn corroborates what Steven currently reports and Steven confirmed the source choice. It does not independently establish measurement methodology, system adoption, employer verification or formal language testing. No new throughput, revenue, model-training or adoption claims are introduced.

## Draft validation

`output/pdf/Steven-Mendez-Resume-Draft.pdf` was generated and visually inspected after embedding Arial regular/bold fonts. It contains one A4 page, approximately 400 words, 10.25pt body text and five clickable contact/repository links. Text extraction confirmed section order and the claim inventory above. This was the approved review artifact before Astra and LinkedIn reconciliation. It is superseded by the implemented content; final browser A4/Letter exports require separate verification.
