# stevenampaiz.com

Portfolio personal en [Astro](https://astro.build) + Tailwind CSS 4, estático y
bilingüe (`/` en inglés, `/es/` en español). Desplegado en Vercel.

## Requisitos

- Node 22.23+ y pnpm 11 (`corepack enable` instala la versión fijada).
- Para `cv:build`: Google Chrome y `poppler` (`pdfinfo`, `pdftotext`).

## Uso

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # salida en ./dist
pnpm preview
```

| Comando           | Acción                                                        |
| ----------------- | ------------------------------------------------------------- |
| `pnpm check`      | Tipos en `.astro` y `.ts`                                     |
| `pnpm lint`       | ESLint (`lint:fix` corrige)                                   |
| `pnpm format`     | Prettier (`format:check` solo verifica)                       |
| `pnpm lighthouse` | Build + Lighthouse CI con los umbrales de `lighthouserc.json` |
| `pnpm cv:build`   | Genera `public/steven-mendez-cv-{en,es}.pdf` desde `resume/`  |

Los hooks de git (husky) pasan lint-staged en `pre-commit` y commitlint
(Conventional Commits) en `commit-msg`. CI corre lint, formato, tipos, build y
Lighthouse en cada push y PR.

## Dónde está cada cosa

- `src/data/`: todo el contenido (perfil, experiencia, proyectos, educación,
  skills, write-ups) con ambos idiomas lado a lado.
- `src/i18n/ui.ts`: textos de la interfaz.
- `src/pages/`: `index.astro` y `work/[slug].astro`, replicados en `es/`.
- `src/components/`: secciones, barra, hero y layout de write-ups.
- `src/scripts/motion.ts`: animaciones (GSAP), desactivadas con
  `prefers-reduced-motion`.
- `resume/`: fuente HTML del CV. `public/og/`: tarjetas Open Graph por página
  e idioma.
