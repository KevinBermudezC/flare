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

- [x] 3.1 Home mounts a static FLARE hero in SiteShell plus a vertical chapter index
- [x] 3.2 `/chapters/[slug]` mounts the chapter once, then copy plus edit knobs, and verify `?raw` copy
- [x] 3.3 Embed route stays chrome-free
- [x] 3.4 Voice names Flare only and verify README, `package.json`, home, and meta

## 4. Verification

- [x] 4.1 Run `pnpm check` and verify 0 errors
- [x] 4.2 Run `pnpm build` and verify prerender succeeds for `/` and all six chapter + embed routes
- [x] 4.3 Hit `/` and each `/chapters/<slug>` over HTTP and verify status 200

## 5. Taste skills (GSAP kept)

- [x] 5.1 design-taste-frontend keeps official GSAP + ScrollTrigger recipes in Svelte 5
- [x] 5.2 gsap-svelte skill documents context, cleanup, reduced-motion, one runtime per tree
- [x] 5.3 Point flare-blocks and flare-voice at scroll chapters (not generic heroes / marquees / loaders)

## 6. Gallery chrome

- [x] 6.1 Landing and chapter docs are preview-first with one-click copy and real-height stages
- [x] 6.2 Honor prefers-reduced-motion on chrome and verify layout does not collapse
- [x] 6.3 Keep Flare voice in chrome and verify home + chapter titles
- [x] 6.4 Display is Unbounded. Body is IBM Plex Sans. IBM Plex Mono is HUD, code, and meta only.
- [x] 6.5 Docs-shell hover preview on ChapterNav (stills only, fine pointer)

## 7. CI/CD

- [x] 7.1 `packageManager`, `.nvmrc` (Node 22), GitHub Actions (`frozen-lockfile`, check, build)
- [x] 7.2 `@sveltejs/adapter-vercel`, `postcss@8.5.26`, README Vercel notes

## 8. Home chrome polish

- [x] 8.1 Home `#chapters` is a vertical index (`01`-`06`), not a 3x2 card grid
- [x] 8.2 SiteShell footer: mark + tagline, Chapters and Project columns, `Created with <3 by KevinBermudezC`, MIT
- [x] 8.3 Nav mark slot plus `static/brand/flare-mark.svg` and `/favicon.svg` (not F, not flame)
- [x] 8.4 HoverPreview: ~100ms exit fade, Escape, vertical center, 8px gap
- [x] 8.5 Site nav is one ember Chapters pill to `/chapters`. GitHub lives in the footer. No Open. No flame icon.
- [x] 8.6 Home hero is static FLARE (Preview. Copy., Chapters to `/chapters`). TypeCharge stays a catalog chapter.
- [x] 8.7 Home hero keeps TypeCharge atmosphere with a CSS loop. Reduced motion freezes it. No pin on `/`.
- [x] 8.8 Responsive shell: `--shell-max` 1440, 390 nav is FLARE + Chapters, catalog wrap, chapter switcher below 1024.
- [x] 8.9 Home hero fills the first desktop screen (`100dvh` minus top gutter, frame hairline, and nav). Catalog is below the fold. Mobile hero ~80dvh.
- [x] 8.10 `/chapters` is an Introduction stub with a left rail (Introduction + six slugs). Chapter crumbs link to `/chapters`.
- [x] 8.11 ChapterNav groups Start (Introduction) and Chapters (catalog slugs). Muted labels. Ember only on the active row. Mobile `select` uses `optgroup`.
- [x] 8.12 Footer love bar is `Created with <3 by KevinBermudezC` (name only links to portfolio). Project column is GitHub + MIT.
- [x] 8.13 Home hero atmosphere CSS drift is clearly visible in a few seconds. Reduced motion freezes it. No JS tween on `/`.
- [x] 8.14 `/chapters` Introduction has two-para lede, How it works (Preview / Copy / Paste), Browse chapters, What Flare is, and Ship notes.
- [x] 8.15 Home adds `#inside` (What you get) and `#motion` (three stills). `#chapters` stays the six-row index.

## 9. Chapter playground viewport

- [x] 9.1 Preview on `/chapters/[slug]` mounts a full-height iframe at `/chapters/{slug}/embed` (query for title, accent, reduceMotion, replay). Code mode stays CopyPanel. Parent does not also inline the chapter.
- [x] 9.2 Viewport 1440 / 768 / 390 sizes the iframe (capped by the stage, centered). Replay, viewport, title, accent, and reduced-motion remount it (`{#key}`).
- [x] 9.3 Embed route stays chrome-free and plays the chapter from those search params.
- [x] 9.4 Harden the six chapters: scrub distance and pin spacing use the frame (not a host window). Reduced motion stays readable. Flare tokens stay.
- [x] 9.5 split-masthead pins a 100dvh inner rail so Flare / Preview / Copy are on-screen at first paint (1440×900)
- [x] 9.6 lane-scrub type and ember panels fill the mid-field with CSS atmosphere (no stock photos). Travel uses the frame width, not a naked window.
- [x] 9.7 Stage clips the iframe. 390 vs 1440 change lane-scrub pin width and scrub travel. split-masthead stacks from the chapter frame (`@container` / `clientWidth`), not the host window. Replay remounts and scrolls the frame to top.
- [x] 9.8 Densify lane-scrub type/ember fields (hatch, corners, FIG, specimen). Visual pass of all six chapter embeds.
- [x] 9.9 split-masthead: scale Flare/Preview/Copy to the rail (no hairline overflow). HUD 01–03 + progress. Rooms get FIG fields. Pin walk stays.
- [x] 9.11 split-masthead enrich: ~38% rail, `clamp(2.25rem, 18cqi, 5rem)`, overflow hidden + padding-right ≥12px. HUD 01–03 + SPLIT + tick. Three FIG rooms. Pin intact.
- [x] 9.10 HoverPreview portals to `body` at `--z-hover` (200) beside the hovered row. Clamp only to site nav / viewport — never `.bar`. No Replay button. Native OS cursor only.
