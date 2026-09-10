## Context

See proposal.md. Recorte 1 is six scroll chapters, not a mixed marketing kit. Each chapter must paste into a bare SvelteKit 5 + Tailwind v4 app with `pnpm add gsap` and keep pin / scrub / type motion.

## Goals / Non-Goals

**Goals:**

- Current `sv create` bootstrap (Svelte 5, SvelteKit, Tailwind v4 via `@tailwindcss/vite`).
- Six independent chapter folders under `src/blocks/`.
- Official `gsap` + ScrollTrigger for pin, scrub, kinetic type, and horizontal hijack.
- Svelte 5: `gsap.context()` inside `$effect`, revert on cleanup.
- `prefers-reduced-motion` freezes to a readable static layout. Content stays.
- Gallery isolation so one chapter cannot clobber another on the home catalog.
- Copy UI dumps the real file bytes (`?raw`).
- Home is a framed product landing: static FLARE hero over TypeCharge atmosphere (CSS loop, no pin), then a vertical chapter index (01-06), not an equal card grid.

**Non-Goals:**

- Publishing an npm package or a component registry.
- A theme toggle or i18n.
- Shared primitives between chapters.
- `slat-expand` (click accordion, not a scroll chapter).
- Extra slugs: `ember-ticker`, `scene-hero`, `index-scatter`.

## Decisions

### Site is SvelteKit; chapters are loose folders under `src/blocks/`

The gallery imports chapters for preview. The copyable contract is the folder, not `$lib`. Site helpers MUST NOT be imported from a chapter.

### Home is a static brand hero; chapter pages live at `/chapters/[slug]`

Home shows a static FLARE hero (ticks mark, Unbounded FLARE, `Preview. Copy.`, ember Chapters to `/chapters`, optional Index to `/#chapters`) inset in the SiteShell frame (`--shell-max: 1440px`, ink outside). From 1024px the hero fills the first screen (`calc(100dvh - nav - top gutter - frame hairline)`); `#chapters` sits below the fold. Atmosphere (wash, grid, beam, grain) matches TypeCharge, biased to the right of the stage, and loops with CSS. No ghost wordmark, no ScrollTrigger pin or scrub on `/`. TypeCharge stays a catalog chapter at `/chapters/type-charge`. Desktop catalog rows are `01`-`06`, Unbounded title, tagline, still on the right. Site nav ember CTA is Chapters → `/chapters`. There is no Open. GitHub lives in the footer. `/chapters` is an Introduction stub (title, short Flare copy, rail), not a seventh scroll chapter. Footer Index may stay `/#chapters` for the home catalog.

### Motion lives in the copied file

GSAP setup, selectors, and styles live inside each `.svelte`. Extra dep is only `gsap` (ScrollTrigger ships with it). The block page states `pnpm add gsap`.

### GSAP is required for Recorte 1 chapters

Pin, scrub, kinetic type, horizontal lane, mask zoom. CSS sticky and `svelte/transition` only for cheap hover. No `framer-motion`, `motion/react`, or `motion-sv`.

**Alternatives considered**: CSS-only Recorte 1 (overridden), `motion-sv` (forbidden).

### Reduced motion

Skip the GSAP context. Keep the first-state layout and every word. Do not empty the chapter.

### Visual language is Flare

Ink (`#09090b`, not `#000`), ember, spotlight, beams, console chrome. Unbounded for display (wordmark, hero, chapter headlines). IBM Plex Sans for body and UI. IBM Plex Mono only for HUD ticks, code, index numbers, and tiny ember uppercase meta. No Inter, no purple mesh, no three equal cards, no neon glow, no em-dash garnish, no Jane Doe / Acme / Unleash. Home `01`-`06` are the chapter index, not garnish eyebrows.

### OpenSpec lives in-repo; archive is a follow-up PR

Amend `establish-flare-gallery`. Archive after merge.

### CI/CD

`packageManager` + `.nvmrc` (Node 22). GitHub Actions: frozen lockfile, check, build. `@sveltejs/adapter-vercel`. Keep `postcss@8.5.26`. No CI secrets.

## Risks / Trade-offs

- **[Risk]** Pin inside a short iframe feels clipped. → **Mitigation**: home does not use short iframes; chapter pages at `/chapters/[slug]` mount at `min-height: 100dvh`.
- **[Risk]** `overflow: hidden` on the detail wrapper kills pin spacers. → **Mitigation**: the live chapter is full-bleed, not clipped.
- **[Trade-off]** GSAP setup is duplicated in six files. That is the independence rule.

## Migration Plan

Replace the ten mixed sections with the six chapters in this same change.

## Open Questions

If a later brief swaps extras among `{deck-pin, mask-reveal, slat-expand, index-scatter}`, change only those slugs. This pass ships `mask-reveal` and `deck-pin`.
