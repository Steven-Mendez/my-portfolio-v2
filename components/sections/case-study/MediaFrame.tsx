import Image from "next/image";
import { Play } from "lucide-react";

import type { CaseMedia } from "@/lib/case-studies";

import PlaceholderFrame from "./PlaceholderFrame";

/** A framed media still — glass border, kind badge, optional play affordance,
 *  and a mono caption. Reused by the inline section figures and the gallery so
 *  every screenshot reads the same wherever a project drops one in. When the
 *  item is a placeholder (or has no src), it renders an empty styled slot
 *  instead of loading an image. */
export default function MediaFrame({ media, sizes }: { media: CaseMedia; sizes: string }) {
  if (media.placeholder || !media.src) {
    return <PlaceholderFrame media={media} />;
  }

  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e18] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.85)]">
        <div className="relative aspect-[16/10]">
          <Image
            src={media.src}
            alt={media.caption ?? ""}
            fill
            sizes={sizes}
            className="object-cover"
          />
          {/* Legibility wash so the badge/play affordance stay readable. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#06070c]/70 via-transparent to-[#06070c]/15"
          />
          <span className="absolute left-4 top-4 rounded-md bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#bcc8ff] backdrop-blur-sm">
            {media.kind}
          </span>
          {media.video && (
            <div aria-hidden className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg ring-1 ring-white/25">
                <Play className="size-5 translate-x-0.5 fill-current" />
              </span>
            </div>
          )}
        </div>
      </div>
      {media.caption && (
        <figcaption className="mt-3 font-mono text-xs leading-relaxed text-fg-muted">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
