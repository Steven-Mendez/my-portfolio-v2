## Context

The portfolio is a Next.js 16 App Router app (React 19, TypeScript, Tailwind v4,
shadcn-style primitives under `components/ui/`). Canonical portfolio content
already lives in `lib/data.ts` (`portfolioData`, with typed `Profile`, `Skills`,
`ExperienceItem`, `Project`, etc.) and `lib/case-studies.ts`. The AI SDK packages
(`ai@6`, `@ai-sdk/react@3`, `@ai-sdk/groq@3`) are already installed in
`node_modules` but not yet declared in `package.json`; `components/ai-elements/`
exists but is empty. There is no test framework.

This change adds a portfolio-scoped chatbot. API shapes below were confirmed
against current Vercel AI SDK and AI Elements docs (context7) and may differ from
older v3/v4 tutorials.

## Goals / Non-Goals

**Goals:**
- A streaming, portfolio-scoped chat assistant embedded in the site.
- One server route (`/api/chat`) doing all model work; no secrets client-side.
- Groq by default, swappable to another provider by editing one line.
- One knowledge module (`lib/portfolio-context.ts`) — no duplicated facts, no
  fabricated personal details (PLACEHOLDERS where data is missing).
- UI built only from AI Elements components.
- A mocked, key-free, network-free test suite covering every spec scenario.

**Non-Goals:**
- Retrieval/embeddings/vector search — context is small enough to inline in the
  system prompt.
- Persisting conversations, auth, rate-limiting infra, or multi-model selection
  UI (the prompt-input model picker is out of scope).
- Tool calling / function calling / attachments.

## Decisions

### D1. Server route with `streamText` + `toUIMessageStreamResponse`
`app/api/chat/route.ts` exports `POST` and `maxDuration = 30`. It reads
`{ messages }: { messages: UIMessage[] }`, calls
`streamText({ model, system, messages: await convertToModelMessages(messages) })`
and returns `result.toUIMessageStreamResponse()`. Imports: `convertToModelMessages`,
`streamText`, `UIMessage` from `ai`. Rationale: this is the current AI SDK v5/v6
App Router pattern (confirmed via context7). Alternative considered: hand-rolled
`ReadableStream` — rejected (reinvents the SDK, breaks `useChat` wire format).

### D2. One-line-swap model module (`lib/chat-model.ts`)
A single module exports the active model: `export const chatModel =
groq("llama-3.3-70b-versatile")` (`groq` from `@ai-sdk/groq`, which reads
`GROQ_API_KEY` from the env automatically). The route imports `chatModel`.
Swapping to Gemini = change that one line to `google("gemini-2.0-flash")` after
installing `@ai-sdk/google`. Rationale: satisfies "swappable by changing one
line" and makes the default model unit-testable. Alternative: inline the model in
the route — rejected (swap would touch route logic and is harder to assert in a
test).

### D3. Single-source knowledge (`lib/portfolio-context.ts`)
Exports a structured `portfolioContext` and a `buildSystemPrompt()` (or constant
`SYSTEM_PROMPT`) that concatenates: an identity/role preamble, the portfolio
context (bio, projects, experience, skills, contact), and the guardrail
instruction ("only answer questions about <owner> and this portfolio; if asked
anything else, politely decline and redirect"). It **reuses `lib/data.ts`**
(`portfolioData`) for facts that already exist, and marks anything the bot needs
but the data lacks (e.g. conversational tone, FAQ answers) as
`// PLACEHOLDER: ...`. Rationale: honors "info lives in one place" and "never
fabricate." Alternative: retype the bio into the context file — rejected
(duplication, drift). The route and tests import the prompt only from here.

### D4. UI = AI Elements + `useChat`, as a collapsible widget
A client component (`components/chat/portfolio-chat.tsx`, `"use client"`) uses
`useChat` from `@ai-sdk/react` (`{ messages, sendMessage, status }`) and composes
AI Elements: `Conversation`/`ConversationContent`/`ConversationEmptyState`/
`ConversationScrollButton` (auto-scroll), `Message`/`MessageContent`/
`MessageResponse` (bubbles + streamed text), `PromptInput`/`PromptInputTextarea`/
`PromptInputSubmit` (input + submit with `status`-driven state), and a `Spinner`
while `status === "submitted"`. It is wrapped in a **collapsible launcher**: a
floating button toggles an open/closed panel, mounted once in `app/layout.tsx`.

Chosen **collapsible widget** over a **dedicated `/chat` section**: it is
available on every page, non-intrusive, and the most common portfolio pattern;
a dedicated section would force navigation and take prime page real estate. This
is the one placement decision worth confirming with the owner (see Open
Questions). The spec's UI scenarios are written around the widget.

### D5. Testing: Vitest + React Testing Library, provider mocked
Add `vitest.config.ts` (jsdom env, React plugin, setup file importing
`@testing-library/jest-dom`) and a `test` script (`vitest run`). Mocks:
- Route tests `vi.mock("@/lib/chat-model")` and/or `vi.mock("ai")` to stub
  `streamText` (capture the `system` arg; simulate throw for the error path).
- The model-default test imports the real `chat-model` with `GROQ_API_KEY` set in
  the test env and asserts the resolved model id/provider — no network.
- UI tests `vi.mock("@ai-sdk/react")` to control `useChat` return values
  (`messages`, `status`, and a spy `sendMessage`), so rendering and submit are
  deterministic with no network/key.
Rationale: Vitest is ESM-native (repo is `"type": "module"`), fast, and the de
facto choice for Vite/Next + React 19 + TS. Alternative: Jest — rejected (heavier
ESM/TS config); Playwright — rejected for this scope (would need a running server
and a real/mocked provider; component + route tests cover the scenarios).

## Risks / Trade-offs

- **Prompt-stuffed context grows** as the portfolio grows → keep the context
  curated; revisit RAG only if it exceeds the model's practical context budget.
- **AI SDK v6 API drift** from older tutorials → mitigated by confirming current
  imports/signatures via context7 before coding, and by the route test asserting
  the call shape.
- **AI Elements components are vendored** (copied into `components/ai-elements/`)
  and can lag upstream → acceptable; they are owned code, pinned by the add step.
- **No E2E test** of a real streamed round-trip → mitigated by route + component
  tests around mocked boundaries; a manual smoke check with a real key is a
  release step, not a CI gate.
- **Provider/network failure** mid-stream → route returns a safe error and the UI
  shows a retryable error state (covered by scenarios).

## Migration Plan

Additive only. Steps: declare deps in `package.json`; add AI Elements components;
add `lib/chat-model.ts`, `lib/portfolio-context.ts`, `app/api/chat/route.ts`, the
chat widget, and mount it in the layout; add `.env.local.example`; add Vitest +
tests. Rollback = remove the widget mount and the new files; nothing else depends
on them. `GROQ_API_KEY` must be set in the deploy environment for live use (tests
do not need it).

## Open Questions

- **Placement**: confirm collapsible widget (proposed) vs. a dedicated section.
- **System-prompt builder shape**: exported constant `SYSTEM_PROMPT` vs. function
  `buildSystemPrompt()` — tests target whichever is chosen; defaulting to a
  function for future parameterization.
- **Owner-specific PLACEHOLDER content** (tone, FAQ, anything not in `data.ts`)
  to be filled in by the owner; the bot must not invent it.
