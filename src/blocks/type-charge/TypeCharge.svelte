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

	const glyphs = ['C', 'H', 'A', 'R', 'G', 'E'] as const;

	let root: HTMLElement | undefined = $state();

	$effect(() => {
		const el = root;
		if (!el) return;
		let ctx: gsap.Context | undefined;
		let cancelled = false;

		const run = () => {
			if (cancelled || !root) return;
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

				tl.from('.glyph', {
					y: '0.55em',
					opacity: 0,
					stagger: 0.045,
					ease: 'power3.out'
				})
					.fromTo('.line', { scale: 0.94 }, { scale: 1, ease: 'none' }, 0.15)
					.to('.glyph', { yPercent: -18, opacity: 0, stagger: 0.02, ease: 'none' }, 0.78);
			}, el);
		};

		run();
		return () => {
			cancelled = true;
			ctx?.revert();
		};
	});
</script>

<section bind:this={root} class="charge">
	<p class="meta">Flare / type-charge</p>
	<h2 class="line" aria-label="Charge">
		{#each glyphs as glyph}
			<span class="glyph" class:ember={glyph === 'A'}>{glyph}</span>
		{/each}
	</h2>
</section>

<style>
	.charge {
		--ink: #09090b;
		--paper: #f5f0ea;
		--ember: #ff5a1f;
		position: relative;
		display: grid;
		min-height: 100dvh;
		place-items: center;
		overflow: hidden;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
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

	.ember {
		color: var(--ember);
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
