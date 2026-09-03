## Purpose

The Flare website is how a stranger finds, watches, and copies marketing/motion blocks. It is a gallery, not a design-system docs site.

## ADDED Requirements

### Requirement: One-minute README

The repository README MUST name the product Flare, tell a stranger to run `pnpm i && pnpm dev`, and explain preview → copy the `.svelte` → it's yours. It MUST state that Flare is not a design system and not an npm kit. It MUST NOT name other products or sibling projects. It MUST NOT define Flare by comparison.

#### Scenario: Stranger reads the README

- **WHEN** a new contributor opens `README.md`
- **THEN** they can start the gallery with `pnpm i && pnpm dev`
- **AND** they understand that the unit of reuse is a copied `.svelte` file
- **AND** they do not see Flare described as a design system
- **AND** they do not see other product names

### Requirement: Home grid of live previews

The home page MUST list all ten Recorte 1 blocks. Each card MUST show a live preview of the block (not a static screenshot) and MUST link to that block's page.

#### Scenario: Gallery lists every block

- **WHEN** a visitor opens `/`
- **THEN** they see live previews for hero-spotlight, hero-beams, logo-marquee, bento-features, testimonials-marquee, infinite-cards, card-spotlight, loaders, sticky-scroll, and text-flip
- **AND** each card links to `/blocks/<slug>`

#### Scenario: Previews are in motion

- **WHEN** a visitor watches the home grid without reduced-motion preferences
- **THEN** at least the marquee, loader, and text-flip previews animate
- **AND** the previews are rendered UI, not images of UI

### Requirement: Block page has preview and copy

Each block page MUST render the live section and MUST expose the source of every copyable `.svelte` file in that block's folder, with a control that copies the source to the clipboard.

#### Scenario: Copy is the real file

- **WHEN** a visitor opens `/blocks/hero-spotlight` and copies the source
- **THEN** the clipboard contains the contents of `src/blocks/hero-spotlight/HeroSpotlight.svelte`
- **AND** the same page shows the live hero section above or beside that source

#### Scenario: Extra dependency is documented when needed

- **WHEN** a block requires a package beyond SvelteKit + Tailwind v4
- **THEN** the block page states the `pnpm add` line
- **AND** Recorte 1 blocks require no extra package

### Requirement: Gallery chrome is not the copyable product

Site header, catalog, and copy panel MAY live under `$lib`. Copyable blocks MUST NOT import them. The site MUST NOT ship auth, pricing, FAQ, or a marketing footer. The site MUST NOT ship a CLI or component registry.

#### Scenario: Product surface is the gallery

- **WHEN** a visitor uses the site
- **THEN** they can browse and copy blocks without signing in or seeing pricing
- **AND** there is no `components.json` or registry-add workflow in the repo

### Requirement: Preview-first catalog chrome

The home catalog MUST lead with live thumbs, MUST use a mixed grid (not three equal feature cards), and MUST let a visitor copy a block's source in one click from the catalog or the block page.

#### Scenario: Catalog is clickable and copyable

- **WHEN** a visitor opens `/`
- **THEN** each Recorte 1 block has a live thumb that links to `/blocks/<slug>`
- **AND** a copy control on the catalog or a sticky copy control on the block page writes the `.svelte` source in one click

#### Scenario: Heroes read larger than the rest

- **WHEN** a visitor views the catalog at a desktop width
- **THEN** hero blocks occupy a wider span than the remaining blocks
- **AND** the grid is not three equal columns of the same card

### Requirement: Block page is preview plus one-click copy

The block page MUST keep a live preview of the section and a copy control that stays obvious (toolbar or panel). Site chrome MUST honor `prefers-reduced-motion` (no collapsed header or catalog).

#### Scenario: Copy stays one click on the block page

- **WHEN** a visitor opens `/blocks/loaders`
- **THEN** they can copy `Loaders.svelte` without selecting the `<pre>` text
- **AND** the live loaders section is on the same page
