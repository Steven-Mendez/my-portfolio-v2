/** UI strings per locale. Profile content lives in `src/data/profile.ts`. */
export const defaultLang = "en"

export const languages = {
  en: "English",
  es: "Español",
} as const

export type Lang = keyof typeof languages

export const ui = {
  en: {
    "meta.title": "Steven Mendez — Full Stack Software Engineer, Nicaragua",
    "meta.description":
      "Steven Mendez, full stack software engineer in Managua, Nicaragua: Python and FastAPI backends, React front ends, AWS, and LLM and RAG features in production.",
    "nav.language": "Language",
    "nav.sections": "Sections",
    // Section titles (`*.title`) must not repeat the nav label: the kicker
    // names the section, the display title says something about it.
    "nav.home": "Home",
    "nav.about": "About",
    "nav.stack": "Stack",
    "nav.experience": "Experience",
    "nav.work": "Work",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "nav.newTab": "(opens in a new tab)",
    "nav.skip": "Skip to content",
    "nav.index": "Index",
    "nav.resume": "Résumé",
    // Read after the link text.
    "nav.resume.file": "(PDF)",
    "hero.role": "Full Stack Engineer",
    "hero.scroll": "Scroll",
    "hero.localTime": "Local time",
    // Labels of the hero's meta cells (BASE, NOW, STATUS) and their parts.
    "hero.meta.base": "Based in",
    "hero.meta.now": "Now",
    "hero.meta.status": "Status",
    "hero.meta.mode": "Works",
    "hero.meta.since": "since",
    "hero.image.alt":
      "Steven Mendez in profile against a cobalt blue backdrop, blue smoke rising, in the style of Cerati's Bocanada cover",
    // Bio: facts from LinkedIn (2026-10-24). body.1 is the lead, body.2 and
    // body.3 the continuation (current role, then languages). `{codingAge}` and `{tenure}` are filled by About from the
    // profile and the earliest job's start date, so the count never goes stale.
    "about.title": "Who I am",
    "about.body.1":
      "Hi, I'm Steven, a full stack engineer in Managua, Nicaragua. I started programming when I was {codingAge} and have been doing it professionally for {tenure}.",
    "about.body.2":
      "Today I'm a full stack engineer at WERN, a development agency: Python APIs, React front ends, AWS infrastructure, and LLM and RAG features, first for its clients and now on its own products.",
    "about.body.3":
      "Spanish is my first language, I speak English at B2, and I'm learning Japanese.",
    "stack.title": "What I build with",
    // One muted line under the rows.
    "stack.note": "Not a closed list. I learn whatever the project needs.",
    // Nouns for the section kickers' counts ("3 roles · 2023–2026").
    "section.note.role": "role",
    "section.note.roles": "roles",
    "section.note.credential": "credential",
    "section.note.credentials": "credentials",
    "experience.title": "Where I've worked",
    "experience.present": "Present",
    "experience.current": "Current role",
    "work.title": "Selected work",
    "work.code": "Code",
    "work.live": "Live",
    // Spec-sheet labels beside each project.
    "work.stack": "Built with",
    "work.links": "Links",
    // The row's link to the project's write-up (`/work/<slug>/`).
    "work.read": "Read more",
    // Write-up pages: the spec row under the opening and the closing nav.
    "writeup.year": "Year",
    "writeup.role": "Role",
    "writeup.updated": "Updated {date}",
    "writeup.readingTime": "{min} min read",
    "writeup.figure": "Fig.",
    "writeup.toc": "On this page",
    "writeup.all": "All work",
    "writeup.next": "Next",
    "writeup.previous": "Previous",
    "education.title": "Degree and certifications",
    "education.verify": "Verify",
    "education.verifyOn": "Verify on {platform}",
    "education.kind.degree": "Degree",
    "education.kind.course": "Course",
    "education.kind.cert": "Certification",
    "contact.title": "How to reach me",
    "contact.email": "Email",
    "contact.cv": "Résumé",
    "contact.cv.value": "PDF",
    // `{date}` is `profile.resume.updated` through `formatMonth`.
    "contact.cv.updated": "Updated {date}",
    "contact.copy": "Copy",
    "contact.copied": "Copied",
    "contact.copied.sr": "Email copied to clipboard",
    "footer.label": "Index",
    "footer.nav.label": "Sections",
    "footer.social.label": "Elsewhere",
    "footer.backToTop": "Back to top",
    "footer.soundtrack": "Soundtrack",
    // Gloss of the Spanish line in the credit; empty where the page is
    // already in Spanish.
    "footer.soundtrack.gloss": "you deserve what you dream",
  },
  es: {
    "meta.title": "Steven Mendez — Ingeniero de Software Full Stack, Nicaragua",
    "meta.description":
      "Steven Mendez, ingeniero de software full stack en Managua, Nicaragua: backends en Python y FastAPI, front ends en React, AWS y funcionalidades con LLMs y RAG en producción.",
    "nav.language": "Idioma",
    "nav.sections": "Secciones",
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.stack": "Stack",
    "nav.experience": "Experiencia",
    "nav.work": "Proyectos",
    "nav.education": "Formación",
    "nav.contact": "Contacto",
    "nav.newTab": "(se abre en una pestaña nueva)",
    "nav.skip": "Saltar al contenido",
    "nav.index": "Índice",
    "nav.resume": "CV",
    "nav.resume.file": "(PDF)",
    "hero.role": "Ingeniero Full Stack",
    "hero.scroll": "Bajar",
    "hero.localTime": "Hora local",
    "hero.meta.base": "Base",
    "hero.meta.now": "Ahora",
    "hero.meta.status": "Estado",
    "hero.meta.mode": "Modalidad",
    "hero.meta.since": "desde",
    "hero.image.alt":
      "Steven Mendez de perfil sobre un fondo azul cobalto, con humo azul que sube, al estilo de la portada de Bocanada de Cerati",
    // Bio: facts from LinkedIn (2026-10-24). body.1 is the lead, body.2 and
    // body.3 the continuation (current role, then languages). `{codingAge}` and `{tenure}` are filled by About from the
    // profile and the earliest job's start date, so the count never goes stale.
    "about.title": "Quién soy",
    "about.body.1":
      "Hola, soy Steven, ingeniero full stack en Managua, Nicaragua. Empecé a programar a los {codingAge} y llevo {tenure} haciéndolo de forma profesional.",
    "about.body.2":
      "Hoy trabajo como ingeniero full stack en WERN, una agencia de desarrollo: APIs en Python, interfaces en React, infraestructura en AWS y funcionalidades con LLMs y RAG, primero para sus clientes y hoy en sus productos internos.",
    "about.body.3":
      "Mi lengua materna es el español, hablo inglés a nivel B2 y estoy aprendiendo japonés.",
    "stack.title": "Con qué construyo",
    // One muted line under the rows.
    "stack.note":
      "No es una lista cerrada. Aprendo lo que el proyecto necesite.",
    "section.note.role": "puesto",
    "section.note.roles": "puestos",
    "section.note.credential": "credencial",
    "section.note.credentials": "credenciales",
    "experience.title": "Dónde he trabajado",
    "experience.present": "Actualidad",
    "experience.current": "Puesto actual",
    "work.title": "Trabajo seleccionado",
    "work.code": "Código",
    "work.live": "Ver",
    "work.stack": "Hecho con",
    "work.links": "Enlaces",
    "work.read": "Leer más",
    "writeup.year": "Año",
    "writeup.role": "Rol",
    "writeup.updated": "Actualizado {date}",
    "writeup.readingTime": "{min} min de lectura",
    "writeup.figure": "Fig.",
    "writeup.toc": "En esta página",
    "writeup.all": "Todos los proyectos",
    "writeup.next": "Siguiente",
    "writeup.previous": "Anterior",
    "education.title": "Título y certificaciones",
    "education.verify": "Verificar",
    "education.verifyOn": "Verificar en {platform}",
    "education.kind.degree": "Título",
    "education.kind.course": "Curso",
    "education.kind.cert": "Certificación",
    "contact.title": "Cómo contactarme",
    "contact.email": "Correo",
    "contact.cv": "CV",
    "contact.cv.value": "PDF",
    "contact.cv.updated": "Actualizado {date}",
    "contact.copy": "Copiar",
    "contact.copied": "Copiado",
    "contact.copied.sr": "Correo copiado al portapapeles",
    "footer.label": "Índice",
    "footer.nav.label": "Secciones",
    "footer.social.label": "En otros sitios",
    "footer.backToTop": "Volver arriba",
    "footer.soundtrack": "Banda sonora",
    "footer.soundtrack.gloss": "",
  },
} as const satisfies Record<Lang, Record<string, string>>

export type UiKey = keyof (typeof ui)[typeof defaultLang]
