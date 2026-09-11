---
name: flare-blocks
description: Use when adding, editing, or copying a Flare chapter under src/blocks/. Each chapter is a scroll section folder that must paste into a bare SvelteKit + Tailwind v4 app.
---

# Flare chapters

A chapter is a **scroll section** (pin, scrub, horizontal, sticky, kinetic type). It is not a Button/Input/Dialog primitive. It is not a generic hero, marquee, or loader.

Visual work follows [design-taste-frontend](../design-taste-frontend/SKILL.md). Official GSAP follows [gsap-svelte](../gsap-svelte/SKILL.md). Redesigns of existing chapters run [redesign-existing](../redesign-existing/SKILL.md) first. Changing the roster is an OpenSpec change.

Recorte 1 slugs: `split-masthead`, `type-charge`, `lane-scrub`, `chapter-pin`, `mask-reveal`, `deck-pin`. Do not invent slugs. Do not add `slat-expand`, `ember-ticker`, `scene-hero`, or `index-scatter` unless a later change names them.

## Layout

- One folder: `src/blocks/<slug>/`.
- Zero cross-imports. Zero `$lib` imports from a chapter.
- Site chrome (`src/lib/site`, `src/lib/catalog.ts`) is not copyable.

## Copy contract

- Paste the `.svelte` into a **bare** SvelteKit 5 + Tailwind v4 app with `pnpm add gsap`. It MUST render and the scroll MUST still work.
- GSAP setup lives **in the file**. No global animation registry.
- Extra deps only if the block page says `pnpm add …`. Recorte 1: `gsap` only.

## Motion

- Pin, scrub, kinetic type, horizontal hijack: official `gsap` + ScrollTrigger. `gsap.context()` inside `$effect`. Revert on cleanup.
- Cheap hover: CSS + `svelte/transition`.
- No `framer-motion`. No `motion/react`. No `motion-sv`. No shared `Button` / `Dialog` / `Input`. No registry add.
- Actions: plain `<button>` / `<a>` + Tailwind.
- `prefers-reduced-motion` MUST NOT empty the chapter. Freeze motion; keep type and height.

## Check

Grep the folder for `$lib`, other chapters, `framer-motion`, `motion/react`, `motion-sv`, and imported `Button`. Expect zero hits.
