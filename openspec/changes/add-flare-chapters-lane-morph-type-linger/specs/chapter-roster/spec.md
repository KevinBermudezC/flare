## ADDED Requirements

### Requirement: Catalog lists eight chapters

`src/lib/catalog.ts` MUST register `lane-morph` and `type-linger` after the existing six, in this order:

1. `split-masthead`
2. `type-charge`
3. `lane-scrub`
4. `chapter-pin`
5. `mask-reveal`
6. `deck-pin`
7. `lane-morph` with name Lane Morph and tagline `Stage pins. The lane walks. Type remaps with the scrub.`
8. `type-linger` with name Type Linger and tagline `Rooms stack. Letters linger as the next title forms.`

Each new entry MUST include a `?raw` source for its `.svelte` file. Home catalog rows MUST render every `blocks` entry, including stills from `CHAPTER_STILLS`.

#### Scenario: Home index shows eight rows

- **WHEN** a visitor opens `/` and reaches the chapter index
- **THEN** they see eight rows
- **AND** row 07 is Lane Morph and row 08 is Type Linger
- **AND** each new row shows its still

### Requirement: Stills, sidebar, sitemap, and meta include the new chapters

`static/stills/lane-morph.webp` and `static/stills/type-linger.webp` MUST exist and MUST be the stills the catalog uses. The Chapters sidebar MUST list both slugs under the Chapters group, after the Start / Introduction group. `/sitemap.xml` MUST include `/chapters/lane-morph` and `/chapters/type-linger`. Chapter titles and OG paths MUST exist for both slugs. Public copy that counts the roster MUST say eight chapters where it previously counted six (introduction, home inside card, README chapter table, `static/llm.txt`, and home and chapters meta descriptions).

#### Scenario: Routes and meta resolve

- **WHEN** a visitor or crawler requests the sitemap and the two chapter pages
- **THEN** both slugs are listed
- **AND** each chapter page has a title and an OG image path that resolves
