<!--
  Flare · deck-pin
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	const cards = [
		{
			title: 'Hold the head',
			body: 'The kicker stays. Each card arrives under it, not beside it.'
		},
		{
			title: 'Stack the weight',
			body: 'The last card keeps full scale. The ones before it recede.'
		},
		{
			title: 'Keep the edge',
			body: 'A one-pixel ember line is enough. No glow, no mesh.'
		},
		{
			title: 'Release the pin',
			body: 'When the last card hits the top, the deck is done talking.'
		}
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
				const deck = gsap.utils.toArray<HTMLElement>('.card');
				deck.forEach((card, i) => {
					if (i === deck.length - 1) return;
					ScrollTrigger.create({
						trigger: card,
						start: 'top top',
						endTrigger: deck[deck.length - 1],
						end: 'top top',
						pin: true,
						pinSpacing: false
					});
					gsap.to(card, {
						scale: 0.92,
						opacity: 0.5,
						ease: 'none',
						scrollTrigger: {
							trigger: deck[i + 1],
							start: 'top bottom',
							end: 'top top',
							scrub: true
						}
					});
				});
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

<section bind:this={root} class="deck">
	<p class="head">deck-pin</p>
	{#each cards as card}
		<article class="card">
			<h2>{card.title}</h2>
			<p>{card.body}</p>
		</article>
	{/each}
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=IBM+Plex+Mono:wght@400&display=swap');

	.deck {
		position: relative;
		background: #09090b;
		color: #f5f0ea;
		font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
	}

	.head {
		position: sticky;
		top: 0;
		z-index: 3;
		margin: 0;
		padding: 1rem 6vw;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		background: color-mix(in oklab, #09090b 88%, transparent);
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: #ff5a1f;
	}

	.card {
		position: sticky;
		top: 0;
		display: flex;
		min-height: 100svh;
		flex-direction: column;
		justify-content: center;
		padding: 5rem 6vw 3rem;
		border-top: 1px solid rgba(255, 90, 31, 0.35);
		background:
			linear-gradient(180deg, rgba(255, 90, 31, 0.08), transparent 28%),
			#111113;
		transform-origin: center top;
	}

	.card:nth-child(odd) {
		background:
			linear-gradient(180deg, rgba(255, 90, 31, 0.12), transparent 32%),
			#0c0c0e;
	}

	h2 {
		margin: 0;
		max-width: 14ch;
		font-size: clamp(3rem, 9vw, 7rem);
		font-weight: 760;
		line-height: 0.86;
		letter-spacing: -0.06em;
	}

	p {
		margin: 1.25rem 0 0;
		max-width: 32rem;
		font-size: 1.15rem;
		color: #a59c91;
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			position: relative;
			transform: none;
			opacity: 1;
		}
	}
</style>
