## Context

See proposal.md for motivation. The repo on `main` is a README-only stub. Recorte 1 has to be a product a stranger can run with `pnpm i && pnpm dev`, not a kit they install. Blocks must survive copy-paste into a bare SvelteKit 5 + Tailwind v4 app, so every keyframe and every markup decision lives in the file they copy.

## Goals / Non-Goals

**Goals:**

- Current `sv create` bootstrap (Svelte 5, SvelteKit, Tailwind v4 via `@tailwindcss/vite`).
- Ten section folders that do not import the site or each other.
- Gallery isolation so CSS `@keyframes` in one block cannot clobber another on the home grid.
- Copy UI that dumps the real file bytes (`?raw`), not a rewritten sample.
- Reduced-motion CSS/JS that freezes animation without collapsing layout.

**Non-Goals:**

- Publishing an npm package or a component registry.
- A theme toggle, i18n, or extra motion libraries for Recorte 1.
- Sharing primitives between blocks “for DRY”. Duplication of a marquee track is correct.

## Decisions

### Site is SvelteKit; blocks are loose folders under `src/blocks/`

The gallery imports blocks for preview. The copyable contract is the folder, not `$lib`. Site-only helpers (`catalog`, copy panel, header) live in `src/lib/site` and `src/lib/catalog.ts` and MUST NOT be imported from a block.

**Alternatives considered**: npm workspace of packages (rejected — that's a kit), `blocks/` at repo root with a Vite alias (rejected — extra config for no copy-paste gain; `src/blocks` still compiles).

### Live previews on the home grid use an embed route in an iframe

Each block's `<style>` defines keyframes (`slide`, `spin`, …). If all ten rendered on `/` in one document, those names would collide. `/blocks/[slug]/embed` is chrome-free; the home card iframes it. The block page renders the component directly so pointer-follow and hover-pause work on the real section.

**Alternatives considered**: inline scaled components on `/` (rejected — keyframe collisions), screenshots (rejected — Recorte 1 requires motion).

### Motion stays in the copied file

Keyframes, marquee tracks, spotlight gradients, and `svelte/transition` usage live inside each `.svelte`. No global `tailwind.config` animation registry, so paste does not miss CSS.

**Alternatives considered**: shared `app.css` utilities for beams/marquees (rejected — copy would be incomplete), `@humanspeak/svelte-motion` (allowed later, not needed for these ten).

### Demo CTAs are `<button type="button">`, not hash links

Prerender fails on missing fragment ids, and hash jumps inside gallery iframes are noise. Plain buttons match the “no primitive Button component” rule.

**Alternatives considered**: dummy `id` landmarks (rejected — fake page structure), `handleMissingId: ignore` (rejected — hides real broken anchors).

### Visual language is Flare, not a theme feature

Ink background, warm paper text, ember accent, Bricolage Grotesque. Dark is the product look. There is no theme toggle.

**Alternatives considered**: light/dark switch (explicitly out of Recorte 1), borrowing another kit's class names (rejected — Flare is not a port).

### OpenSpec lives in-repo; archive is a follow-up PR

Same contract as Kevin's other product: propose → apply → archive. This change stays under `openspec/changes/` until merge.

## Risks / Trade-offs

- **[Risk]** Ten iframes on `/` are heavier than inline cards. → **Mitigation**: `loading="lazy"`; embed pages are the same components, not a second implementation.
- **[Risk]** Someone copies `$lib/catalog.ts` thinking it is the product. → **Mitigation**: README + block-page copy tell them to copy `src/blocks/<name>/`.
- **[Trade-off]** Marquee CSS is duplicated across three blocks. That is the independence rule, not slop.
- **[Risk]** `min-h-[100svh]` heroes feel tall on the detail page. → **Mitigation**: that is the real first-screen section; the gallery iframe crops via card height.

## Migration Plan

Greenfield. Replace the stub README. No data to migrate.

## Open Questions

None that block Recorte 1. Extra motion libs, more blocks, and archive of this change wait on later PRs.
