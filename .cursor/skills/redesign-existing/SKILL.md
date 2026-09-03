---
name: redesign-existing
description: Audit-first redesign of existing Flare surfaces. Diagnose generic patterns, then upgrade in place. Use before rewriting a block or gallery chrome. Do not start from a blank file.
license: MIT
---

# redesign-existing (Flare)

Adapted from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) `skills/redesign-skill/SKILL.md`. Copyright (c) 2026 Leonxlnx. MIT.

Sequence: **Scan → Diagnose → Fix.** Do not rewrite from scratch. After the audit, apply [design-taste-frontend](../design-taste-frontend/SKILL.md). Changing which blocks exist is an OpenSpec change, not a silent rewrite.

## 1. Scan

- Stack: Svelte 5, SvelteKit, Tailwind v4, CSS + `svelte/transition`.
- Is this gallery chrome (`src/routes`, `src/lib/site`) or a copyable block (`src/blocks/<name>/`)?
- Current type, color, motion, copy, layout family.

## 2. Diagnose

List every generic pattern. Typical Recorte 1 first-cut smells:

- Spotlight card that is only a radial gradient on a rectangle
- Infinite logo marquee as the only idea
- Equal-cell bento (five same-weight tiles)
- Two marquees on one composed page
- Version / numbered eyebrows (`01 · Product`)
- Harbor / Volt / Jane Doe / Acme filler
- Inter-adjacent or default system type if chrome drifted
- `#000` or purple mesh
- Motion with no job (loops that do not tell hierarchy or state)

Also run the typography / color / layout / states / content checks from taste-skill redesign: weak headlines, body too wide, 3 equal cards, missing hover/focus, Lorem, Unleash-copy.

## 3. Fix (in place)

Priority:

1. Type and color (ink, ember, no `#000`)
2. Hover / active / focus
3. Layout rhythm (asymmetric grid, not 3-up equals)
4. Motion: CSS / `svelte/transition` / view-timeline only. No GSAP, ScrollTrigger, framer-motion, `motion/react`, Three.js, Bits, shadcn-svelte
5. Copy: specific, sentence case, no em-dash garnish
6. Replace a block only if the audit says it is unsalvageable, and only with an OpenSpec change if the roster or contract changes

Preserve:

- Copy-paste contract (block folder, no `$lib` imports)
- `prefers-reduced-motion` layout
- Flare voice (not a clone, not Tangram, not a design system)

## 4. Done

Audit list written. Each item fixed or explicitly deferred. Pre-flight on [design-taste-frontend](../design-taste-frontend/SKILL.md) ticked. `src/blocks` still pastes. No silent roster edit.
