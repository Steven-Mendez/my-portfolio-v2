import { Camera, Play } from "lucide-react";

import type { CaseMedia } from "@/lib/case-studies";

/** An empty, deliberately-styled media slot. Renders where a real screenshot or
 *  clip will go, carrying its description so the layout is final and the asset
 *  can be dropped in later without touching anything else. A dashed border and
 *  centred prompt make it read as a placeholder, not a broken image. */
export default function PlaceholderFrame({ media }: { media: CaseMedia }) {
  const isVideo = !!media.video;

  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/15 bg-[#0b0e18]/80 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.8)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(124,152,255,0.12),transparent_60%)]"
        />
        <div className="relative flex aspect-[16/10] flex-col items-center justify-center gap-4 px-6 py-8 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-white/[0.06] text-[#bcc8ff] ring-1 ring-white/10">
            {isVideo ? (
              <Play className="size-5 translate-x-0.5 fill-current" />
            ) : (
              <Camera className="size-5" />
            )}
          </span>
          {media.description && (
            <p className="max-w-[54ch] text-sm leading-relaxed text-fg-secondary">
              {media.description}
            </p>
          )}
        </div>

        <span className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-md bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#bcc8ff] backdrop-blur-sm">
            {media.kind}
          </span>
          {media.optional && (
            <span className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint backdrop-blur-sm">
              optional
            </span>
          )}
        </span>
      </div>

      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        Placeholder — drop a real {isVideo ? "video" : "image"} here
      </figcaption>
    </figure>
  );
}
