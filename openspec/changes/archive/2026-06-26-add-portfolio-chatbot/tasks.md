## 1. Dependencies & scaffolding

- [x] 1.1 Declare runtime deps in `package.json`: `ai`, `@ai-sdk/react`, `@ai-sdk/groq` (already in `node_modules`; pin to installed versions).
- [x] 1.2 Add AI Elements components via its CLI (Conversation, Message, PromptInput, Response/Loader and their deps) into `components/ai-elements/`; verify imports against current AI Elements docs (context7).
- [x] 1.3 Add `.env.local.example` containing `GROQ_API_KEY=`.

## 2. Single-source knowledge (`lib/portfolio-context.ts`)

- [x] 2.1 Create `lib/portfolio-context.ts` that reuses `lib/data.ts` (`portfolioData`) for bio, projects, experience, skills, and contact, exposing a structured `portfolioContext`.
- [x] 2.2 Mark any bot-specific info not present in `data.ts` (tone, FAQ) as clearly labeled `// PLACEHOLDER:` — do not fabricate personal details.
- [x] 2.3 Export `buildSystemPrompt()` that composes the portfolio context plus the guardrail instruction (only answer portfolio questions; otherwise politely decline and redirect).

## 3. Provider / model module (`lib/chat-model.ts`)

- [x] 3.1 Create `lib/chat-model.ts` exporting a single `chatModel` = Groq `llama-3.3-70b-versatile` via `@ai-sdk/groq` (key read from `GROQ_API_KEY` env, no literal in source).
- [x] 3.2 Document the one-line swap to Gemini in a comment above the export.

## 4. Server route (`app/api/chat/route.ts`)

- [x] 4.1 Implement `POST` with `maxDuration = 30`: read `{ messages }: { messages: UIMessage[] }`, call `streamText({ model: chatModel, system: buildSystemPrompt(), messages: await convertToModelMessages(messages) })`, return `result.toUIMessageStreamResponse()`.
- [x] 4.2 Wrap model invocation in error handling that returns a safe error response (no crash, no secret/stack-trace leakage) on provider failure.

## 5. Chat UI (AI Elements + `useChat`)

- [x] 5.1 Create `components/chat/portfolio-chat.tsx` (`"use client"`) using `useChat` from `@ai-sdk/react` and AI Elements `Conversation`/`ConversationContent`/`ConversationEmptyState`/`ConversationScrollButton`, `Message`/`MessageContent`/`MessageResponse`, `PromptInput`/`PromptInputTextarea`/`PromptInputSubmit`.
- [x] 5.2 Render streamed assistant text, an empty state, a loading/typing indicator while `status === "submitted"`, and auto-scroll to the latest message.
- [x] 5.3 Wrap it in a collapsible launcher (floating toggle button → open/close panel) that is responsive and exposes accessible names/roles; ensure the client component never imports the provider SDK or `GROQ_API_KEY`.
- [x] 5.4 Surface a non-technical, retryable error state when the chat request fails (`useChat` error).
- [x] 5.5 Mount the widget once in `app/layout.tsx`.

## 6. Test tooling

- [x] 6.1 Add dev deps: `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`.
- [x] 6.2 Add `vitest.config.ts` (jsdom env, React plugin, setup file) and a test setup importing `@testing-library/jest-dom`; add `"test": "vitest run"` (and `"test:watch": "vitest"`) scripts.

## 7. Tests — route & wiring (provider mocked, no key, no network)

- [x] 7.1 `app/api/chat/route` test: valid `messages` payload returns a streaming HTTP 200 response (mock `streamText`). [covers: Valid request returns a streaming response]
- [x] 7.2 Assert `streamText` is called with `system` === `buildSystemPrompt()` output. [covers: System prompt is injected]
- [x] 7.3 Assert provider failure → route returns a safe error response, no crash/secret leak (mock `streamText` to throw). [covers: Provider failure is handled gracefully]

## 8. Tests — guardrails, provider, knowledge

- [x] 8.1 Unit-test `buildSystemPrompt()`: contains portfolio context AND the "only answer portfolio questions / redirect otherwise" instruction. [covers: Guardrail enforced via system prompt; On-topic answered; Off-topic redirected]
- [x] 8.2 Unit-test the system prompt includes bio, projects, experience, skills, contact sourced from `lib/portfolio-context.ts`, with no duplicated/fabricated facts. [covers: System prompt built from single context module; No duplicated/fabricated facts]
- [x] 8.3 Unit-test `chat-model`: default resolves to Groq `llama-3.3-70b-versatile`; key read from `GROQ_API_KEY`, no hardcoded key. [covers: Default model is Groq; API key from env; Provider swappable in one place]

## 9. Tests — UI (`useChat` mocked, no network)

- [x] 9.1 Renders conversation container + empty state + ready input. [covers: Conversation view renders]
- [x] 9.2 Typing + submitting calls `sendMessage` with the entered text and clears input. [covers: User submits a message]
- [x] 9.3 Assistant message with text parts renders as a bubble. [covers: Streamed assistant text appears]
- [x] 9.4 Loading indicator shows when `status === "submitted"`. [covers: Loading indicator while awaiting]
- [x] 9.5 Collapsible launcher toggles the panel; controls expose accessible names. [covers: Widget is collapsible and responsive; Accessible chat controls]
- [x] 9.6 Client component does not import provider SDK / `GROQ_API_KEY`; failed request shows a retryable error state. [covers: No secrets in client bundle; Graceful failure surfaced]

## 10. Verify

- [x] 10.1 Run `pnpm test` (`vitest run`) and iterate until the full suite passes; report results.
- [x] 10.2 Run `openspec validate add-portfolio-chatbot --strict` and confirm every spec scenario is covered by a passing test before archiving.
