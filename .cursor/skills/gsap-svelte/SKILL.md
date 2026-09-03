---
name: gsap-svelte
description: Official GSAP in Svelte 5 for Flare blocks. gsap.context(), $effect cleanup, reduced-motion, one animation runtime per tree.
---

# GSAP in Svelte 5

Use official `gsap` (and ScrollTrigger when the brief needs pin/scrub). This is a library recipe, not a comparison.

Cheap hover and fade stay on CSS + `svelte/transition`. Reach for GSAP when the motion is a timeline, a sticky stack, a scroll hijack, or kinetic type.

Also read [design-taste-frontend](../design-taste-frontend/SKILL.md) and [svelte-5](../svelte-5/SKILL.md).

## Setup

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}
```

Register plugins on the client only. Document `pnpm add gsap` on the block page when a copyable block needs it.

## Context and cleanup

Scope every tween to a root node. Revert on destroy.

```svelte
<script lang="ts">
	import { gsap } from 'gsap';

	let root: HTMLElement | undefined = $state();

	$effect(() => {
		const el = root;
		if (!el) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = gsap.context(() => {
			gsap.from('.line', { y: 16, opacity: 0, stagger: 0.06, duration: 0.6 });
		}, el);

		return () => ctx.revert();
	});
</script>

<section bind:this={root}>
	<!-- targets -->
</section>
```

`ctx.revert()` kills tweens, ScrollTriggers, and inline styles created in that context. Do not leave stray `ScrollTrigger.getAll()` loops as the only cleanup.

## Reduced motion

If `prefers-reduced-motion: reduce`, skip the context. Keep the layout and the first-state content. Infinite loops, parallax, and pin/scrub become static.

## One runtime per tree

Do not mix GSAP with `framer-motion`, `motion/react`, or `@humanspeak/svelte-motion` in the same component tree. They fight over frames.

## Do not

- `window.addEventListener('scroll')` driving `$state`
- Animate `top` / `left` / `width` / `height` (use `transform` and `opacity`)
- Import GSAP from a Recorte 1 file that the spec says stays CSS-only
- Add `gsap` to this repo unless the OpenSpec change names it
