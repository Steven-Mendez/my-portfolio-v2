"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { portfolioData } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Drive the native <dialog> imperatively from the handlers themselves (not a
  // state-sync effect): showModal() gives a real focus trap, Escape-to-close,
  // and focus restoration for free. menuOpen only feeds the burger's
  // aria-expanded + icon; onDialogClose mirrors native closes (Escape / backdrop)
  // back into state.
  const openMenu = () => {
    dialogRef.current?.showModal()
    document.body.style.overflow = "hidden" // modal dialogs don't lock page scroll
    setMenuOpen(true)
  }
  const close = () => dialogRef.current?.close()
  const onDialogClose = () => {
    document.body.style.overflow = ""
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 h-16 bg-[#080b18]/78 backdrop-blur-xl border-b border-white/10 shadow-[0_24px_48px_-12px_rgba(176,198,255,0.05)] transition-all">
        {/* Content rides the hero's max-w-7xl px-6 md:px-12 rail so the brand and
            CTAs line up with the hero/section edges; the bar background stays full-bleed. */}
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-12">
          <Link href="/#hero" className="font-mono font-bold tracking-tight text-accent-blue rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{portfolioData.profile.fullName.toUpperCase().replace(' ', '_')}</Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link className="font-mono uppercase tracking-[0.18em] text-xs text-zinc-200 hover:text-white transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="/#projects">PROJECTS</Link>
            <Link className="font-mono uppercase tracking-[0.18em] text-xs text-zinc-200 hover:text-white transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="/#experience">EXPERIENCE</Link>
            <Link className="font-mono uppercase tracking-[0.18em] text-xs text-zinc-200 hover:text-white transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="/#about">ABOUT</Link>
          </div>

          <div className="hidden md:flex items-center gap-2.5">
            <Button asChild variant="pill-link" size="sm">
              <Link href="/resume">
                Résumé
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
            <Button asChild size="sm">
              <a href={`mailto:${portfolioData.profile.contactEmail}`}>CONTACT</a>
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            className="md:hidden flex items-center text-zinc-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-sidebar"
            onClick={() => (menuOpen ? close() : openMenu())}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile sidebar: native modal <dialog>, focus-trapped by the browser.
          Slide-in / backdrop are styled in globals.css (#mobile-sidebar). ── */}
      {/* react-doctor-disable-next-line react-doctor/click-events-have-key-events, react-doctor/no-noninteractive-element-interactions -- native <dialog> dismisses via Esc (browser) + visible close button; onClick is mouse-only backdrop light-dismiss */}
      <dialog
        id="mobile-sidebar"
        ref={dialogRef}
        className="font-space fixed inset-auto top-0 right-0 z-[150] m-0 h-[100dvh] max-h-none w-[min(80vw,300px)] max-w-none border-l border-white/10 bg-gradient-to-br from-[#0a0718]/95 to-[#060410]/95 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
        aria-label="Mobile navigation"
        onClose={onDialogClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) close()
        }}
      >
        <div className="flex h-full flex-col gap-10 p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold tracking-tight text-accent-blue">{portfolioData.profile.firstName[0] + portfolioData.profile.lastName[0]}</span>
            <button type="button" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={close} aria-label="Close menu">
              <X size={18} />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {['Projects', 'Experience', 'About'].map((item) => (
              <li key={item}>
                <Link className="block p-3 rounded-lg text-[#d2dcff] text-lg font-medium tracking-wide hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href={`/#${item.toLowerCase()}`} onClick={close}>
                  {item.toUpperCase()}
                </Link>
              </li>
            ))}
            <li>
              <Link className="block p-3 rounded-lg text-[#d2dcff] text-lg font-medium tracking-wide hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="/resume" onClick={close}>
                RESUME
              </Link>
            </li>
          </ul>

          <div className="mt-auto">
            <Button asChild className="w-full">
              <a href={`mailto:${portfolioData.profile.contactEmail}`} onClick={close}>
                CONTACT
              </a>
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}
