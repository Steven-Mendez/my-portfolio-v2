import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { portfolioData } from "@/lib/data";

/** Closing call-to-action shared by every case study: a prompt to get in touch
 *  plus a route back to the work grid. */
export default function CaseCTA() {
  return (
    <section className="border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-12 md:py-28">
        <h2 className="text-3xl font-bold uppercase leading-[1] tracking-tight text-white md:text-5xl">
          Want the full story?
        </h2>
        <p className="mx-auto mt-5 max-w-[46ch] text-base text-fg-muted md:text-lg">
          Happy to walk through the architecture, the trade-offs, and the code.
          Let&apos;s talk.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href={`mailto:${portfolioData.profile.contactEmail}`}>Get in touch</a>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/#projects">
              Back to work
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
