## MODIFIED Requirements

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
