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

The home page MUST show a static brand hero inset in the SiteShell frame: ticks mark (not F, not flame), Unbounded FLARE, the line `Preview. Copy.`, an Open CTA to `/chapters/split-masthead`, and a Chapters link to `/#chapters`. The hero MUST reuse TypeCharge atmosphere layers (ember wash, console grid, beam, grain) with a gentle looping CSS drift, pulse, and grain shift. The hero MUST NOT mount TypeCharge and MUST NOT use ScrollTrigger pin or scrub. From 1024px the hero MUST fill `calc(100dvh - var(--gutter) - var(--nav-h) - 1px)` (top shell gutter, frame hairline, and nav) so `#chapters` sits below the first screen. On small screens the hero MUST be about 80dvh with Open and Chapters still on-screen. Display type MUST be huge (`clamp` about 6.5rem-12.5rem on desktop). The lockup MUST NOT add a ghost wordmark or extra book/folder icons. `prefers-reduced-motion: reduce` MUST freeze the atmosphere loop and keep the lockup. Site shell MUST cap at `--shell-max: 1440px` on ink. On viewports under 480px, site nav MUST be FLARE plus Open only. Hero CTAs MUST stack full-width on small screens. Catalog rows MUST wrap taglines to two lines on small screens and keep stills full-width under the title; from 1280px they MUST be one line of index, copy, and a 160x100 still. It MUST then list all six chapters as a vertical still index (`#chapters`) using names and taglines from `catalog.ts`. TypeCharge MUST remain a catalog chapter at `/chapters/type-charge`. Demo copy on the landing MUST use Flare voice (ink, ember, preview, copy), not placeholder words such as CHARGE or Harbor.

#### Scenario: Landing is framed brand hero plus catalog

- **WHEN** a visitor opens `/`
- **THEN** they see a static FLARE hero with Open and Chapters over TypeCharge atmosphere
- **AND** they can open all six chapters from a vertical still index
- **AND** the home page does not mount a live chapter component
- **AND** the hero does not pin or scrub with ScrollTrigger
- **AND** each index row links to `/chapters/<slug>`

#### Scenario: Home does not stamp pin chapters

- **WHEN** a visitor watches the home page
- **THEN** they do not see a 200px iframe grid of the six chapters
- **AND** they do not see a live TypeCharge scrub on `/`
- **AND** catalog thumbs are still images, not live GSAP mounts

### Requirement: Chapter page is one demo plus copy and edit

Each chapter page MUST live at `/chapters/[slug]`. It MUST show a breadcrumb `FLARE / Chapters / {slug}`, the chapter title, one-line tagline, and `extraDep` (`pnpm add gsap`). It MUST mount the live chapter exactly once in a full-width stage tall enough for the gesture (`min-height: 100dvh` for pin and scrub). It MUST then expose the source of every copyable `.svelte` file, with a control that copies the source to the clipboard, and a small edit panel of two to four knobs that change that same live instance. The page MUST NOT mount the chapter a second time (no iframe plus live, no catalog of thumbs of the same slug). A left rail of the six slugs MAY stay as text navigation from 1024px up. Below 1024px the rail MUST be off and a compact chapter switcher MUST let a visitor change chapter. That rail MAY show a still HoverPreview on fine pointer only; it MUST NOT show HoverPreview on coarse pointer, and it MUST NOT mount a live chapter or iframe in the preview.

#### Scenario: Copy is the real file

- **WHEN** a visitor opens `/chapters/split-masthead` and copies the source
- **THEN** the clipboard contains the contents of `src/blocks/split-masthead/SplitMasthead.svelte`
- **AND** the same page shows the live masthead exactly once

#### Scenario: Knobs bind the live instance

- **WHEN** a visitor changes a title, accent, or reduced-motion knob on `/chapters/type-charge`
- **THEN** the single live mount updates
- **AND** a second copy of the chapter is not mounted

### Requirement: Site chrome has a mark, footer, and chapter index

SiteShell MUST place a swap-friendly geometric mark beside the FLARE wordmark. The mark MUST NOT be the letter F and MUST NOT be a flame. Site nav MUST be `Chapters` (`/#chapters` only) and an ember `Open` CTA to the first catalog chapter. GitHub lives in the footer, not the header. On viewports under 480px the header MUST show FLARE and Open only. The CTA MUST NOT use a flame or fire icon. There is no `/chapters` index route. Favicon MUST load from `/favicon.svg` under `static/`. The shell MUST end with a framed landing footer on ink. The top band MUST show the geometric mark, FLARE wordmark, and a one-line Flare tagline on the left, and two link columns on the right (Chapters, Project). The bottom band MUST show `with love <3` (portfolio) and `© 2026 Flare` plus MIT. The footer MUST NOT name other products. HoverPreview on ChapterNav MUST fade out in about 100ms, close on Escape, sit vertically centered on the row, and keep an 8px gap. HoverPreview MUST NOT appear on coarse pointer.

#### Scenario: Shell carries mark and footer

- **WHEN** a visitor uses the framed site
- **THEN** the header shows a geometric mark next to FLARE
- **AND** the footer shows the mark, a Flare tagline, Chapters and Project columns, `with love <3`, and MIT
- **AND** they do not see other product names

### Requirement: Gallery chrome is not the copyable product

Site header, footer, catalog, and copy panel MAY live under `$lib`. Copyable chapters MUST NOT import them. The site MUST NOT ship auth, pricing, FAQ, a CLI, or a component registry.

#### Scenario: Product surface is the gallery

- **WHEN** a visitor uses the site
- **THEN** they can browse and copy chapters without signing in
- **AND** there is no `components.json` or registry-add workflow in the repo
