<!--
  Flare · chapter-pin
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
  Type: Bricolage Grotesque + IBM Plex Mono (host loads fontsource).
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	const rooms = [
		{
			word: 'Capture',
			lines: ['The work begins', 'when you stop', 'scrolling and start', 'seeing. Capture', 'what matters.']
		},
		{
			word: 'Hold',
			lines: ['Keep the room still.', 'The next cut can wait.', 'Hold the weight', 'until the rail', 'ticks forward.']
		},
		{
			word: 'Cut',
			lines: ['A thin ember line', 'is enough mark.', 'Cut the frame.', 'Leave the rest', 'in ink.']
		},
		{
			word: 'Beam',
			lines: ['Light walks the', 'stack from the top.', 'The last room', 'starts to thin', 'before it leaves.']
		},
		{
			word: 'Quiet',
			lines: ['No bounce.', 'No cue to scroll.', 'The pin is the', 'only instruction', 'in the room.']
		},
		{
			word: 'Release',
			lines: ['The last card', 'keeps spacing.', 'You leave with', 'the rooms you', 'already held.']
		}
	];

	let root: HTMLElement | undefined = $state();
	let active = $state(0);

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
					const last = i === cards.length - 1;
					ScrollTrigger.create({
						trigger: card,
						start: 'top top',
						endTrigger: last ? card : cards[cards.length - 1],
						end: last ? '+=100%' : 'top top',
						pin: true,
						pinSpacing: last,
						onToggle: (self) => {
							if (self.isActive) active = i;
						}
					});
					if (last) return;
					gsap.to(card, {
						scale: 0.97,
						opacity: 0.5,
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

		run();
		return () => {
			cancelled = true;
			ctx?.revert();
		};
	});
</script>

<section bind:this={root} class="stack">
	<ol class="ticks" aria-label="Chapters">
		{#each rooms as room, i}
			<li>
				<a href="#room-{i + 1}" class:on={i === active}>
					<span class="tick"></span>
					{String(i + 1).padStart(2, '0')}
					<span class="sr">{room.word}</span>
				</a>
			</li>
		{/each}
	</ol>

	{#each rooms as room, i}
		<article class="room" id="room-{i + 1}">
			<h2>{room.word}</h2>
			<p>
				{#each room.lines as line}
					<span>{line}</span>
				{/each}
			</p>
		</article>
	{/each}
</section>

<style>
	.stack {
		--ink: #09090b;
		--paper: #f5f0ea;
		--ember: #ff5a1f;
		position: relative;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
	}

	.ticks {
		position: sticky;
		top: 0;
		z-index: 3;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.85rem;
		float: right;
		height: 100dvh;
		margin: 0;
		padding: 0 1.25rem 0 0;
		list-style: none;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 12px;
		color: #8b8278;
	}

	.ticks a {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		color: inherit;
		text-decoration: none;
	}

	.ticks .on {
		color: var(--ember);
	}

	.tick {
		width: 1px;
		height: 0.9rem;
		background: transparent;
	}

	.ticks .on .tick {
		background: var(--ember);
	}

	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}

	.room {
		position: relative;
		display: flex;
		min-height: 100dvh;
		flex-direction: column;
		justify-content: center;
		padding: 12vh 22vw 12vh 8vw;
		background: var(--ink);
		transform-origin: center top;
	}

	h2 {
		margin: 0;
		font-size: clamp(4rem, 10vw, 7.5rem);
		font-weight: 760;
		line-height: 0.86;
		letter-spacing: -0.05em;
	}

	p {
		display: flex;
		flex-direction: column;
		margin: 1.5rem 0 0;
		max-width: 22rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 14px;
		line-height: 1.55;
		color: var(--paper);
	}

	@media (prefers-reduced-motion: reduce) {
		.room {
			position: relative;
			transform: none;
			opacity: 1;
		}

		.ticks {
			float: none;
			height: auto;
			flex-direction: row;
			flex-wrap: wrap;
			padding: 1rem 6vw;
		}
	}
</style>
