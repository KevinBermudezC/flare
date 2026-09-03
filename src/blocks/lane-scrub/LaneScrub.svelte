<!--
  Flare · lane-scrub
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	const lanes = [
		{ mark: 'Pin', title: 'Pin the room', body: 'The viewport holds. The lane is the only thing that may move.' },
		{ mark: 'Drag', title: 'Drag the mark', body: 'Vertical distance becomes a horizontal walk. Ease is none.' },
		{ mark: 'Sit', title: 'Stretch, then sit', body: 'The wordmark goes elastic, then it locks back to type.' },
		{ mark: 'Go', title: 'Let the lane go', body: 'The pin releases. You are back in the page.' }
	];

	let root: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();

	$effect(() => {
		const wrap = root;
		const row = track;
		if (!wrap || !row) return;
		let ctx: gsap.Context | undefined;
		let cancelled = false;

		const run = () => {
			if (cancelled || !root || !track) return;
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

			ctx = gsap.context(() => {
				const distance = row.scrollWidth - window.innerWidth;
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: wrap,
						start: 'top top',
						end: () => `+=${Math.max(distance, window.innerHeight)}`,
						pin: true,
						scrub: 1,
						invalidateOnRefresh: true
					}
				});

				tl.to(row, { x: -distance, ease: 'none' }, 0)
					.fromTo('.mark', { scaleX: 1 }, { scaleX: 1.42, ease: 'none', duration: 0.35 }, 0)
					.to('.mark', { scaleX: 1, ease: 'none', duration: 0.35 }, 0.55);
			}, wrap);
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

<section bind:this={root} class="lane">
	<div class="hud">
		<p class="kicker">lane-scrub</p>
		<p class="mark">Flare</p>
	</div>

	<div bind:this={track} class="track">
		{#each lanes as lane}
			<article class="slide">
				<p class="idx">{lane.mark}</p>
				<h2>{lane.title}</h2>
				<p class="body">{lane.body}</p>
			</article>
		{/each}
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=IBM+Plex+Mono:wght@400;500&display=swap');

	.lane {
		position: relative;
		min-height: 100svh;
		overflow: hidden;
		background: #09090b;
		color: #f5f0ea;
		font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
	}

	.hud {
		position: absolute;
		z-index: 2;
		top: 1.25rem;
		right: 1.25rem;
		left: 1.25rem;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}

	.kicker {
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #ff5a1f;
	}

	.mark {
		margin: 0;
		font-size: clamp(2.5rem, 8vw, 5.5rem);
		font-weight: 780;
		letter-spacing: -0.07em;
		line-height: 0.8;
		transform-origin: right center;
	}

	.track {
		display: flex;
		height: 100svh;
		align-items: flex-end;
		width: max-content;
		padding: 7rem 8vw 4rem;
		gap: 4vw;
	}

	.slide {
		flex: 0 0 min(72vw, 38rem);
		min-height: 42vh;
		padding: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background:
			radial-gradient(80% 80% at 0% 100%, rgba(255, 90, 31, 0.16), transparent 55%),
			#111113;
	}

	.idx {
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		color: #8b8278;
	}

	h2 {
		margin: 1rem 0 0;
		font-size: clamp(2rem, 4vw, 3.4rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 0.95;
	}

	.body {
		margin: 1rem 0 0;
		max-width: 28rem;
		color: #a59c91;
		font-size: 1.05rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.lane {
			overflow: visible;
		}

		.track {
			flex-wrap: wrap;
			height: auto;
			width: auto;
			padding-top: 6rem;
		}

		.slide {
			flex-basis: 100%;
		}

		.mark {
			transform: none;
		}
	}
</style>
