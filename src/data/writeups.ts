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
 * `figure` (a screenshot with its caption), `clip` (a short silent loop
 * recorded from the app, served from `public/` as WebM and MP4 with a
 * poster), `diagram` (an architecture diagram drawn in Excalidraw, served
 * as SVG in a wide and a phone layout; figures, clips and diagrams
 * share one numbering per page in reading order) and `sheet` (ruled rows
 * of name → why, the stack as a spec sheet). The first `p` of a chapter is
 * set as its lead.
 */
import type { ImageMetadata } from "astro"
import type { Lang } from "@/i18n/ui"
import type { Localized } from "./localized"

import iaHome from "@/assets/work/interview-agent/home.jpg"
import iaSettings from "@/assets/work/interview-agent/settings.jpg"
import pfHero from "@/assets/work/portfolio/hero.jpg"
import pfExperience from "@/assets/work/portfolio/experience.jpg"
import pfWork from "@/assets/work/portfolio/work.jpg"
import bdOrderDestination from "@/assets/work/bidali/order-destination.jpg"
import bdVideo from "@/assets/work/bidali/video.jpg"

/**
 * An architecture diagram drawn in Excalidraw and exported as SVG with its
 * font embedded: `src` is the base path in `public/`, with four files next
 * to it, `-wide-<lang>.svg` (from 40rem) and `-tall-<lang>.svg` (phones).
 * The editable `.excalidraw` sources live in `design/`.
 */
export interface DiagramBlock {
  type: "diagram"
  src: string
  wide: { width: number; height: number }
  tall: { width: number; height: number }
  alt: Localized<string>
  caption: Localized<string>
}

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
      type: "clip"
      /** Public path without extension: `<src>.webm`, `<src>.mp4`, `<src>.webp`. */
      src: string
      width: number
      height: number
      alt: Localized<string>
      caption: Localized<string>
    }
  | DiagramBlock
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
  /**
   * The opening's cover: one screen of the project, or, with `youtube`,
   * the poster of that video, played in place (`duration` as "m:ss").
   * Without one, the first figure.
   */
  cover?: {
    image: ImageMetadata
    alt: Localized<string>
    youtube?: string
    duration?: string
  }
  /** What Steven did on it, for the spec row. */
  role: Localized<string>
  /** ISO date ("YYYY-MM-DD") the page first went live; `datePublished` in its JSON-LD. */
  published: string
  /** "YYYY-MM" of the last revision of the text. */
  updated: string
  chapters: readonly Chapter[]
}

export const writeups: readonly Writeup[] = [
  {
    // Under NDA: the page says what the product does and how it is put
    // together at a high level, with screens and a map. No code, no internal
    // rules, no security details.
    slug: "bidali",
    lead: {
      en: "An app for home deliveries in Nicaragua, built as an internal product at WERN, the agency where I work. Businesses publish their orders, nearby couriers take and deliver them, and the customer follows the order from their phone.",
      es: "Una app de entregas a domicilio para Nicaragua, hecha como producto interno de WERN, la agencia donde trabajo. Los negocios publican sus pedidos, los repartidores cercanos los toman y los entregan, y el cliente sigue su pedido desde el teléfono.",
    },
    description: {
      en: "How Bidali, WERN's internal delivery app, is built: a Rust API, one SvelteKit app for the web, iOS and Android, and Google Cloud.",
      es: "Cómo está hecho Bidali, la app de entregas interna de WERN: una API en Rust, una sola app en SvelteKit para la web, iOS y Android, y Google Cloud.",
    },
    role: {
      en: "Full-stack engineer at WERN",
      es: "Ingeniero full stack en WERN",
    },
    cover: {
      image: bdVideo,
      youtube: "Mk-9ScKfzTc",
      duration: "5:18",
      alt: {
        en: "Bidali's video, an early build on the iPhone simulator: business, courier and customer, the whole journey of an order in Managua",
        es: "El video de Bidali, una versión temprana en el simulador de iPhone: negocio, repartidor y cliente, el recorrido completo de un pedido en Managua",
      },
    },
    published: "2026-10-27",
    updated: "2026-10",
    chapters: [
      {
        heading: { en: "What it is", es: "Qué es" },
        blocks: [
          {
            type: "p",
            text: {
              en: "Bidali brings together the three people in a delivery: the business that sells, the courier who carries the order and the customer who waits for it.",
              es: "Bidali junta a las tres personas de una entrega: el negocio que vende, el repartidor que lleva el pedido y el cliente que lo espera.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**The business** creates the order, marks the address on the map and publishes it.",
                "**The courier** sees the orders nearby, takes them, follows the route and confirms each delivery with a photo.",
                "**The customer** follows the order on a map from the browser, without creating an account.",
              ],
              es: [
                "**El negocio** crea el pedido, marca la dirección en el mapa y lo publica.",
                "**El repartidor** ve los pedidos cercanos, los toma, sigue la ruta y confirma cada entrega con una foto.",
                "**El cliente** sigue su pedido en un mapa desde el navegador, sin crear una cuenta.",
              ],
            },
          },
          {
            type: "figure",
            image: bdOrderDestination,
            alt: {
              en: "The business web app, a new order: a map of Managua with a pin on the destination, a field for directions and a Next button",
              es: "La app web del negocio, un pedido nuevo: un mapa de Managua con un pin en el destino, un campo para la referencia y un botón de Siguiente",
            },
            caption: {
              en: "A new order: the address is a pin on the map plus a short reference, the way addresses work in Nicaragua.",
              es: "Un pedido nuevo: la dirección es un pin en el mapa más una referencia, como funcionan las direcciones en Nicaragua.",
            },
          },
          {
            type: "clip",
            src: "/work/bidali/business-order",
            width: 1512,
            height: 806,
            alt: {
              en: "Screen recording of the business web app: choosing the destination on the map, adding products, confirming and publishing the order",
              es: "Grabación de pantalla de la app web del negocio: elegir el destino en el mapa, agregar productos, confirmar y publicar el pedido",
            },
            caption: {
              en: "From the map to a published order, in the business web app.",
              es: "Del mapa a un pedido publicado, en la app web del negocio.",
            },
          },
          {
            type: "p",
            text: {
              en: "The video at the top is an early build that shows the whole journey of three orders. The code is under NDA.",
              es: "El video de arriba es una versión temprana que muestra el recorrido completo de tres pedidos. El código está bajo NDA.",
            },
          },
        ],
      },
      {
        heading: { en: "On the street", es: "En la calle" },
        blocks: [
          {
            type: "p",
            text: {
              en: "Couriers work on the move, often with a weak signal, so the app was designed for that from the start.",
              es: "Los repartidores trabajan en movimiento y muchas veces con poca señal, así que la app se pensó para eso desde el inicio.",
            },
          },
          {
            type: "clip",
            src: "/work/bidali/courier-app",
            width: 392,
            height: 806,
            alt: {
              en: "Screen recording of the courier app on a phone: the nearby orders, taking one, the route map and the delivery screen asking for a photo",
              es: "Grabación de pantalla de la app del repartidor en un teléfono: los pedidos cercanos, tomar uno, el mapa de la ruta y la pantalla de entrega pidiendo una foto",
            },
            caption: {
              en: "The courier app, from the nearby orders to the door. Business and courier use the same app.",
              es: "La app del repartidor, de los pedidos cercanos a la puerta. Negocio y repartidor usan la misma app.",
            },
          },
          {
            type: "p",
            text: {
              en: "Picking up, delivering and reporting a problem work without internet. The app saves the action on the phone and sends it on its own when the signal returns.",
              es: "Recoger, entregar y reportar un problema funcionan sin internet. La app guarda la acción en el teléfono y la envía sola cuando vuelve la señal.",
            },
          },
          {
            type: "p",
            text: {
              en: "The maps of Managua travel inside the app, so the screen is never blank. With a signal, the route comes from Mapbox and opens in Waze or Google Maps with one tap.",
              es: "Los mapas de Managua viajan dentro de la app, así que la pantalla nunca queda en blanco. Con señal, la ruta sale de Mapbox y se abre en Waze o Google Maps con un toque.",
            },
          },
        ],
      },
      {
        heading: { en: "Architecture", es: "Arquitectura" },
        blocks: [
          {
            type: "p",
            text: {
              en: "One API and one front end for three platforms. The same SvelteKit app runs in the browser and, through Tauri, on iOS and Android. Everything that runs on a server lives in Google Cloud, declared in Terraform.",
              es: "Una API y un front end para tres plataformas. La misma app en SvelteKit corre en el navegador y, a través de Tauri, en iOS y Android. Todo lo que corre en un servidor vive en Google Cloud, declarado en Terraform.",
            },
          },
          {
            type: "diagram",
            src: "/work/bidali/architecture",
            wide: { width: 938, height: 560 },
            tall: { width: 468, height: 900 },
            alt: {
              en: "Architecture of Bidali: the web, iOS and Android apps, built from one SvelteKit codebase, reach Caddy over HTTPS on a Compute Engine VM in Google Cloud, which passes requests to the Rust API and on to PostgreSQL with PostGIS. The apps sign in with Firebase, and the database is backed up to Cloud Storage. The API calls Mapbox for maps and routes and Bunny Storage for delivery photos.",
              es: "Arquitectura de Bidali: las apps web, iOS y Android, hechas de un solo código SvelteKit, llegan por HTTPS a Caddy en una VM de Compute Engine en Google Cloud, que pasa las peticiones a la API en Rust y de ahí a PostgreSQL con PostGIS. Las apps inician sesión con Firebase, y la base de datos se respalda en Cloud Storage. La API llama a Mapbox para mapas y rutas y a Bunny Storage para las fotos de entrega.",
            },
            caption: {
              en: "How the pieces connect.",
              es: "Cómo se conectan las piezas.",
            },
          },
          {
            type: "p",
            text: {
              en: "**Why Rust and one shared app.** The API is a single Rust service split by business area, simple to deploy and to test. The front end is written once and reaches the web and both phones, with small native plugins only for location and notifications.",
              es: "**Por qué Rust y una sola app.** La API es un solo servicio en Rust dividido por áreas del negocio, simple de desplegar y de probar. El front end se escribe una vez y llega a la web y a los dos teléfonos, con plugins nativos pequeños solo para la ubicación y las notificaciones.",
            },
          },
        ],
      },
      {
        heading: { en: "What I learned", es: "Lo que aprendí" },
        blocks: [
          {
            type: "list",
            items: {
              en: [
                "**Design for the worst signal first.** Deciding early that the app works offline shaped the rest of the system. Adding it later would have meant redoing a lot.",
                "**Read a provider's terms before writing code.** Mapbox does not allow its routes to be saved. Knowing that early avoided building a cache that would have had to go.",
                "**One codebase for three platforms works if the native part stays small.** Tauri turned the web app into a phone app, and only location and notifications needed native code.",
              ],
              es: [
                "**Diseñar primero para la peor señal.** Decidir temprano que la app funcione sin internet le dio forma al resto del sistema. Agregarlo después habría significado rehacer mucho.",
                "**Leer los términos de un proveedor antes de programar.** Mapbox no permite guardar sus rutas. Saberlo temprano evitó construir un caché que habría tenido que salir.",
                "**Un solo código para tres plataformas funciona si la parte nativa es pequeña.** Tauri convirtió la app web en una app de teléfono, y solo la ubicación y las notificaciones necesitaron código nativo.",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "interview-agent",
    lead: {
      en: "Interview Agent is a voice app for practising job interviews. It reads your CV and the job offer, interviews you out loud and then shows you how to improve each answer.",
      es: "Interview Agent es una app de voz para practicar entrevistas de trabajo. Lee tu CV y la oferta, te entrevista en voz alta y después te muestra cómo mejorar cada respuesta.",
    },
    description: {
      en: "How I built Interview Agent: a voice app with three AI agents, built on LiveKit, LangGraph, FastAPI and React.",
      es: "Cómo construí Interview Agent: una app de voz con tres agentes de IA, hecha con LiveKit, LangGraph, FastAPI y React.",
    },
    role: {
      en: "Full-stack engineer",
      es: "Ingeniero full stack",
    },
    published: "2026-10-27",
    updated: "2026-10",
    chapters: [
      {
        heading: { en: "Where it comes from", es: "De dónde sale" },
        blocks: [
          {
            type: "p",
            text: {
              en: "I built it after a job interview with a bot. It was slow to answer, talked over me and cut my answers short.",
              es: "La hice después de una entrevista de trabajo con un bot. Tardaba en responder, me interrumpía y cortaba mis respuestas.",
            },
          },
          {
            type: "p",
            text: {
              en: "So I wrote down what I wanted instead: an interviewer that waits until I finish, answers quickly, remembers what I said and judges what I said, not how smoothly I said it.",
              es: "Así que anoté lo que quería en su lugar: un entrevistador que espere a que termine, responda rápido, recuerde lo que dije y juzgue lo que dije, no lo fluido que sonó.",
            },
          },
          {
            type: "figure",
            image: iaHome,
            alt: {
              en: "Interview Agent's home screen: a New interview button and the list of recent interviews",
              es: "La pantalla de inicio de Interview Agent: el botón de nueva entrevista y la lista de entrevistas recientes",
            },
            caption: {
              en: "The home screen.",
              es: "La pantalla de inicio.",
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
              en: "You upload your CV and paste the job offer. Then you choose the level, the language, the length and the type of questions.",
              es: "Subes tu CV y pegas la oferta. Después eliges el nivel, el idioma, la duración y el tipo de preguntas.",
            },
          },
          {
            type: "clip",
            src: "/work/interview-agent/new-interview",
            width: 1512,
            height: 806,
            alt: {
              en: "Screen recording: the New interview form, with the job offer being typed next to the CV upload box",
              es: "Grabación de pantalla: el formulario de nueva entrevista, con la oferta escribiéndose junto a la caja para subir el CV",
            },
            caption: {
              en: "A CV and a job offer are all it needs.",
              es: "Solo necesita un CV y una oferta.",
            },
          },
          {
            type: "p",
            text: {
              en: "The interview happens by voice, in English or Spanish. The interviewer asks, listens, asks again when an answer is vague and moves on when a topic is done. You choose its name, voice and personality in Settings.",
              es: "La entrevista es por voz, en inglés o en español. El entrevistador pregunta, escucha, repregunta cuando una respuesta queda vaga y avanza cuando un tema está cubierto. En Ajustes eliges su nombre, su voz y su personalidad.",
            },
          },
          {
            type: "figure",
            image: iaSettings,
            alt: {
              en: "The Settings screen: the interviewer's name, language, voice, personality and instructions",
              es: "La pantalla de ajustes: nombre, idioma, voz, personalidad e instrucciones del entrevistador",
            },
            caption: {
              en: "The interviewer's settings.",
              es: "Los ajustes del entrevistador.",
            },
          },
          {
            type: "p",
            text: {
              en: "At the end you get the results. Each weak answer appears next to a better version, written only with what you said. Each topic gets a grade with quotes from the conversation, and the full transcript is saved.",
              es: "Al final ves los resultados. Cada respuesta floja aparece junto a una versión mejor, escrita solo con lo que dijiste. Cada tema recibe una nota con citas de la conversación, y la transcripción completa queda guardada.",
            },
          },
          {
            type: "clip",
            src: "/work/interview-agent/results",
            width: 1512,
            height: 806,
            alt: {
              en: "Screen recording of the results: the summary, the improved answers, one topic opened and the transcript",
              es: "Grabación de pantalla de los resultados: el resumen, las respuestas mejoradas, un tema abierto y la transcripción",
            },
            caption: {
              en: "The results of a real practice session.",
              es: "Los resultados de una práctica real.",
            },
          },
          {
            type: "p",
            text: {
              en: "You can repeat the same interview with new questions, and the attempts stay grouped together.",
              es: "Puedes repetir la misma entrevista con preguntas nuevas, y los intentos quedan agrupados.",
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
              en: "Three agents share the work. They use the same OpenAI model, but the interviewer thinks the least, because it has to answer fast.",
              es: "Tres agentes se reparten el trabajo. Usan el mismo modelo de OpenAI, pero el entrevistador es el que menos piensa, porque tiene que responder rápido.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**The planner** reads the offer and the CV and decides which topics to cover.",
                "**The interviewer** talks with you in real time. LiveKit handles the audio and LangGraph decides the next question.",
                "**The evaluator** grades the interview once it is over, always with quotes from what you said.",
              ],
              es: [
                "**El planificador** lee la oferta y el CV y decide qué temas cubrir.",
                "**El entrevistador** habla contigo en tiempo real. LiveKit se encarga del audio y LangGraph decide la siguiente pregunta.",
                "**El evaluador** califica la entrevista cuando termina, siempre con citas de lo que dijiste.",
              ],
            },
          },
          {
            type: "p",
            text: {
              en: "There is no vector database. A CV is short enough to give to each agent whole.",
              es: "No hay base de datos vectorial. Un CV es lo bastante corto para dárselo entero a cada agente.",
            },
          },
        ],
      },
      {
        heading: { en: "What it's made of", es: "Con qué lo construí" },
        blocks: [
          {
            type: "p",
            text: {
              en: "A React web app, a FastAPI API and a voice worker, around one PostgreSQL database. Each part deploys itself from the main branch.",
              es: "Una app web en React, una API en FastAPI y un worker de voz, alrededor de una sola base de datos PostgreSQL. Cada parte se despliega sola desde la rama principal.",
            },
          },
          {
            type: "sheet",
            rows: [
              {
                name: "TanStack Start · React",
                why: {
                  en: "The web app, served from Vercel.",
                  es: "La app web, servida desde Vercel.",
                },
              },
              {
                name: "FastAPI",
                why: {
                  en: "The API for interviews, plans and results, on FastAPI Cloud.",
                  es: "La API de entrevistas, planes y resultados, en FastAPI Cloud.",
                },
              },
              {
                name: "LiveKit Agents",
                why: {
                  en: "The audio: listening, speaking and knowing when you have finished.",
                  es: "El audio: escuchar, hablar y saber cuándo terminaste.",
                },
              },
              {
                name: "LangGraph",
                why: {
                  en: "The interviewer's decisions, saved before each question so nothing is lost if something fails.",
                  es: "Las decisiones del entrevistador, guardadas antes de cada pregunta para no perder nada si algo falla.",
                },
              },
              {
                name: "OpenAI",
                why: {
                  en: "One model for the three agents.",
                  es: "Un modelo para los tres agentes.",
                },
              },
              {
                name: "PostgreSQL · Neon",
                why: {
                  en: "The data, and sign-in with Google or GitHub.",
                  es: "Los datos, y el acceso con Google o GitHub.",
                },
              },
              {
                name: "Grafana · Sentry",
                why: {
                  en: "Anonymous metrics and errors.",
                  es: "Métricas anónimas y errores.",
                },
              },
              {
                name: "Docker · Terraform · GitHub Actions",
                why: {
                  en: "Local development, infrastructure and deploys.",
                  es: "Desarrollo local, infraestructura y despliegues.",
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
              en: "Most of the time went into the parts a screenshot does not show.",
              es: "La mayor parte del tiempo se fue en lo que no sale en una captura.",
            },
          },
          {
            type: "p",
            text: {
              en: "**I stopped building the audio myself.** My first version handled the audio on its own and never felt human. Now LiveKit handles echo, interruptions and reconnection, and a trained model decides when you have finished talking.",
              es: "**Dejé de construir el audio yo mismo.** Mi primera versión manejaba el audio por su cuenta y nunca sonó humana. Ahora LiveKit se encarga del eco, las interrupciones y la reconexión, y un modelo entrenado decide cuándo terminaste de hablar.",
            },
          },
          {
            type: "p",
            text: {
              en: "**Nothing is lost.** Every question and answer is saved as it happens. If the connection drops, the interview continues where it stopped.",
              es: "**No se pierde nada.** Cada pregunta y respuesta se guarda en el momento. Si se cae la conexión, la entrevista sigue donde quedó.",
            },
          },
          {
            type: "p",
            text: {
              en: "**Only what was heard is graded.** Lost audio does not count as a wrong answer. If the interview left out important topics, there is feedback per topic but no overall score.",
              es: "**Solo se califica lo que se oyó.** Un audio perdido no cuenta como respuesta incorrecta. Si la entrevista dejó fuera temas importantes, hay comentarios por tema pero no nota global.",
            },
          },
          {
            type: "p",
            text: {
              en: "**Your data stays private.** Logs never store what you said, and old interviews are deleted automatically.",
              es: "**Tus datos son privados.** Los logs nunca guardan lo que dijiste, y las entrevistas viejas se borran solas.",
            },
          },
        ],
      },
      {
        heading: { en: "What I learned", es: "Lo que aprendí" },
        blocks: [
          {
            type: "list",
            items: {
              en: [
                "**Don't rebuild what is already solved.** Building my own audio taught me how hard it is, and that my time was better spent on the agents.",
                "**Speed matters more than intelligence.** A fast interviewer felt better than a smarter, slower one.",
                "**Structured answers make AI reliable.** The planner and the evaluator return data in a fixed format, so their results reach the screen without anyone checking them first.",
              ],
              es: [
                "**No reconstruir lo que ya está resuelto.** Hacer mi propio audio me enseñó lo difícil que es, y que mi tiempo rendía más en los agentes.",
                "**La velocidad importa más que la inteligencia.** Un entrevistador rápido se sintió mejor que uno más listo y más lento.",
                "**Las respuestas estructuradas hacen confiable a la IA.** El planificador y el evaluador devuelven datos con un formato fijo, así que sus resultados llegan a la pantalla sin que nadie los revise antes.",
              ],
            },
          },
          {
            type: "p",
            text: {
              en: "I still use it. The session in the recording is one of mine.",
              es: "La sigo usando. La sesión de la grabación es una mía.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "portfolio",
    lead: {
      en: "The look of this portfolio is inspired by Bocanada, Gustavo Cerati's 1999 album: its colours, its red rhombuses and its dots. This page explains that idea, the rules that came from it and the tools behind the site.",
      es: "El aspecto de este portfolio está inspirado en Bocanada, el disco de Gustavo Cerati de 1999: sus colores, sus rombos rojos y sus puntos. Esta página explica esa idea, las reglas que salieron de ella y las herramientas detrás del sitio.",
    },
    description: {
      en: "How this portfolio takes its look from Gustavo Cerati's Bocanada, and why it is built with Astro, Tailwind CSS and GSAP.",
      es: "Cómo este portfolio toma su aspecto de Bocanada de Gustavo Cerati, y por qué está hecho con Astro, Tailwind CSS y GSAP.",
    },
    role: {
      en: "Designer and developer",
      es: "Diseñador y desarrollador",
    },
    published: "2026-10-27",
    updated: "2026-10",
    chapters: [
      {
        heading: { en: "Bocanada", es: "Bocanada" },
        blocks: [
          {
            type: "p",
            text: {
              en: "Bocanada is Gustavo Cerati's first album after Soda Stereo, from 1999. It is my favourite of his: slower, stranger and more personal than anything before. It felt right for a site made by one person.",
              es: "Bocanada es el primer disco de Gustavo Cerati después de Soda Stereo, de 1999. Es mi favorito de los suyos: más lento, más raro y más personal que todo lo anterior. Me pareció ideal para un sitio hecho por una sola persona.",
            },
          },
          {
            type: "p",
            text: {
              en: "The site does not copy the album. It borrows a few colours and marks.",
              es: "El sitio no copia el disco. Toma prestados algunos colores y marcas.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**The colours.** Cobalt blue, smoke and dark ink from the cover, and paper for the light sections.",
                "**The red dots.** They come from the inner sleeve and float slowly behind some sections.",
                "**The red rhombus and the thin red line.** The only two accents on the site.",
                "**The home page** recalls the cover: my name split around a portrait in blue and smoke.",
              ],
              es: [
                "**Los colores.** Azul cobalto, humo y tinta oscura de la portada, y papel para las secciones claras.",
                "**Los puntos rojos.** Vienen del interior de la funda y flotan despacio detrás de algunas secciones.",
                "**El rombo rojo y la línea roja fina.** Los únicos dos acentos del sitio.",
                "**La página de inicio** recuerda la portada: mi nombre partido alrededor de un retrato en azul y humo.",
              ],
            },
          },
          {
            type: "figure",
            image: pfHero,
            alt: {
              en: "The home page of this site: the name STEVEN MENDEZ split around a portrait in cobalt blue and smoke",
              es: "La página de inicio de este sitio: el nombre STEVEN MENDEZ partido alrededor de un retrato en azul cobalto y humo",
            },
            caption: {
              en: "The home page.",
              es: "La página de inicio.",
            },
          },
          {
            type: "figure",
            image: pfExperience,
            alt: {
              en: "The opening of the Experience section over a texture of blue fur",
              es: "La apertura de la sección de Experiencia sobre una textura de piel azul",
            },
            caption: {
              en: "The Experience section, over blue fur.",
              es: "La sección de Experiencia, sobre piel azul.",
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
              en: "A reference only helps if it becomes clear rules. These are the site's.",
              es: "Una referencia solo sirve si se convierte en reglas claras. Estas son las del sitio.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**Two tones.** Dark and light, like a record sleeve and its booklet. Everything reads well on both.",
                "**Red marks, it never writes.** Red is only used for lines and rhombuses, never for text.",
                "**One type scale.** Each section has its own layout, but the same kind of title is always the same size.",
                "**Nothing moves forever.** Only the dots keep moving. Everything else moves once, when it appears.",
              ],
              es: [
                "**Dos tonos.** Oscuro y claro, como la funda de un disco y su libreto. Todo se lee bien en los dos.",
                "**El rojo marca, nunca escribe.** El rojo solo se usa en líneas y rombos, nunca en texto.",
                "**Una sola escala tipográfica.** Cada sección tiene su propio diseño, pero el mismo tipo de título siempre mide lo mismo.",
                "**Nada se mueve para siempre.** Solo los puntos siguen en movimiento. Todo lo demás se mueve una vez, al aparecer.",
              ],
            },
          },
          {
            type: "figure",
            image: pfWork,
            alt: {
              en: "The Work section: ruled rows, each with an index, a title, a year and the project's details",
              es: "La sección de Proyectos: filas regladas, cada una con índice, título, año y los detalles del proyecto",
            },
            caption: {
              en: "The Work section, like a track list.",
              es: "La sección de Proyectos, como una lista de canciones.",
            },
          },
        ],
      },
      {
        heading: {
          en: "What it's made of, and why",
          es: "Con qué lo construí, y por qué",
        },
        blocks: [
          {
            type: "p",
            text: {
              en: "The stack is small on purpose. Each tool removes work instead of adding it.",
              es: "El stack es pequeño a propósito. Cada herramienta quita trabajo en vez de añadirlo.",
            },
          },
          {
            type: "sheet",
            rows: [
              {
                name: "Astro 7",
                why: {
                  en: "A fast static site in English and Spanish, with optimised images and fonts.",
                  es: "Un sitio estático y rápido en inglés y español, con imágenes y fuentes optimizadas.",
                },
              },
              {
                name: "Tailwind CSS 4",
                why: {
                  en: "Colours, sizes and spacing defined once and reused everywhere.",
                  es: "Colores, tamaños y espacios definidos una vez y reutilizados en todo el sitio.",
                },
              },
              {
                name: "GSAP 3",
                why: {
                  en: "The entrance animations. Without JavaScript, or with reduced motion, the page simply stays still.",
                  es: "Las animaciones de entrada. Sin JavaScript, o con movimiento reducido, la página simplemente se queda quieta.",
                },
              },
              {
                name: "TypeScript 6",
                why: {
                  en: "The content is typed, with both languages side by side so no text goes missing.",
                  es: "El contenido está tipado, con los dos idiomas lado a lado para que no falte ningún texto.",
                },
              },
              {
                name: "Geist · Geist Mono",
                why: {
                  en: "One font for reading and a mono font for small labels.",
                  es: "Una fuente para leer y una mono para las etiquetas pequeñas.",
                },
              },
              {
                name: "Lighthouse CI",
                why: {
                  en: "Every build checks speed, accessibility and SEO.",
                  es: "Cada build revisa velocidad, accesibilidad y SEO.",
                },
              },
              {
                name: "Generated textures",
                why: {
                  en: "The blue fur and the smoke are generated images based on the album. The portrait is me.",
                  es: "La piel azul y el humo son imágenes generadas a partir del disco. El retrato soy yo.",
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
      else if (block.type === "figure" || block.type === "clip")
        texts.push(block.caption[lang])
      else if (block.type === "diagram") texts.push(block.caption[lang])
      else for (const row of block.rows) texts.push(row.name, row.why[lang])
    }
  }
  const words = texts.join(" ").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
