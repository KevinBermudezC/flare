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

The home page MUST open with a first screen of about `100dvh` that presents Flare itself (ink, ember, Bricolage). It MUST then mount two featured chapters at real height (`type-charge` and `lane-scrub`) so pin and scrub can be felt. It MUST then list all six chapters as a compact text index (name, one line, link). The home page MUST NOT use short (about 200px) iframes of pin or scrub chapters.

#### Scenario: Landing leads with Flare

- **WHEN** a visitor opens `/`
- **THEN** the first screen is a full-viewport Flare hero with Preview. Copy. and a path into chapters
- **AND** they can scroll two featured chapters at real height
- **AND** a compact index names all six slugs and links each to `/blocks/<slug>`

#### Scenario: Home does not stamp pin chapters

- **WHEN** a visitor watches the home page
- **THEN** they do not see a 200px iframe grid of the six chapters
- **AND** featured chapters are live mounts, not thumbs

### Requirement: Chapter page is one demo plus copy and edit

Each chapter page MUST show the chapter title, one-line tagline, and `extraDep` (`pnpm add gsap`). It MUST mount the live chapter exactly once in a full-width stage tall enough for the gesture (`min-height: 100dvh` for pin and scrub). It MUST then expose the source of every copyable `.svelte` file, with a control that copies the source to the clipboard, and a small edit panel of two to four knobs that change that same live instance. The page MUST NOT mount the chapter a second time (no iframe plus live, no catalog of thumbs of the same slug). A left rail of the six names MAY stay as text navigation.

#### Scenario: Copy is the real file

- **WHEN** a visitor opens `/blocks/split-masthead` and copies the source
- **THEN** the clipboard contains the contents of `src/blocks/split-masthead/SplitMasthead.svelte`
- **AND** the same page shows the live masthead exactly once

#### Scenario: Knobs bind the live instance

- **WHEN** a visitor changes a title, accent, or reduced-motion knob on `/blocks/type-charge`
- **THEN** the single live mount updates
- **AND** a second copy of the chapter is not mounted

### Requirement: Gallery chrome is not the copyable product

Site header, catalog, and copy panel MAY live under `$lib`. Copyable chapters MUST NOT import them. The site MUST NOT ship auth, pricing, FAQ, a CLI, or a component registry.

#### Scenario: Product surface is the gallery

- **WHEN** a visitor uses the site
- **THEN** they can browse and copy chapters without signing in
- **AND** there is no `components.json` or registry-add workflow in the repo
