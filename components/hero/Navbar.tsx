"use client"

import { useEffect, useState } from "react"
import GlassSurface from "@/components/hero/GlassSurface"
import styles from "./HeroLiquidGlass.module.css"

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

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
      <GlassSurface as="nav" className={styles.navShell} aria-label="Primary navigation">
        <span className={styles.brand}>SM</span>

        {/* Desktop links */}
        <ul className={styles.navList} aria-label="Site navigation">
          {navItems.map((item) => (
            <li key={item.href}>
              <a className={styles.navLink} href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          className={styles.burger}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-sidebar"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLine1Open : ""}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLine2Open : ""}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLine3Open : ""}`} />
        </button>
      </GlassSurface>

      {/* ── Mobile sidebar ── */}
      {menuOpen ? (
        <>
          <div
            className={styles.sidebarBackdrop}
            aria-hidden
            onClick={close}
          />
          <GlassSurface
            id="mobile-sidebar"
            className={styles.sidebar}
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
          >
            <div className={styles.sidebarHeader}>
              <span className={styles.brand}>SM</span>
              <button className={styles.sidebarClose} onClick={close} aria-label="Close menu">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M2 2L16 16M16 2L2 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <ul className={styles.sidebarList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className={styles.sidebarLink} href={item.href} onClick={close}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </GlassSurface>
        </>
      ) : null}
    </>
  )
}
