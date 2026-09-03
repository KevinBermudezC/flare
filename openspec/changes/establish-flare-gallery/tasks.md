## 1. Scaffold

- [x] 1.1 Scaffold SvelteKit + Tailwind v4 with current `sv create` (Svelte 5, `@tailwindcss/vite`) and verify `pnpm i` succeeds
- [x] 1.2 Replace the stub README with the one-minute Flare README (preview, copy, it's yours; not a design system; not an npm kit) and verify a stranger can start from `pnpm i && pnpm dev`
- [x] 1.3 Add MIT `LICENSE` and verify no secrets are committed

## 2. Copyable blocks

- [x] 2.1 Add `hero-spotlight` (grid + spotlight + headline + two CTAs) and verify it fills a first screen and uses only CSS/pointer variables
- [x] 2.2 Add `hero-beams` (beams + console chrome, dev-tool look) and verify SVG/CSS beams animate without extra deps
- [x] 2.3 Add `logo-marquee` (two rows, pause on hover) and verify reduced-motion still shows logos
- [x] 2.4 Add `bento-features` (five cells, one hover motion) and verify the hover cell is the only one that runs the extra motion
- [x] 2.5 Add `testimonials-marquee` (two rows) and verify pause-on-hover and reduced-motion layout
- [x] 2.6 Add `infinite-cards` (feature / use-case loop) and verify the track loops without importing other blocks
- [x] 2.7 Add `card-spotlight` (mouse spotlight, usable in a bento) and verify the card is self-contained
- [x] 2.8 Add `loaders` (spinner, dots, bar, multi-step) and verify all four animate
- [x] 2.9 Add `sticky-scroll` (sticky reveal on scroll) and verify layout survives reduced-motion
- [x] 2.10 Add `text-flip` (rotating word) and verify the slot keeps width via reserved words
- [x] 2.11 Grep `src/blocks` for `$lib`, `framer-motion`, `motion/react`, and imported `Button` and verify zero matches

## 3. Gallery site

- [x] 3.1 Add `/` grid of ten live previews (embed iframes) and verify every Recorte 1 slug appears
- [x] 3.2 Add `/blocks/[slug]` with live section + copy panel and verify copied text is the real `?raw` file
- [x] 3.3 Add `/blocks/[slug]/embed` without site chrome and verify home iframes load it
- [x] 3.4 Keep gallery copy in Flare's own voice (name Flare only; no other product names) and verify README, `package.json` description, home intro, and meta description match that rule

## 4. Verification

- [x] 4.1 Run `pnpm check` and verify 0 errors
- [x] 4.2 Run `pnpm build` and verify prerender succeeds for `/` and all ten block + embed routes
- [x] 4.3 Hit `/` and each `/blocks/<slug>` over HTTP and verify status 200

## 5. Taste skills (GSAP kept)

- [x] 5.1 Rewrite design-taste-frontend with official GSAP + ScrollTrigger recipes in Svelte 5 (`gsap.context()`, `$effect` cleanup) and verify `framer-motion` / `motion/react` stay forbidden
- [x] 5.2 Add gsap-svelte skill (context, cleanup, reduced-motion, one runtime per tree) and verify AGENTS.md, flare-blocks, and flare-voice link taste + gsap-svelte
- [x] 5.3 Keep Recorte 1 `src/blocks/*` unchanged in this pass and verify `git diff -- src/blocks` is empty

## 6. Gallery chrome

- [x] 6.1 Lift SiteHeader, home catalog, block page, CopyPanel, PreviewFrame into a preview-first gallery (mixed grid, one-click copy) and verify all ten slugs still appear
- [x] 6.2 Honor prefers-reduced-motion on chrome transitions and verify layout does not collapse
- [x] 6.3 Keep Flare voice in chrome (name Flare only) and verify home + block titles

## 7. CI/CD

- [x] 7.1 Add `packageManager`, `.nvmrc` (Node 22), and GitHub Actions (`frozen-lockfile`, `pnpm check`, `pnpm build`) and verify the workflow file exists
- [x] 7.2 Switch to `@sveltejs/adapter-vercel`, keep `postcss@8.5.26`, add README Vercel notes, and verify `pnpm check` and `pnpm build` pass
