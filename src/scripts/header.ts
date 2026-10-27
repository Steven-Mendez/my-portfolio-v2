/**
 * The fixed top bar. Two jobs, both re-wired on every `astro:page-load` and
 * torn down on `astro:before-swap`:
 *
 * - Docking: past the first few pixels of scroll the bar gets
 *   `data-docked` (compact, translucent ink ground, hairline). A passive,
 *   rAF-throttled scroll listener keeps it in step, and it is evaluated once
 *   at init so a reload mid-page or a `/#work` deep link is right at once.
 *   The docked height is published as `--header-h` on :root, which the
 *   smooth scroll (offset) and `scroll-margin-top` both read. The same
 *   pass samples what lies under the bar's bottom edge and sets
 *   `data-on-paper` over a `.tone-paper` section, so the docked bar takes
 *   the section's tone instead of laying an ink band over the paper.
 * - Active section: an IntersectionObserver watching the sections linked
 *   from the bar and the index panel marks the one crossing the
 *   upper-middle of the viewport with `aria-current="true"` on every link to
 *   it, and writes its number and label into the chapter button (below lg).
 *   The hero (or anything unlinked) is "none": the button then reads
 *   "— INDEX". At the very end of the page the last section stays marked.
 * - Index panel: a native popover. Choosing a section closes it before the
 *   scroll; it takes the bar's tone (ink or paper) when it opens.
 */

const DOCK_AFTER = 80
// A thin band ~40% down the viewport: whichever section crosses it is "in view".
const ACTIVE_BAND = "-40% 0px -59% 0px"

let cleanup: (() => void) | undefined

function init() {
  cleanup?.()

  const header = document.querySelector<HTMLElement>("[data-site-header]")
  if (!header) return

  const root = document.documentElement
  const disposers: (() => void)[] = []

  // ── Docked height ───────────────────────────────────────────────────────
  // Measured from the content box so it is right whichever state the bar is
  // in (or mid-transition): content + docked padding × 2 + the 1px hairline.
  function publishHeight() {
    if (!header) return
    const style = getComputedStyle(header)
    const content =
      header.clientHeight -
      parseFloat(style.paddingTop) -
      parseFloat(style.paddingBottom)
    const pad = parseFloat(style.getPropertyValue("--header-pad-docked")) || 0
    // The custom property is in rem; convert with the root font size.
    const rem = parseFloat(getComputedStyle(root).fontSize) || 16
    const height = Math.round(content + pad * rem * 2 + 1)
    root.style.setProperty("--header-h", `${height}px`)
  }

  // ── Docking and tone ────────────────────────────────────────────────────
  // The tone is whatever sits just under the bar's bottom edge, mid-width.
  // Fixed overlays never sit there, so the hit is page content.
  const panel = header.querySelector<HTMLElement>("#section-index")
  const panelOpen = () => !!panel?.matches(":popover-open")

  function sampleTone() {
    if (!header) return
    // An open panel sits under the bar's edge; sampling would hit it.
    if (panelOpen()) return
    const bottom = header.getBoundingClientRect().bottom
    const under = document.elementFromPoint(window.innerWidth / 2, bottom + 1)
    header.toggleAttribute("data-on-paper", !!under?.closest(".tone-paper"))
  }

  let frame = 0
  let mark: (() => void) | undefined
  function update() {
    frame = 0
    header?.toggleAttribute("data-docked", window.scrollY > DOCK_AFTER)
    sampleTone()
    mark?.()
  }
  function onScroll() {
    if (!frame) frame = requestAnimationFrame(update)
  }
  function onResize() {
    publishHeight()
    onScroll()
  }

  // Docking animates the bar's height, so the edge moves for a moment after
  // the last scroll event: sample once more when that transition ends.
  function onTransitionEnd(event: TransitionEvent) {
    if (event.target === header) sampleTone()
  }

  update()
  publishHeight()
  addEventListener("scroll", onScroll, { passive: true })
  addEventListener("resize", onResize, { passive: true })
  header.addEventListener("transitionend", onTransitionEnd)
  disposers.push(() => {
    removeEventListener("scroll", onScroll)
    removeEventListener("resize", onResize)
    header.removeEventListener("transitionend", onTransitionEnd)
    if (frame) cancelAnimationFrame(frame)
  })

  // ── Active section ──────────────────────────────────────────────────────
  // The bar and the panel link the same ids, so each id maps to all its links.
  const links = new Map<string, HTMLAnchorElement[]>()
  for (const link of header.querySelectorAll<HTMLAnchorElement>(
    "a[data-nav-link]"
  )) {
    const id = decodeURIComponent(link.hash.slice(1))
    if (!id) continue
    const list = links.get(id)
    if (list) list.push(link)
    else links.set(id, [link])
  }

  const chapterIndex = header.querySelector<HTMLElement>("[data-chapter-index]")
  const chapterLabel = header.querySelector<HTMLElement>("[data-chapter-label]")
  // The server-rendered label ("Index"), for when no section is in view.
  const idleLabel = chapterLabel?.textContent ?? ""

  function writeChapter(id: string | undefined) {
    const link = id ? links.get(id)?.find((a) => panel?.contains(a)) : undefined
    const label = link?.querySelector(".panel-label")?.textContent?.trim()
    if (chapterIndex) chapterIndex.textContent = link?.dataset.index ?? "—"
    if (chapterLabel) chapterLabel.textContent = label ?? idleLabel
  }

  const targets = [...links.keys()]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null)

  if (targets.length > 0 && "IntersectionObserver" in window) {
    const inView = new Set<string>()

    const markActive = () => {
      // Document order, last one wins at a boundary (the incoming section).
      // Scrolled to the very end (the footer), the last section stays lit.
      const atEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      const active = (
        targets.filter((el) => inView.has(el.id)).at(-1) ??
        (atEnd ? targets.at(-1) : undefined)
      )?.id
      for (const [id, list] of links) {
        for (const link of list) {
          if (id === active) link.setAttribute("aria-current", "true")
          else link.removeAttribute("aria-current")
        }
      }
      writeChapter(active)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id)
          else inView.delete(entry.target.id)
        }
        markActive()
      },
      { rootMargin: ACTIVE_BAND }
    )
    for (const target of targets) observer.observe(target)
    mark = markActive

    disposers.push(() => {
      observer.disconnect()
      for (const list of links.values())
        for (const link of list) link.removeAttribute("aria-current")
      writeChapter(undefined)
    })
  }

  // ── Index panel ─────────────────────────────────────────────────────────
  if (panel) {
    // Close on a section pick. The smooth scroll (scroll.ts) focuses the
    // section when it lands, after the popover has handed focus back to its
    // button. When scroll.ts stands aside (reduced motion), the browser
    // jumps natively, so focus the section here once the jump is done.
    const onPanelClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.(
        "a[data-nav-link]"
      )
      if (!(link instanceof HTMLAnchorElement)) return
      if (panelOpen()) panel.hidePopover()
      const target = document.getElementById(
        decodeURIComponent(link.hash.slice(1))
      )
      if (!target) return
      // Checked after the event has finished bubbling: scroll.ts listens on
      // document, so only now does defaultPrevented say it took the link.
      setTimeout(() => {
        if (event.defaultPrevented) return
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1")
          target.addEventListener(
            "blur",
            () => target.removeAttribute("tabindex"),
            { once: true }
          )
        }
        target.focus({ preventScroll: true })
      })
    }

    // Opening: take the tone of the section under the bar.
    const onToggle = (event: Event) => {
      if ((event as ToggleEvent).newState !== "open") return
      panel.classList.toggle("tone-paper", header.hasAttribute("data-on-paper"))
    }

    panel.addEventListener("click", onPanelClick)
    panel.addEventListener("toggle", onToggle)
    disposers.push(() => {
      panel.removeEventListener("click", onPanelClick)
      panel.removeEventListener("toggle", onToggle)
      if (panelOpen()) panel.hidePopover()
    })
  }

  cleanup = () => {
    for (const dispose of disposers) dispose()
    cleanup = undefined
  }
}

document.addEventListener("astro:page-load", init)
document.addEventListener("astro:before-swap", () => cleanup?.())
