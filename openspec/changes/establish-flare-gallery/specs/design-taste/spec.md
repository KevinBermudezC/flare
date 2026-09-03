## Purpose

Agents doing visual work on Flare follow in-repo taste skills. Official `gsap` is the scrolltelling tool. Flare is named Flare.

## ADDED Requirements

### Requirement: Taste skills are in-repo

The repo MUST ship `.cursor/skills/design-taste-frontend/SKILL.md` and MUST point `AGENTS.md`, `flare-blocks`, and `flare-voice` at it. Redesigns of existing surfaces MUST use `redesign-existing` first. Official GSAP in Svelte 5 MUST be documented in `.cursor/skills/gsap-svelte/SKILL.md`.

#### Scenario: Agent index lists taste

- **WHEN** an agent reads `AGENTS.md`
- **THEN** design-taste-frontend is required for any visual work
- **AND** redesign-existing is required before redesigning an existing block or chrome
- **AND** gsap-svelte is listed for official `gsap` work

### Requirement: GSAP recipes stay, in Svelte 5

design-taste-frontend MUST keep GSAP + ScrollTrigger recipes for sticky stacks, horizontal pan, marquees with intent, and kinetic type. Those recipes MUST use official `gsap`, `gsap.context()`, and cleanup on destroy / `$effect`. They MUST NOT use `framer-motion` or `motion/react`. They MUST NOT introduce a shared `Button` / `Dialog` / `Input` or a registry add.

#### Scenario: Skill names official gsap

- **WHEN** an agent opens design-taste-frontend or gsap-svelte
- **THEN** they see `gsap.context()` and reduced-motion cleanup
- **AND** they do not see a React `motion/react` default stack

### Requirement: Flare voice and anti-slop

Skills MUST NOT name other products or sibling projects. Skills MUST NOT define Flare by comparison. Default dials for Flare gallery work are VARIANCE 8 / MOTION 7 / DENSITY 3-4. Anti-slop MUST include: no Inter-default, no AI-purple mesh as site identity, no 3 equal feature cards as the gallery layout, no neon glow default, no `#000`, no em-dash garnish, no Jane Doe / Acme / Unleash.

#### Scenario: Dials are explicit

- **WHEN** an agent starts visual work without a conflicting brief
- **THEN** they use VARIANCE 8 / MOTION 7 / DENSITY 3-4
