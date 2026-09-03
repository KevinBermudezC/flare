<!--
  Flare · type-charge
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
  Type: Bricolage Grotesque + IBM Plex Mono (host loads fontsource).
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	let {
		word = 'CHARGE',
		accent = 'ember',
		reduceMotion = false
	}: {
		word?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	const glyphs = $derived([...(word.trim() || 'CHARGE').toUpperCase()]);
	const heat = $derived(glyphs.find((glyph) => 'AEIOU'.includes(glyph)) ?? glyphs[1] ?? glyphs[0] ?? '');

	let root: HTMLElement | undefined = $state();

	$effect(() => {
		const el = root;
		const live = word;
		const forced = reduceMotion;
		if (!el) return;
		void live;
		let ctx: gsap.Context | undefined;
		let cancelled = false;

		const run = () => {
			if (cancelled || !root) return;
			if (forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

			ctx = gsap.context(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: 'top top',
						end: '+=100%',
						pin: true,
						scrub: true
					}
				});

				tl.fromTo('.line', { scale: 0.94 }, { scale: 1, ease: 'none' }, 0)
					.to('.glyph', { yPercent: -18, opacity: 0, stagger: 0.02, ease: 'none' }, 0.72);
			}, el);
		};

		run();
		return () => {
			cancelled = true;
			ctx?.revert();
		};
	});
</script>

<section
	bind:this={root}
	class="charge"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	<p class="meta">Flare / type-charge</p>
	<h2 class="line" aria-label={word.trim() || 'CHARGE'}>
		{#each glyphs as glyph, i (i)}
			<span class="glyph" class:heat={glyph === heat}>{glyph}</span>
		{/each}
	</h2>
</section>

<style>
	.charge {
		--ink: #09090b;
		--paper: #f5f0ea;
		--accent: #ff5a1f;
		position: relative;
		display: grid;
		min-height: 100dvh;
		place-items: center;
		overflow: hidden;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
	}

	.charge.paper {
		--accent: #f5f0ea;
	}

	.meta {
		position: absolute;
		bottom: 1.25rem;
		left: 1.25rem;
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		color: var(--paper);
	}

	.line {
		display: flex;
		margin: 0;
		font-size: clamp(4.5rem, 22vw, 26vw);
		font-weight: 780;
		line-height: 0.8;
		letter-spacing: -0.06em;
		transform-origin: center;
	}

	.glyph {
		display: inline-block;
	}

	.heat {
		color: var(--accent);
	}

	.charge.reduce .glyph,
	.charge.reduce .line {
		transform: none;
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.glyph {
			transform: none;
			opacity: 1;
		}

		.line {
			transform: none;
		}
	}
</style>
