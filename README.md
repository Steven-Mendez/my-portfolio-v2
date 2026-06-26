# Steven Mendez Portfolio v2

Portfolio website for Steven Mendez, focused on backend engineering, cloud architecture, and AI-driven product development.

Live site: [stevenampaiz.com](https://stevenampaiz.com)

## Overview

This portfolio is designed to combine strong visual identity with production-grade engineering practices.

Core goals:
- present professional experience and projects with clear storytelling
- maintain high UX quality across desktop and mobile
- enforce accessibility and reduced-motion support
- keep a strong baseline of automated quality and security checks

## Tech Stack

- Next.js 16 (App Router + `proxy.ts`)
- React 19 + TypeScript
- Tailwind CSS 4
- GSAP + Three.js (with `prefers-reduced-motion` fallback paths)
- Vercel Analytics + Speed Insights

## Main Sections

- `/` Home portfolio experience (hero, experience, projects, about, contact)
- `/resume` Printable resume page
- `/opengraph-image` Dynamic OG image endpoint
- `/robots.txt` + `/sitemap.xml` Metadata routes
- `/api/chat` Server route powering the portfolio chatbot widget

## Portfolio Chatbot

A collapsible chat widget (floating button, bottom-right) answers questions about
Steven using only the portfolio's own content, and politely redirects anything
off-topic. The model runs **server-side** via the Vercel AI SDK (`/api/chat`) —
no API key ever reaches the browser. It was built spec-first; see
[Spec-Driven Development](#spec-driven-development) below.

**Architecture**
- UI: [AI Elements](https://elements.ai-sdk.dev) components + the AI SDK
  `useChat` hook — `components/chat/portfolio-chat.tsx`.
- Server: `app/api/chat/route.ts` streams responses with `streamText`.
- Provider: **Groq** `llama-3.3-70b-versatile` (free, no credit card).
- Knowledge: single source of truth in `lib/portfolio-context.ts` (derived from
  `lib/data.ts`); the active model lives in `lib/chat-model.ts`.

### 1. Get a free Groq API key

1. Sign up at [console.groq.com](https://console.groq.com) (no credit card).
2. Create a key at [console.groq.com/keys](https://console.groq.com/keys).

### 2. Set the environment variable

```bash
cp .env.local.example .env.local
# then edit .env.local:
# GROQ_API_KEY=gsk_your_key_here
```

`GROQ_API_KEY` is read only on the server. Set the same variable in your
deployment environment (e.g. Vercel project settings) for production.

### 3. Fill in the portfolio context

The chatbot only knows what `lib/portfolio-context.ts` exposes. Most content is
derived automatically from `lib/data.ts`, so update your bio/experience/projects
there as usual. Anything chatbot-specific (FAQ, tone) is marked with
`// PLACEHOLDER:` in `lib/portfolio-context.ts` — replace those with real values;
never invent biographical details.

### 4. Run it

```bash
pnpm dev
```

Open the site and click the chat button in the bottom-right corner.

### 5. Run the test suite

The suite mocks the AI provider, so it needs **no API key and makes no network
calls**:

```bash
pnpm test
```

### 6. Swap the provider (e.g. to Gemini)

The provider lives in exactly one place — `lib/chat-model.ts`. Change this single
line:

```ts
// from (default):
export const chatModel = groq(CHAT_MODEL_ID);

// to Gemini (after `pnpm add @ai-sdk/google` and importing `google`):
export const chatModel = google("gemini-2.0-flash");
```

Set the matching key (`GOOGLE_GENERATIVE_AI_API_KEY` for Gemini). Nothing in the
route handler or UI needs to change.

## Spec-Driven Development

Non-trivial changes are driven through OpenSpec (propose → apply → archive). See
[`CLAUDE.md`](./CLAUDE.md) for the workflow; shipped specs live under
`openspec/specs/` (e.g. `openspec/specs/portfolio-chatbot/spec.md`).

## Local Development

```bash
pnpm install
pnpm dev
```

Default local URL: `http://127.0.0.1:3000`

## Validation Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm smoke:routes
pnpm check:anchors
pnpm check:security-headers
```

What these checks cover:
- static quality gates (lint + types + production build)
- smoke validation for critical routes (`/` and `/resume`)
- static anchor integrity (`id` uniqueness and `#about` consistency)
- runtime security header validation, including CSP guardrails

## Accessibility and UX Notes

- Motion-heavy visuals degrade gracefully when users prefer reduced motion.
- Anchor navigation and section semantics are kept deterministic.
- Error and loading states are tuned to avoid misleading or disruptive UX.

## Security Notes

- Security headers and CSP are configured in `next.config.mjs`.
- CSP exception rationale is documented in `docs/security/csp-exceptions.md`.
- CI enforces security-header checks against a production-start runtime.

## CI

The workflow at `.github/workflows/ci.yml` runs:
- lint
- typecheck
- build
- smoke route checks
- anchor checks
- security header checks

## Project Purpose

This repository is both:
- a personal portfolio product
- a reference implementation of quality-first frontend delivery standards
