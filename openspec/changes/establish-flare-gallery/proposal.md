## Why

Kevin builds Svelte 5 landings and needs marketing + motion **sections** he can preview live and paste as a `.svelte` file. Recorte 1 ships Flare as that gallery: ten independent blocks, a site to browse them, and a README a stranger understands in under a minute.

## What Changes

- A SvelteKit site whose home is a grid of **live** block previews (not screenshots).
- A page per block with the live section plus copyable source.
- Ten independent folders under `src/blocks/<name>/`. Each folder is the copyable unit. No cross-imports. No `$lib/ui`.
- A one-minute README: preview, copy the `.svelte`, it's yours. Product name **Flare**. Not a design system. Not Tangram. Not an npm kit.
- Stack: Svelte 5 + SvelteKit + Tailwind v4. Motion in CSS + `svelte/transition` (+ `svelte/animate` if needed). Zero extra runtime deps unless a block documents `pnpm add`.
- MIT license. No secrets.

This proposal does **not** add:

- An npm package, CLI, or component registry
- A design system or shared Button / Dialog / Input primitives
- Auth, pricing, FAQ, or a marketing footer
- Dark mode as a feature, i18n, shaders / globes / dither
- Full landing templates
- Mixing Tangram into this repo

## Capabilities

### New Capabilities

- `block-gallery`: The Flare site — home grid of live previews, a page per block (preview + copy), and a README that explains preview/copy in under a minute.
- `copyable-blocks`: The ten marketing/motion **sections** as loose folders. Paste a `.svelte` into a minimal SvelteKit 5 + Tailwind v4 app and it renders. Motion keeps layout under `prefers-reduced-motion`.

### Modified Capabilities

- None. This is the first product change; `openspec/specs/` is empty.

## Impact

- **Code**: SvelteKit app at the repo root (`src/routes`, `src/blocks`, `src/lib/site`). Site chrome is not the copyable product.
- **Dependencies**: Svelte 5, SvelteKit, Tailwind v4, Vite. No framer-motion, GSAP, shadcn-svelte, or bits-ui.
- **Documentation**: README (one minute), CONTRIBUTING (propose → apply → archive), this OpenSpec change.
- **Visual language**: Flare's own — dark ink, ember accent, spotlight, beams, console chrome. Not a port of another kit.
- **Archive**: after this PR merges, `openspec archive establish-flare-gallery` folds these specs into `openspec/specs/`.
