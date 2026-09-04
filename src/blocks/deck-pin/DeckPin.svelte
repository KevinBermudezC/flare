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

	let {
		lead = 'Preview',
		accent = 'ember',
		reduceMotion = false
	}: {
		lead?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	const cards = $derived([
		{
			kind: 'front',
			title: lead.trim() || 'Preview',
			body: 'Front card. One ember hairline. Live on the page. This is Flare.'
		},
		{
			kind: 'mid',
			title: 'Copy',
			body: 'The unit is the .svelte. Preview, then copy. No kit, no registry.'
		},
		{
			kind: 'back',
			title: 'Yours',
			body: 'When the pin ends, the chapter is yours. Paste it. Add gsap.'
		}
	]);

	let root: HTMLElement | undefined = $state();
	let front = $state(0);

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

<section
	bind:this={root}
	class="deck"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	{#each cards as card, i (card.kind)}
		<article class="card" class:front={i === front} data-kind={card.kind}>
			<h2>{card.title}</h2>
			<p>{card.body}</p>
		</article>
	{/each}
</section>

<style>
	.deck {
		--ink: #09090b;
		--paper: #f5f0ea;
		--accent: #ff5a1f;
		--card: #111113;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
	}

	.deck.paper {
		--accent: #f5f0ea;
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

	.card[data-kind='front'] {
		background:
			radial-gradient(circle at 88% 12%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 28%),
			var(--card);
	}

	.card[data-kind='mid'] {
		background: #161618;
	}

	.card[data-kind='back'] {
		background: linear-gradient(180deg, #1a1a1e, #111113);
		box-shadow: inset 0 -6px 0 rgba(245, 240, 234, 0.16), 0 -40px 80px rgba(0, 0, 0, 0.35);
	}

	.card.front {
		box-shadow:
			inset 0 1px 0 var(--accent),
			0 -40px 80px rgba(0, 0, 0, 0.35);
	}

	.card.front[data-kind='back'] {
		box-shadow:
			inset 0 1px 0 var(--accent),
			inset 0 -6px 0 rgba(245, 240, 234, 0.16),
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

	.deck.reduce .card {
		position: relative;
		transform: none;
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			position: relative;
			transform: none;
			opacity: 1;
		}
	}
</style>
