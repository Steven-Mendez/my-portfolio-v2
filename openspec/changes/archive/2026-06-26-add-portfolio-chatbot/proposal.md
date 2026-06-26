## Why

Visitors to the portfolio (recruiters, hiring managers, potential collaborators)
often have specific questions — "What did you build at WERN?", "Do you know
Kubernetes?", "How can I contact you?" — that they currently have to hunt for by
scrolling. An embedded chatbot lets them ask in natural language and get instant,
grounded answers drawn from the portfolio's own content, while staying strictly
on-topic so it can't be turned into a generic free LLM.

## What Changes

- Add an **embedded portfolio chatbot**: a collapsible chat widget, available
  across the site, that answers questions about Steven using portfolio content
  and politely redirects anything off-topic.
- Add a **server route `/api/chat`** (Next.js App Router) that streams model
  responses via the Vercel AI SDK (`streamText`), injecting a portfolio system
  prompt. No model calls happen in the browser; the API key never reaches the
  client.
- Add a **swappable LLM provider** layer defaulting to **Groq**
  (`@ai-sdk/groq`, model `llama-3.3-70b-versatile`) — free, no credit card —
  reading `GROQ_API_KEY` from the server environment. Switching to Gemini is a
  one-line change in a single model module.
- Add **`lib/portfolio-context.ts`** as the single source of truth for the
  knowledge the bot is allowed to use (bio, projects, experience, skills,
  contact), composed into the system prompt. It reuses existing canonical data
  from `lib/data.ts` and marks any bot-specific gaps as explicit PLACEHOLDERS.
- Build the **chat UI exclusively with AI Elements** components (Conversation,
  Message, PromptInput, Response/Loader) wired to the `useChat` hook: streaming
  output, typing/loading state, auto-scroll, and a responsive layout.
- Add **`.env.local.example`** documenting `GROQ_API_KEY=`.
- Introduce **Vitest + React Testing Library** (no test framework currently
  exists in the repo) and a test suite that mocks the AI provider so it needs no
  API key and makes no network calls.

## Capabilities

### New Capabilities
- `portfolio-chatbot`: an embedded, portfolio-scoped conversational assistant —
  its guardrails, the streaming server API, the swappable provider, the
  single-source knowledge file, the AI Elements UI, and the non-functional
  safeguards (streaming, accessibility, mobile, no client secrets, graceful
  failure).

### Modified Capabilities
<!-- None. This is a net-new capability; no existing spec requirements change. -->

## Impact

- **New code**: `app/api/chat/route.ts`, `lib/portfolio-context.ts`,
  `lib/chat-model.ts` (the one-line-swap model module), a chat UI component
  (e.g. `components/chat/portfolio-chat.tsx`) mounted in the layout, and the
  AI Elements components under `components/ai-elements/`.
- **Dependencies (runtime)**: declare `ai`, `@ai-sdk/react`, `@ai-sdk/groq`
  in `package.json` (already present in `node_modules`); add AI Elements
  components via its CLI.
- **Dependencies (dev/test)**: `vitest`, `@vitejs/plugin-react`,
  `@testing-library/react`, `@testing-library/jest-dom`,
  `@testing-library/user-event`, `jsdom`; add a `test` script.
- **Config**: `.env.local.example` (`GROQ_API_KEY=`); `GROQ_API_KEY` must be set
  in the deployment environment. New `vitest.config.ts` + test setup file.
- **No breaking changes**: the widget is additive; existing pages and routes are
  untouched apart from mounting the widget in the layout.

## Testing

The repo currently has **no test framework** (only Node smoke scripts under
`scripts/`). Per the "reuse what exists, don't add a second framework" rule there
is nothing to reuse, so this change introduces **Vitest** (ESM-native — the repo
is `"type": "module"` — fast, first-class TS/JSX, works with React 19) plus
**React Testing Library** for component tests, running in a `jsdom` environment.
A `test` script (`vitest run`) is added. **The AI provider is always mocked: the
suite makes no network calls and requires no API key.**

Coverage (each maps to spec scenarios that must pass before archive):

- **`/api/chat` route** (`vi.mock` the model/`streamText` — no real provider):
  - Returns a streaming HTTP response (200) for a valid `messages` payload.
  - Injects the portfolio system prompt: assert `streamText` is called with a
    `system` string that contains the portfolio context **and** the on-topic /
    redirect guardrail language.
  - Handles provider errors gracefully: when the model throws, the route returns
    a safe error response (no unhandled crash, no secret leakage).
- **Guardrails**: a unit test on the system-prompt builder asserts it embeds the
  single-source portfolio context and the "only answer portfolio questions,
  otherwise redirect" instruction; plus a route test with a mocked model
  confirming off-topic handling is driven by that wiring.
- **Provider swap**: a unit test asserts the default model resolves to the Groq
  `llama-3.3-70b-versatile` model and that the key is read from `GROQ_API_KEY`
  (env), never hardcoded.
- **UI** (`vi.mock('@ai-sdk/react')` so `useChat` is controlled, no network):
  - Chat renders, including an empty state.
  - Typing a message and submitting calls `sendMessage` with the entered text.
  - Streamed assistant text from `useChat` renders in the conversation.
  - A loading/typing indicator shows while `status` is `submitted`/`streaming`.
- **No client secrets**: a test (or lint-style assertion) verifies the client
  component does not import the provider SDK or reference `GROQ_API_KEY`.

The change is **not complete until the full Vitest suite passes**.
