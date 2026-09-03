<!--
  Flare · deck-pin
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
  Type: Bricolage Grotesque + IBM Plex Mono (host loads fontsource).
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	const cards = [
		{
			title: 'deck-pin',
			body: 'A focused way to pin thoughts, ink them, and keep them close.'
		},
		{
			title: 'Hold the head',
			body: 'The incoming card takes the top. The last one keeps full scale.'
		},
		{
			title: 'Keep the line',
			body: 'One ember hairline on the front card. Nothing else needs to glow.'
		},
		{
			title: 'Release',
			body: 'When the last card hits the top, the deck is done talking.'
		}
	];

	let root: HTMLElement | undefined = $state();
	let front = $state(0);

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
					const last = i === deck.length - 1;
					ScrollTrigger.create({
						trigger: card,
						start: 'top top',
						endTrigger: last ? card : deck[deck.length - 1],
						end: last ? 'bottom bottom' : 'top top',
						pin: last ? false : true,
						pinSpacing: false,
						onToggle: (self) => {
							if (self.isActive) front = i;
						}
					});
					if (last) return;
					gsap.to(card, {
						scale: 0.92,
						opacity: 0.55,
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

		run();
		return () => {
			cancelled = true;
			ctx?.revert();
		};
	});
</script>

<section bind:this={root} class="deck">
	{#each cards as card, i}
		<article class="card" class:front={i === front}>
			<h2>{card.title}</h2>
			<p>{card.body}</p>
		</article>
	{/each}
</section>

<style>
	.deck {
		--ink: #09090b;
		--paper: #f5f0ea;
		--ember: #ff5a1f;
		--card: #111113;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
	}

	.card {
		position: sticky;
		top: 0;
		display: flex;
		min-height: 100dvh;
		flex-direction: column;
		justify-content: flex-end;
		padding: 8vh 8vw 12vh;
		border-radius: 12px 12px 0 0;
		background: var(--card);
		box-shadow: 0 -40px 80px rgba(0, 0, 0, 0.35);
		transform-origin: center top;
	}

	.card.front {
		box-shadow:
			inset 0 1px 0 var(--ember),
			0 -40px 80px rgba(0, 0, 0, 0.35);
	}

	h2 {
		margin: 0;
		max-width: 12ch;
		font-size: clamp(3.2rem, 8vw, 6.5rem);
		font-weight: 760;
		line-height: 0.86;
		letter-spacing: -0.05em;
	}

	p {
		margin: 1.1rem 0 0;
		max-width: 36rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 14px;
		line-height: 1.6;
		color: var(--paper);
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			position: relative;
			transform: none;
			opacity: 1;
		}
	}
</style>
