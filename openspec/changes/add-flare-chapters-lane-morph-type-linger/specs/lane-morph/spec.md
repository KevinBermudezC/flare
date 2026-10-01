## ADDED Requirements

### Requirement: Lane Morph chapter file

The product MUST ship `lane-morph` as `src/blocks/lane-morph/LaneMorph.svelte`. The file MUST NOT import `$lib`, another chapter, `framer-motion`, `motion/react`, or `motion-sv`. Motion MUST use official `gsap` and ScrollTrigger inside `gsap.context()`, reverted when the effect cleans up. The chapter MUST paste into a SvelteKit 5 + Tailwind v4 app that has `gsap` installed and still pin, walk the lane, and remap type.

#### Scenario: Paste has no gallery imports

- **WHEN** a maintainer inspects `src/blocks/lane-morph/LaneMorph.svelte`
- **THEN** the file does not import `$lib` or another chapter
- **AND** pin, lane travel, and type remap are implemented in that file

### Requirement: Lane Morph pins and walks

On a full-motion visit, Lane Morph MUST pin a full-viewport stage and scrub about 300-460vh. Vertical progress MUST drive a horizontal track of 4 or 5 plates. The active plate MUST show an ember outline and Mono labels in the form `FIG 0n` and `0n/0N`. The same scrub progress MUST remap display type by weight, tracking, or letter tension. An opacity crossfade of the whole word MUST NOT be the only type change. The gesture MUST stay distinct from `lane-scrub` (that chapter does not remap type) and from `chapter-pin` (that chapter has no horizontal lane).

#### Scenario: Scrub walks the lane and remaps type

- **WHEN** a visitor scrolls `lane-morph` without reduced motion
- **THEN** the stage pins
- **AND** the plate track moves horizontally with vertical progress
- **AND** the display word changes weight, tracking, or letters along that progress
- **AND** the active plate shows an ember outline and a Mono figure label

#### Scenario: Preview route is live

- **WHEN** a visitor opens `/chapters/lane-morph` and `/chapters/lane-morph/embed`
- **THEN** the live chapter mounts at the gallery viewport widths 1440, 768, and 390

### Requirement: Lane Morph reduced motion

When `prefers-reduced-motion: reduce` is set, or the playground passes reduced motion, Lane Morph MUST NOT pin and MUST NOT scrub a type morph. It MUST show discrete plates or a static first plate, with the type already in its settled state for that plate.

#### Scenario: Reduced motion is a hard cut

- **WHEN** reduced motion is active on `lane-morph`
- **THEN** ScrollTrigger pin does not run
- **AND** the visitor still sees plate content and a settled word
