import Navbar from "@/components/hero/Navbar";
import SiteBackground from "@/components/SiteBackground";
import {
  CaseCTA,
  CaseGallery,
  CaseHeader,
  CaseMetrics,
  CaseStory,
  MediaFrame,
} from "@/components/sections/case-study";
import type { CaseStudy } from "@/lib/case-studies";

/** Default case-study layout: shared chrome (background + navbar) wrapped around
 *  the reusable case-study blocks in their standard order. Each block is its own
 *  component under components/sections/case-study, so a project that needs a
 *  different shape can import and recompose them rather than fork this file. */
export default function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <main id="main" className="relative min-h-screen w-full overflow-x-hidden">
      {/* Same signature WebGL backdrop as home, so the page reads as one site. */}
      <SiteBackground />

      {/* Same top bar as home (shared component), so navigation feels identical. */}
      <Navbar />

      <div className="relative z-10">
        <CaseHeader study={study} />
        <CaseMetrics metrics={study.metrics} />
        {study.heroMedia && (
          <section className="mx-auto mt-12 max-w-7xl px-6 md:mt-16 md:px-12">
            <div className="mx-auto max-w-[680px]">
              <MediaFrame
                media={study.heroMedia}
                sizes="(min-width: 768px) 680px, 100vw"
              />
            </div>
          </section>
        )}
        <CaseStory sections={study.sections} />
        <CaseGallery items={study.gallery} />
        <CaseCTA />
      </div>
    </main>
  );
}
