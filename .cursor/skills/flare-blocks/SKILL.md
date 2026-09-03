---
name: flare-blocks
description: Use when adding, editing, or copying a Flare block under src/blocks/. Each block is a section folder that must paste into a bare SvelteKit + Tailwind v4 app.
---

# Flare blocks

A block is a **section**, not a Button/Input/Dialog primitive.

## Layout

- One folder: `src/blocks/<name>/`.
- Zero cross-imports. Zero `$lib` imports from a block.
- Site chrome (`src/lib/site`, `src/lib/catalog.ts`) is not copyable.

## Copy contract

- Paste the `.svelte` into a **bare** SvelteKit 5 + Tailwind v4 app. It MUST render.
- Keyframes and motion CSS live **in the file** (or other files in the same folder). No global animation registry.
- Extra deps only if the block page says `pnpm add …`. Default: none.

## Motion

- CSS + `svelte/transition` (+ `svelte/animate` if needed).
- No framer-motion, GSAP, shadcn-svelte, bits-ui.
- Actions: plain `<button>` / `<a>` + Tailwind.
- `prefers-reduced-motion` MUST NOT collapse layout. Freeze animation; keep content and height.

## Check

Grep the folder for `$lib`, other blocks, shadcn, bits-ui, framer-motion, GSAP. Expect zero hits.
