"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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
      <nav className="font-space fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 h-16 bg-zinc-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_24px_48px_-12px_rgba(176,198,255,0.05)] transition-all">
        <div className="font-bold tracking-tighter text-blue-400">STEVEN_MENDEZ</div>

        <div className="hidden md:flex gap-8 items-center">
          <a className="uppercase tracking-widest text-xs text-zinc-400 hover:text-white transition-colors duration-300" href="#experience">EXPERIENCE</a>
          <a className="uppercase tracking-widest text-xs text-zinc-400 hover:text-white transition-colors duration-300" href="#projects">PROJECTS</a>
          <a className="uppercase tracking-widest text-xs text-zinc-400 hover:text-white transition-colors duration-300" href="#about">ABOUT</a>
        </div>
        
        <a 
          href="mailto:hello@stevenmendez.dev"
          className="hidden md:block bg-transparent border border-white/20 text-zinc-300 px-6 py-2 text-[10px] tracking-[0.2em] font-bold hover:text-white hover:border-white/50 hover:bg-white/5 transition-all"
        >
          CONTACT
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex items-center text-zinc-400 hover:text-white focus:outline-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-sidebar"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
          >
            <div className="flex items-center justify-between">
              <span className="font-bold tracking-tighter text-blue-400">SM</span>
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors" onClick={close} aria-label="Close menu">
                <X size={18} />
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {['Experience', 'Projects', 'About'].map((item) => (
                <li key={item}>
                  <a className="block p-3 rounded-lg text-[#d2dcff]/75 text-lg font-medium tracking-wide hover:text-white hover:bg-white/10 transition-colors" href={`#${item.toLowerCase()}`} onClick={close}>
                    {item.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
               <a 
                  href="mailto:hello@stevenmendez.dev"
                  onClick={close}
                  className="block text-center bg-transparent border border-white/20 text-zinc-300 px-6 py-3 text-xs tracking-[0.2em] font-bold hover:text-white hover:border-white/50 hover:bg-white/5 transition-all rounded-lg"
                >
                  CONTACT
                </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
