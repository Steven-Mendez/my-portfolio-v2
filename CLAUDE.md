# CLAUDE.md

Guidance for AI agents working in this repository.

> **Note on OpenSpec & this file:** OpenSpec (v1.4.1, schema `spec-driven`) is
> initialized here. In this project OpenSpec manages its instruction files under
> `.claude/commands/opsx/` and `.claude/skills/` — it does **not** write an
> `OPENSPEC:START/END` marker block into this file. Everything in `CLAUDE.md` is
> therefore hand-authored and safe from `openspec update`.

## Spec-Driven Development workflow

All non-trivial work in this repo is driven through Spec-Driven Development (SDD)
with OpenSpec. **Specs and proposals come before implementation.** You do not
write production code until a change proposal has been created, validated
(`openspec validate <change> --strict`), and approved. If reality forces a
deviation while implementing, you update the spec/proposal to match — you never
let the code silently diverge from the spec.

A change moves through three stages:

### 1. Propose — write the spec before any code

Command: **`/opsx:propose <change-name>`** (CLI: `openspec new change`,
`openspec instructions`, `openspec status`).

Produce, under `openspec/changes/<change-name>/`, the artifacts the
`spec-driven` schema requires (build order: proposal → specs → design → tasks):

- **`proposal.md`** — what & why: the problem, the proposed solution, scope, and
  a **Testing** strategy.
- **Spec deltas** — `specs/<capability>/spec.md` files using
  `## ADDED Requirements` (also `## MODIFIED` / `## REMOVED` / `## RENAMED`),
  where every requirement has at least one testable `#### Scenario:` block
  written in WHEN/THEN form.
- **`design.md`** — how: architecture and key technical decisions.
- **`tasks.md`** — an ordered, checkbox (`- [ ]`) implementation checklist that
  **includes the tests** covering each spec scenario.

Then run `openspec validate <change-name> --strict` and fix every issue.
**Stop here for human approval before implementing.**

### 2. Apply — implement strictly against the approved spec

Command: **`/opsx:apply <change-name>`** (CLI: `openspec status`,
`openspec instructions apply`).

Implement the tasks in `tasks.md` in order, checking each off (`- [ ]` → `- [x]`)
as it lands. Build only what the approved spec describes. Write and run the tests
named in the proposal; **the change is not "done" until the tests covering the
spec scenarios pass.** If implementation reveals the spec is wrong or incomplete,
pause and update the relevant artifact (`proposal.md`, the spec delta, or
`design.md`) rather than diverging silently — then continue.

### 3. Archive — fold the deltas into the baseline specs

Command: **`/opsx:archive <change-name>`** (CLI: `openspec archive`).

Only after every spec scenario is satisfied and its tests pass: archive the
change. This syncs the spec deltas into the baseline specs under
`openspec/specs/<capability>/spec.md` and moves the change folder to
`openspec/changes/archive/YYYY-MM-DD-<change-name>/`.

### Where artifacts live

| Artifact | Location |
| --- | --- |
| Active change proposals & deltas | `openspec/changes/<change-name>/` |
| Baseline (shipped) specs | `openspec/specs/<capability>/spec.md` |
| Archived changes | `openspec/changes/archive/YYYY-MM-DD-<change-name>/` |
| OpenSpec config / schema | `openspec/config.yaml` |

Useful read-only commands: `openspec list`, `openspec show <item>`,
`openspec status --change <name>`, `openspec view`.
