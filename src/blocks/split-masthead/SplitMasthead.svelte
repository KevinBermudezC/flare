<!--
  Flare · split-masthead
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
-->
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
						end: '+=180%',
						pin: true,
						scrub: 0.65
					}
				});

				tl.to('.word-a', { xPercent: -14, yPercent: -6, ease: 'none' }, 0)
					.to('.word-b', { xPercent: 16, yPercent: 8, ease: 'none' }, 0)
					.fromTo('.rule', { scaleY: 0 }, { scaleY: 1, ease: 'none' }, 0)
					.fromTo('.line', { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.12, ease: 'none' }, 0.25);
			}, el);
		};

		const fonts = document.fonts;
		if (fonts?.ready) {
			fonts.ready.then(run);
		} else {
			run();
		}

		return () => {
			cancelled = true;
			ctx?.revert();
		};
	});
</script>

<section bind:this={root} class="mast">
	<div class="bar" aria-hidden="true">
		<span>Flare</span>
		<span class="bar-mid">split-masthead</span>
		<span>hold / still</span>
	</div>

	<div class="stage">
		<p class="word word-a">Hold</p>
		<span class="rule" aria-hidden="true"></span>
		<p class="word word-b">Still</p>
	</div>

	<div class="foot">
		<p class="line">The first frame is a cut.</p>
		<p class="line mute">Two weights. One pin. Then the room opens.</p>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=IBM+Plex+Mono:wght@400;500&display=swap');

	.mast {
		position: relative;
		min-height: 100svh;
		overflow: hidden;
		background: #09090b;
		color: #f5f0ea;
		font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
	}

	.bar {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.bar-mid {
		color: #ff5a1f;
	}

	.stage {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		min-height: calc(100svh - 7.5rem);
		padding: 0 4vw;
		gap: 1.5vw;
	}

	.word {
		margin: 0;
		font-size: clamp(4.5rem, 18vw, 14rem);
		font-weight: 760;
		line-height: 0.78;
		letter-spacing: -0.07em;
		text-wrap: pretty;
	}

	.word-a {
		text-align: right;
	}

	.word-b {
		color: #c4bbb0;
	}

	.rule {
		width: 1px;
		height: min(42vh, 22rem);
		background: #ff5a1f;
		transform-origin: center top;
	}

	.foot {
		position: absolute;
		right: 1.25rem;
		bottom: 1.25rem;
		left: 1.25rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.75rem;
		font-size: clamp(1rem, 2vw, 1.25rem);
	}

	.mute {
		color: #8b8278;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 12px;
	}

	.line {
		margin: 0;
	}

	@media (max-width: 720px) {
		.stage {
			grid-template-columns: 1fr;
			justify-items: start;
			min-height: calc(100svh - 9rem);
			padding-top: 8vh;
		}

		.word-a,
		.word-b {
			text-align: left;
		}

		.rule {
			height: 1px;
			width: min(48vw, 12rem);
			transform-origin: left center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.rule {
			transform: none;
		}
	}
</style>
