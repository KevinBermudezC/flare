## ADDED Requirements

### Requirement: Type Linger chapter file

The product MUST ship `type-linger` as `src/blocks/type-linger/TypeLinger.svelte`. The file MUST NOT import `$lib`, another chapter, `framer-motion`, `motion/react`, or `motion-sv`. Motion MUST use official `gsap` and ScrollTrigger inside `gsap.context()`, reverted when the effect cleans up. The chapter MUST paste into a SvelteKit 5 + Tailwind v4 app that has `gsap` installed and still stack rooms and linger letters.

#### Scenario: Paste has no gallery imports

- **WHEN** a maintainer inspects `src/blocks/type-linger/TypeLinger.svelte`
- **THEN** the file does not import `$lib` or another chapter
- **AND** room scrub and letter leftovers are implemented in that file

### Requirement: Type Linger stacks rooms and lingers letters

Type Linger MUST present three full-viewport stacked rooms. Default titles MUST be CHARGE, HOLD, and RELEASE. Between rooms, typography MUST morph letter by letter so leftover glyphs remain visible while the next title forms. A Mono progress label MUST show `01`, `02`, and `03`, with an ember tick on the active room. The gesture MUST stay distinct from `type-charge` (a single glyph charge) and MUST NOT be only a wipe or fade swap of the whole title.

#### Scenario: Letters linger between rooms

- **WHEN** a visitor scrubs between two `type-linger` rooms without reduced motion
- **THEN** glyphs from the current title remain while glyphs of the next title form
- **AND** the Mono progress shows which room is active with an ember tick

#### Scenario: Preview route is live

- **WHEN** a visitor opens `/chapters/type-linger` and `/chapters/type-linger/embed`
- **THEN** the live chapter mounts at the gallery viewport widths 1440, 768, and 390

### Requirement: Type Linger reduced motion

When `prefers-reduced-motion: reduce` is set, or the playground passes reduced motion, Type Linger MUST swap titles instantly. It MUST NOT animate leftover glyphs. Each visible room MUST show its finished title.

#### Scenario: Reduced motion drops leftovers

- **WHEN** reduced motion is active on `type-linger`
- **THEN** each room shows its finished title
- **AND** leftover glyph animation does not run
