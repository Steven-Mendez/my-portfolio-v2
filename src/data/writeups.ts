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
 * poster), `diagram` (an architecture map drawn from data: tiers of boxes
 * with a labelled connector between them; figures, clips and diagrams
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
import bdOrderDetail from "@/assets/work/bidali/order-detail.jpg"
import bdTracking from "@/assets/work/bidali/tracking.jpg"
import bdVideo from "@/assets/work/bidali/video.jpg"

/** One box of an architecture map: a product name and what it does here. */
export interface DiagramBox {
  name: string
  note: Localized<string>
}

/**
 * One tier of the map, top to bottom the way a request travels. `chain`
 * is a row of boxes that hand off to one another, drawn before the tier's
 * loose boxes and inside its own container.
 */
export interface DiagramTier {
  label: Localized<string>
  chain?: { label: Localized<string>; boxes: readonly DiagramBox[] }
  boxes: readonly DiagramBox[]
}

export interface DiagramBlock {
  type: "diagram"
  tiers: readonly DiagramTier[]
  /** What crosses between consecutive tiers: one label per gap. */
  links: Localized<readonly string[]>
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
    // Under NDA: the page describes the product, the architecture and the
    // decisions, with screens and a map, and never the code.
    slug: "bidali",
    lead: {
      en: "A last-mile delivery platform for Nicaragua, an internal product of WERN, the agency I work at. Businesses publish orders, the couriers nearby take them and deliver with a photo as proof, and the customer follows the delivery from the browser with a code and a phone number.",
      es: "Una plataforma de logística de última milla para Nicaragua, producto interno de WERN, la agencia donde trabajo. Los negocios publican pedidos, los repartidores cercanos los toman y entregan con una foto como constancia, y el cliente sigue la entrega desde el navegador con un código y su teléfono.",
    },
    description: {
      en: "How Bidali, WERN's internal delivery platform, is built: a Rust and Axum API over PostGIS, one SvelteKit app for the web, iOS and Android through Tauri, and Google Cloud declared in Terraform.",
      es: "Cómo está hecho Bidali, la plataforma de entregas interna de WERN: una API en Rust y Axum sobre PostGIS, una sola app en SvelteKit para la web, iOS y Android a través de Tauri, y Google Cloud declarado en Terraform.",
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
              en: "In Managua a small business that delivers, a bakery or a corner shop, usually runs on phone calls and chat messages: someone with a motorbike, a customer waiting without knowing when, and nobody with a record of what went where. Bidali gives the three of them one place.",
              es: "En Managua, un negocio pequeño que reparte, una panadería o una pulpería, suele funcionar a base de llamadas y mensajes: alguien con una moto, un cliente que espera sin saber cuándo, y nadie con un registro de qué fue a dónde. Bidali les da a los tres un solo lugar.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**The business** creates orders in five steps: customer, destination on the map, products, how it gets paid and a summary. Shipping is quoted by distance before the order exists. It then confirms, prepares and publishes, and watches each order move on a timeline with its charges and part payments.",
                "**The courier** signs up with a vehicle and documents, sees the orders published near their last position, takes as many as their quota allows, plans the route and records every pickup and delivery, with a photo at the door.",
                "**The customer** opens a link, types the code the business gave them and the phone number they gave the business, and sees a three-step status, the courier on the map while the order is on its way and an arrival estimate when they are the next stop.",
                "**The platform** has an admin side: an inbox of problem reports, orders that could not be delivered, business suspensions and support cases with notes and a global search.",
              ],
              es: [
                "**El negocio** crea pedidos en cinco pasos: cliente, destino en el mapa, productos, cómo se cobra y un resumen. El envío se cotiza por distancia antes de que el pedido exista. Luego confirma, prepara y publica, y ve cada pedido avanzar en una línea de tiempo con sus cobros y abonos.",
                "**El repartidor** se registra con un vehículo y documentos, ve los pedidos publicados cerca de su última posición, toma hasta donde le alcance el cupo, arma la ruta y registra cada recogida y cada entrega, con una foto en la puerta.",
                "**El cliente** abre un enlace, escribe el código que le dio el negocio y el teléfono que le dio al negocio, y ve el estado en tres pasos, al repartidor en el mapa mientras el pedido va en camino y una estimación de llegada cuando es la próxima parada.",
                "**La plataforma** tiene un lado de administración: una bandeja de reportes, los pedidos que no se pudieron entregar, suspensiones de negocios y casos de soporte con notas y una búsqueda global.",
              ],
            },
          },
          {
            type: "p",
            text: {
              en: "Prices are in córdobas, with dollars converted at the Central Bank's daily rate, and the maps of Managua ship inside the app so they work without a signal. Spanish is the first language and English the second, with every string of the interface in both.",
              es: "Los precios van en córdobas, con dólares convertidos a la tasa diaria del Banco Central, y los mapas de Managua viajan dentro de la app para que funcionen sin señal. El español es el primer idioma y el inglés el segundo, con cada texto de la interfaz en los dos.",
            },
          },
          {
            type: "figure",
            image: bdOrderDestination,
            alt: {
              en: "The business web app, step two of a new order: a map of Managua with a pin on the destination, a field for directions to the door and a Next button",
              es: "La app web del negocio, paso dos de un pedido nuevo: un mapa de Managua con un pin en el destino, un campo para la referencia de llegada y un botón de Siguiente",
            },
            caption: {
              en: "A new order, step two: the destination is a pin on the map plus a line of directions, the way addresses work in Nicaragua.",
              es: "Un pedido nuevo, paso dos: el destino es un pin en el mapa más una referencia, que es como funcionan las direcciones en Nicaragua.",
            },
          },
          {
            type: "clip",
            src: "/work/bidali/business-order",
            width: 1512,
            height: 806,
            alt: {
              en: "Screen recording of the business web app: choosing the destination on the map, adding two products, the order summary, confirming and sliding to publish, then the order's detail with its charges and timeline",
              es: "Grabación de pantalla de la app web del negocio: elegir el destino en el mapa, agregar dos productos, el resumen del pedido, confirmar y deslizar para publicar, y después el detalle del pedido con sus cobros y su línea de tiempo",
            },
            caption: {
              en: "From the map to a published order, in the business web app. Publishing and cancelling are slide-to-confirm, so a thumb cannot do either by accident.",
              es: "Del mapa a un pedido publicado, en la app web del negocio. Publicar y cancelar se confirman deslizando, para que un pulgar no haga ninguna de las dos por accidente.",
            },
          },
          {
            type: "p",
            text: {
              en: "The video at the top of the page is an early build: three businesses publish an order each on the iPhone simulator, one courier takes the three, runs the route and delivers them, and halfway through the customer tracks their order from a browser. The code is under NDA, so this page tells the rest in words, screens and one map.",
              es: "El video de arriba es una versión temprana: tres negocios publican un pedido cada uno en el simulador de iPhone, un repartidor toma los tres, recorre la ruta y los entrega, y a mitad del camino el cliente rastrea su pedido desde el navegador. El código está bajo NDA, así que esta página cuenta el resto con palabras, pantallas y un mapa.",
            },
          },
        ],
      },
      {
        heading: {
          en: "A delivery, end to end",
          es: "Un pedido de punta a punta",
        },
        blocks: [
          {
            type: "p",
            text: {
              en: "An order is a state machine with nine states and fifteen allowed moves, written once as a pure function and tested against all eighty-one pairs. A draft is never a destination again, delivered and cancelled are final, and exactly one place in the API can write “published” and one can write “failed”. Every move leaves an event in an append-only log that both the business and the admin can read.",
              es: "Un pedido es una máquina de estados con nueve estados y quince movimientos permitidos, escrita una sola vez como función pura y probada contra los ochenta y un pares posibles. Un borrador nunca vuelve a ser destino, entregado y cancelado son finales, y exactamente un lugar de la API puede escribir «publicado» y uno «fallido». Cada movimiento deja un evento en una bitácora de solo escritura que leen el negocio y la administración.",
            },
          },
          {
            type: "clip",
            src: "/work/bidali/courier-app",
            width: 392,
            height: 806,
            alt: {
              en: "Screen recording of the courier app on a phone: switching to the courier profile, the nearby orders, taking one, the ready-to-go card, the route map with the next stop, and the delivery sheet asking for a photo",
              es: "Grabación de pantalla de la app del repartidor en un teléfono: cambiar al perfil de repartidor, los pedidos cercanos, tomar uno, la tarjeta de listo para salir, el mapa de la ruta con la próxima parada y la hoja de entrega pidiendo una foto",
            },
            caption: {
              en: "The courier app, from the pool to the door. Same account, same app as the business: a pill at the top switches profiles.",
              es: "La app del repartidor, del pool a la puerta. Misma cuenta y misma app que el negocio: una píldora arriba cambia de perfil.",
            },
          },
          {
            type: "p",
            text: {
              en: "**The pool.** A published order appears to the couriers whose last fresh position is within the platform's radius of the pickup point, a PostGIS query over the courier's reported location. Couriers the business has marked as trusted see it first, for a short head start; then everyone with room in their quota. Taking is atomic: two couriers cannot end up with the same order, and the quota is checked in the same transaction.",
              es: "**El pool.** Un pedido publicado les aparece a los repartidores cuya última posición fresca cae dentro del radio de la plataforma alrededor del punto de retiro, una consulta PostGIS sobre la ubicación que reportan. Los repartidores que el negocio marcó como de confianza lo ven primero, con una ventaja corta; después, todos los que tengan cupo. Tomar es atómico: dos repartidores no pueden quedarse con el mismo pedido, y el cupo se comprueba en la misma transacción.",
            },
          },
          {
            type: "p",
            text: {
              en: "**The route.** With one or more orders taken, the courier asks for a recommended order of stops, built with Mapbox's Optimization API, and can reorder it by hand, with the rule that a delivery can never be placed before its pickup. The route itself comes from the Directions API and is redrawn when the courier strays more than a block and a half from it. “Open in” hands the next stop to Waze, Google Maps or Apple Maps. None of what Mapbox returns is stored, because its terms forbid it, so the API applies floors and coalesces requests instead of caching.",
              es: "**La ruta.** Con uno o más pedidos tomados, el repartidor pide un orden recomendado de paradas, armado con la API de Optimization de Mapbox, y puede reordenarlo a mano, con la regla de que una entrega nunca puede quedar antes de su recogida. La ruta en sí sale de la API de Directions y se retraza cuando el repartidor se aleja más de cuadra y media. «Abrir en» le pasa la próxima parada a Waze, Google Maps o Apple Maps. Nada de lo que devuelve Mapbox se guarda, porque sus términos lo prohíben, así que la API pone pisos y agrupa peticiones en vez de cachear.",
            },
          },
          {
            type: "p",
            text: {
              en: "**The customer.** Tracking needs no account: the order's code in the URL and the last eight digits of the phone number in a header. Anything that does not match gets the same opaque 404, and the endpoint has its own rate limit per code. The courier's position is shown only while the order is in transit and only while it is fresh, and the route to the door only when this customer is the next stop. The page polls every fifteen seconds and offers one button, “my order is not moving”, which files a report the admin sees.",
              es: "**El cliente.** Rastrear no necesita cuenta: el código del pedido en la URL y los últimos ocho dígitos del teléfono en un header. Cualquier cosa que no calce recibe el mismo 404 opaco, y el endpoint tiene su propio límite de intentos por código. La posición del repartidor se muestra solo mientras el pedido va en camino y solo mientras es fresca, y la ruta hasta la puerta solo cuando este cliente es la próxima parada. La página consulta cada quince segundos y ofrece un solo botón, «mi pedido no avanza», que deja un reporte que ve la administración.",
            },
          },
          {
            type: "figure",
            image: bdTracking,
            alt: {
              en: "The public tracking page: a card with “Your order is on its way”, the three-step status, the courier's name with a Call button and a report button, over a map of Managua with the courier's position",
              es: "La página pública de rastreo: una tarjeta con «Tu pedido va en camino», el estado en tres pasos, el nombre del repartidor con un botón de Llamar y un botón de reportar, sobre un mapa de Managua con la posición del repartidor",
            },
            caption: {
              en: "Tracking, from the browser: status, courier, a call button and the map, with nothing personal in the link.",
              es: "Rastreo desde el navegador: estado, repartidor, un botón para llamar y el mapa, sin nada personal en el enlace.",
            },
          },
          {
            type: "figure",
            image: bdOrderDetail,
            alt: {
              en: "The business web app, an order's detail: the total, what has been paid and what is still owed, a part-payments section and a timeline of confirmed, preparing and published, with a toast saying the order is published and couriers nearby can see it",
              es: "La app web del negocio, el detalle de un pedido: el total, lo pagado y lo que falta cobrar, una sección de abonos y una línea de tiempo con confirmado, en preparación y publicado, con un aviso de que el pedido está publicado y los repartidores cercanos lo ven",
            },
            caption: {
              en: "Back at the business: the order's money and its timeline. Part payments are an append-only ledger, so a total never drops below what was paid.",
              es: "De vuelta en el negocio: el dinero del pedido y su línea de tiempo. Los abonos son un libro de solo escritura, así que un total nunca baja de lo pagado.",
            },
          },
        ],
      },
      {
        heading: {
          en: "Built to lose signal",
          es: "Hecho para perder señal",
        },
        blocks: [
          {
            type: "p",
            text: {
              en: "A courier loses coverage exactly where the work is. So the three things that happen on the street, “picked up”, “delivered” and “report a problem”, work without a network: the app records the action on the phone at the moment of the gesture and sends it by itself when the signal returns.",
              es: "Un repartidor pierde la señal justo donde está el trabajo. Así que las tres cosas que pasan en la calle, «ya lo recogí», «entregar» y «reportar un problema», funcionan sin red: la app anota la acción en el teléfono en el momento del gesto y la manda sola cuando vuelve la señal.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**Each action is sealed when it happens.** It gets an identifier and a timestamp at the tap, before any request, and every retry sends the same two. The API treats the batch as idempotent per user and action, applies the actions in order, and when two devices disagree the later change wins and the conflict is written to the audit log rather than hidden.",
                "**The photo goes first.** It is shrunk on the phone to a few hundred kilobytes before anything else, stored with the queued delivery, and uploaded before the delivery itself is sent. Its upload timeout grows with its size, so a slow connection gets a fair chance instead of a fixed cutoff.",
                "**The map never goes blank.** When there is a key and a signal, the maps are Mapbox GL with its 3D buildings; when there is not, MapLibre draws the same screen from a tile file of Managua that ships inside the app, styled from the same design tokens.",
                "**A push is a shortcut, never the truth.** Each change of state writes its notifications into an outbox in the same transaction, so a reverted change never sends one. The apps keep polling, just four times more spaced when they have permission for push.",
              ],
              es: [
                "**Cada acción se sella cuando ocurre.** Recibe un identificador y una hora en el toque, antes de cualquier petición, y cada reintento manda los mismos dos. La API trata el lote como idempotente por usuario y acción, aplica las acciones en orden, y cuando dos dispositivos no coinciden gana el cambio posterior y el conflicto queda en la bitácora en vez de esconderse.",
                "**La foto va primero.** Se achica en el teléfono a unos cientos de kilobytes antes que nada, se guarda junto a la entrega en cola y sube antes de que se mande la entrega. Su tiempo de espera crece con su tamaño, así que una conexión lenta tiene una oportunidad justa en vez de un corte fijo.",
                "**El mapa nunca se queda en blanco.** Con llave y señal, los mapas son Mapbox GL con sus edificios en 3D; sin ellas, MapLibre dibuja la misma pantalla desde un archivo de teselas de Managua que viaja dentro de la app, pintado con los mismos tokens de diseño.",
                "**Un push es un atajo, nunca la verdad.** Cada cambio de estado escribe sus avisos en una bandeja de salida en la misma transacción, así que un cambio revertido nunca manda uno. Las apps siguen consultando, solo que cuatro veces más espaciado cuando tienen permiso de push.",
              ],
            },
          },
          {
            type: "p",
            text: {
              en: "On iOS and Android the position keeps reporting with the app in the background, through a Swift plugin and an Android foreground service, each written for this project and reporting under a token that is only valid for the current trip.",
              es: "En iOS y Android la posición sigue reportándose con la app en segundo plano, a través de un plugin en Swift y un servicio en primer plano de Android, escritos para este proyecto y reportando con un token que solo vale para el recorrido en curso.",
            },
          },
          {
            type: "clip",
            src: "/work/bidali/tracking",
            width: 1512,
            height: 806,
            alt: {
              en: "Screen recording of the public tracking page: typing the order code and the phone number, then the order's status over the map with the courier's position",
              es: "Grabación de pantalla de la página pública de rastreo: escribir el código del pedido y el teléfono, y después el estado del pedido sobre el mapa con la posición del repartidor",
            },
            caption: {
              en: "The customer's side: a code and a phone number, then the map.",
              es: "El lado del cliente: un código y un teléfono, y después el mapa.",
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
              en: "One API, one front end, three platforms. The front end is a single SvelteKit app compiled as a static SPA: in the browser it is served from Firebase Hosting, and on iOS and Android the same build ships inside a Tauri shell with native plugins for what the web cannot do. Everything that runs on a server is in Google Cloud, declared in Terraform.",
              es: "Una API, un front end, tres plataformas. El front end es una sola app en SvelteKit compilada como SPA estática: en el navegador se sirve desde Firebase Hosting, y en iOS y Android el mismo build viaja dentro de un cascarón de Tauri con plugins nativos para lo que la web no puede hacer. Todo lo que corre en un servidor está en Google Cloud, declarado en Terraform.",
            },
          },
          {
            type: "diagram",
            tiers: [
              {
                label: {
                  en: "Clients · one SvelteKit codebase",
                  es: "Clientes · un solo código SvelteKit",
                },
                boxes: [
                  {
                    name: "Web · Firebase Hosting",
                    note: {
                      en: "Static SPA for businesses, couriers, admin, public tracking and the legal pages.",
                      es: "SPA estática para negocios, repartidores, administración, rastreo público y páginas legales.",
                    },
                  },
                  {
                    name: "iOS · Tauri",
                    note: {
                      en: "Same build in a native shell; Swift plugins for background location and push.",
                      es: "El mismo build en un cascarón nativo; plugins en Swift para ubicación en segundo plano y push.",
                    },
                  },
                  {
                    name: "Android · Tauri",
                    note: {
                      en: "Same build; a foreground service for location and Firebase Messaging.",
                      es: "El mismo build; un servicio en primer plano para la ubicación y Firebase Messaging.",
                    },
                  },
                ],
              },
              {
                label: {
                  en: "Google Cloud · all of it in Terraform",
                  es: "Google Cloud · todo en Terraform",
                },
                chain: {
                  label: {
                    en: "Compute Engine VM · Docker Compose",
                    es: "VM de Compute Engine · Docker Compose",
                  },
                  boxes: [
                    {
                      name: "Caddy",
                      note: {
                        en: "TLS and the only ports open to the internet.",
                        es: "TLS y los únicos puertos abiertos a internet.",
                      },
                    },
                    {
                      name: "API · Rust · Axum",
                      note: {
                        en: "The modular monolith and its background jobs: push outbox, exchange rate, batches.",
                        es: "El monolito modular y sus tareas de fondo: bandeja de push, tasa de cambio, lotes.",
                      },
                    },
                    {
                      name: "PostgreSQL · PostGIS",
                      note: {
                        en: "On a persistent disk that outlives the VM; the pool's geography lives here.",
                        es: "En un disco persistente que sobrevive a la VM; la geografía del pool vive aquí.",
                      },
                    },
                  ],
                },
                boxes: [
                  {
                    name: "Firebase Auth · Cloud Messaging",
                    note: {
                      en: "Sign-in with Google and email; the API verifies the ID tokens itself. Push to the three platforms.",
                      es: "Acceso con Google y correo; la API verifica los ID tokens por su cuenta. Push a las tres plataformas.",
                    },
                  },
                  {
                    name: "Cloud Storage",
                    note: {
                      en: "A daily logical backup of the database, written by a timer the VM cannot read back or delete.",
                      es: "Una copia lógica diaria de la base, escrita por un temporizador que la VM no puede leer ni borrar.",
                    },
                  },
                  {
                    name: "Artifact Registry · IAP",
                    note: {
                      en: "The API image, pinned by digest; SSH only through Identity-Aware Proxy.",
                      es: "La imagen de la API, fijada por digest; SSH solo a través de Identity-Aware Proxy.",
                    },
                  },
                ],
              },
              {
                label: {
                  en: "Outside Google Cloud",
                  es: "Fuera de Google Cloud",
                },
                boxes: [
                  {
                    name: "Mapbox",
                    note: {
                      en: "Directions and Optimization for the courier's route; nothing it returns is stored.",
                      es: "Directions y Optimization para la ruta del repartidor; nada de lo que devuelve se guarda.",
                    },
                  },
                  {
                    name: "Bunny Storage · CDN",
                    note: {
                      en: "Delivery photos and courier documents, bytes checked against their declared type.",
                      es: "Fotos de entrega y documentos del repartidor, con los bytes verificados contra su tipo declarado.",
                    },
                  },
                  {
                    name: "Banco Central de Nicaragua",
                    note: {
                      en: "The daily córdoba-dollar rate, refreshed in the background from its SOAP service.",
                      es: "La tasa diaria córdoba-dólar, refrescada en segundo plano desde su servicio SOAP.",
                    },
                  },
                ],
              },
            ],
            links: {
              en: [
                "HTTPS · JSON, with a Firebase ID token on every request",
                "Called by the API, never by the apps",
              ],
              es: [
                "HTTPS · JSON, con un ID token de Firebase en cada petición",
                "Lo llama la API, nunca las apps",
              ],
            },
            alt: {
              en: "Architecture map of Bidali: three clients built from one SvelteKit codebase (web on Firebase Hosting, iOS and Android through Tauri) call over HTTPS a Compute Engine VM in Google Cloud running Caddy, the Rust and Axum API and PostgreSQL with PostGIS, beside Firebase Auth and Cloud Messaging, Cloud Storage for backups and Artifact Registry; the API alone calls Mapbox, Bunny Storage and the Central Bank of Nicaragua",
              es: "Mapa de arquitectura de Bidali: tres clientes hechos de un solo código SvelteKit (web en Firebase Hosting, iOS y Android a través de Tauri) llaman por HTTPS a una VM de Compute Engine en Google Cloud que corre Caddy, la API en Rust y Axum y PostgreSQL con PostGIS, junto a Firebase Auth y Cloud Messaging, Cloud Storage para copias y Artifact Registry; solo la API llama a Mapbox, Bunny Storage y el Banco Central de Nicaragua",
            },
            caption: {
              en: "The map. Top to bottom is the way a request travels; the apps only ever talk to Firebase and to the API.",
              es: "El mapa. De arriba abajo es el camino de una petición; las apps solo hablan con Firebase y con la API.",
            },
          },
          {
            type: "p",
            text: {
              en: "**The API is a modular monolith in Rust**, cut by business capability rather than by technical layer: orders, couriers, incidents, memberships, sync, audit, admin and so on, each slice owning its routes, its types, its logic and its SQL, over a kernel that knows how to verify a token or talk to PostGIS but never what an owner may do. Every route is registered together with its OpenAPI documentation, so an endpoint cannot be missing from the spec without the build noticing.",
              es: "**La API es un monolito modular en Rust**, cortado por capacidad de negocio y no por capa técnica: pedidos, repartidores, incidentes, membresías, sincronización, bitácora, administración y demás, cada rebanada dueña de sus rutas, sus tipos, su lógica y su SQL, sobre un kernel que sabe verificar un token o hablar con PostGIS pero nunca qué puede hacer un dueño. Cada ruta se registra junto con su documentación OpenAPI, así que un endpoint no puede faltar en el spec sin que el build lo note.",
            },
          },
          {
            type: "p",
            text: {
              en: "**Identity is Firebase's, authorisation is the API's.** The apps sign in with Firebase and send its ID token; the API verifies the signature against Google's keys, creates the user on first sight and then decides everything else itself. Which business a request is about comes from the path, never from the token, and five typed guards resolve who is calling: a bare token, a user, a member of this business, a courier, a platform admin. Each returns the same opaque answer to anyone who does not qualify.",
              es: "**La identidad es de Firebase; la autorización, de la API.** Las apps entran con Firebase y mandan su ID token; la API verifica la firma contra las llaves de Google, crea al usuario la primera vez que lo ve y de ahí en adelante decide todo lo demás por su cuenta. De qué negocio trata una petición sale del path, nunca del token, y cinco guardas tipadas resuelven quién llama: un token suelto, un usuario, un miembro de este negocio, un repartidor, un administrador de la plataforma. Cada una devuelve la misma respuesta opaca a quien no califica.",
            },
          },
          {
            type: "p",
            text: {
              en: "**The cloud is sized for a pilot and written to grow.** One small VM in Google Cloud runs three containers behind Caddy, with the database on its own persistent disk, a daily dump to Cloud Storage and a deploy script that refuses to update without a fresh backup. Only HTTPS is open; administration goes through Identity-Aware Proxy. The Terraform has its own tests against a mock provider, so the firewall, the deletion protections and the cost defaults are checked before any real account is touched. When the load justifies it, the database moves to Cloud SQL without the API noticing.",
              es: "**La nube está dimensionada para un piloto y escrita para crecer.** Una VM pequeña en Google Cloud corre tres contenedores detrás de Caddy, con la base en su propio disco persistente, un volcado diario a Cloud Storage y un script de despliegue que se niega a actualizar sin una copia fresca. Solo HTTPS está abierto; la administración pasa por Identity-Aware Proxy. El Terraform tiene sus propias pruebas contra un proveedor simulado, así que el firewall, las protecciones contra borrado y los costos por defecto se comprueban antes de tocar una cuenta real. Cuando la carga lo justifique, la base pasa a Cloud SQL sin que la API se entere.",
            },
          },
          {
            type: "sheet",
            rows: [
              {
                name: "Rust · Axum · SeaORM",
                why: {
                  en: "The API: around eighty routes, a typed state machine, migrations in the same workspace, rate limits per IP in three buckets and Swagger UI generated from the code.",
                  es: "La API: unas ochenta rutas, una máquina de estados tipada, migraciones en el mismo workspace, límites por IP en tres cubetas y Swagger UI generado desde el código.",
                },
              },
              {
                name: "PostgreSQL · PostGIS",
                why: {
                  en: "Orders, trips, positions and the audit log. The pool is a radius query over the couriers' last fresh position; money is decimal, never float.",
                  es: "Pedidos, recorridos, posiciones y la bitácora. El pool es una consulta por radio sobre la última posición fresca de los repartidores; el dinero es decimal, nunca float.",
                },
              },
              {
                name: "SvelteKit 5 · TanStack Query",
                why: {
                  en: "One static SPA with runes for local state and TanStack Query for the server's; forms validated with Zod on both sides and shadcn-svelte primitives for the UI.",
                  es: "Una sola SPA estática con runes para el estado local y TanStack Query para el del servidor; formularios validados con Zod en ambos lados y primitivas de shadcn-svelte para la interfaz.",
                },
              },
              {
                name: "Tauri 2 · Swift · Kotlin",
                why: {
                  en: "The native shells for iOS and Android, with three plugins written for the project: background location, push messaging and turn-by-turn navigation hand-off.",
                  es: "Los cascarones nativos de iOS y Android, con tres plugins escritos para el proyecto: ubicación en segundo plano, mensajería push y entrega de la navegación paso a paso.",
                },
              },
              {
                name: "Firebase",
                why: {
                  en: "Auth for sign-in on the three platforms, Cloud Messaging for push and Hosting for the web build, with a content security policy that allows exactly the hashes SvelteKit emits.",
                  es: "Auth para el acceso en las tres plataformas, Cloud Messaging para push y Hosting para el build web, con una política de seguridad de contenido que permite exactamente los hashes que emite SvelteKit.",
                },
              },
              {
                name: "Mapbox · MapLibre · Protomaps",
                why: {
                  en: "Mapbox for routes and the online map, MapLibre over an embedded Protomaps tile file of Managua for the offline one, both painted from the same tokens.",
                  es: "Mapbox para las rutas y el mapa en línea, MapLibre sobre un archivo de teselas de Protomaps de Managua para el mapa sin conexión, los dos pintados desde los mismos tokens.",
                },
              },
              {
                name: "Dexie · IndexedDB",
                why: {
                  en: "The offline queue, one per account on the device, and the draft of an order the business was writing when the app closed.",
                  es: "La cola sin conexión, una por cuenta en el dispositivo, y el borrador del pedido que el negocio estaba escribiendo cuando se cerró la app.",
                },
              },
              {
                name: "Google Cloud · Terraform · Docker",
                why: {
                  en: "Compute Engine, Cloud Storage, Artifact Registry and Firebase Hosting as code, in four Terraform roots with their own tests; Compose for the VM and for the local stack.",
                  es: "Compute Engine, Cloud Storage, Artifact Registry y Firebase Hosting como código, en cuatro raíces de Terraform con sus propias pruebas; Compose para la VM y para el stack local.",
                },
              },
              {
                name: "Bunny Storage",
                why: {
                  en: "Object storage and CDN for photos and documents, behind a storage trait with a local implementation for development.",
                  es: "Almacenamiento de objetos y CDN para fotos y documentos, detrás de un trait de almacenamiento con una implementación local para desarrollo.",
                },
              },
            ],
          },
        ],
      },
      {
        heading: {
          en: "How it is kept honest",
          es: "Cómo se mantiene honesto",
        },
        blocks: [
          {
            type: "p",
            text: {
              en: "A delivery platform fails in the details: a payment counted twice, an order taken by two couriers, a delivery recorded without a photo. So the tests are less about coverage than about promises.",
              es: "Una plataforma de entregas falla en los detalles: un abono contado dos veces, un pedido tomado por dos repartidores, una entrega registrada sin foto. Así que las pruebas van menos de cobertura que de promesas.",
            },
          },
          {
            type: "list",
            items: {
              en: [
                "**Every change starts as a spec.** Both repositories use OpenSpec: a change is a written proposal with requirements, decisions and the alternatives that lost, and the tasks are checked off against it before the pull request. The specs are the documentation that stays true.",
                "**The API is tested at four layers.** Unit tests next to the code, integration tests against a real PostGIS in Docker, end-to-end tests over the real router on a socket, and architecture sweeps that read the source as text and fail the build if a rule is broken: one writer for each terminal state, no handler composing its own queries, every transition through the pure function.",
                "**The front end is tested as a product.** Around a thousand unit and component tests, a few hundred Playwright flows with the backend and Firebase simulated, full-stack runs against the real API for the offline paths, mutation testing to check that the tests would notice, and a check that no string of the interface escapes the translation files.",
                "**Nothing merges without the hooks.** Formatting, linting, type checks and the unit suites run locally on every commit, with the same jobs in CI.",
              ],
              es: [
                "**Cada cambio empieza como un spec.** Los dos repositorios usan OpenSpec: un cambio es una propuesta escrita con requisitos, decisiones y las alternativas que perdieron, y las tareas se tachan contra ella antes del pull request. Los specs son la documentación que sigue siendo cierta.",
                "**La API se prueba en cuatro capas.** Pruebas unitarias junto al código, de integración contra un PostGIS real en Docker, de punta a punta sobre el router real en un socket, y barridos de arquitectura que leen el código como texto y hacen fallar el build si se rompe una regla: un solo escritor por cada estado terminal, ningún handler armando sus propias consultas, toda transición por la función pura.",
                "**El front end se prueba como producto.** Alrededor de mil pruebas unitarias y de componente, unos cientos de flujos en Playwright con el backend y Firebase simulados, corridas full-stack contra la API real para los caminos sin conexión, pruebas de mutación para comprobar que las pruebas se darían cuenta, y una comprobación de que ningún texto de la interfaz se escapa de los archivos de traducción.",
                "**Nada entra sin los hooks.** Formato, lint, tipos y las suites unitarias corren en local en cada commit, con los mismos trabajos en CI.",
              ],
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
                "**Put the invariant in one place and guard it with a test that reads the code.** The order's state machine is a pure function, and a sweep over the source makes sure nobody writes around it. That is cheaper than a hexagonal architecture and catches the same mistakes.",
                "**Offline is a requirement, not a feature.** Deciding at the start that a tap is sealed on the device, with its own identity and time, shaped the API's batches, the audit log and the photo pipeline. Bolting it on later would have meant redoing all three.",
                "**A provider's terms are part of the design.** Mapbox does not allow its routes to be stored, so the API never caches them: it waits a minimum time between requests for the same trip and merges requests that arrive together into one call. Reading the terms before writing the code avoided building a cache that would have had to come out.",
                "**One codebase for three platforms holds up if the native edge is thin.** Tauri gave the web app a phone body; what needed to be native, location in the background and push, became three small plugins instead of a second app.",
              ],
              es: [
                "**Poner el invariante en un solo lugar y cuidarlo con una prueba que lee el código.** La máquina de estados del pedido es una función pura, y un barrido sobre el código fuente se asegura de que nadie escriba por fuera. Es más barato que una arquitectura hexagonal y atrapa los mismos errores.",
                "**Sin conexión es un requisito, no una función.** Decidir desde el inicio que un toque se sella en el dispositivo, con su propia identidad y su hora, moldeó los lotes de la API, la bitácora y la tubería de fotos. Agregarlo después habría sido rehacer las tres.",
                "**Los términos de un proveedor son parte del diseño.** Mapbox no permite guardar sus rutas, así que la API nunca las cachea: espera un tiempo mínimo entre peticiones del mismo recorrido y junta las que llegan a la vez en una sola llamada. Leer los términos antes de escribir el código evitó construir un caché que después habría que sacar.",
                "**Un solo código para tres plataformas aguanta si el borde nativo es delgado.** Tauri le dio cuerpo de teléfono a la app web; lo que tenía que ser nativo, ubicación en segundo plano y push, se volvió tres plugins pequeños en vez de una segunda app.",
              ],
            },
          },
          {
            type: "p",
            text: {
              en: "Bidali is on its way to launch: the Google Cloud infrastructure is written and tested, the web build is ready for Firebase Hosting, iOS runs the whole flow in the simulator and Android has a signed build.",
              es: "Bidali va camino al lanzamiento: la infraestructura en Google Cloud está escrita y probada, el build web está listo para Firebase Hosting, iOS corre el flujo completo en el simulador y Android tiene un build firmado.",
            },
          },
        ],
      },
    ],
  },
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
            type: "clip",
            src: "/work/interview-agent/new-interview",
            width: 1512,
            height: 806,
            alt: {
              en: "Screen recording: from the home screen to the New interview form, with the job offer being typed in next to the CV upload box",
              es: "Grabación de pantalla: de la pantalla de inicio al formulario de nueva entrevista, con la oferta escribiéndose junto a la caja para subir el CV",
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
            type: "clip",
            src: "/work/interview-agent/results",
            width: 1512,
            height: 806,
            alt: {
              en: "Screen recording of an evaluated interview: the overview with its Limited role coverage note, the Improve your answers cards, the topics tab with one topic opened, and the transcript",
              es: "Grabación de pantalla de una entrevista evaluada: el resumen con su nota de cobertura limitada, las tarjetas de Mejora tus respuestas, la pestaña de temas con un tema abierto y la transcripción",
            },
            caption: {
              en: "A real session against an AI engineer offer: the overview and the rewrites, a topic with the quotes it rests on, and the transcript. Three essential requirements were never reached, so there is no overall score.",
              es: "Una sesión real con una oferta de ingeniero de IA: el resumen y las reescrituras, un tema con las citas en que se apoya y la transcripción. Tres requisitos esenciales no se tocaron, así que no hay nota global.",
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
        heading: { en: "What it's made of", es: "Con qué lo construí" },
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
    role: { en: "Designer and developer", es: "Diseñador y desarrollador" },
    published: "2026-10-27",
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
          es: "Con qué lo construí, y por qué",
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
      else if (block.type === "figure" || block.type === "clip")
        texts.push(block.caption[lang])
      else if (block.type === "diagram") {
        texts.push(block.caption[lang], ...block.links[lang])
        for (const tier of block.tiers)
          for (const box of [...(tier.chain?.boxes ?? []), ...tier.boxes])
            texts.push(box.name, box.note[lang])
      } else for (const row of block.rows) texts.push(row.name, row.why[lang])
    }
  }
  const words = texts.join(" ").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
