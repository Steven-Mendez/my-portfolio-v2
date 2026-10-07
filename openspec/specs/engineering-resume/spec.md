# engineering-resume Specification

## Purpose
TBD - created by archiving change refine-engineering-resume. Update Purpose after archive.
## Requirements
### Requirement: Relevant engineering evidence
The resume SHALL target Software Engineer — Full Stack / Backend roles with a short English summary, professional experience before skills, and Interview Agent as its selected project, including its public repository link.

#### Scenario: Recruiter scans the resume
- **WHEN** a visitor opens `/resume`
- **THEN** the headline identifies the target specialization, experience precedes technical skills, and concise bullets expose SQL runtime improvement, product-ingestion capabilities and delivered application capabilities.

### Requirement: Source fidelity
The resume MUST use the current LinkedIn career information confirmed by Steven on 2026-10-07 for employer/client attribution, job titles and periods, degree and language labels. It MUST preserve client confidentiality and keep approximate quantities approximate. Older conflicting portfolio claims MUST be omitted from this resume. It MUST NOT introduce unverified throughput, revenue, adoption, model-training, research or employment claims.

#### Scenario: Confirmed career records are displayed
- **WHEN** the resume renders Steven's work history
- **THEN** WERN starts in January 2025, Dupely remains its December 2025-April 2026 client engagement, the confidential EdTech contract appears separately for March-December 2025, UNI starts in February 2023, the SQL report improvement reads 6 minutes to 7-15 seconds, and the degree and English label match LinkedIn.

#### Scenario: The selected project is described
- **WHEN** Interview Agent is featured
- **THEN** its text reflects the current public README's three-agent voice workflow, FastAPI, React, LiveKit, LangGraph and PostgreSQL without claiming vector retrieval, benchmarked performance or measured adoption.

### Requirement: Legible one-page print output
The resume SHALL print with selectable text, one logical reading column and body text between 10pt and 11pt, fitting one A4 or US Letter page at 100% scale with ordinary margins. The export SHALL retain all displayed career content, project and contact links.

#### Scenario: Standard paper sizes are exported
- **WHEN** `/resume` is exported to PDF on A4 and US Letter at 100% scale with browser headers/footers disabled
- **THEN** each PDF has one page, readable body text, complete text in the intended order and no clipped or overlapping content.

### Requirement: Responsive and isolated resume presentation
The resume SHALL remain readable on narrow viewports without horizontal overflow. Chat controls MUST remain absent on `/resume`, while portfolio routes retain the chat and share the current canonical career facts with the resume.

#### Scenario: Narrow viewport
- **WHEN** the resume opens at a 390px viewport width
- **THEN** contact links and role/date rows wrap without horizontal page overflow.

#### Scenario: Resume and portfolio routes
- **WHEN** a visitor opens `/resume` and then the portfolio home page
- **THEN** the resume has no chat control and the portfolio still has one.

#### Scenario: Shared records are consolidated
- **WHEN** reviewed resume career records are promoted into canonical portfolio data
- **THEN** resume text, section order and print layout remain identical to the approved version while its career facts are sourced from shared records.
