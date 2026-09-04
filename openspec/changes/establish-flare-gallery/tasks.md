## 1. Scaffold

- [x] 1.1 Scaffold SvelteKit + Tailwind v4 with current `sv create` and verify `pnpm i` succeeds
- [x] 1.2 Replace the stub README with the one-minute Flare README and verify `pnpm i && pnpm dev`
- [x] 1.3 Add MIT `LICENSE` and verify no secrets are committed

## 2. Copyable chapters

- [x] 2.1 Add `split-masthead` (oversized split type) with official `gsap` pin/scrub and verify reduced-motion keeps both words
- [x] 2.2 Add `type-charge` (kinetic type on scroll) and verify words stay readable when motion is reduced
- [x] 2.3 Add `lane-scrub` (vertical scroll drives a horizontal lane) and verify the track is reachable under reduced motion
- [x] 2.4 Add `chapter-pin` (pinned chapters that zoom or stack) and verify each chapter remains in layout under reduced motion
- [x] 2.5 Add `mask-reveal` (type mask that zooms on scroll) and verify the word remains visible under reduced motion
- [x] 2.6 Add `deck-pin` (sticky stacking cards) and verify the stack does not collapse under reduced motion
- [x] 2.7 Delete the mixed ten-section folders (and `slat-expand` if present) and verify they are gone from `src/blocks` and the catalog
- [x] 2.8 Grep `src/blocks` for `$lib`, `framer-motion`, `motion/react`, `motion-sv`, and imported `Button` and verify zero matches

## 3. Gallery site

- [x] 3.1 Home mounts at most three live chapters (type-charge with FLARE, lane-scrub, mask-reveal) plus a compact six-slug index
- [x] 3.2 `/blocks/[slug]` mounts the chapter once, then copy plus edit knobs, and verify `?raw` copy
- [x] 3.3 Embed route stays chrome-free
- [x] 3.4 Voice names Flare only and verify README, `package.json`, home, and meta

## 4. Verification

- [ ] 4.1 Run `pnpm check` and verify 0 errors
- [ ] 4.2 Run `pnpm build` and verify prerender succeeds for `/` and all six chapter + embed routes
- [ ] 4.3 Hit `/` and each `/blocks/<slug>` over HTTP and verify status 200

## 5. Taste skills (GSAP kept)

- [x] 5.1 design-taste-frontend keeps official GSAP + ScrollTrigger recipes in Svelte 5
- [x] 5.2 gsap-svelte skill documents context, cleanup, reduced-motion, one runtime per tree
- [x] 5.3 Point flare-blocks and flare-voice at scroll chapters (not generic heroes / marquees / loaders)

## 6. Gallery chrome

- [x] 6.1 Landing and chapter docs are preview-first with one-click copy and real-height stages
- [x] 6.2 Honor prefers-reduced-motion on chrome and verify layout does not collapse
- [x] 6.3 Keep Flare voice in chrome and verify home + chapter titles

## 7. CI/CD

- [x] 7.1 `packageManager`, `.nvmrc` (Node 22), GitHub Actions (`frozen-lockfile`, check, build)
- [x] 7.2 `@sveltejs/adapter-vercel`, `postcss@8.5.26`, README Vercel notes
