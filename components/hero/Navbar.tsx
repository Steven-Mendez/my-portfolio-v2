"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { portfolioData } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Move focus into the dialog on open; restore it to the burger on close.
  useEffect(() => {
    if (menuOpen) {
      closeRef.current?.focus()
      wasOpen.current = true
    } else if (wasOpen.current) {
      burgerRef.current?.focus()
      wasOpen.current = false
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 h-16 bg-[#080b18]/78 backdrop-blur-xl border-b border-white/10 shadow-[0_24px_48px_-12px_rgba(176,198,255,0.05)] transition-all">
        {/* Content rides the hero's max-w-7xl px-6 md:px-12 rail so the brand and
            CTAs line up with the hero/section edges; the bar background stays full-bleed. */}
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-12">
          <a href="/#hero" className="font-mono font-bold tracking-tight text-accent-blue rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{portfolioData.profile.fullName.toUpperCase().replace(' ', '_')}</a>

          <div className="hidden md:flex gap-8 items-center">
            <a className="font-mono uppercase tracking-[0.18em] text-xs text-zinc-200 hover:text-white transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="/#projects">PROJECTS</a>
            <a className="font-mono uppercase tracking-[0.18em] text-xs text-zinc-200 hover:text-white transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="/#experience">EXPERIENCE</a>
            <a className="font-mono uppercase tracking-[0.18em] text-xs text-zinc-200 hover:text-white transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="/#about">ABOUT</a>
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
            ref={burgerRef}
            className="md:hidden flex items-center text-zinc-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-sidebar"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile sidebar ── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[140] bg-[#04020c]/55 backdrop-blur-sm animate-in fade-in"
            aria-hidden
            onClick={close}
          />
          <div
            id="mobile-sidebar"
            className="font-space fixed top-0 right-0 z-[150] w-[min(80vw,300px)] h-[100dvh] bg-gradient-to-br from-[#0a0718]/95 to-[#060410]/95 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] border-l border-white/10 p-6 flex flex-col gap-10 animate-in slide-in-from-right-full duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold tracking-tight text-accent-blue">{portfolioData.profile.firstName[0] + portfolioData.profile.lastName[0]}</span>
              <button type="button" ref={closeRef} className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={close} aria-label="Close menu">
                <X size={18} />
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {['Projects', 'Experience', 'About'].map((item) => (
                <li key={item}>
                  <a className="block p-3 rounded-lg text-[#d2dcff] text-lg font-medium tracking-wide hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href={`/#${item.toLowerCase()}`} onClick={close}>
                    {item.toUpperCase()}
                  </a>
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
        </>
      )}
    </>
  )
}
