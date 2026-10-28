# Design sources

Editable sources for drawings the site serves as images.

## `bidali/architecture-*.excalidraw`

The architecture diagram in the Bidali write-up, in a wide layout (desktop)
and a tall one (phones), in English and Spanish. To change it:

1. Open the file on [excalidraw.com](https://excalidraw.com) (menu → Open).
2. Edit, then export as SVG with "Background" off and "Embed scene" off.
3. Save it over `public/work/bidali/architecture-<layout>-<lang>.svg` and
   update `wide` / `tall` sizes in `src/data/writeups.ts` if the viewBox
   changed.
