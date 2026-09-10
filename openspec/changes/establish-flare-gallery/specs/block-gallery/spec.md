## Purpose

The Flare website is how a stranger finds, scrolls, and copies scroll chapters. It is a gallery, not a design-system docs site.

## ADDED Requirements

### Requirement: One-minute README

The repository README MUST name the product Flare, tell a stranger to run `pnpm i && pnpm dev`, and explain preview → copy the `.svelte` → it's yours. It MUST describe Flare as a Svelte 5 gallery of scroll chapters. It MUST state that Flare is not a design system and not an npm kit. It MUST NOT name other products or sibling projects.

#### Scenario: Stranger reads the README

- **WHEN** a new contributor opens `README.md`
- **THEN** they can start the gallery with `pnpm i && pnpm dev`
- **AND** they understand that the unit of reuse is a copied `.svelte` file
- **AND** they see the six chapter slugs
- **AND** they do not see other product names

### Requirement: Home is a product landing

The home page MUST show a static brand hero inset in the SiteShell frame: ticks mark (not F, not flame), Unbounded FLARE, the line `Preview. Copy.`, and a single ember Chapters CTA to `/chapters`. The hero MUST NOT show an Open control. The hero MUST reuse TypeCharge atmosphere layers (ember wash, console grid, beam, grain) with a looping CSS drift that is clearly visible within a few seconds on desktop (wash about 10-12s, beam about 14s, motes about 9-11s, grain about 8-10s; wash/motes opacity about 0.55 to 1). The hero MUST NOT mount TypeCharge and MUST NOT use ScrollTrigger or other JS tweening on `/`. From 1024px the hero MUST fill `calc(100dvh - var(--gutter) - var(--nav-h) - 1px)` (top shell gutter, frame hairline, and nav) so `#chapters` sits below the first screen. On small screens the hero MUST be about 80dvh with Chapters still on-screen. Display type MUST be huge (`clamp` about 6.5rem-12.5rem on desktop). The lockup MUST NOT add a ghost wordmark or extra book/folder icons. `prefers-reduced-motion: reduce` MUST freeze the atmosphere loop and keep the lockup. Site shell MUST cap at `--shell-max: 1440px` on ink. Site nav MUST be FLARE plus an ember Chapters pill to `/chapters` at every viewport. Catalog rows MUST wrap taglines to two lines on small screens and keep stills full-width under the title; from 1280px they MUST be one line of index, copy, and a 160x100 still. Home MUST then show `#inside` (What you get: Preview, Copy, Scroll) and `#motion` (three stills: lane-scrub, type-charge, mask-reveal, plus All chapters to `/chapters`). It MUST then list all six chapters as a vertical still index (`#chapters`) using names and taglines from `catalog.ts`. TypeCharge MUST remain a catalog chapter at `/chapters/type-charge`. Demo copy on the landing MUST use Flare voice (ink, ember, preview, copy), not placeholder words such as CHARGE or Harbor.

#### Scenario: Landing is framed brand hero plus catalog

- **WHEN** a visitor opens `/`
- **THEN** they see a static FLARE hero with a Chapters CTA over TypeCharge atmosphere
- **AND** they see What you get and In motion before the six-row chapter index
- **AND** they can open all six chapters from a vertical still index
- **AND** the home page does not mount a live chapter component
- **AND** the hero atmosphere drifts with CSS only, with no ScrollTrigger or JS tween
- **AND** each index row links to `/chapters/<slug>`

#### Scenario: Home does not stamp pin chapters

- **WHEN** a visitor watches the home page
- **THEN** they do not see a 200px iframe grid of the six chapters
- **AND** they do not see a live TypeCharge scrub on `/`
- **AND** catalog thumbs are still images, not live GSAP mounts

### Requirement: Chapter page is one demo plus copy and edit

`/chapters` MUST exist as an Introduction index. It MUST show crumb + `Introduction` + `Preview. Copy.`, a two-paragraph Flare lede (Svelte 5 gallery, six scroll chapters, live preview, copy the whole `.svelte`, official gsap where it earns it), a bordered How it works grid (Preview / Copy / Paste), an ember Browse chapters pill to `/chapters/split-masthead`, a What Flare is section (gallery site, Preview + Copy, not a design system / no shared Button), and short Ship notes. It MUST NOT name other products. A left rail MUST group links under two muted, non-clickable section labels: `Start` (Introduction, active when `current` is null / on `/chapters`) then `Chapters` (the six catalog slugs linking to `/chapters/[slug]`). The gap between those two groups MUST be larger than the gap between rows. Active rail text MUST be ember. Section labels MUST be muted (`#8b8278`), not ember. HoverPreview MAY attach to catalog slug rows only. Below 1024px the rail MUST be off and a compact switcher MUST group Introduction under `Start` and the six chapters under `Chapters` (`optgroup` when the control is a `select`).

Each chapter page MUST live at `/chapters/[slug]`. It MUST show a breadcrumb `FLARE / Chapters / {slug}` with Chapters linking to `/chapters`, the chapter title, one-line tagline, and `extraDep` (`pnpm add gsap`). In Preview mode it MUST mount the live chapter exactly once as a full-height iframe whose `src` is `/chapters/{slug}/embed` plus query params for title, accent, reduced-motion, and replay. The iframe CSS width MUST be `1440`, `768`, or `390` (capped by the stage container), centered in the stage canvas, with height at least `100dvh` of that canvas. Changing viewport, Replay, title, accent, or reduced-motion MUST remount the iframe. Code mode MUST keep the CopyPanel (source of every copyable `.svelte` file plus a clipboard control). A small edit panel of two to four knobs MUST drive that same iframe instance. The parent page MUST NOT also inline the chapter (no iframe plus live, no catalog of thumbs of the same slug). `/chapters/[slug]/embed` MUST stay chrome-free and MUST play the chapter from those search params. A left rail of Introduction plus the six slugs MAY stay as text navigation from 1024px up. Below 1024px the rail MUST be off and a compact chapter switcher MUST let a visitor change chapter or return to Introduction. That rail MAY show a still HoverPreview on fine pointer only; it MUST NOT show HoverPreview on coarse pointer, and it MUST NOT mount a live chapter or iframe in the preview.

#### Scenario: Chapters index is Introduction

- **WHEN** a visitor opens `/chapters`
- **THEN** they see Introduction with `Preview. Copy.`, How it works, and What Flare is
- **AND** Introduction is the current item under the Start label
- **AND** they do not see other product names

#### Scenario: Landing Chapters goes to the index

- **WHEN** a visitor clicks Chapters on `/`
- **THEN** they arrive at `/chapters`
- **AND** they do not see an Open control in the header or hero

#### Scenario: Copy is the real file

- **WHEN** a visitor opens `/chapters/split-masthead` and copies the source
- **THEN** the clipboard contains the contents of `src/blocks/split-masthead/SplitMasthead.svelte`
- **AND** the same page shows the live masthead exactly once, inside the Preview iframe

#### Scenario: Knobs bind the live instance

- **WHEN** a visitor changes a title, accent, or reduced-motion knob on `/chapters/type-charge`
- **THEN** the Preview iframe remounts with those values
- **AND** a second copy of the chapter is not mounted on the parent page

#### Scenario: Viewport toolbar sizes the preview

- **WHEN** a visitor clicks 1440, then 768, then 390 on `/chapters/lane-scrub`
- **THEN** the Preview iframe width changes to each of those sizes (capped by the stage)
- **AND** the chapter inside that iframe uses that width for `window` and ScrollTrigger
- **AND** Replay remounts the iframe

### Requirement: Site chrome has a mark, footer, and chapter index

SiteShell MUST place a swap-friendly geometric mark beside the FLARE wordmark. The mark MUST NOT be the letter F and MUST NOT be a flame. Site nav MUST be a single ember `Chapters` pill to `/chapters`. GitHub lives in the footer, not the header. The header MUST NOT show Open. The CTA MUST NOT use a flame or fire icon. Favicon MUST load from `/favicon.svg` under `static/`. The shell MUST end with a framed landing footer on ink. The top band MUST show the geometric mark, FLARE wordmark, and a one-line Flare tagline on the left, and two link columns on the right (Chapters, Project). The bottom band MUST show `Created with <3 by KevinBermudezC` with only `KevinBermudezC` linking to the portfolio, and `© 2026 Flare` plus MIT. The Project column MUST list GitHub and MIT only. The footer MUST NOT name other products. HoverPreview on ChapterNav MUST fade out in about 100ms, close on Escape, sit vertically centered on the row, and keep an 8px gap. HoverPreview MUST NOT appear on coarse pointer.

#### Scenario: Shell carries mark and footer

- **WHEN** a visitor uses the framed site
- **THEN** the header shows a geometric mark next to FLARE
- **AND** the footer shows the mark, a Flare tagline, Chapters and Project columns, `Created with <3 by KevinBermudezC`, and MIT
- **AND** they do not see other product names

### Requirement: Gallery chrome is not the copyable product

Site header, footer, catalog, and copy panel MAY live under `$lib`. Copyable chapters MUST NOT import them. The site MUST NOT ship auth, pricing, FAQ, a CLI, or a component registry.

#### Scenario: Product surface is the gallery

- **WHEN** a visitor uses the site
- **THEN** they can browse and copy chapters without signing in
- **AND** there is no `components.json` or registry-add workflow in the repo
