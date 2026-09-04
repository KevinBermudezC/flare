<!--
  Flare · mask-reveal
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
  Type: Bricolage Grotesque + IBM Plex Mono (host loads fontsource).
  Media: pass mediaSrc, or this picsum still.
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	let {
		headline = 'Preview. Copy.',
		accent = 'ember',
		reduceMotion = false,
		mediaSrc = 'https://picsum.photos/id/1067/1920/1080'
	}: {
		headline?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
		mediaSrc?: string;
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
					{ clipPath: 'inset(0% 0% round 0px)', ease: 'none' },
					0
				)
					.fromTo(
						'.rim',
						{ top: '16%', right: '20%', bottom: '16%', left: '20%', borderRadius: 24 },
						{ top: 0, right: 0, bottom: 0, left: 0, borderRadius: 0, ease: 'none' },
						0
					)
					.fromTo('.media', { scale: 1.1 }, { scale: 1, ease: 'none' }, 0)
					.fromTo(
						'.copy h2',
						{ letterSpacing: '0.08em' },
						{ letterSpacing: '-0.04em', ease: 'none' },
						0
					)
					.fromTo('.caption', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.28);
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
	<div class="window">
		<img class="media" src={mediaSrc} alt="Ink city at dusk. Ember wash on the skyline." />
	</div>
	<div class="rim" aria-hidden="true"></div>
	<div class="copy">
		<p class="kicker">mask-reveal</p>
		<h2>{headline.trim() || 'Preview. Copy.'}</h2>
		<p class="caption">The window opens. The still goes full bleed.</p>
	</div>
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

	.window {
		position: absolute;
		inset: 0;
		overflow: hidden;
		clip-path: inset(16% 20% round 24px);
	}

	.media {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform-origin: center;
		background: #121214;
	}

	.rim {
		position: absolute;
		z-index: 1;
		inset: 16% 20%;
		border: 1px solid var(--accent);
		border-radius: 24px;
		pointer-events: none;
	}

	.copy {
		position: relative;
		z-index: 2;
		display: flex;
		height: 100dvh;
		flex-direction: column;
		justify-content: flex-end;
		padding: 0 8vw 10vh;
		max-width: 42rem;
	}

	.kicker {
		margin: 0 0 0.7rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
	}

	h2 {
		margin: 0;
		max-width: 14ch;
		font-size: clamp(1.45rem, 2.6vw, 2rem);
		font-weight: 620;
		line-height: 1.05;
		letter-spacing: -0.04em;
		text-shadow: 0 1px 18px rgba(9, 9, 11, 0.55);
	}

	.caption {
		margin: 0.85rem 0 0;
		max-width: 36ch;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 12px;
		line-height: 1.5;
		color: #c4bbb0;
		opacity: 0;
	}

	.reveal.reduce .window {
		clip-path: inset(0);
	}

	.reveal.reduce .rim {
		inset: 0;
		border-radius: 0;
	}

	.reveal.reduce .media {
		transform: none;
	}

	.reveal.reduce .caption {
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.window {
			clip-path: inset(0);
		}

		.rim {
			inset: 0;
			border-radius: 0;
		}

		.media {
			transform: none;
		}

		.caption {
			opacity: 1;
		}
	}
</style>
