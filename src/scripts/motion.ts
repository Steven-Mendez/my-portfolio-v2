/**
 * The motion layer. Everything here is progressive enhancement: without JS,
 * or with `prefers-reduced-motion`, the page renders its final state and
 * nothing moves. Runs on every `astro:page-load` (first paint and after each
 * view transition) and is torn down on `astro:before-swap`.
 *
 * Hooks, by attribute:
 *   data-reveal="up|items|rows|lines"  scroll reveal (once)
 *   data-build[="right|ticks"]         a piece of a `rows` row, built in order:
 *                                      rises, slides from the right, or (ticks)
 *                                      staggers its children and their `--tick`
 *   data-section-*                     section header (kicker, label, index,
 *                                      title, intro), built as it enters; its
 *                                      `.section-watermark` also drifts (scrub)
 *   data-draw                          rule drawn on scroll (scrub)
 *   data-parallax="<yPercent>"         scrubbed vertical parallax
 *   data-hero-*                        hero intro + scroll + cursor
 *   data-progress                      the red reading line on top
 *   data-footer-mark                   the watermark slide
 */
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

const EASE = "power3.out"
// One tempo for the whole page (seconds): pieces of a row or kicker, blocks
// of text, display titles, drawn hairlines, then the slow plates (hero lines,
// portrait, watermark).
const DUR = {
  piece: 0.7,
  block: 0.9,
  title: 1.0,
  rule: 1.2,
  plate: 1.4,
} as const
const EXPO = "expo.out"
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")

let ctx: gsap.Context | undefined

function q<T extends Element = HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector)
}

function qa<T extends Element = HTMLElement>(selector: string): T[] {
  return Array.from(document.querySelectorAll<T>(selector))
}

/* ---------------------------------------------------------------- hero -- */

function hero() {
  const root = q(".hero")
  if (!root) return

  const portraitBox = q("[data-hero-portrait]")
  const still = qa("[data-hero-portrait] img")
  const first = q("[data-hero-name-first]")
  const last = q("[data-hero-name-last]")
  const role = q("[data-hero-role]")
  const fades = qa("[data-hero-fade]")
  const lines = qa<SVGLineElement>(".hero-grid-lines line")
  const marks = q(".hero-grid-marks")

  // The inline fallback in BaseLayout already showed the text (fonts took
  // longer than its timeout): don't hide it again to replay the intro.
  const shown = document.documentElement.classList.contains("motion-ready")

  // Intro: the field, then the portrait, then the name letter by letter.
  const intro = gsap.timeline({ defaults: { ease: EASE } })

  // Scale only, never opacity: the portrait is the LCP and paints on frame one.
  intro.from(still, { scale: 1.04, duration: DUR.plate, ease: "power2.out" }, 0)

  for (const line of lines) {
    const length = line.getTotalLength()
    intro.fromTo(
      line,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: DUR.plate, ease: "power2.inOut" },
      0.2
    )
  }

  const title = q("#hero-title")
  if (title && !title.hasAttribute("aria-label")) {
    title.setAttribute("aria-label", title.textContent?.trim() ?? "")
  }

  for (const [i, part] of [first, last].entries()) {
    if (!part || shown) continue
    const split = SplitText.create(part, {
      type: "chars",
      charsClass: "hero-char",
      aria: "hidden",
    })
    intro.from(
      split.chars,
      {
        yPercent: 55,
        opacity: 0,
        duration: DUR.title,
        stagger: { each: 0.035, from: i ? "end" : "start" },
      },
      0.35 + i * 0.12
    )
  }

  if (role && !shown)
    intro.from(role, { y: 16, opacity: 0, duration: DUR.piece }, 0.6)
  if (fades.length && !shown)
    intro.from(
      fades,
      { y: 10, opacity: 0, duration: DUR.piece, stagger: 0.06 },
      0.7
    )

  // Scroll: the portrait sinks slower than the page, the name opens up.
  const scrub = {
    trigger: root,
    start: "top top",
    end: "bottom top",
    scrub: true,
  }
  // The portrait is centred with the CSS `translate` property, which GSAP
  // would discard on its first transform write; tween its variables instead.
  if (portraitBox)
    gsap.to(portraitBox, {
      "--hero-sy": "18%",
      ease: "none",
      scrollTrigger: scrub,
    })
  if (first)
    gsap.to(first, { xPercent: -3, ease: "none", scrollTrigger: scrub })
  if (last) gsap.to(last, { xPercent: 3, ease: "none", scrollTrigger: scrub })
  // Role and meta also fade in with the intro, so their scrub tweens get
  // explicit start values: a plain `to` would record the intro's opacity 0
  // as its own start and pin them invisible after the first scroll.
  if (role)
    gsap.fromTo(
      role,
      { y: 0, opacity: 1 },
      {
        y: 60,
        opacity: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { ...scrub, end: "60% top" },
      }
    )
  if (fades.length)
    gsap.fromTo(
      fades,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { ...scrub, end: "40% top" },
      }
    )

  // Cursor: a touch of depth. Portrait and marks drift in opposite directions.
  if (finePointer.matches && portraitBox) {
    const px = gsap.quickTo(portraitBox, "--hero-dx", {
      duration: 1.4,
      ease: "power3",
    })
    const py = gsap.quickTo(portraitBox, "--hero-dy", {
      duration: 1.4,
      ease: "power3",
    })
    const mx = marks
      ? gsap.quickTo(marks, "x", { duration: 1.8, ease: "power3" })
      : null
    const my = marks
      ? gsap.quickTo(marks, "y", { duration: 1.8, ease: "power3" })
      : null

    const onMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5
      const ny = event.clientY / window.innerHeight - 0.5
      px(nx * 14)
      py(ny * 10)
      mx?.(nx * -8)
      my?.(ny * -6)
    }
    root.addEventListener("pointermove", onMove, { passive: true })
    ctx?.add(() => () => root.removeEventListener("pointermove", onMove))
  }

  // The intro now owns the hero text (its `from` states are applied), so
  // lift the pre-hide set by the inline script in BaseLayout.
  document.documentElement.classList.add("motion-ready")
}

/* ------------------------------------------------------------- reveals -- */

const ONCE = (trigger: Element, start = "top 88%") => ({
  trigger,
  start,
  once: true,
})

function reveals() {
  for (const el of qa("[data-reveal]")) {
    const kind = el.dataset.reveal || "up"
    const children = Array.from(el.children)

    switch (kind) {
      case "items":
        gsap.from(children, {
          y: 28,
          opacity: 0,
          duration: DUR.block,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: ONCE(el),
        })
        break

      case "rows":
        // Built per row as each one arrives, see `rows()`.
        break

      case "lines":
        // Masked lines sliding up. Re-splits on resize, so the mask always matches the wrap.
        SplitText.create(el, {
          type: "lines",
          aria: "none",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: DUR.block,
              ease: EASE,
              stagger: 0.09,
              scrollTrigger: ONCE(el),
            }),
        })
        break

      default:
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: DUR.block,
          ease: EASE,
          scrollTrigger: ONCE(el),
        })
    }
  }

  // Rules that draw while they cross the viewport (the booklet's red line).
  for (const el of qa("[data-draw]")) {
    gsap.from(el, {
      "--draw": 0,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top 45%",
        scrub: 0.6,
      },
    })
  }

  // Plates that move slower than the page.
  for (const el of qa("[data-parallax]")) {
    const amount = Number(el.dataset.parallax) || 10
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    )
  }
}

/* ------------------------------------------------------------ sections -- */

// One timeline per section header: kicker, then the title rising out of its
// mask, then the intro's lines. The red rule keeps its own scrub (data-draw).
function sectionHeads() {
  for (const head of qa(".section-head")) {
    const diamond = head.querySelector("[data-section-kicker] svg")
    const label = head.querySelector("[data-section-label]")
    const index = head.querySelector(
      "[data-section-kicker] [data-section-index]"
    )
    const line = head.querySelector("[data-section-line]")
    const note = head.querySelector("[data-section-note]")
    const title = head.querySelector<HTMLElement>("[data-section-title]")
    const intro = head.querySelector<HTMLElement>("[data-section-intro]")
    const mark = head.querySelector(".section-watermark")
    const start = "top 80%"

    const tl = gsap.timeline({
      defaults: { ease: EXPO },
      scrollTrigger: ONCE(head, start),
    })
    const done = { clearProps: "all" }

    if (diamond)
      tl.from(
        diamond,
        {
          scale: 0,
          rotate: -90,
          transformOrigin: "50% 50%",
          duration: DUR.piece,
          ...done,
        },
        0
      )
    if (label)
      tl.from(label, { x: -12, opacity: 0, duration: DUR.piece, ...done }, 0.08)
    if (index)
      tl.from(index, { x: 12, opacity: 0, duration: DUR.piece, ...done }, 0.12)
    // The kicker's hairline draws out, then its figure (roles, credentials) slides in.
    if (line)
      tl.from(
        line,
        { scaleX: 0, transformOrigin: "0 50%", duration: DUR.title, ...done },
        0.1
      )
    if (note)
      tl.from(note, { x: 12, opacity: 0, duration: DUR.piece, ...done }, 0.12)

    if (title) {
      const text = title.textContent?.trim() ?? ""
      // Short titles go letter by letter, long ones word by word.
      const byWord = text.includes(" ") && text.length > 10
      const split = SplitText.create(title, {
        type: byWord ? "words" : "words,chars",
        mask: byWord ? "words" : "chars",
        ...(byWord
          ? { wordsClass: "section-piece" }
          : { charsClass: "section-piece" }),
        // "auto": the h2 keeps its text as aria-label and only the pieces are
        // hidden. "hidden" would hide the heading itself until it is built.
        aria: "auto",
      })
      tl.from(
        byWord ? split.words : split.chars,
        {
          yPercent: 100,
          duration: DUR.title,
          stagger: byWord ? 0.08 : 0.03,
        },
        0.15
      )
      // Built: back to plain text, so nothing stays split or clipped.
      tl.call(() => split.revert())
    }

    // To its CSS opacity; only that is cleared, the drift below owns the transform.
    if (mark)
      tl.from(
        mark,
        { opacity: 0, duration: DUR.plate, ease: EASE, clearProps: "opacity" },
        0.2
      )

    if (intro) {
      // Its own tween, so a resize re-split can rebuild it (autoSplit).
      SplitText.create(intro, {
        type: "lines",
        aria: "none",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: DUR.block,
            ease: EASE,
            stagger: 0.08,
            delay: 0.3,
            scrollTrigger: ONCE(head, start),
          }),
      })
    }

    // The faint index drifts against the page over the whole section.
    if (mark)
      gsap.fromTo(
        mark,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: head.closest("section") ?? head,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
  }
}

// Ruled rows that build as each arrives: the hairline draws, then the row's
// `data-build` pieces come in, in reading order. Rows with no pieces rise as
// one. Rows entering together are staggered.
function rows() {
  const all = qa("[data-reveal='rows']").flatMap(
    (list) => Array.from(list.children) as HTMLElement[]
  )
  if (!all.length) return

  const builds = new Map<Element, gsap.core.Timeline>()

  for (const row of all) {
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: EASE, clearProps: "all" },
    })
    tl.from(row, { "--draw": 0, duration: DUR.rule, ease: "power2.inOut" }, 0)

    const pieces = Array.from(row.querySelectorAll<HTMLElement>("[data-build]"))
    if (!pieces.length) {
      tl.from(row, { y: 20, opacity: 0, duration: DUR.block }, 0)
    }

    let at = 0.1
    for (const piece of pieces) {
      const kind = piece.dataset.build
      if (kind === "ticks") {
        const items = Array.from(piece.children)
        tl.from(
          items,
          {
            y: 10,
            opacity: 0,
            "--tick": 0,
            duration: DUR.piece,
            stagger: 0.06,
          },
          at
        )
        at += items.length * 0.06
      } else if (kind === "right") {
        tl.from(piece, { x: 16, opacity: 0, duration: DUR.piece }, at)
        at += 0.06
      } else {
        tl.from(piece, { y: 14, opacity: 0, duration: DUR.piece }, at)
        at += 0.06
      }
    }
    builds.set(row, tl)
  }

  ScrollTrigger.batch(all, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      batch.forEach((row, i) =>
        builds
          .get(row)
          ?.delay(i * 0.08)
          .restart(true)
      ),
  })
}

/* -------------------------------------------------------------- chrome -- */

function chrome() {
  const progress = q("[data-progress]")
  if (progress) {
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
    })
  }

  const mark = q("[data-footer-mark]")
  if (mark) {
    gsap.fromTo(
      mark,
      { xPercent: 6 },
      {
        xPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: mark,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      }
    )
  }
}

/* ---------------------------------------------------------------- boot -- */

function init() {
  ctx?.revert()
  ctx = undefined
  if (reducedMotion.matches) {
    // Nothing will animate the hero text in, so never leave it pre-hidden.
    document.documentElement.classList.add("motion-ready")
    return
  }

  // Created first and filled after, so `ctx.add` works inside the builders.
  ctx = gsap.context(() => {})
  ctx.add(() => {
    hero()
    reveals()
    sectionHeads()
    rows()
    chrome()
  })
}

function teardown() {
  ctx?.revert()
  ctx = undefined
}

document.addEventListener("astro:page-load", () => {
  // Fonts first, so the name is split and the lines are measured on the real face.
  document.fonts.ready.then(init)
})
document.addEventListener("astro:before-swap", teardown)

// Reduced motion switched on or off with the page open: rebuild for the new
// preference. Reverting the context stops the scrubs and parallax and clears
// what they wrote (`--hero-sy`, `--draw`), so everything sits at its end state.
reducedMotion.addEventListener("change", () => {
  document.documentElement.classList.add("motion-ready")
  init()
  ScrollTrigger.refresh()
})
