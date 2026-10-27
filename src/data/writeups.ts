/**
 * The write-ups: one long-form page per selected project, at
 * `/work/<slug>/` and `/es/work/<slug>/`. A write-up is the booklet's inner
 * pages for a track of the Work list: an opening (title, lead, spec row) and
 * numbered chapters of blocks. The project's title, year, stack and links
 * come from `projects.ts` through the shared `slug`; nothing is repeated
 * here. Both languages sit side by side in every string, so a paragraph can
 * never go missing in one of them.
 *
 * Blocks: `p` (a paragraph; `**bold**` is allowed), `list` (ticked facts),
 * `figure` (a screenshot with its caption; numbered per page in reading
 * order) and `sheet` (ruled rows of name → why, the stack as a spec sheet).
 * The first `p` of a chapter is set as its lead.
 */
import type { ImageMetadata } from "astro"
import type { Lang } from "@/i18n/ui"
import type { Localized } from "./localized"

import iaHome from "@/assets/work/interview-agent/home.jpg"
import iaNew from "@/assets/work/interview-agent/new-interview.jpg"
import iaSettings from "@/assets/work/interview-agent/settings.jpg"
import iaOverview from "@/assets/work/interview-agent/overview.jpg"
import iaImprove from "@/assets/work/interview-agent/improve.jpg"
import iaTopics from "@/assets/work/interview-agent/topics.jpg"
import iaTranscript from "@/assets/work/interview-agent/transcript.jpg"
import pfHero from "@/assets/work/portfolio/hero.jpg"
import pfExperience from "@/assets/work/portfolio/experience.jpg"
import pfWork from "@/assets/work/portfolio/work.jpg"

export type Block =
  | { type: "p"; text: Localized<string> }
  | { type: "list"; items: Localized<readonly string[]> }
  | {
      type: "figure"
      image: ImageMetadata
      alt: Localized<string>
      caption: Localized<string>
    }
  | {
      type: "sheet"
      rows: readonly { name: string; why: Localized<string> }[]
    }

export interface Chapter {
  heading: Localized<string>
  blocks: readonly Block[]
}

export interface Writeup {
  /** Matches `Project.slug` in `projects.ts`. */
  slug: string
  /** One paragraph under the project's name. */
  lead: Localized<string>
  /** Meta description of the page. */
  description: Localized<string>
  /** What Steven did on it, for the spec row. */
  role: Localized<string>
  /** "YYYY-MM" of the last revision of the text. */
  updated: string
  chapters: readonly Chapter[]
}

export const writeups: readonly Writeup[] = [
  {
    slug: "interview-agent",
    lead: {
      en: "Interview Agent is a voice app for practising job interviews. It reads your CV and the job offer, plans the interview, holds it with you out loud in the browser and then goes through your answers one by one, pointing at what you said.",
      es: "Interview Agent es una app de voz para practicar entrevistas de trabajo. Lee tu CV y la oferta, planifica la entrevista, la conduce contigo en voz alta en el navegador y después repasa tus respuestas una por una, señalando lo que dijiste.",
    },
    description: {
      en: "How I built Interview Agent: a three-agent voice interview app on LiveKit, LangGraph, FastAPI and React, and the decisions behind it.",
      es: "Cómo construí Interview Agent: una app de entrevistas por voz con tres agentes sobre LiveKit, LangGraph, FastAPI y React, y las decisiones detrás.",
    },
    role: {
      en: "Solo project, end to end",
      es: "Proyecto personal, de punta a punta",
    },
    updated: "2026-10",
    chapters: [
      {
        heading: { en: "Where it comes from", es: "De dónde sale" },
        blocks: [
          {
            type: "p",
            text: {
              en: "I built this after a job interview in which I never spoke to a person. A bot asked the questions. It was slow to answer, quick to talk over me, and it cut my answers short before I had finished them.",
              es: "Lo construí después de una entrevista de trabajo en la que nunca hablé con una persona. Las preguntas las hacía un bot. Tardaba en responder, me interrumpía con facilidad y cortaba mis respuestas antes de que terminara.",
            },
          },
          {
            type: "p",
            text: {
              en: "That call turned into a list of requirements. The interviewer I wanted waits until I have actually finished, starts talking the moment it has something to say, remembers what I have already told it, and judges me on what I said rather than on how smoothly I said it. Everything else on this page follows from that list.",
              es: "Esa llamada se convirtió en una lista de requisitos. El entrevistador que yo quería espera a que de verdad termine, empieza a hablar en cuanto tiene algo que decir, recuerda lo que ya le conté y me juzga por lo que dije y no por lo fluido que soné. Todo lo demás en esta página sale de esa lista.",
            },
          },
          {
            type: "figure",
            image: iaHome,
            alt: {
              en: "Interview Agent's home screen: a heading, a New interview button and the list of recent interviews",
              es: "Pantalla de inicio de Interview Agent: un título, el botón de nueva entrevista y la lista de entrevistas recientes",
            },
            caption: {
              en: "The home screen. One button to start, and the interviews you have already run.",
              es: "La pantalla de inicio. Un botón para empezar y las entrevistas que ya hiciste.",
            },
          },
        ],
      },
      {
        heading: { en: "What a session looks like", es: "Cómo es una sesión" },
        blocks: [
          {
            type: "p",
            text: {
              en: "You upload your CV as a PDF and paste the job offer. Four short steps later the planner has a session ready: the role sets the bar, the CV supplies the examples, and you choose the level, the language, the length and whether you want technical, behavioural or mixed questions.",
              es: "Subes tu CV en PDF y pegas la oferta. Cuatro pasos cortos después, el planificador tiene la sesión lista: el puesto pone el listón, el CV aporta los ejemplos y tú eliges el nivel, el idioma, la duración y si quieres preguntas técnicas, de comportamiento o mixtas.",
            },
          },
          {
            type: "figure",
            image: iaNew,
            alt: {
              en: "The New interview form: a PDF upload box for the CV and a text area for the job offer, with four steps across the top",
              es: "El formulario de nueva entrevista: una caja para subir el CV en PDF y un área de texto para la oferta, con cuatro pasos arriba",
            },
            caption: {
              en: "Step one of four: a CV and a job offer. Nothing else is needed to plan the interview.",
              es: "Paso uno de cuatro: un CV y una oferta. No hace falta nada más para planificar la entrevista.",
            },
          },
          {
            type: "p",
            text: {
              en: "A preparation room lets you check the microphone and the camera, and then the interview happens by voice. The interviewer greets you by name, asks, listens, follows up when an answer is vague and moves on when a topic is covered. It can run in English or Spanish, with a feminine or a masculine voice per language, and with a persona and standing instructions you set once in Settings.",
              es: "Una sala previa te deja probar el micrófono y la cámara, y después la entrevista ocurre por voz. El entrevistador te saluda por tu nombre, pregunta, escucha, repregunta cuando una respuesta queda vaga y avanza cuando un tema está cubierto. Funciona en inglés o en español, con una voz femenina o masculina por idioma, y con una personalidad e instrucciones fijas que defines una vez en Ajustes.",
            },
          },
          {
            type: "figure",
            image: iaSettings,
            alt: {
              en: "The Settings screen: fields for the interviewer's name, language, voice, persona and custom instructions, and a theme picker",
              es: "La pantalla de ajustes: campos para el nombre, idioma, voz, personalidad e instrucciones del entrevistador, y un selector de tema",
            },
            caption: {
              en: "Settings: the interviewer's name, language, voice, persona and standing instructions.",
              es: "Ajustes: nombre, idioma, voz, personalidad e instrucciones fijas del entrevistador.",
            },
          },
          {
            type: "p",
            text: {
              en: "When it ends, the results open in three tabs. The overview says how the interview ended and whether the session covered enough of the role to deserve a verdict. Under it, each weak answer is shown next to a stronger version of the same answer, built only from what you actually said. The topics tab grades every planned topic with quotes from the transcript as evidence, and the transcript tab keeps the whole conversation.",
              es: "Al terminar, los resultados se abren en tres pestañas. El resumen dice cómo acabó la entrevista y si la sesión cubrió suficiente del puesto como para merecer un veredicto. Debajo, cada respuesta floja aparece junto a una versión más fuerte de la misma respuesta, construida solo con lo que de verdad dijiste. La pestaña de temas califica cada tema planificado con citas de la transcripción como evidencia, y la de transcripción guarda la conversación entera.",
            },
          },
          {
            type: "figure",
            image: iaOverview,
            alt: {
              en: "The overview tab of an evaluated interview: how it ended, a Limited role coverage badge and the list of requirements the session left out",
              es: "La pestaña de resumen de una entrevista evaluada: cómo terminó, una etiqueta de cobertura limitada y la lista de requisitos que la sesión dejó fuera",
            },
            caption: {
              en: "The overview of a real session I ran against a job offer for an AI engineer. Three essential requirements were never reached, so there is no overall score.",
              es: "El resumen de una sesión real que hice con una oferta de ingeniero de IA. Tres requisitos esenciales no se tocaron, así que no hay nota global.",
            },
          },
          {
            type: "figure",
            image: iaImprove,
            alt: {
              en: "Two cards under Improve your answers, each with the question, what I said and a stronger version I could say",
              es: "Dos tarjetas bajo Mejora tus respuestas, cada una con la pregunta, lo que dije y una versión más fuerte que podría decir",
            },
            caption: {
              en: "“You said” and “You could say”: the rewrite keeps my facts and only changes how I told them.",
              es: "«Dijiste» y «Podrías decir»: la reescritura conserva mis hechos y solo cambia cómo los conté.",
            },
          },
          {
            type: "figure",
            image: iaTopics,
            alt: {
              en: "The topics tab with one topic expanded: its verdict, three quotes from the transcript and a Try this next box",
              es: "La pestaña de temas con un tema abierto: su veredicto, tres citas de la transcripción y una caja de qué intentar después",
            },
            caption: {
              en: "A topic opened: the verdict, the quotes it rests on and one concrete thing to try next time.",
              es: "Un tema abierto: el veredicto, las citas en que se apoya y una cosa concreta que intentar la próxima vez.",
            },
          },
          {
            type: "figure",
            image: iaTranscript,
            alt: {
              en: "The transcript tab: the interviewer's questions and my answers in order, each with its time",
              es: "La pestaña de transcripción: las preguntas del entrevistador y mis respuestas en orden, cada una con su hora",
            },
            caption: {
              en: "The transcript, turn by turn, with the interviewer's follow-ups.",
              es: "La transcripción, turno a turno, con las repreguntas del entrevistador.",
            },
          },
          {
            type: "p",
            text: {
              en: "Repeat runs the same role again with a freshly planned set of questions, and every rerun stays grouped under the original, so the history works as a record of practice rather than a pile of attempts.",
              es: "Repetir vuelve a correr el mismo puesto con preguntas planificadas de nuevo, y cada repetición queda agrupada bajo la original, así que el historial funciona como un registro de práctica y no como una pila de intentos.",
            },
          },
        ],
      },
      {
        heading: {
          en: "Three agents, one interview",
          es: "Tres agentes, una entrevista",
        },
        blocks: [
          {
            type: "p",
            text: {
              en: "The work is split between three agents that hand off to each other. They share one model from OpenAI and differ in how much they are allowed to think: little for the interviewer, where every second of silence counts, more for the planner, and the most for the evaluator, which runs when nobody is waiting.",
              es: "El trabajo se reparte entre tres agentes que se pasan el relevo. Comparten un mismo modelo de OpenAI y se diferencian en cuánto pueden pensar: poco el entrevistador, donde cada segundo de silencio cuenta, más el planificador y lo máximo el evaluador, que corre cuando nadie está esperando.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**Planner.** Extracts a rubric from the job offer and the role level, then personalises the examples from the CV without lowering the bar. Every topic points at a requirement, and the requirements it had to leave out are listed explicitly instead of quietly dropped.",
                "**Interviewer.** A real-time voice agent built on LiveKit Agents. Speech recognition, synthesis and turn detection are its ears and mouth; a LangGraph graph is the part that decides what to ask next, with the full CV, offer and plan in context. Each decision is validated and written to the database before the question is spoken.",
                "**Evaluator.** Runs only after the session has closed and the transcript has been sealed. It grades each criterion with quotes as evidence, separates what was covered from what was demonstrated and refuses to give an overall score or a hiring verdict when the session left essential requirements out.",
              ],
              es: [
                "**Planificador.** Extrae una rúbrica de la oferta y del nivel del puesto y luego personaliza los ejemplos con el CV sin bajar el listón. Cada tema apunta a un requisito, y los requisitos que tuvo que dejar fuera quedan listados en vez de desaparecer en silencio.",
                "**Entrevistador.** Un agente de voz en tiempo real construido sobre LiveKit Agents. El reconocimiento de voz, la síntesis y la detección de turno son sus oídos y su boca; un grafo de LangGraph es la parte que decide qué preguntar después, con el CV, la oferta y el plan completos en contexto. Cada decisión se valida y se escribe en la base de datos antes de que la pregunta se diga en voz alta.",
                "**Evaluador.** Corre solo cuando la sesión ha cerrado y la transcripción está sellada. Califica cada criterio con citas como evidencia, separa lo que se cubrió de lo que se demostró y se niega a dar una nota global o un veredicto cuando la sesión dejó fuera requisitos esenciales.",
              ],
            },
          },
          {
            type: "p",
            text: {
              en: "There is no vector database. The extracted CV is stored as text and handed to the three agents whole: it fits in context, and retrieval would only have added a place for it to go wrong.",
              es: "No hay base de datos vectorial. El CV extraído se guarda como texto y se entrega entero a los tres agentes: cabe en contexto, y un sistema de recuperación solo habría añadido un sitio más donde fallar.",
            },
          },
        ],
      },
      {
        heading: { en: "What it's made of", es: "De qué está hecho" },
        blocks: [
          {
            type: "p",
            text: {
              en: "A React front end, a FastAPI API and a voice worker, around one PostgreSQL database. Each runs on a managed service and deploys itself from the main branch.",
              es: "Un front end en React, una API en FastAPI y un worker de voz, alrededor de una sola base de datos PostgreSQL. Cada pieza corre en un servicio gestionado y se despliega sola desde la rama principal.",
            },
          },
          {
            type: "sheet",
            rows: [
              {
                name: "TanStack Start · React",
                why: {
                  en: "The web app, built as a single-page app with shadcn/ui components and served from Vercel. The privacy and terms pages are prerendered, so they read without JavaScript or a sign-in.",
                  es: "La app web, compilada como SPA con componentes de shadcn/ui y servida desde Vercel. Las páginas de privacidad y términos se prerenderizan, así que se leen sin JavaScript ni inicio de sesión.",
                },
              },
              {
                name: "FastAPI",
                why: {
                  en: "The API: interviews, plans, evaluations, sign-in and a daily maintenance route. It runs on FastAPI Cloud and scales to zero when idle; the web app says so while the first request wakes it.",
                  es: "La API: entrevistas, planes, evaluaciones, inicio de sesión y una ruta diaria de mantenimiento. Corre en FastAPI Cloud y baja a cero cuando está inactiva; la app web lo avisa mientras la primera petición la despierta.",
                },
              },
              {
                name: "LiveKit Agents",
                why: {
                  en: "The audio pipeline: recognition, synthesis and a turn-detection model on top of voice activity detection. The browser joins the room over WebRTC and the worker runs on LiveKit Cloud.",
                  es: "La tubería de audio: reconocimiento, síntesis y un modelo de detección de turno encima de la detección de actividad de voz. El navegador entra a la sala por WebRTC y el worker corre en LiveKit Cloud.",
                },
              },
              {
                name: "LangGraph",
                why: {
                  en: "The interviewer's decision graph. Validated decisions are committed in a transaction before a question is delivered, so a crash mid-turn never loses or repeats a question by accident.",
                  es: "El grafo de decisiones del entrevistador. Las decisiones validadas se confirman en una transacción antes de entregar la pregunta, así que una caída a mitad de turno nunca pierde ni repite una pregunta por accidente.",
                },
              },
              {
                name: "OpenAI",
                why: {
                  en: "One model for the three roles, with structured outputs and retries so the planner and the evaluator can run unattended.",
                  es: "Un modelo para los tres roles, con salidas estructuradas y reintentos para que el planificador y el evaluador corran sin supervisión.",
                },
              },
              {
                name: "PostgreSQL · Neon",
                why: {
                  en: "CV text, plans, milestones, transcripts and evaluation attempts, with Alembic migrations. Neon hosts it and also provides the sign-in with Google or GitHub through Neon Auth.",
                  es: "Texto del CV, planes, hitos, transcripciones e intentos de evaluación, con migraciones de Alembic. Neon la aloja y además provee el inicio de sesión con Google o GitHub a través de Neon Auth.",
                },
              },
              {
                name: "OpenTelemetry · Grafana · Sentry",
                why: {
                  en: "Latency, spend and closing outcomes go to Grafana as anonymous metrics; errors go to Sentry. LangSmith tracing exists but is opt-in, because it would receive the full content of every interview.",
                  es: "Latencia, gasto y desenlaces de cierre van a Grafana como métricas anónimas; los errores, a Sentry. El trazado con LangSmith existe pero es opcional, porque recibiría el contenido completo de cada entrevista.",
                },
              },
              {
                name: "Docker · Terraform · GitHub Actions",
                why: {
                  en: "Compose for the local stack, Terraform for Neon and Grafana, and a workflow that applies the migrations first and then deploys the API and the worker in parallel.",
                  es: "Compose para el stack local, Terraform para Neon y Grafana, y un flujo que aplica las migraciones primero y luego despliega la API y el worker en paralelo.",
                },
              },
              {
                name: "pytest · Vitest",
                why: {
                  en: "Pytest against a throwaway Postgres container, Vitest on the front end, and a text harness that runs the real planner, interviewer and evaluator in the terminal to check the reasoning without a microphone.",
                  es: "Pytest contra un contenedor de Postgres desechable, Vitest en el front end y un arnés de texto que corre el planificador, el entrevistador y el evaluador reales en la terminal para revisar el razonamiento sin micrófono.",
                },
              },
            ],
          },
        ],
      },
      {
        heading: { en: "The hard choices", es: "Las decisiones difíciles" },
        blocks: [
          {
            type: "p",
            text: {
              en: "Most of the time went into the parts nobody sees in a screenshot.",
              es: "La mayor parte del tiempo se fue en lo que no sale en una captura.",
            },
          },
          {
            type: "p",
            text: {
              en: "**I stopped hand-rolling the voice plumbing.** An early version owned the whole audio path: capture, silence rules, my own turn heuristics. It taught me a lot and it was never going to feel human. Now WebRTC and LiveKit handle echo, interruptions and reconnection, and the end of a turn is decided by a model trained for it. That is exactly the part the bot that interviewed me got wrong. The cost is a hosted dependency I do not control; the gain is every hour that went into the interview instead of the plumbing.",
              es: "**Dejé de construir la fontanería de voz a mano.** Una primera versión era dueña de todo el camino del audio: captura, reglas de silencio, mis propias heurísticas de turno. Me enseñó mucho y nunca iba a sonar humana. Ahora WebRTC y LiveKit se encargan del eco, las interrupciones y la reconexión, y el final de un turno lo decide un modelo entrenado para eso. Es justo la parte en la que falló el bot que me entrevistó. El coste es una dependencia alojada que no controlo; la ganancia, cada hora que fue a la entrevista en vez de a la fontanería.",
            },
          },
          {
            type: "p",
            text: {
              en: "**Everything is persisted state.** Answers have stable identities and immutable text versions, so a correction never overwrites what was first heard. A question that was persisted but never started resumes under the same ID; an interrupted one is not repeated automatically, and “Listen again” replays the saved question without a new model decision. Reconnecting keeps the original start time and the budget already used.",
              es: "**Todo es estado persistido.** Las respuestas tienen identidades estables y versiones de texto inmutables, así que una corrección nunca sobrescribe lo que se oyó primero. Una pregunta persistida que nunca empezó se reanuda con el mismo ID; una interrumpida no se repite sola, y «Escuchar de nuevo» reproduce la pregunta guardada sin una nueva decisión del modelo. Reconectarse conserva la hora de inicio original y el presupuesto ya gastado.",
            },
          },
          {
            type: "p",
            text: {
              en: "**Nothing is scored that was not heard.** Missing audio is not a wrong answer. Worker loss, abandonment and incomplete recordings stay visible as what they are, and a session that skipped essential requirements gets feedback per criterion but no overall score. The evaluator reads a sealed transcript, never the live stream of captions.",
              es: "**No se califica lo que no se oyó.** Un audio perdido no es una respuesta incorrecta. La caída del worker, el abandono y las grabaciones incompletas quedan visibles como lo que son, y una sesión que saltó requisitos esenciales recibe feedback por criterio pero no una nota global. El evaluador lee una transcripción sellada, nunca el flujo de subtítulos en vivo.",
            },
          },
          {
            type: "p",
            text: {
              en: "**The content is treated as sensitive.** CVs and offers have size limits and are never silently truncated. Logs never contain interview content, old interviews are purged on a schedule, and the only service that can see a whole interview is one you turn on yourself.",
              es: "**El contenido se trata como sensible.** Los CV y las ofertas tienen límites de tamaño y nunca se recortan en silencio. Los logs nunca contienen contenido de la entrevista, las entrevistas viejas se purgan según un calendario y el único servicio que puede ver una entrevista entera es uno que enciendes tú.",
            },
          },
        ],
      },
      {
        heading: { en: "What I took from it", es: "Lo que me llevo" },
        blocks: [
          {
            type: "list",
            items: {
              en: [
                "**Don't rebuild solved problems.** My own audio pipeline taught me why WebRTC, voice activity detection and turn detection are a discipline of their own, and that my hours were worth more on the agents.",
                "**How fast it feels beats how smart it is.** Giving the interviewer the smallest thinking budget and turning its reply into speech as it streams did more for the conversation than any smarter model would have.",
                "**Structured outputs turn model calls into functions.** The planner and the evaluator return validated schemas with retries, which is what lets both run with nobody checking the output before it reaches the screen.",
              ],
              es: [
                "**No reconstruir problemas resueltos.** Mi propia tubería de audio me enseñó por qué WebRTC, la detección de actividad de voz y la detección de turno son una disciplina aparte, y que mis horas valían más en los agentes.",
                "**Lo rápido que se siente vale más que lo listo que es.** Darle al entrevistador el presupuesto de pensamiento más pequeño y convertir su respuesta en voz mientras se genera hizo más por la conversación que cualquier modelo más listo.",
                "**Las salidas estructuradas convierten las llamadas al modelo en funciones.** El planificador y el evaluador devuelven esquemas validados con reintentos, y eso es lo que permite que corran sin que nadie revise la salida antes de que llegue a la pantalla.",
              ],
            },
          },
          {
            type: "p",
            text: {
              en: "I still use it. The session in the screenshots above is one of mine, run a few days before writing this.",
              es: "Lo sigo usando. La sesión de las capturas de arriba es una mía, hecha unos días antes de escribir esto.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "portfolio",
    lead: {
      en: "The visual side of this portfolio is inspired by Bocanada, Gustavo Cerati's 1999 album: its tones, its red rhombuses and dots. This page explains that inspiration, the rules that came out of it, and the technologies the site is built with and why.",
      es: "La parte visual de este portfolio está inspirada en Bocanada, el disco de Gustavo Cerati de 1999: sus tonos, sus rombos y sus puntos rojos. Esta página explica esa inspiración, las reglas que salieron de ahí, y con qué tecnologías está hecho el sitio y por qué.",
    },
    description: {
      en: "The visual inspiration this portfolio takes from Gustavo Cerati's Bocanada, and why it is built on Astro, Tailwind CSS and GSAP.",
      es: "La inspiración visual que este portfolio toma de Bocanada de Gustavo Cerati, y por qué está hecho con Astro, Tailwind CSS y GSAP.",
    },
    role: { en: "Design and code", es: "Diseño y código" },
    updated: "2026-10",
    chapters: [
      {
        heading: { en: "Bocanada", es: "Bocanada" },
        blocks: [
          {
            type: "p",
            text: {
              en: "Bocanada is the record Gustavo Cerati released in 1999, the first one after Soda Stereo. It is my favourite of his: he had just left a huge band and the album he made is slower, stranger and more his own than anything from before. That seemed like the right reference for a site one person builds alone.",
              es: "Bocanada es el disco que Gustavo Cerati publicó en 1999, el primero después de Soda Stereo. Es mi favorito de los suyos: acababa de salir de una banda enorme y el álbum que hizo es más lento, más raro y más suyo que todo lo anterior. Me pareció la referencia correcta para un sitio que una persona hace sola.",
            },
          },
          {
            type: "p",
            text: {
              en: "The site does not reproduce the record. It takes a palette and a few marks from it, and the home page alludes to the cover.",
              es: "El sitio no reproduce el disco. Toma de él una paleta y unas pocas marcas, y la página de inicio alude a la portada.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**The tones.** Cobalt blue, smoke and ink from the cover; the paper of the booklet for the light sections.",
                "**The red dots.** The inner sleeve is blue fur with red dots. They sit behind the Experience section and drift very slowly behind the Work list.",
                "**The red rhombus and the thin red line.** The only two accents the site allows itself: the rhombus marks the index and the current item, the line marks reading.",
                "**The home page** is an allusion to the cover: the name split around a portrait that melts into blue and smoke.",
              ],
              es: [
                "**Los tonos.** El azul cobalto, el humo y la tinta de la portada; el papel del libreto para las secciones claras.",
                "**Los puntos rojos.** El interior de la funda es piel azul con puntos rojos. Están detrás de la sección de Experiencia y derivan muy despacio detrás de la lista de Proyectos.",
                "**El rombo rojo y la línea roja fina.** Los únicos dos acentos que el sitio se permite: el rombo marca el índice y el elemento actual, la línea marca la lectura.",
                "**La página de inicio** es una alusión a la portada: el nombre partido alrededor de un retrato que se funde con el azul y el humo.",
              ],
            },
          },
          {
            type: "figure",
            image: pfHero,
            alt: {
              en: "The home page of this site: the name STEVEN MENDEZ split around a portrait in cobalt blue and smoke, with a fact sheet along the bottom",
              es: "La página de inicio de este sitio: el nombre STEVEN MENDEZ partido alrededor de un retrato en azul cobalto y humo, con una ficha de datos en la base",
            },
            caption: {
              en: "The home page: the name split around the portrait, and a fact sheet on the thirds.",
              es: "La página de inicio: el nombre partido alrededor del retrato y una ficha de datos sobre los tercios.",
            },
          },
          {
            type: "figure",
            image: pfExperience,
            alt: {
              en: "The opening of the Experience section over a texture of blue fur, with the section number, kicker and title",
              es: "La apertura de la sección de Experiencia sobre una textura de piel azul, con el número de sección, el kicker y el título",
            },
            caption: {
              en: "Experience opens on the inner sleeve's blue fur.",
              es: "Experiencia abre sobre la piel azul del interior de la funda.",
            },
          },
        ],
      },
      {
        heading: { en: "The rules", es: "Las reglas" },
        blocks: [
          {
            type: "p",
            text: {
              en: "A reference is only useful if it turns into rules you can check. These are the site's.",
              es: "Una referencia solo sirve si se convierte en reglas que se pueden comprobar. Estas son las del sitio.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**Two tones.** Ink and paper, like a sleeve and a booklet. Every component reads correctly on both, because the role colours flip with the background.",
                "**Red is a mark, never text.** The red line means reading or section: the rule under each title, the progress hairline at the top, the active language. The red rhombus means index or here and now: the kicker, the track numbers, the current job. Everything structural is grey.",
                "**One type scale.** Six sections with six different layouts, but the title of a job, a project and a credential are the same size, and a row, a card and a group breathe the same.",
                "**Nothing moves forever.** The only perpetual motion is the drift of the dots; everything else happens once, as it enters, and stands still afterwards.",
              ],
              es: [
                "**Dos tonos.** Tinta y papel, como una funda y un libreto. Cada componente se lee bien en ambos, porque los colores de rol se invierten con el fondo.",
                "**El rojo es una marca, nunca texto.** La línea roja significa lectura o sección: la regla bajo cada título, el filete de progreso arriba, el idioma activo. El rombo rojo significa índice o aquí y ahora: el kicker, los números de pista, el puesto actual. Todo lo estructural es gris.",
                "**Una sola escala tipográfica.** Seis secciones con seis layouts distintos, pero el título de un trabajo, de un proyecto y de una credencial miden lo mismo, y una fila, una tarjeta y un grupo respiran igual.",
                "**Nada se mueve para siempre.** El único movimiento perpetuo es la deriva de los puntos; todo lo demás ocurre una vez, al entrar, y después se queda quieto.",
              ],
            },
          },
          {
            type: "figure",
            image: pfWork,
            alt: {
              en: "The Work section: two ruled rows, each with an index, a title, a year on the right and the project's summary, facts, stack and links",
              es: "La sección de Proyectos: dos filas regladas, cada una con índice, título, año a la derecha y el resumen, los hechos, el stack y los enlaces del proyecto",
            },
            caption: {
              en: "Work as a track list: index, title, year, and the proof in the columns beside it.",
              es: "Proyectos como lista de pistas: índice, título, año y la prueba en las columnas de al lado.",
            },
          },
        ],
      },
      {
        heading: {
          en: "What it's made of, and why",
          es: "De qué está hecho, y por qué",
        },
        blocks: [
          {
            type: "p",
            text: {
              en: "The stack is small on purpose. Each tool is here because it removed something rather than added it.",
              es: "El stack es pequeño a propósito. Cada herramienta está aquí porque quitó algo en vez de añadirlo.",
            },
          },
          {
            type: "sheet",
            rows: [
              {
                name: "Astro 7",
                why: {
                  en: "The site is static HTML with no JavaScript by default, so it loads before any script runs and reads without one. Astro also gives it the English and Spanish routes, self-hosted fonts with metric-matched fallbacks, responsive AVIF and WebP images from one source file, and the view transition when you switch languages.",
                  es: "El sitio es HTML estático sin JavaScript por defecto, así que carga antes de que corra cualquier script y se lee sin él. Astro también le da las rutas en inglés y español, fuentes autoalojadas con reservas de métricas iguales, imágenes AVIF y WebP responsivas desde un solo archivo y la view transition al cambiar de idioma.",
                },
              },
              {
                name: "Tailwind CSS 4",
                why: {
                  en: "The design tokens live in CSS, in one theme block: colours sampled from the cover, a fluid type scale and three levels of vertical rhythm. Every role on the scale has a utility, so a component names its role instead of its numbers.",
                  es: "Los tokens de diseño viven en CSS, en un solo bloque de tema: colores muestreados de la portada, una escala tipográfica fluida y tres niveles de ritmo vertical. Cada rol de la escala tiene su utilidad, así que un componente nombra su rol en vez de sus números.",
                },
              },
              {
                name: "GSAP 3",
                why: {
                  en: "ScrollTrigger and SplitText build each section in as it enters and draw the hairlines on scroll. It is a layer on top: with JavaScript off or reduced motion on, the page shows its final state and nothing moves.",
                  es: "ScrollTrigger y SplitText construyen cada sección cuando entra y dibujan los filetes con el scroll. Es una capa encima: sin JavaScript o con movimiento reducido, la página muestra su estado final y nada se mueve.",
                },
              },
              {
                name: "TypeScript 6",
                why: {
                  en: "Strict everywhere. The content is typed data, one file per section, with both languages side by side so a string can never go missing in one of them.",
                  es: "Estricto en todas partes. El contenido es dato tipado, un archivo por sección, con los dos idiomas lado a lado para que una cadena nunca falte en uno de ellos.",
                },
              },
              {
                name: "Geist · Geist Mono",
                why: {
                  en: "One light grotesk for everything that is read and one mono weight for the micro-labels, both served from this domain.",
                  es: "Una grotesca ligera para todo lo que se lee y un solo peso de mono para las microetiquetas, ambas servidas desde este dominio.",
                },
              },
              {
                name: "pnpm · ESLint · Prettier · husky",
                why: {
                  en: "Dependencies wait seven days after publication before they can be installed and never downgrade, and every commit is linted, formatted and checked against Conventional Commits before it lands.",
                  es: "Las dependencias esperan siete días desde su publicación antes de poder instalarse y nunca se degradan, y cada commit pasa por el linter, el formateador y Conventional Commits antes de entrar.",
                },
              },
              {
                name: "Lighthouse CI",
                why: {
                  en: "Three mobile runs against the built site, and the build fails under 90 in performance and best practices or under 95 in accessibility and SEO.",
                  es: "Tres corridas móviles contra el sitio compilado, y el build falla por debajo de 90 en rendimiento y buenas prácticas o de 95 en accesibilidad y SEO.",
                },
              },
              {
                name: "Generated textures",
                why: {
                  en: "The blue fur and the ribbon of smoke are images generated with the record's sleeve as a reference, then compressed to a few kilobytes each. The portrait on the home page is me, set in the cover's field.",
                  es: "La piel azul y la cinta de humo son imágenes generadas con la funda del disco como referencia y comprimidas después a unos pocos kilobytes cada una. El retrato de la página de inicio soy yo, puesto en el campo de la portada.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

export function getWriteup(slug: string): Writeup | undefined {
  return writeups.find((w) => w.slug === slug)
}

/** Path of a write-up relative to the locale root: `work/<slug>/`. */
export function writeupPath(slug: string): string {
  return `work/${slug}/`
}

/** Reading time in minutes, from the words of the page in `lang`. */
export function readingMinutes(writeup: Writeup, lang: Lang): number {
  const texts: string[] = [writeup.lead[lang]]
  for (const chapter of writeup.chapters) {
    texts.push(chapter.heading[lang])
    for (const block of chapter.blocks) {
      if (block.type === "p") texts.push(block.text[lang])
      else if (block.type === "list") texts.push(...block.items[lang])
      else if (block.type === "figure") texts.push(block.caption[lang])
      else for (const row of block.rows) texts.push(row.name, row.why[lang])
    }
  }
  const words = texts.join(" ").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
