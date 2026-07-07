"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import { Dialog } from "radix-ui";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Click-to-zoom lightbox for project screenshots. Wraps a framed image (passed
// as children) in a dialog trigger and shows the same asset full-viewport with
// zoom controls — the same interaction the Mermaid diagram block ships, so
// every zoomable surface on a case study behaves identically.
const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.5;

const TOOL_BTN =
  "flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-fg-secondary transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:hover:bg-white/[0.04]";

export default function ImageLightbox({
  src,
  alt,
  title,
  children,
}: {
  src: string;
  alt: string;
  title: string;
  children: React.ReactNode;
}) {
  const [zoom, setZoom] = React.useState(1);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Dialog.Root onOpenChange={(open) => !open && setZoom(1)}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Zoom ${title}`}
          className="group relative block w-full cursor-zoom-in rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {children}
          <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#bcc8ff] opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="size-3" /> Zoom
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 z-50 bg-black/85 backdrop-blur-sm${
            reducedMotion
              ? ""
              : " data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          }`}
        />
        <Dialog.Content
          aria-describedby={undefined}
          className={`fixed left-1/2 top-1/2 z-50 flex h-[90vh] w-[94vw] max-w-[1400px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e18] shadow-2xl focus:outline-none${
            reducedMotion
              ? ""
              : " data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          }`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <Dialog.Title className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
              {title}
            </Dialog.Title>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={TOOL_BTN}
                aria-label="Zoom out"
                disabled={zoom <= ZOOM_MIN}
                onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))}
              >
                <Minus className="size-4" />
              </button>
              <span className="w-12 text-center font-mono text-xs text-fg-secondary">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                className={TOOL_BTN}
                aria-label="Zoom in"
                disabled={zoom >= ZOOM_MAX}
                onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))}
              >
                <Plus className="size-4" />
              </button>
              <button
                type="button"
                className={TOOL_BTN}
                aria-label="Reset zoom"
                disabled={zoom === 1}
                onClick={() => setZoom(1)}
              >
                <RotateCcw className="size-4" />
              </button>
              <Dialog.Close asChild>
                <button type="button" className={TOOL_BTN} aria-label="Close">
                  <X className="size-4" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 md:p-8">
            {/* Width AND height scale together so object-contain keeps growing
                the image past the 100% fit instead of capping at pane height. */}
            <div
              data-testid="lightbox-canvas"
              className="relative mx-auto"
              style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}
            >
              <Image src={src} alt={alt} fill sizes="94vw" className="object-contain" />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
