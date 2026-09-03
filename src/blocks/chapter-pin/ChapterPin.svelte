<!--
  Flare · chapter-pin
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	const rooms = [
		{
			word: 'Ember',
			line: 'The first room holds the heat. Nothing else is allowed in yet.'
		},
		{
			word: 'Beam',
			line: 'A cut of light walks the stack. The last room starts to thin.'
		},
		{
			word: 'Quiet',
			line: 'The pin lets go. You keep the weight of the rooms you passed.'
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
				const cards = gsap.utils.toArray<HTMLElement>('.room');
				cards.forEach((card, i) => {
					if (i === cards.length - 1) return;
					ScrollTrigger.create({
						trigger: card,
						start: 'top top',
						endTrigger: cards[cards.length - 1],
						end: 'top top',
						pin: true,
						pinSpacing: false
					});
					gsap.to(card, {
						scale: 0.9,
						opacity: 0.42,
						ease: 'none',
						scrollTrigger: {
							trigger: cards[i + 1],
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

<section bind:this={root} class="stack">
	{#each rooms as room, i}
		<article class="room">
			<p class="kicker">chapter-pin / room {i + 1}</p>
			<h2>{room.word}</h2>
			<p class="line">{room.line}</p>
		</article>
	{/each}
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=IBM+Plex+Mono:wght@400&display=swap');

	.stack {
		position: relative;
		background: #09090b;
		color: #f5f0ea;
		font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
	}

	.room {
		position: sticky;
		top: 0;
		display: flex;
		min-height: 100svh;
		flex-direction: column;
		justify-content: flex-end;
		padding: 2rem 6vw 3.5rem;
		background:
			radial-gradient(70% 60% at 80% 0%, rgba(255, 90, 31, 0.2), transparent 50%),
			linear-gradient(180deg, #141416 0%, #09090b 58%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		transform-origin: center top;
	}

	.room:nth-child(2) {
		background:
			radial-gradient(55% 50% at 10% 20%, rgba(255, 90, 31, 0.22), transparent 46%),
			#0c0c0e;
	}

	.room:nth-child(3) {
		background: #09090b;
	}

	.kicker {
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #ff5a1f;
	}

	h2 {
		margin: 0.8rem 0 0;
		font-size: clamp(4.5rem, 16vw, 12rem);
		font-weight: 780;
		line-height: 0.78;
		letter-spacing: -0.07em;
	}

	.line {
		margin: 1.25rem 0 0;
		max-width: 28rem;
		font-size: 1.15rem;
		color: #c4bbb0;
	}

	@media (prefers-reduced-motion: reduce) {
		.room {
			position: relative;
			transform: none;
			opacity: 1;
		}
	}
</style>
