"use client";

import * as React from "react";
import { Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import { Dialog } from "radix-ui";

// Render Mermaid diagrams as SVG on the client. The mermaid bundle is large, so
// it's dynamically imported here — it only loads on a project page that actually
// shows a diagram, never on the home route or its Lighthouse budget. Theme
// variables map onto the site's navy/periwinkle palette so diagrams read as part
// of the page rather than a default white Mermaid block.
//
// The diagram renders at the page's reading width (so it lines up with the prose
// and figures) and is click-to-zoom: tapping it opens a large, pannable lightbox
// with zoom controls, so the detail stays legible without widening the layout.
let mermaidPromise: Promise<typeof import("mermaid").default> | null = null;

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        themeVariables: {
          background: "transparent",
          primaryColor: "#161b32",
          primaryBorderColor: "#6f80c4",
          primaryTextColor: "#e9eaf0",
          secondaryColor: "#1b2138",
          tertiaryColor: "#0f1428",
          mainBkg: "#161b32",
          nodeBorder: "#6f80c4",
          nodeTextColor: "#e9eaf0",
          lineColor: "#6f93ff",
          textColor: "#cdd6ee",
          titleColor: "#8fa6ff",
          edgeLabelBackground: "#0e1226",
          clusterBkg: "#0f1428",
          clusterBorder: "#3a4675",
          // Sequence diagram
          actorBkg: "#161b32",
          actorBorder: "#6f80c4",
          actorTextColor: "#e9eaf0",
          actorLineColor: "#3a4675",
          signalColor: "#9aa3bd",
          signalTextColor: "#cdd6ee",
          labelBoxBkgColor: "#161b32",
          labelBoxBorderColor: "#6f80c4",
          labelTextColor: "#e9eaf0",
          loopTextColor: "#cdd6ee",
          noteBkgColor: "#23284a",
          noteBorderColor: "#6f80c4",
          noteTextColor: "#e9eaf0",
          activationBkgColor: "#23284a",
          activationBorderColor: "#6f80c4",
          sequenceNumberColor: "#0e0e10",
        },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.5;

const TOOL_BTN =
  "flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-fg-secondary transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:hover:bg-white/[0.04]";

export default function Mermaid({ code, title }: { code: string; title?: string }) {
  const rawId = React.useId();
  const id = "mmd-" + rawId.replace(/[^a-zA-Z0-9-]/g, "");
  // Two independent renders so the inline copy and the lightbox copy never share
  // internal SVG ids (which would otherwise collide on arrowhead markers).
  const [svg, setSvg] = React.useState<string | null>(null);
  const [zoomSvg, setZoomSvg] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        const mermaid = await loadMermaid();
        const inline = (await mermaid.render(`${id}-a`, code)).svg;
        if (!active) return;
        setSvg(inline);
        const zoomed = (await mermaid.render(`${id}-b`, code)).svg;
        if (!active) return;
        setZoomSvg(zoomed);
      } catch (err) {
        if (active) setFailed(true);
        console.error("[Mermaid] failed to render diagram", err);
      }
    })();
    return () => {
      active = false;
    };
  }, [code, id]);

  // Graceful degradation: if mermaid can't parse/render, show the source so the
  // architecture is still readable rather than a blank box.
  if (failed) {
    return (
      <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b0e18] p-4 font-mono text-xs leading-relaxed text-fg-muted">
        {code}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex min-h-[180px] items-center justify-center font-mono text-xs tracking-[0.14em] text-fg-faint">
        Rendering diagram…
      </div>
    );
  }

  return (
    <Dialog.Root onOpenChange={(open) => !open && setZoom(1)}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Zoom ${title ?? "diagram"}`}
          className="group relative block w-full cursor-zoom-in overflow-x-auto rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            className="block [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
            // SVG is produced by mermaid from our own trusted diagram source with
            // securityLevel "strict" (DOMPurify-sanitized) — no user input here.
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <span className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#bcc8ff] opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="size-3" /> Zoom
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 flex h-[90vh] w-[94vw] max-w-[1400px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e18] shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <Dialog.Title className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
              {title ?? "Diagram"}
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
            <div
              className="mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:!max-w-none"
              style={{ width: `${zoom * 100}%` }}
              dangerouslySetInnerHTML={{ __html: zoomSvg ?? svg }}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
