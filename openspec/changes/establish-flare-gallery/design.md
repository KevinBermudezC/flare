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
- Home is a product landing: at most three live chapter mounts (hero chapter, then up to two more), then a compact text index.

**Non-Goals:**

- Publishing an npm package or a component registry.
- A theme toggle or i18n.
- Shared primitives between chapters.
- `slat-expand` (click accordion, not a scroll chapter).
- Extra slugs: `ember-ticker`, `scene-hero`, `index-scatter`.

## Decisions

### Site is SvelteKit; chapters are loose folders under `src/blocks/`

The gallery imports chapters for preview. The copyable contract is the folder, not `$lib`. Site helpers MUST NOT be imported from a chapter.

### Home mounts featured chapters live; the embed route stays chrome-free

Home mounts at most three live chapters from `src/blocks/` at real height. The first viewport is a real chapter (type-charge with FLARE). The compact index is text. `/blocks/[slug]/embed` stays available as a chrome-free mount and is not used as a 200px home thumb.

### Motion lives in the copied file

GSAP setup, selectors, and styles live inside each `.svelte`. Extra dep is only `gsap` (ScrollTrigger ships with it). The block page states `pnpm add gsap`.

### GSAP is required for Recorte 1 chapters

Pin, scrub, kinetic type, horizontal lane, mask zoom. CSS sticky and `svelte/transition` only for cheap hover. No `framer-motion`, `motion/react`, or `motion-sv`.

**Alternatives considered**: CSS-only Recorte 1 (overridden), `motion-sv` (forbidden).

### Reduced motion

Skip the GSAP context. Keep the first-state layout and every word. Do not empty the chapter.

### Visual language is Flare

Ink (`#09090b`, not `#000`), ember, spotlight, beams, console chrome. Bricolage Grotesque + IBM Plex Mono. No Inter, no purple mesh, no three equal cards, no neon glow, no em-dash garnish, no Jane Doe / Acme / Unleash.

### OpenSpec lives in-repo; archive is a follow-up PR

Amend `establish-flare-gallery`. Archive after merge.

### CI/CD

`packageManager` + `.nvmrc` (Node 22). GitHub Actions: frozen lockfile, check, build. `@sveltejs/adapter-vercel`. Keep `postcss@8.5.26`. No CI secrets.

## Risks / Trade-offs

- **[Risk]** Pin inside a short iframe feels clipped. → **Mitigation**: home does not use short iframes; featured chapters and `/blocks/[slug]` mount at `min-height: 100dvh`.
- **[Risk]** `overflow: hidden` on the detail wrapper kills pin spacers. → **Mitigation**: the live chapter is full-bleed, not clipped.
- **[Trade-off]** GSAP setup is duplicated in six files. That is the independence rule.

## Migration Plan

Replace the ten mixed sections with the six chapters in this same change.

## Open Questions

If a later brief swaps extras among `{deck-pin, mask-reveal, slat-expand, index-scatter}`, change only those slugs. This pass ships `mask-reveal` and `deck-pin`.
