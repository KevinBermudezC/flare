# Change: Establish the Flare gallery

## Why

Flare needs a public Svelte 5 gallery of marketing and motion blocks that visitors can preview live and copy as a single `.svelte` file. The first cut ships ten Recorte 1 blocks, a catalog, copy-source pages, and a look that is ink, ember, spotlight, beams, and console chrome.

## What Changes

- SvelteKit 2 + Svelte 5 site with a home catalog and one page per block
- Ten Recorte 1 blocks under `src/blocks/<name>/`, each a single copyable `.svelte` file
- Catalog metadata and raw sources in `src/lib/catalog.ts` (`?raw`)
- Site chrome: header, mixed catalog grid, live preview, one-click copy
- Taste skill (VARIANCE 8 / MOTION 7 / DENSITY 3–4) with official GSAP recipes for Svelte 5
- GitHub Actions on PR and `main`: `pnpm i --frozen-lockfile`, `pnpm check`, `pnpm build`
- `@sveltejs/adapter-vercel` for deploy

## Non-goals

- Not a design system
- Not an npm kit
- No CLI
- No registry
- No shared `Button`
- No rewrite of Recorte 1 `src/blocks/*` internals in this change (chrome and docs only after the first ten land)
- No second OpenSpec change for the same gallery

## Voice

Name Flare. Describe the gallery. Stop. Do not name other products or sibling projects. Do not define Flare by comparison.
