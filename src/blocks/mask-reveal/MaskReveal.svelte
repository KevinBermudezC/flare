<!--
  Flare · mask-reveal
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
		headline = 'Open the cut',
		accent = 'ember',
		reduceMotion = false
	}: {
		headline?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	let root: HTMLElement | undefined = $state();

	$effect(() => {
		const el = root;
		const forced = reduceMotion;
		if (!el) return;
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
						end: '+=160%',
						pin: true,
						scrub: 0.8
					}
				});

				tl.fromTo(
					'.window',
					{ clipPath: 'inset(16% 20% round 24px)' },
					{ clipPath: 'inset(0% round 0px)', ease: 'none' },
					0
				).fromTo('.media', { scale: 1.1 }, { scale: 1, ease: 'none' }, 0);
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
	class="reveal"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	<div class="media" aria-hidden="true"></div>
	<div class="window">
		<div class="inner">
			<h2>{headline.trim() || 'Open the cut'}</h2>
		</div>
	</div>
	<p class="meta">mask-reveal</p>
</section>

<style>
	.reveal {
		--ink: #09090b;
		--paper: #f5f0ea;
		--accent: #ff5a1f;
		position: relative;
		min-height: 100dvh;
		overflow: hidden;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
	}

	.reveal.paper {
		--accent: #f5f0ea;
	}

	.media {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 70% 40%, rgba(90, 96, 104, 0.35), transparent 28%),
			repeating-linear-gradient(90deg, rgba(245, 240, 234, 0.05) 0 10px, transparent 10px 34px),
			linear-gradient(180deg, #1c1f24 0%, #0c0e12 46%, #15120e 100%);
		transform-origin: center;
	}

	.media::after {
		content: '';
		position: absolute;
		inset: 18% 8% auto;
		height: 28%;
		background: linear-gradient(90deg, transparent, rgba(180, 186, 196, 0.28), transparent);
		filter: blur(0.5px);
	}

	.window {
		position: absolute;
		inset: 0;
		clip-path: inset(16% 20% round 24px);
	}

	.inner {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 10vw;
		background: var(--ink);
		box-shadow: inset 0 0 0 1px var(--accent);
	}

	h2 {
		margin: 0;
		max-width: 12ch;
		font-size: clamp(2.5rem, 5vw, 3.25rem);
		font-weight: 700;
		line-height: 0.95;
		letter-spacing: -0.04em;
	}

	.meta {
		position: absolute;
		bottom: 1rem;
		left: 1.25rem;
		z-index: 2;
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		color: #8b8278;
	}

	.reveal.reduce .window {
		clip-path: inset(0);
	}

	.reveal.reduce .media {
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.window {
			clip-path: inset(0);
		}

		.media {
			transform: none;
		}
	}
</style>
