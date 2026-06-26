# portfolio-chatbot Specification

## Purpose
TBD - created by archiving change add-portfolio-chatbot. Update Purpose after archive.
## Requirements
### Requirement: Portfolio-scoped conversational answers

The chatbot SHALL answer questions about the portfolio owner (bio, projects,
experience, skills, education, contact) using only the supplied portfolio
context, and SHALL politely redirect questions that are not about the portfolio
owner instead of answering them as a general-purpose assistant.

#### Scenario: On-topic question is answered from context

- **WHEN** a user asks a question about the portfolio owner's experience,
  projects, skills, or contact details
- **THEN** the assistant responds with information grounded in the portfolio
  context and does not claim facts that are absent from that context

#### Scenario: Off-topic question is redirected

- **WHEN** a user asks something unrelated to the portfolio owner (e.g. "write me
  a poem", "what's the weather", general coding help)
- **THEN** the assistant declines to answer the unrelated request and steers the
  user back to portfolio-related topics

#### Scenario: Guardrail is enforced via the system prompt

- **WHEN** the system prompt is constructed for a chat request
- **THEN** it contains both the portfolio context and an explicit instruction to
  only answer portfolio-related questions and to redirect otherwise

### Requirement: Server-side streaming chat API

The system SHALL expose a Next.js App Router route handler at `POST /api/chat`
that accepts a `messages` array, invokes the AI SDK `streamText` with the
portfolio system prompt, and returns a streamed UI-message response. All model
invocation SHALL happen server-side.

#### Scenario: Valid request returns a streaming response

- **WHEN** a `POST /api/chat` request is made with a valid `messages` payload
- **THEN** the route returns a successful streaming HTTP response produced by the
  AI SDK (not a buffered single JSON blob)

#### Scenario: System prompt is injected into the model call

- **WHEN** the route handles a chat request
- **THEN** `streamText` is invoked with a `system` argument equal to the
  single-source portfolio system prompt

#### Scenario: Provider failure is handled gracefully

- **WHEN** the underlying model/provider throws or rejects during a request
- **THEN** the route returns a safe error response without crashing the server
  and without exposing secrets or stack traces to the client

### Requirement: Swappable LLM provider defaulting to Groq

The chatbot SHALL use Groq (`@ai-sdk/groq`, model `llama-3.3-70b-versatile`) by
default, reading credentials from the `GROQ_API_KEY` server environment variable.
The provider/model SHALL be defined in a single module so it can be swapped to a
different provider (e.g. Gemini) by changing one line.

#### Scenario: Default model is Groq llama-3.3-70b-versatile

- **WHEN** the chat model module is resolved
- **THEN** it provides the Groq `llama-3.3-70b-versatile` model as the default

#### Scenario: API key comes from the environment, never hardcoded

- **WHEN** the provider is configured
- **THEN** the credential is taken from `GROQ_API_KEY` in the server environment
  and no API key literal appears in the source

#### Scenario: Provider is swappable in one place

- **WHEN** a developer wants to switch to a different provider such as Gemini
- **THEN** they only need to change the single exported model line in the chat
  model module, with no edits to the route handler or UI

### Requirement: Single-source portfolio knowledge

The knowledge the chatbot is allowed to use SHALL be defined in one module,
`lib/portfolio-context.ts`, which composes the portfolio system prompt. Bio,
projects, experience, skills, and contact details SHALL NOT be duplicated across
chatbot files; any information not available from existing canonical data SHALL
be represented as a clearly marked PLACEHOLDER rather than fabricated.

#### Scenario: System prompt is built from the single context module

- **WHEN** the server builds the system prompt for `/api/chat`
- **THEN** the prompt content is sourced from `lib/portfolio-context.ts` and
  includes the bio, projects, experience, skills, and contact sections

#### Scenario: No duplicated or fabricated portfolio facts

- **WHEN** portfolio context is needed by the chatbot
- **THEN** it is read from the single context module (reusing `lib/data.ts` where
  available), and unknown details are left as explicit PLACEHOLDER markers

### Requirement: Chat UI built with AI Elements

The chat interface SHALL be built using AI Elements components (Conversation,
Message, PromptInput, and a streaming Response/loader) wired to the AI SDK
`useChat` hook. It SHALL render a conversation view with message bubbles, an
input for submitting messages, streaming assistant output, a loading/typing
indicator, auto-scroll to the latest message, and a responsive layout embedded
in the portfolio as a collapsible widget.

#### Scenario: Conversation view renders

- **WHEN** the chat UI mounts with no messages yet
- **THEN** it renders the AI Elements conversation container and an empty state,
  with a prompt input ready to accept text

#### Scenario: User submits a message

- **WHEN** a user types text into the prompt input and submits it
- **THEN** the UI calls the `useChat` `sendMessage` with the entered text and
  clears the input

#### Scenario: Streamed assistant text appears

- **WHEN** `useChat` exposes an assistant message containing text parts
- **THEN** that assistant text is rendered in the conversation as a message
  bubble

#### Scenario: Loading indicator while awaiting a response

- **WHEN** a request has been submitted and the assistant has not yet started
  streaming (`status` is `submitted`)
- **THEN** the UI shows a loading/typing indicator

#### Scenario: Widget is collapsible and responsive

- **WHEN** the widget is closed
- **THEN** a launcher control is shown that opens the chat panel, and the panel
  layout adapts to small (mobile) and large viewports

### Requirement: Non-functional safeguards

The chatbot SHALL stream responses, keep all secrets server-side, be accessible,
and fail gracefully.

#### Scenario: No secrets in the client bundle

- **WHEN** the client chat component is built
- **THEN** it does not import the provider SDK and does not reference
  `GROQ_API_KEY`; only the server route touches credentials

#### Scenario: Graceful failure surfaced to the user

- **WHEN** the `/api/chat` request fails (network or provider error)
- **THEN** the UI surfaces a non-technical error state and remains usable for a
  retry instead of breaking the page

#### Scenario: Accessible chat controls

- **WHEN** the chat UI renders
- **THEN** interactive controls (launcher, input, submit) expose accessible
  names/roles so they are operable via keyboard and screen readers

