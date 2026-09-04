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
		word = 'FLARE',
		accent = 'ember',
		reduceMotion = false,
		atmosphere = true
	}: {
		word?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
		atmosphere?: boolean;
	} = $props();

	const glyphs = $derived([...(word.trim() || 'FLARE').toUpperCase()]);
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
	{#if atmosphere}
		<div class="field" aria-hidden="true">
			<div class="wash"></div>
			<div class="grid"></div>
			<div class="beam"></div>
			<div class="grain"></div>
		</div>
	{/if}
	<p class="meta">Flare / type-charge</p>
	<h2 class="line" aria-label={word.trim() || 'FLARE'}>
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

	.field {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}

	.wash {
		position: absolute;
		inset: -12%;
		background:
			radial-gradient(
				ellipse 58% 42% at 48% 54%,
				color-mix(in oklab, var(--accent) 24%, transparent),
				transparent 64%
			),
			radial-gradient(circle at 78% 12%, color-mix(in oklab, var(--paper) 7%, transparent), transparent 26%);
	}

	.grid {
		position: absolute;
		inset: 0;
		background:
			repeating-linear-gradient(
				0deg,
				transparent 0 56px,
				rgba(245, 240, 234, 0.04) 56px 57px
			),
			repeating-linear-gradient(
				90deg,
				transparent 0 56px,
				rgba(245, 240, 234, 0.04) 56px 57px
			);
		mask-image: radial-gradient(ellipse at 50% 48%, #000 12%, transparent 72%);
	}

	.beam {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				107deg,
				transparent 46.5%,
				color-mix(in oklab, var(--accent) 14%, transparent) 50%,
				transparent 53.5%
			),
			linear-gradient(98deg, transparent 61%, rgba(245, 240, 234, 0.045) 64%, transparent 67%);
	}

	.grain {
		position: absolute;
		inset: 0;
		opacity: 0.1;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E");
		background-size: 160px 160px;
	}

	.meta {
		position: absolute;
		z-index: 1;
		bottom: 1.25rem;
		left: 1.25rem;
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		color: var(--paper);
	}

	.line {
		position: relative;
		z-index: 1;
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
