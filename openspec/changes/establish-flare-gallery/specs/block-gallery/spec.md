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

The home page MUST wrap a live type-charge chapter (word FLARE) inset in the SiteShell frame. It MUST then list all six chapters as a vertical still index (`#chapters`): kicker `CHAPTERS` plus a zero-padded count, rows `01`-`06`, Unbounded title, one-line tagline from `catalog.ts`, a still, and a SCROLL chip. The whole row MUST link to `/chapters/<slug>`. The catalog MUST NOT be an equal multi-column card grid. It MUST NOT mount lane-scrub or mask-reveal as loose full-viewport stages outside the frame. It MUST NOT use 200px live iframes as thumbs. Demo copy on the landing MUST use Flare voice (ink, ember, preview, copy), not placeholder words such as CHARGE or Harbor.

#### Scenario: Landing is framed TypeCharge plus catalog

- **WHEN** a visitor opens `/`
- **THEN** the first chapter they meet is a live type-charge (word FLARE) inset in the shell frame
- **AND** they can open all six chapters from a vertical still index
- **AND** the page mounts one live chapter component
- **AND** each index row links to `/chapters/<slug>`

#### Scenario: Home does not stamp pin chapters

- **WHEN** a visitor watches the home page
- **THEN** they do not see a 200px iframe grid of the six chapters
- **AND** they do not see a fake marketing hero in place of a chapter
- **AND** catalog thumbs are still images, not live GSAP mounts

### Requirement: Chapter page is one demo plus copy and edit

Each chapter page MUST live at `/chapters/[slug]`. It MUST show a breadcrumb `FLARE / Chapters / {slug}`, the chapter title, one-line tagline, and `extraDep` (`pnpm add gsap`). It MUST mount the live chapter exactly once in a full-width stage tall enough for the gesture (`min-height: 100dvh` for pin and scrub). It MUST then expose the source of every copyable `.svelte` file, with a control that copies the source to the clipboard, and a small edit panel of two to four knobs that change that same live instance. The page MUST NOT mount the chapter a second time (no iframe plus live, no catalog of thumbs of the same slug). A left rail of the six slugs MAY stay as text navigation. That rail MAY show a still HoverPreview on fine pointer; it MUST NOT mount a live chapter or iframe in the preview.

#### Scenario: Copy is the real file

- **WHEN** a visitor opens `/chapters/split-masthead` and copies the source
- **THEN** the clipboard contains the contents of `src/blocks/split-masthead/SplitMasthead.svelte`
- **AND** the same page shows the live masthead exactly once

#### Scenario: Knobs bind the live instance

- **WHEN** a visitor changes a title, accent, or reduced-motion knob on `/chapters/type-charge`
- **THEN** the single live mount updates
- **AND** a second copy of the chapter is not mounted

### Requirement: Site chrome has a mark, footer, and chapter index

SiteShell MUST place a swap-friendly geometric mark beside the FLARE wordmark. The mark MUST NOT be the letter F and MUST NOT be a flame. Favicon MUST load from `/favicon.svg` under `static/`. The shell MUST end with a minimal footer: the line `with love <3`, plus links to Chapters (`/#chapters`), Portfolio (`https://kevinbermudez.vercel.app`), GitHub (`https://github.com/KevinBermudezC/flare`), and MIT. The footer MUST NOT name other products. HoverPreview on ChapterNav MUST fade out in about 100ms, close on Escape, sit vertically centered on the row, and keep an 8px gap.

#### Scenario: Shell carries mark and footer

- **WHEN** a visitor uses the framed site
- **THEN** the header shows a geometric mark next to FLARE
- **AND** the footer shows `with love <3` plus Chapters, Portfolio, GitHub, and MIT
- **AND** they do not see other product names

### Requirement: Gallery chrome is not the copyable product

Site header, footer, catalog, and copy panel MAY live under `$lib`. Copyable chapters MUST NOT import them. The site MUST NOT ship auth, pricing, FAQ, a CLI, or a component registry.

#### Scenario: Product surface is the gallery

- **WHEN** a visitor uses the site
- **THEN** they can browse and copy chapters without signing in
- **AND** there is no `components.json` or registry-add workflow in the repo
