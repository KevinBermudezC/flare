<!--
  Flare · chapter-pin
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
		lead = 'Rooms pin.',
		accent = 'ember',
		reduceMotion = false
	}: {
		lead?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	const rooms = $derived([
		{
			title: lead.trim() || 'Rooms pin.',
			body: 'The rail keeps count. Ink stays put.',
			fig: 'FIG 01',
			mark: 'ROOM 01 - ACTIVE',
			live: 0
		},
		{
			title: 'Ember holds.',
			body: 'One outline. The rest stays ink.',
			fig: 'FIG 02',
			mark: 'ROOM 02 - ACTIVE',
			live: 1
		},
		{
			title: 'Copy the file.',
			body: 'When the pin lets go, the chapter is yours.',
			fig: 'FIG 03',
			mark: 'ROOM 03 - ACTIVE',
			live: 2
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
						invalidateOnRefresh: true,
						onToggle: (self) => {
							if (self.isActive) active = i;
						}
					});
					if (last) return;
					gsap.to(card, {
						scale: 0.97,
						ease: 'none',
						scrollTrigger: {
							trigger: cards[i + 1],
							start: 'top bottom',
							end: 'top top',
							scrub: true,
							invalidateOnRefresh: true
						}
					});
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
	class="stack"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	<ol class="ticks" aria-label="Rooms">
		{#each rooms as room, i (room.fig)}
			<li>
				<a href="#room-{i + 1}" class:on={i === active}>
					<span class="tick"></span>
					{String(i + 1).padStart(2, '0')}
					<span class="sr">{room.title}</span>
				</a>
			</li>
		{/each}
	</ol>

	{#each rooms as room, i (room.fig)}
		<article class="room" id="room-{i + 1}">
			<div class="frame" aria-hidden="true">
				<span class="corner tl"></span>
				<span class="corner tr"></span>
				<span class="corner bl"></span>
				<span class="corner br"></span>
				<span class="hair"></span>
			</div>
			<p class="fig">{room.fig}</p>
			<div class="band">
				<div class="copy">
					<h2>{room.title}</h2>
					<p>{room.body}</p>
				</div>
				<div class="plates" aria-hidden="true">
					{#each [0, 1, 2] as plate (plate)}
						<span class="plate" class:ember={plate === room.live} style:--i={plate}>
							{#if plate === room.live}
								<span class="mark">{room.mark}</span>
							{/if}
						</span>
					{/each}
				</div>
			</div>
		</article>
	{/each}
</section>

<style>
	.stack {
		--ink: #09090b;
		--paper: #f5f0ea;
		--accent: #ff5a1f;
		--card: #111113;
		--hairline: rgba(245, 240, 234, 0.2);
		position: relative;
		background: var(--ink);
		color: var(--paper);
		font-family: var(--font-display, 'Unbounded Variable', Unbounded, ui-sans-serif, sans-serif);
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
		padding: 12vh 18vw 12vh 7vw;
		background: var(--ink);
		transform-origin: center top;
	}

	.frame {
		position: absolute;
		inset: 1.1rem 4.5rem 1.1rem 1.4rem;
		pointer-events: none;
	}

	.corner {
		position: absolute;
		width: 14px;
		height: 14px;
		border-color: var(--paper);
		border-style: solid;
		border-width: 0;
	}

	.tl {
		top: 0;
		left: 0;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	.tr {
		top: 0;
		right: 0;
		border-top-width: 1px;
		border-right-width: 1px;
	}

	.bl {
		bottom: 0;
		left: 0;
		border-bottom-width: 1px;
		border-left-width: 1px;
	}

	.br {
		bottom: 0;
		right: 0;
		border-bottom-width: 1px;
		border-right-width: 1px;
	}

	.hair {
		position: absolute;
		top: 0;
		left: 1.35rem;
		width: 18px;
		height: 1px;
		background: var(--accent);
	}

	.fig {
		position: relative;
		margin: 0 0 2.2rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.band {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(12rem, 22rem);
		gap: 2.5rem 3rem;
		align-items: center;
	}

	.copy {
		min-width: 0;
	}

	h2 {
		margin: 0;
		max-width: 9ch;
		font-size: clamp(2.6rem, 6vw, 4.6rem);
		font-weight: 720;
		line-height: 0.92;
		letter-spacing: -0.05em;
		text-wrap: pretty;
	}

	p {
		margin: 1rem 0 0;
		max-width: 28ch;
		font-family: var(--font-body, 'IBM Plex Sans', ui-sans-serif, sans-serif);
		font-size: 15px;
		line-height: 1.5;
		color: #c4bbb0;
	}

	.plates {
		position: relative;
		min-height: 14rem;
	}

	.plate {
		position: absolute;
		right: calc(var(--i) * 1.15rem);
		bottom: calc(var(--i) * 1.05rem);
		z-index: calc(1 + var(--i));
		width: 78%;
		height: 68%;
		border: 1px solid var(--hairline);
		background: var(--card);
	}

	.plate.ember {
		z-index: 5;
		border-color: var(--accent);
	}

	.mark {
		position: absolute;
		right: 0.85rem;
		bottom: 0.75rem;
		left: 0.85rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--paper);
	}

	@media (max-width: 768px) {
		.room {
			padding: 10vh 4.75rem 10vh 1.25rem;
		}

		.frame {
			inset: 0.9rem 3.6rem 0.9rem 0.85rem;
		}

		.band {
			grid-template-columns: 1fr;
			gap: 1.75rem;
		}

		.plates {
			min-height: 11rem;
		}

		h2 {
			font-size: clamp(2.2rem, 12vw, 3.2rem);
		}
	}

	.stack.reduce .room {
		position: relative;
		transform: none;
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
