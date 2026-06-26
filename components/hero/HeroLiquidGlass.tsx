"use client";

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { portfolioData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import HeroTerminal from "./HeroTerminal"

export default function HeroLiquidGlass() {
  const { profile } = portfolioData

  return (
    <section
      className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 pt-32 pb-16 sm:pt-40 sm:pb-20 md:min-h-[90vh] md:px-12 md:pt-44 md:pb-24"
      aria-labelledby="hero-title"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left — name, role kicker, lead, focused CTAs */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1
            id="hero-title"
            className="text-5xl font-bold leading-[0.9] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[6.5rem]"
          >
            {profile.firstName} <br /> <span className="text-white">{profile.lastName}</span>
          </h1>

          <Eyebrow className="mt-6 text-[13px] tracking-[0.22em]">{profile.role}</Eyebrow>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-fg-muted md:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <a href="#experience">
                VIEW EXPERIENCE
                <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/resume">Résumé</Link>
            </Button>
          </div>
        </div>

        {/* Right — live whoami terminal */}
        <div className="animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700">
          <HeroTerminal />
        </div>
      </div>
    </section>
  )
}
