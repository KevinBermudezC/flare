## Purpose

Copyable Flare chapters are independent scroll **sections**. Paste the `.svelte` into a minimal SvelteKit 5 + Tailwind v4 app, add `gsap`, and pin / scrub still runs.

## ADDED Requirements

### Requirement: Six independent chapter folders

The product MUST ship these six chapters, each as its own folder with no imports from other chapters and no imports from `$lib`:

1. `split-masthead` - oversized split type / masthead
2. `type-charge` - kinetic type on scroll
3. `lane-scrub` - vertical scroll drives a horizontal lane
4. `chapter-pin` - pinned chapters that zoom or stack
5. `mask-reveal` - image as type mask that zooms on scroll
6. `deck-pin` - sticky stacking header / cards

Each chapter MUST be a **section**, not a primitive Button/Input/Dialog. The repo MUST NOT ship `hero-spotlight`, `hero-beams`, `bento-features`, `logo-marquee`, `testimonials-marquee`, `infinite-cards`, `card-spotlight`, `loaders`, `text-flip`, `sticky-scroll`, or `slat-expand`.

#### Scenario: Folders do not import each other

- **WHEN** a maintainer inspects `src/blocks/**/*.svelte`
- **THEN** none of those files import `$lib`, another chapter, `framer-motion`, `motion/react`, or `motion-sv`
- **AND** the six folders listed above exist
- **AND** the deleted mixed-catalog folders do not exist

#### Scenario: Minimum kinds are present

- **WHEN** a visitor browses the gallery
- **THEN** they can open at least one pin chapter, one scrub chapter, and one kinetic-type chapter

### Requirement: Stacked beats are distinct

`split-masthead`, `lane-scrub`, `chapter-pin`, and `deck-pin` MUST give each stacked room, panel, or card a distinct title, body, and visual field. Repeating the same template beat is not enough. Fewer beats is allowed when it reads clearer.

#### Scenario: Chapter pin rooms do not clone

- **WHEN** a visitor scrolls `chapter-pin`
- **THEN** they see three rooms with different titles and fields
- **AND** the pin gesture still runs

### Requirement: Copy-paste renders

A copied chapter file MUST render in a SvelteKit 5 + Tailwind v4 app that has `gsap` installed. All motion used by the chapter MUST live in that file (or in other files in the same folder that are copied with it).

#### Scenario: Masthead paste has no missing Flare imports

- **WHEN** `SplitMasthead.svelte` is pasted into a fresh SvelteKit 5 + Tailwind v4 project with `gsap` and mounted on a page
- **THEN** the section renders without unresolved `$lib` imports
- **AND** the split type is visible

### Requirement: Motion and reduced motion

Previews MUST pin, scrub, or charge type when the user does not prefer reduced motion. When `prefers-reduced-motion: reduce` is set, each chapter MUST keep a usable layout (no collapsed height, no missing words).

#### Scenario: Reduced motion keeps the chapter readable

- **WHEN** `prefers-reduced-motion: reduce` is active on any Recorte 1 chapter
- **THEN** GSAP pin and scrub do not run
- **AND** the chapter still shows its type and copy

### Requirement: Official gsap only as the extra dep

Chapters MUST use official `gsap` + ScrollTrigger for pin, scrub, kinetic type, and horizontal hijack. They MUST call `gsap.context()` and revert that context on `$effect` cleanup. They MUST NOT import `framer-motion`, `motion/react`, or `motion-sv`. There is no shared `Button`. The block page MUST state `pnpm add gsap`.

#### Scenario: Cleanup reverts the context

- **WHEN** a chapter mounts and then unmounts
- **THEN** its `$effect` cleanup calls `ctx.revert()`
- **AND** no `window` scroll listener drives `$state`
