## Purpose

Copyable Flare blocks are independent marketing/motion **sections**. Paste the `.svelte` into a minimal SvelteKit 5 + Tailwind v4 app and it renders with no broken imports.

## ADDED Requirements

### Requirement: Ten independent section folders

The product MUST ship these ten blocks, each as its own folder with no imports from other blocks and no imports from `$lib`:

1. `hero-spotlight` — first screen: grid + spotlight + headline + two CTAs
2. `hero-beams` — beams and console chrome (dev-tool look)
3. `logo-marquee` — trusted-by, two rows, pause on hover
4. `bento-features` — five cells, one with hover motion
5. `testimonials-marquee` — two rows of social proof
6. `infinite-cards` — feature / use-case cards in a loop
7. `card-spotlight` — card with mouse spotlight, usable inside a bento
8. `loaders` — spinner, dots, bar, and multi-step
9. `sticky-scroll` — features that stick and reveal on scroll
10. `text-flip` — rotating word in a headline

Each block MUST be a **section**, not a primitive Button/Input/Dialog.

#### Scenario: Folders do not import each other

- **WHEN** a maintainer inspects `src/blocks/**/*.svelte`
- **THEN** none of those files import `$lib`, another block, `framer-motion`, or `motion/react`
- **AND** all ten folders listed above exist

#### Scenario: Minimum kinds are present

- **WHEN** a visitor browses the gallery
- **THEN** they can open at least one hero, one bento, one marquee, and one loader

### Requirement: Copy-paste renders

A copied block file MUST render in a SvelteKit 5 + Tailwind v4 app that has no Flare-specific packages. All motion CSS used by the block MUST live in that file (or in other files in the same folder that are copied with it).

#### Scenario: Hero paste has no missing imports

- **WHEN** `HeroSpotlight.svelte` is pasted into a fresh SvelteKit 5 + Tailwind v4 project and mounted on a page
- **THEN** the section renders without unresolved imports
- **AND** the headline and two CTAs are visible

### Requirement: Motion and reduced motion

Previews MUST actually move when the user does not prefer reduced motion. When `prefers-reduced-motion: reduce` is set, each block MUST keep a usable layout (no collapsed height, no missing content that the animated state was supposed to show).

#### Scenario: Marquee pauses and still lays out

- **WHEN** `prefers-reduced-motion: reduce` is active on logo-marquee or testimonials-marquee
- **THEN** the track is not required to animate
- **AND** logos or quotes remain visible in a wrapped or static row

#### Scenario: Text flip keeps headline width

- **WHEN** reduced motion is active on text-flip
- **THEN** the headline still shows a word in the rotating slot
- **AND** the line does not jump to an empty gap

### Requirement: No kit primitives

Blocks MUST use plain `<button>` and `<a>` with Tailwind for actions. The Recorte 1 set MUST NOT depend on `framer-motion` or `motion/react`. Recorte 1 files MUST NOT import `gsap`. There is no shared `Button`, `Dialog`, or `Input`, and no registry add.

#### Scenario: CTAs are host-platform elements

- **WHEN** a block shows a call to action
- **THEN** the markup is a native `button` or `a`
- **AND** there is no imported `<Button>` component
