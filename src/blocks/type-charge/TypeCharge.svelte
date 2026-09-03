<!--
  Flare · type-charge
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	const lines = [
		['Type', 'waits.'],
		['Then', 'it', 'charges'],
		['the', 'frame.']
	];

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
				const words = gsap.utils.toArray<HTMLElement>('.word');
				gsap.fromTo(
					words,
					{ yPercent: 130, rotate: 10, scale: 1.35, opacity: 0 },
					{
						yPercent: 0,
						rotate: 0,
						scale: 1,
						opacity: 1,
						stagger: 0.08,
						ease: 'none',
						scrollTrigger: {
							trigger: el,
							start: 'top top',
							end: '+=170%',
							pin: true,
							scrub: 0.45
						}
					}
				);
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

<section bind:this={root} class="charge">
	<div class="bar" aria-hidden="true">
		<span>Flare</span>
		<span>type-charge</span>
	</div>

	<h2 class="board">
		{#each lines as line}
			<span class="row">
				{#each line as word}
					<span class="slot">
						<span class="word">{word}</span>
					</span>
				{/each}
			</span>
		{/each}
	</h2>

	<p class="note">Each word locks as the pin walks the line.</p>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=IBM+Plex+Mono:wght@400&display=swap');

	.charge {
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
		padding: 1rem 1.25rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.board {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.12em;
		min-height: calc(100svh - 6rem);
		margin: 0;
		padding: 0 6vw 4rem;
		font-size: clamp(2.8rem, 9vw, 7.5rem);
		font-weight: 780;
		line-height: 0.92;
		letter-spacing: -0.06em;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.28em;
	}

	.slot {
		overflow: hidden;
		display: inline-block;
		padding-bottom: 0.06em;
	}

	.word {
		display: inline-block;
		transform-origin: left bottom;
	}

	.row:nth-child(2) .word {
		color: #ff5a1f;
	}

	.note {
		position: absolute;
		right: 1.25rem;
		bottom: 1.25rem;
		margin: 0;
		max-width: 22rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 12px;
		color: #8b8278;
	}

	@media (prefers-reduced-motion: reduce) {
		.word {
			transform: none;
			opacity: 1;
		}
	}
</style>
