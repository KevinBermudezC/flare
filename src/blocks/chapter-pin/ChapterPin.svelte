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

	let {
		lead = 'Ink',
		accent = 'ember',
		reduceMotion = false
	}: {
		lead?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	const rooms = $derived([
		{
			word: lead.trim() || 'Ink',
			field: 'lock',
			lines: ['The field is ink.', 'The rail keeps count.', 'Scroll pins the room.', 'Nothing else', 'enters here.']
		},
		{
			word: 'Ember',
			field: 'grid',
			lines: ['A thin ember line', 'is enough mark.', 'Leave the rest', 'in ink.', 'Preview holds.']
		},
		{
			word: 'Copy',
			field: 'flare',
			lines: ['Copy the chapter.', 'When the pin', 'lets go, the file', 'is yours.', 'Paste and run.']
		}
	]);

	let root: HTMLElement | undefined = $state();
	let active = $state(0);

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

<section
	bind:this={root}
	class="stack"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	<ol class="ticks" aria-label="Chapters">
		{#each rooms as room, i (room.field)}
			<li>
				<a href="#room-{i + 1}" class:on={i === active}>
					<span class="tick"></span>
					{String(i + 1).padStart(2, '0')}
					<span class="sr">{room.word}</span>
				</a>
			</li>
		{/each}
	</ol>

	{#each rooms as room, i (room.field)}
		<article class="room" id="room-{i + 1}" data-field={room.field}>
			<h2>{room.word}</h2>
			<p>
				{#each room.lines as line (line)}
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
		--accent: #ff5a1f;
		position: relative;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
	}

	.stack.paper {
		--accent: #f5f0ea;
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
		color: var(--accent);
	}

	.tick {
		width: 1px;
		height: 0.9rem;
		background: transparent;
	}

	.ticks .on .tick {
		background: var(--accent);
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

	.room[data-field='lock'] {
		background:
			radial-gradient(circle at 78% 18%, color-mix(in oklab, var(--accent) 32%, transparent), transparent 32%),
			var(--ink);
	}

	.room[data-field='grid'] {
		background:
			repeating-linear-gradient(
				0deg,
				transparent 0 47px,
				rgba(245, 240, 234, 0.06) 47px 48px
			),
			#111113;
	}

	.room[data-field='flare'] {
		background: #101012;
		box-shadow: inset 0 -8px 0 var(--accent);
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

	.stack.reduce .room {
		position: relative;
		transform: none;
		opacity: 1;
	}

	.stack.reduce .ticks {
		float: none;
		height: auto;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 1rem 6vw;
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
