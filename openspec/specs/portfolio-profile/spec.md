# portfolio-profile Specification

## Purpose
TBD - created by archiving change sync-portfolio-career-content. Update Purpose after archive.
## Requirements
### Requirement: Current shared career facts
The portfolio SHALL use the LinkedIn career information confirmed by Steven on 2026-10-07 and shared by the approved CV. It MUST preserve confidential-client anonymity and approximate quantities, omit superseded career claims, and distinguish direct independent contracts from agency clients.

#### Scenario: Career cards are read
- **WHEN** a visitor opens the portfolio experience section
- **THEN** WERN starts January 2025, Dupely is its December 2025-April 2026 client, the confidential direct EdTech consulting engagement is a separate March-December 2025 card with explicit contract context, and UNI starts February 2023 with its warehouse work and 6-minute to 7-15-second report improvement.

#### Scenario: Profile information is read
- **WHEN** a visitor reads the About and Credentials sections
- **THEN** the summary and skills agree with the approved CV, the degree reads Bachelor of Engineering (B.Eng.), Computer Engineering, and English reads Full professional proficiency without an inferred CEFR level.

### Requirement: Grounded contract context
The chatbot SHALL derive current career facts from canonical portfolio records, including employment types, confidentiality and direct-contract context.

#### Scenario: Chatbot career context is built
- **WHEN** the system prompt is constructed
- **THEN** it contains the confirmed role dates, direct EdTech relationship and confidentiality, and does not represent EdTech as an agency child or use superseded metrics.

### Requirement: Current Interview Agent content
The project's portfolio content SHALL reflect the current public repository rather than its obsolete vector-search/scoring flow. Personal origin narrative and existing media MAY remain, but historical report media MUST be identified as such when its behavior conflicts with the current application.

#### Scenario: Project content and diagrams are read
- **WHEN** a visitor reads Interview Agent's card or case study
- **THEN** the content describes a planner, voice interviewer and evaluator using direct resume text and PostgreSQL, diagrams render without Qdrant/search-resume steps, and partial interviews are described without a global score/verdict.

### Requirement: Responsive content presentation
The portfolio SHALL preserve its current visual design, functional links and chat availability while presenting updated content without horizontal overflow.

#### Scenario: Long updated roles are displayed
- **WHEN** the home experience section is opened at desktop and 390px widths
- **THEN** the role titles, periods and independent-client context wrap readably, the page has no horizontal overflow and the chat launcher remains available.
