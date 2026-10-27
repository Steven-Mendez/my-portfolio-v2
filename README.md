# Portfolio v3

Reconstrucción desde cero sobre **Astro 7 + Tailwind CSS 4**, gestionada con
**pnpm**.

## Stack

| Área        | Herramienta                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------- |
| Framework   | Astro 7 (salida estática), `@astrojs/sitemap`                                                 |
| Estilos     | Tailwind CSS 4 vía `@tailwindcss/vite`                                                        |
| Tipos       | TypeScript 6 (`astro/tsconfigs/strict`), `@astrojs/check`                                     |
| Lint        | ESLint 10 flat config, `typescript-eslint`, `eslint-plugin-astro`, `eslint-plugin-jsx-a11y-x` |
| Formato     | Prettier 3, `prettier-plugin-astro`, `prettier-plugin-tailwindcss`                            |
| Git hooks   | husky (`pre-commit` → lint-staged, `commit-msg` → commitlint)                                 |
| Commits     | Conventional Commits (`@commitlint/config-conventional`)                                      |
| Rendimiento | Lighthouse CI (`@lhci/cli`) con umbrales en `lighthouserc.json`                               |

## Scripts

| Comando           | Acción                                                      |
| ----------------- | ----------------------------------------------------------- |
| `pnpm dev`        | Servidor de desarrollo en `localhost:4321`                  |
| `pnpm build`      | Build estático en `./dist/`                                 |
| `pnpm preview`    | Sirve el build localmente                                   |
| `pnpm check`      | Diagnóstico de tipos en `.astro` y `.ts`                    |
| `pnpm lint`       | ESLint (`lint:fix` para autocorregir)                       |
| `pnpm format`     | Prettier en todo el proyecto (`format:check` solo verifica) |
| `pnpm lighthouse` | Build + Lighthouse CI (3 corridas, móvil) contra `./dist/`  |

## Hooks de git

`pnpm install` ejecuta `prepare` → `husky`, que fija `core.hooksPath` a
`.husky/_`.

- `pre-commit`: `lint-staged` sobre los archivos staged.
- `commit-msg`: `commitlint` valida el mensaje con Conventional Commits.

## Lighthouse CI

`lighthouserc.json` usa el preset `lighthouse:recommended` y exige
`performance ≥ 0.90`, `accessibility ≥ 0.95`, `best-practices ≥ 0.90`,
`seo ≥ 0.95`. La auditoría `network-dependency-tree-insight` está apagada: es
informativa y puntúa 0 en cuanto existe una cadena de peticiones.

## Política de dependencias (pnpm)

`pnpm-workspace.yaml` fija `minimumReleaseAge` de
7 días y `trustPolicy: no-downgrade`. Por eso `pnpm install` puede resolver una
versión ligeramente anterior a la última publicada. `chokidar@4.0.3` y `semver`
están en `trustPolicyExclude` como falsos positivos conocidos (dependencias
dev-only de `@astrojs/check` y `@lhci/cli`).

## Secciones

Cada sección tiene su propia composición para que la página no se lea como
seis veces la misma plantilla. El vocabulario (rombo rojo, etiquetas mono,
línea roja, tinta/papel) es común; el layout no:

| Sección    | Apertura                          | Cuerpo                                                                                                                             |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| About      | compacta, pegajosa a la izquierda | bio en dos tonos a la derecha                                                                                                      |
| Experience | franja de piel azul               | filas con hairline; empresa/rol pegajosos en la izquierda                                                                          |
| Work       | completa                          | pistas regladas: título y resumen en cols 1–5; viñetas, "Hecho con" y enlaces en cols 6–11; año en la 12                           |
| Stack      | completa                          | grupos numerados en tres columnas; cada herramienta como pista, un nombre por fila                                                 |
| Education  | compacta, pegajosa a la izquierda | cuatro fichas iguales (título, curso y certificaciones) con tipo y periodo o año en meta, nombre, institución, nota y verificación |
| Contact    | completa                          | filas email, CV, GitHub y LinkedIn; la fila entera es el enlace; flecha → ↓ ↗; botón para copiar el email                          |

### Entradas de proyecto

Cada proyecto de Work tiene una página larga en `/work/<slug>/` y
`/es/work/<slug>/` (`src/pages/work/[slug].astro` y `src/pages/es/work/`),
a la que lleva el primer enlace de su fila ("[ Read more → ]"). Son las
páginas interiores del libreto para una pista de la contratapa, no un blog:
solo los proyectos personales tienen entrada; los empleos no.

- **Contenido:** `src/data/writeups.ts`, con los dos idiomas lado a lado en
  cada cadena. Una entrada tiene lead, descripción, rol, fecha de revisión y
  capítulos numerados de bloques: `p` (párrafo, admite `**negrita**`; el
  primero de cada capítulo se compone como lead), `list` (hechos con raya),
  `figure` (captura con pie, numerada en orden de lectura
  en toda la página) y `sheet` (filas regladas nombre → por qué, el stack
  como hoja de especificaciones). Título, año, stack y enlaces del proyecto
  salen de `projects.ts` por el `slug` compartido.
- **Capturas:** `src/assets/work/<slug>/*.jpg` a 1440 px de ancho; `Picture`
  genera AVIF/WebP en tres anchos. Van enmarcadas con un hairline y pie en
  mono ("FIG. 01 …"), como las fotos de un libreto.
- **Composición** (`src/components/writeup/Writeup.astro`): apertura en tinta
  con el mismo `SectionHeading` de las secciones (`as="h1"`; el número es la
  pista en Work, el kicker el nombre de la sección, el h1 el nombre del
  proyecto, la nota el tiempo de lectura, el intro el lead) y una fila de
  datos (año, rol, hecho con, enlaces) bajo la regla; cuerpo en papel con el
  número y el título de cada capítulo pegajosos en las cuatro primeras
  columnas y los bloques en las siete de al lado; cierre en tinta con la
  fecha de revisión y los enlaces a la lista y a la entrada vecina.
- **Barra y pie fuera del inicio:** `sectionHref` (`src/i18n/utils.ts`)
  devuelve `#work` en la página de inicio y `/es/#work` desde cualquier otra,
  así que la barra, el índice móvil y el pie funcionan igual en una entrada.

El contenido de cada sección, la barra fija y el pie van en `shell`
(`--container-page: 100rem`): a sangre hasta 1600 px y centrado a partir de ahí, mientras los fondos siguen a sangre.

`SectionHeading` recibe `layout="full" | "aside"` para las dos aperturas.
Las seis tienen la misma anatomía y las mismas medidas: número, kicker,
título y regla roja, de arriba abajo. A partir de sm el número va en flujo
encima del kicker, alineado a la izquierda, siempre al mismo tamaño
(`--text-mark`) y con la misma opacidad (0.07 en tinta, 0.09 en papel); en
móvil lo sustituye el índice pequeño al final del kicker. Número → kicker,
kicker → título y título → regla miden `--spacing-head` en todas las
aperturas y en todos los anchos, y la deriva de ±8 % del número cabe de sobra
en ese hueco. El título usa `--text-display` en todas; la única excepción es
la apertura compacta (About y Education) en lg, donde la columna de cuatro
columnas no admite "Certificaciones" a tamaño display (ni con cinco) y el
título baja a `--text-display-sm`.

### Regla del rojo

- **Línea roja** = lectura o sección: `red-rule`, `scroll-rule` y el idioma
  activo.
- **Rombo rojo** = índice o "aquí/ahora": el kicker, los números de pista de
  Work y Stack, el puesto actual, la disponibilidad y la fila activa del
  índice móvil.
- Todo lo demás (estructura, estados de fila, conectores, bordes) usa
  `--rule` o `--title-color`. El rojo nunca va en texto.
- No hay movimiento perpetuo nuevo: solo `dots-drift` y `hero-nudge`.

### Escala

Los layouts cambian, la escala no: `global.css` define una sola escala
tipográfica y cada paso tiene su utilidad de rol, que fija tamaño, peso,
interlineado y tracking:

| Utilidad          | Token                | Uso                                                   |
| ----------------- | -------------------- | ----------------------------------------------------- |
| `type-display`    | `--text-display`     | títulos de sección (mayúsculas, 300, color de título) |
| `type-display-sm` | `--text-display-sm`  | título de un trabajo, un proyecto, un periodo         |
| `type-statement`  | `--text-statement`   | la bio                                                |
| `type-lead`       | `--text-lead`        | resúmenes, descripciones, etiquetas de grupo          |
| `type-body`       | `--text-body`        | el resto                                              |
| `meta`            | `--text-meta` (12px) | etiquetas mono en mayúsculas, en todos los anchos     |
| `meta-name`       | `--text-meta`        | nombres de producto en mono con su caja real          |

Los pasos fluidos interpolan en línea recta entre un viewport de 360 y uno de
1440 px (pendiente = (máx − mín) / 1080 px; intercepto = mín − pendiente ×
360 px). El intercepto en `rem` hace que crezcan con el zoom de texto. Solo
`type-display` fija el color; en el resto cada componente elige
`--title-color` o `--text-muted`. Dos utilidades de dato completan la escala:
`figure` (una cifra dentro de texto apagado: solo sube a tinta de título, sin
peso ni color) y `tick-list` (lista de hechos con una raya fina delante,
escalable con `--tick`).

### Ritmo

El ritmo vertical tiene tres niveles, todos en `@theme`:

| Nivel    | Tokens                                                     | Uso                                                                                    |
| -------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Sección  | `--spacing-section` (6/9 rem), `--spacing-joint` (4/5 rem) | `py-section lg:py-section-lg`; `pt-joint`/`pb-joint` en la costura entre dos secciones |
| Apertura | `--spacing-head` (2.5 rem), `--spacing-head-sm` (1.75 rem) | `var(--spacing-head)` entre kicker, título y línea; `-sm` en la apertura compacta      |
| Fila     | `--spacing-row` (2.5/3 rem), `--spacing-inner` (1.25 rem)  | `padding-block: var(--spacing-row)`, `gap-y-row-lg`, `var(--spacing-inner)`            |

El título de un trabajo, de un proyecto y el periodo de una credencial tienen
el mismo tamaño; un resumen, una descripción y la etiqueta de un grupo del
stack también; una fila, una tarjeta y un grupo respiran lo mismo.

## Movimiento

Toda la animación es mejora progresiva: sin JS o con `prefers-reduced-motion`
la página muestra su estado final y nada se mueve. El cambio de
`prefers-reduced-motion` se escucha en vivo: si el sistema lo activa con la
página abierta, el parallax y los scrubs se paran y todo queda en su estado
final.

### Tempo

| Nombre                   | Valor  | Uso                                                               |
| ------------------------ | ------ | ----------------------------------------------------------------- |
| `--duration-micro`       | 200 ms | color y opacidad (se mantiene con reduced-motion)                 |
| `--duration-interaction` | 300 ms | lo que se desplaza: subrayados, flechas (0 ms con reduced-motion) |
| `DUR.piece`              | 0.7 s  | piezas sueltas (notas, etiquetas)                                 |
| `DUR.block`              | 0.9 s  | bloques de texto                                                  |
| `DUR.title`              | 1.0 s  | títulos y su línea                                                |
| `DUR.rule`               | 1.2 s  | líneas y hairlines                                                |
| `DUR.plate`              | 1.4 s  | imágenes grandes (el retrato del hero)                            |

Las dos primeras son propiedades CSS en `:root` (`global.css`), con
`--ease-out-soft` y `--ease-out-expo` en `@theme`. `DUR` es una constante de
`src/scripts/motion.ts`.

### Ganchos

- `src/scripts/motion.ts`: GSAP 3 (ScrollTrigger, SplitText) montado
  en `astro:page-load` y desmontado en `astro:before-swap`. Los componentes se
  enganchan por atributos: `data-reveal="up|items|rows|lines|heading"`,
  `data-draw`, `data-parallax`, `data-hero-*`, `data-progress`,
  `data-footer-mark`, y en la apertura de sección `data-section-line` (la
  línea del kicker se dibuja) y `data-section-note` (la nota entra de lado).
- Clases `motion` y `motion-ready` en `<html>`: un script en línea pone
  `motion` solo si el movimiento está permitido, y mientras falte
  `motion-ready` el texto del hero queda oculto para que no parpadee en su
  estado final. El retrato (candidato a LCP) nunca se oculta. Sin JS no
  existe `.motion` y el hero se ve entero.
- `<ClientRouter />` en `BaseLayout`: el cambio EN/ES es una view transition;
  el retrato del hero tiene `transition:name`.
- Utilidades en `global.css`: `rule-rows` (hairlines que se dibujan vía
  `--draw`), `dots-layer` (la retícula de puntos rojos del disco), `red-rule`
  (la línea roja del libreto), `tick-list` (rayas escalables vía `--tick`).
- `BracketLink`: flecha según destino (↗ externo, ↓ descarga, → correo), que
  se desplaza al pasar el cursor salvo con reduced-motion. Las flechas son un
  SVG en línea (`Arrow.astro`, medido en em) porque Geist Mono no trae ↗;
  así las tres comparten tamaño y trazo en la barra, Work, Education, el pie
  y Contact. `me` (rel="me") solo en perfiles propios: Work y Education pasan
  `me={false}`.
- `StackLine.astro`: línea de stack con cada nombre y su "·" sin cortar, para
  que una línea nunca empiece ni acabe en un separador suelto.
- Barra: CV con ↓ (sitio canónico del CV), índice de secciones en un popover
  por debajo de `lg` y skip link "[ Skip to content ]" (corchetes con
  `aria-hidden`) como primer foco de la página.
- Kicker de sección: el filete gris solo aparece cuando hay `note`
  (Experience y Education); las demás aperturas quedan "rombo + label".

## SEO

- `BaseLayout` emite title, description, canonical, `hreflang` (en/es/x-default),
  Open Graph y Twitter (`summary_large_image`). Cada página puede pasar
  `image`, `imageAlt`, `type` (`article` en los write-ups) y `jsonLd`.
- `src/data/seo.ts` arma el JSON-LD: `WebSite` + `ProfilePage` + `Person` en la
  home y `Article` en cada write-up, con `@id` estables que comparten el mismo
  `Person`.
- `public/og/<página>-<lang>.jpg`: tarjetas 1200×630 renderizadas con Chrome
  headless desde una plantilla HTML con Geist y el retrato. Al sumar un
  write-up hay que generar sus dos tarjetas (`<slug>-en.jpg`, `<slug>-es.jpg`).
- Íconos: `favicon.ico` (16/32/48), `icon-192.png`, `icon-512.png`,
  `apple-touch-icon.png` y `site.webmanifest`: monograma "S" sobre el cobalto.
- `vercel.json`: redirects 308 de las rutas del sitio en Next.js
  (`/projects/:slug`, `/resume`), cabeceras de seguridad (CSP, HSTS, etc.) y
  caché inmutable para `/_astro/`.

## Assets generados (Higgsfield)

- `src/assets/textures/fur.webp`: la piel azul del interior del disco (GPT
  Image 2.5 con la referencia `references/bocanada/04`). Fondo de la cabecera de Experiencia.
- `src/assets/textures/smoke.webp`: cinta de humo horizontal sobre negro (GPT
  Image 2.5, 21:9, con la portada como referencia), en la base de `Contact`
  con `mix-blend-mode: screen`.
