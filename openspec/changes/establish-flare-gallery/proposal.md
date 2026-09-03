# Change: Establish the Flare gallery

## Why

Flare needs a public Svelte 5 gallery of scroll chapters. A stranger clones, runs `pnpm i && pnpm dev`, scrolls a chapter that pins or scrubs, copies the `.svelte`, and the scroll still works in a minimal SvelteKit 5 + Tailwind v4 app.

## What Changes

- SvelteKit 2 + Svelte 5 site with a home catalog of six chapters and one page per chapter
- Six Recorte 1 chapters under `src/blocks/<slug>/`, each a single copyable `.svelte` file
- Official `gsap` + ScrollTrigger for pin, scrub, kinetic type, and horizontal hijack
- Catalog metadata and raw sources in `src/lib/catalog.ts` (`?raw`)
- Site chrome: header, full-viewport landing, two featured live chapters, compact index, docs page with one live mount plus copy and edit
- Featured and chapter pages mount at real height so pin and scrub can actually run
- Taste skill (VARIANCE 8 / MOTION 7 / DENSITY 3-4) with official GSAP recipes for Svelte 5
- GitHub Actions on PR and `main`: `pnpm i --frozen-lockfile`, `pnpm check`, `pnpm build`
- `@sveltejs/adapter-vercel` for deploy

## Catalog (this change)

1. `split-masthead` - oversized split type / masthead
2. `type-charge` - kinetic type on scroll
3. `lane-scrub` - vertical scroll drives a horizontal lane
4. `chapter-pin` - pinned chapters that zoom or stack
5. `mask-reveal` - image as type mask that zooms on scroll
6. `deck-pin` - sticky stacking header / cards

The mixed ten-section catalog is removed. Do not add `slat-expand`, `ember-ticker`, `scene-hero`, or `index-scatter` in this pass.

## Non-goals

- Not a design system
- Not an npm kit
- No CLI
- No registry
- No shared `Button`
- No second OpenSpec change for the same gallery

## Voice

Flare is a Svelte 5 gallery of scroll chapters. Live preview. Copy the `.svelte`. That is the whole sentence. Do not name other products or sibling projects. Do not define Flare by comparison.
