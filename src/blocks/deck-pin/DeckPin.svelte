<!--
  Flare · deck-pin
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
  Type: Unbounded + IBM Plex Sans (host loads fontsource). IBM Plex Mono for HUD/meta.
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
					const face = card.querySelector('.face');
					const plate = card.querySelector('.plate');

					// Copy sits on the lower edge when the card is seated.
					// While the card is still rising, pull that line up into the visible strip
					// so the incoming face is never an empty panel.
					if (face instanceof HTMLElement) {
						const place = () => {
							const vh = window.innerHeight;
							const cardTop = card.getBoundingClientRect().top;
							const cardHeight = card.offsetHeight;
							const faceH = face.offsetHeight;
							const pad = 16;
							const cssBottom = vh * 0.12;
							const bottomInset = Math.max(cssBottom, faceH + pad);
							const cssTop = cardTop + cardHeight - cssBottom - faceH;
							const seatedTop = cardTop + cardHeight - bottomInset - faceH;
							const visibleBottom = Math.min(vh - pad, cardTop + cardHeight - bottomInset);
							const target = Math.min(Math.max(visibleBottom - faceH, cardTop + pad), seatedTop);
							gsap.set(face, { y: target - cssTop });
						};

						ScrollTrigger.create({
							trigger: card,
							start: 'top bottom',
							end: 'top top',
							invalidateOnRefresh: true,
							onRefresh: place,
							onUpdate: place
						});
						place();
					}

					if (last) {
						ScrollTrigger.create({
							trigger: card,
							start: 'top top',
							end: 'bottom bottom',
							invalidateOnRefresh: true,
							onToggle: (self) => {
								if (self.isActive) front = i;
							}
						});
						return;
					}
					ScrollTrigger.create({
						trigger: card,
						start: 'top top',
						endTrigger: deck[deck.length - 1],
						end: 'top top',
						pin: true,
						pinSpacing: false,
						invalidateOnRefresh: true,
						onToggle: (self) => {
							if (self.isActive) front = i;
						}
					});
					gsap.to(card, {
						opacity: 0.55,
						ease: 'none',
						scrollTrigger: {
							trigger: deck[i + 1],
							start: 'top bottom',
							end: 'top top',
							scrub: true,
							invalidateOnRefresh: true
						}
					});
					if (plate instanceof HTMLElement) {
						gsap.to(plate, {
							scale: 0.92,
							ease: 'none',
							scrollTrigger: {
								trigger: deck[i + 1],
								start: 'top bottom',
								end: 'top top',
								scrub: true,
								invalidateOnRefresh: true
							}
						});
					}
				});
			}, el);

			void document.fonts?.ready.then(() => {
				if (!cancelled) ScrollTrigger.refresh();
			});
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
			<div class="plate" aria-hidden="true"></div>
			<div class="face">
				<h2>{card.title}</h2>
				<p>{card.body}</p>
			</div>
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
		font-family: var(--font-display, 'Unbounded Variable', Unbounded, ui-sans-serif, sans-serif);
	}

	.deck.paper {
		--accent: #f5f0ea;
	}

	.card {
		position: sticky;
		top: 0;
		min-height: 100dvh;
	}

	.plate {
		position: absolute;
		inset: 0;
		border-radius: 12px 12px 0 0;
		background: var(--card);
		box-shadow: 0 -40px 80px rgba(0, 0, 0, 0.35);
		transform-origin: center top;
	}

	.face {
		position: absolute;
		z-index: 1;
		right: 8vw;
		bottom: 12vh;
		left: 8vw;
	}

	.card[data-kind='front'] .plate {
		background:
			radial-gradient(circle at 88% 12%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 28%),
			var(--card);
	}

	.card[data-kind='mid'] .plate {
		background: #161618;
	}

	.card[data-kind='back'] .plate {
		background: linear-gradient(180deg, #1a1a1e, #111113);
		box-shadow: inset 0 -6px 0 rgba(245, 240, 234, 0.16), 0 -40px 80px rgba(0, 0, 0, 0.35);
	}

	.card.front .plate {
		box-shadow:
			inset 0 1px 0 var(--accent),
			0 -40px 80px rgba(0, 0, 0, 0.35);
	}

	.card.front[data-kind='back'] .plate {
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
		font-family: var(--font-body, 'IBM Plex Sans', ui-sans-serif, sans-serif);
		font-size: 14px;
		line-height: 1.6;
		color: var(--paper);
	}

	.deck.reduce .card {
		position: relative;
		opacity: 1;
	}

	.deck.reduce .plate {
		transform: none;
	}

	.deck.reduce .face {
		position: sticky;
		top: 8vh;
		right: auto;
		bottom: auto;
		left: auto;
		margin: 8vh 8vw 12vh;
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			position: relative;
			opacity: 1;
		}

		.plate {
			transform: none;
		}

		.face {
			position: sticky;
			top: 8vh;
			right: auto;
			bottom: auto;
			left: auto;
			margin: 8vh 8vw 12vh;
		}
	}
</style>
