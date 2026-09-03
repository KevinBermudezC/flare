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

### Requirement: Home catalog of live chapters

The home page MUST list all six Recorte 1 chapters in a catalog of about three columns. Each card MUST show a live thumb (not a static screenshot). The thumb iframe MUST be at most 200px tall. Pins MUST run on the block page canvas (`min-height: 100dvh`), not in the catalog thumb.

#### Scenario: Gallery lists every chapter

- **WHEN** a visitor opens `/`
- **THEN** they see live previews for split-masthead, type-charge, lane-scrub, chapter-pin, mask-reveal, and deck-pin
- **AND** each card links to `/blocks/<slug>`

#### Scenario: Thumbs stay short

- **WHEN** a visitor watches the home catalog
- **THEN** each iframe is at most 200px tall
- **AND** the card still links to `/blocks/<slug>`

### Requirement: Chapter page has preview and copy

Each chapter page MUST render the live section full-bleed (no `overflow: hidden` clip on the live root) and MUST expose the source of every copyable `.svelte` file, with a control that copies the source to the clipboard. If the chapter needs `gsap`, the page MUST show `pnpm add gsap`.

#### Scenario: Copy is the real file

- **WHEN** a visitor opens `/blocks/split-masthead` and copies the source
- **THEN** the clipboard contains the contents of `src/blocks/split-masthead/SplitMasthead.svelte`
- **AND** the same page shows the live masthead

### Requirement: Gallery chrome is not the copyable product

Site header, catalog, and copy panel MAY live under `$lib`. Copyable chapters MUST NOT import them. The site MUST NOT ship auth, pricing, FAQ, a CLI, or a component registry.

#### Scenario: Product surface is the gallery

- **WHEN** a visitor uses the site
- **THEN** they can browse and copy chapters without signing in
- **AND** there is no `components.json` or registry-add workflow in the repo
