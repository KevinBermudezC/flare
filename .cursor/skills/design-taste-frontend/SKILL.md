---
name: design-taste-frontend
description: Anti-slop visual skill for Flare gallery chrome and marketing/motion blocks. Read the brief, set VARIANCE / MOTION / DENSITY, ship interfaces that do not look templated. Use on any visual work. Redesigns of existing blocks start with redesign-existing.
license: MIT
---

# design-taste-frontend (Flare)

Adapted from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) v2 (`skills/taste-skill/SKILL.md`, install name `design-taste-frontend`). Copyright (c) 2026 Leonxlnx. MIT.

Keep the design intent. Recipes below are official `gsap` + Svelte 5.

Any visual work on Flare (gallery chrome **or** blocks) follows this skill. Also read [flare-voice](../flare-voice/SKILL.md), [flare-blocks](../flare-blocks/SKILL.md), [gsap-svelte](../gsap-svelte/SKILL.md), [svelte-5](../svelte-5/SKILL.md). Changing the block roster needs an OpenSpec change. Do not silently rewrite Recorte 1 in a taste pass.

## 0. Design read (before code)

State one line: `Reading this as: <page kind> for <audience>, <vibe>, VARIANCE / MOTION / DENSITY.`

Flare default read (gallery blocks): **marketing/motion sections for Svelte builders, VARIANCE 8 / MOTION 7 / DENSITY 3-4.**

Do not default to: Inter, AI-purple mesh heroes, three equal feature cards, neon glow, `#000`, Jane Doe / Acme / Unleash copy, version-label eyebrows, infinite-loop everything.

Start from **real references** (live sites, screenshots, named products the brief gave). Not LLM-default patterns: generic spotlight card, infinite logo marquee, equal bento.

## 1. Three dials

| Dial | 1 | 10 | Flare gallery default |
| --- | --- | --- | --- |
| `DESIGN_VARIANCE` | Perfect symmetry | Artsy chaos | **8** |
| `MOTION_INTENSITY` | Static | Cinematic | **7** |
| `VISUAL_DENSITY` | Airy | Cockpit | **3-4** |

Overrides come from the brief, not from editing this file.

If `MOTION_INTENSITY > 4`, the surface must actually move. If you cannot ship working motion, drop the dial to 3. Never half-build motion.

**Motion must be motivated.** Hierarchy, storytelling, feedback, or state change. Not "it looked cool."

**Marquee: at most one per composed page.** Two marquees is filler.

## 2. Flare stack (hard)

- Svelte 5 + SvelteKit + Tailwind v4.
- Cheap motion: **CSS** + `svelte/transition` + `svelte/animate`. View Transition API for shared-element / route morphs. CSS `animation-timeline: view()` / `scroll()` when a cheap scroll tie is enough.
- Scrolltelling, sticky stacks, kinetic type, marquees with intent: official **`gsap`** + **ScrollTrigger**. Isolate in a leaf. `gsap.context()`, revert on `$effect` cleanup. See [gsap-svelte](../gsap-svelte/SKILL.md).
- Optional, few blocks only: `@humanspeak/svelte-motion`, and the block page documents `pnpm add`.
- **FORBIDDEN:** `framer-motion`, `motion/react`, Three.js as defaults, shared `Button` / `Dialog` / `Input` primitives, registry add.
- Do not mix GSAP with another animation runtime in the same component tree.
- Copyable blocks: own folder, zero `$lib` / cross-imports. Keyframes (or the GSAP setup) live in the copied file.
- `prefers-reduced-motion`: freeze motion, keep layout and content. No collapsed height.
- Animate `transform` and `opacity` only. No `window.addEventListener("scroll")` driving `$state`.
- Flare look: ink (not `#000`), ember, spotlight, beams, console chrome. Dark ink is the product look, not a theme-toggle feature.
- Voice: name Flare. Do not name other products or sibling projects. Do not define Flare by comparison. See [flare-voice](../flare-voice/SKILL.md).

Do not install a primitive kit to "have a system." Flare is not a design system.

## 3. Motion recipes (Svelte 5 + official gsap)

Register plugins once on the client. Scope every tween with `gsap.context(fn, root)` and `return () => ctx.revert()` from `$effect`.

### Sticky stack

A card stack on scroll is a real sticky-stack, not a sequential reveal list. Pin at viewport top (`start: "top top"`), not `"top 80%"`. Every card except the last is pinned. The previous card scales/fades as the next one arrives.

```svelte
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	let root: HTMLElement | undefined = $state();

	$effect(() => {
		const el = root;
		if (!el) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
			cards.forEach((card, i) => {
				if (i === cards.length - 1) return;
				ScrollTrigger.create({
					trigger: card,
					start: 'top top',
					endTrigger: cards[cards.length - 1],
					end: 'top top',
					pin: true,
					pinSpacing: false
				});
				gsap.to(card, {
					scale: 0.92,
					opacity: 0.55,
					ease: 'none',
					scrollTrigger: {
						trigger: cards[i + 1],
						start: 'top bottom',
						end: 'top top',
						scrub: true
					}
				});
			});
		}, el);

		return () => ctx.revert();
	});
</script>

<div bind:this={root} class="relative">
	<!-- each card: class="stack-card sticky top-0 min-h-[100dvh]" -->
</div>
```

### Horizontal pan (scroll-tied)

Sticky wrapper, inner flex track. Pin when the section top hits the viewport top. Scroll length equals track overflow. Not a second CSS marquee.

```svelte
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	let wrap: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();

	$effect(() => {
		const section = wrap;
		const row = track;
		if (!section || !row) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = gsap.context(() => {
			const distance = row.scrollWidth - window.innerWidth;
			gsap.to(row, {
				x: -distance,
				ease: 'none',
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: () => `+=${distance}`,
					pin: true,
					scrub: 1,
					invalidateOnRefresh: true
				}
			});
		}, section);

		return () => ctx.revert();
	});
</script>

<section bind:this={wrap} class="relative overflow-hidden">
	<div bind:this={track} class="flex h-[100dvh] items-center">
		<!-- slides -->
	</div>
</section>
```

### Marquee with intent

One marquee per composed page. Prefer CSS keyframes for a trusted-by row. Reach for GSAP when the track must pause, reverse, or sync to scroll. Same cleanup: `gsap.context()` + `ctx.revert()`.

### Kinetic type

GSAP timelines for word/char reveals that tell a story. CSS / `svelte/transition` for a cheap flip or fade. Do not animate every headline.

### Scroll-reveal stagger (cheap path)

No pin needed: `svelte/transition` (`fly` / `fade`) when an IntersectionObserver flips a flag, **or** CSS view-timeline with `animation-delay: calc(var(--i) * 80ms)`. Once only. Save GSAP for pin/scrub work.

### Shared-element / route morph

View Transition API (`document.startViewTransition`, `view-transition-name`).

### Magnetic / pointer follow

Pointer on the host element, CSS variables `--mx` `--my`, `radial-gradient` or `transform`. No render-loop `$state` spam if you can write vars directly on the node.

## 4. Anti-slop (keep)

- No Inter-default. Flare already uses Bricolage Grotesque + IBM Plex Mono. New work picks type with character, not the LLM default.
- No AI-purple mesh heroes.
- No 3 equal feature cards.
- No neon glow default.
- No `#000`. Use ink / charcoal (`#09090b` or warmer).
- No em-dash (`—`) as design garnish. Hyphen `-` only. Headlines, labels, body, quotes, buttons, alt text.
- No Jane Doe / John Doe, Acme, Nexus, SmartFlow, Unleash, Elevate, Seamless, Next-Gen, Game-changer.
- No version-label eyebrows (`V0.6`, `BETA`, `INVITE-ONLY`) unless the brief is a launch.
- No section-number eyebrows (`01 · Capabilities`, `00 / INDEX`).
- No Lorem Ipsum. Sentence case, not Title Case On Every Header.
- No decorative scroll cues (`Scroll to explore`).
- Cards only when elevation means hierarchy. Prefer spacing.
- One accent (ember). Warm grays, not mixed warm/cool.
- `min-h-[100dvh]` / `min-h-[100svh]`, not `h-screen`.
- CTA labels do not wrap at desktop. Focus rings stay visible.

## 5. Layout and type

- Break symmetry (VARIANCE 8): mixed spans, offset, not three identical columns.
- Bento: mixed cell sizes, one cell with a real visual (trace, beam, photo). Not five equal text tiles.
- Body ~65ch. Tight tracking on big headlines. `text-wrap: pretty` on display type.
- Double the air on marketing sections (DENSITY 3-4). Dashboards can pack; Flare sections should not.

## 6. Pre-flight (visual work)

- [ ] Design read + dials stated
- [ ] Real references used (not LLM-default spotlight / logo-marquee / equal bento)
- [ ] Flare stack only (`framer-motion` / `motion/react` out; GSAP only via `gsap.context()`)
- [ ] Motion motivated and actually running if MOTION > 4
- [ ] `prefers-reduced-motion` keeps layout
- [ ] No em-dash, no Inter-default, no purple mesh, no 3-equal cards, no neon, no `#000`
- [ ] No Jane Doe / Acme / Unleash / version eyebrows
- [ ] Copyable block still pastes (if you touched `src/blocks/`)
- [ ] Roster change has an OpenSpec proposal in the same PR
- [ ] Flare named as Flare. No other product names.

If a box fails, the pass is not done.
