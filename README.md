# Steven Mendez Portfolio v2

Portfolio website for Steven Mendez, focused on backend engineering, cloud architecture, and AI-driven product development.

Live site: [stevenmendez.dev](https://stevenmendez.dev)

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
