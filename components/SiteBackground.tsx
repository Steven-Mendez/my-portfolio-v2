import ColorBendsWrapper from "@/components/ColorBendsWrapper";

// The site's signature animated WebGL backdrop. Rendered on the home page AND
// every case-study page so sub-pages read as the same site — one source of
// truth for the colours/motion so the two never drift apart. Purely decorative.
export default function SiteBackground() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
      <ColorBendsWrapper
        colors={["#04020c", "#0050FF", "#16307a"]}
        rotation={0}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
        transparent
        autoRotate={0}
      />
    </div>
  );
}
