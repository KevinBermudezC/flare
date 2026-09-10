<!--
  Flare · split-masthead
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
		lead = 'Flare',
		accent = 'ember',
		reduceMotion = false
	}: {
		lead?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	const words = $derived([lead.trim() || 'Flare', 'Preview', 'Copy']);

	const rooms = $derived([
		{
			title: 'Flare is the spine.',
			body: 'The left column holds the word. The right column is the walk. Ink stays put.',
			shot: 'lock' as const,
			fig: 'FIG 01'
		},
		{
			title: 'Preview is the live chapter.',
			body: 'Scroll is the only transport. You watch the frame while it is still loose.',
			shot: 'cut' as const,
			fig: 'FIG 02'
		},
		{
			title: 'Copy the file. It is yours.',
			body: 'Paste the .svelte. Add gsap. The pin still runs.',
			shot: 'keep' as const,
			fig: 'FIG 03'
		}
	]);

	let root: HTMLElement | undefined = $state();
	let rail: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();
	let active = $state(0);
	let fills = $state([0, 0, 0]);

	function unitFill(value: number): number {
		if (!Number.isFinite(value) || value <= 0.001) return 0;
		if (value >= 0.999) return 1;
		return value;
	}

	function fillsFromWalk(progress: number, count: number): number[] {
		const safeCount = Math.max(0, count);
		const p = unitFill(progress);
		if (safeCount === 0) return [];
		if (p <= 0) return Array.from({ length: safeCount }, () => 0);
		if (p >= 1) return Array.from({ length: safeCount }, () => 1);
		const t = p * safeCount;
		return Array.from({ length: safeCount }, (_, i) => unitFill(t - i));
	}

	function paintWalk(progress: number, count: number) {
		fills = fillsFromWalk(progress, count);
		if (count <= 0) {
			active = 0;
			return;
		}
		const p = unitFill(progress);
		if (p >= 1) active = count - 1;
		else if (p <= 0) active = 0;
	}

	$effect(() => {
		const el = root;
		const left = rail;
		const right = track;
		const forced = reduceMotion;
		if (!el || !left || !right) return;
		let ctx: gsap.Context | undefined;
		let cancelled = false;

		const run = () => {
			if (cancelled || !root || !rail || !track) return;
			const reduced = forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			ctx = gsap.context(() => {
				const steps = gsap.utils.toArray<HTMLElement>('.room');
				const count = steps.length;
				paintWalk(0, count);

				steps.forEach((step, i) => {
					ScrollTrigger.create({
						trigger: step,
						start: 'top 45%',
						end: 'bottom 45%',
						invalidateOnRefresh: true,
						onToggle: (self) => {
							if (self.isActive) active = i;
						}
					});
				});

				if (reduced) return;

				gsap.set('.word', { opacity: 1, x: 0, y: 0 });

				const stacked = el.clientWidth <= 768;
				ScrollTrigger.create({
					trigger: stacked ? el : left,
					start: 'top top',
					endTrigger: right,
					end: 'bottom bottom',
					pin: stacked ? false : true,
					pinSpacing: false,
					scrub: true,
					invalidateOnRefresh: true,
					onRefreshInit: () => {
						gsap.set('.word', { opacity: 1, x: 0, y: 0 });
					},
					onUpdate: (self) => {
						paintWalk(self.progress, count);
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
	class="mast"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	<div class="shell">
		<aside bind:this={rail} class="rail">
			<div class="rail-lock">
				<p class="meta">SPLIT</p>
				<div class="words">
					{#each words as word, i (word + i)}
						<p class="line" class:on={i === active}>
							<span class="idx">{String(i + 1).padStart(2, '0')}</span>
							<span
								class="word"
								class:empty={unitFill(fills[i] ?? 0) === 0}
								class:full={unitFill(fills[i] ?? 0) === 1}
								data-fill={unitFill(fills[i] ?? 0)}
								style:--fill={`${unitFill(fills[i] ?? 0) * 100}%`}
							>
								<span class="idle">{word}</span>
								<span class="ember" aria-hidden="true">{word}</span>
							</span>
						</p>
					{/each}
				</div>
				<p class="progress">
					<span>{String(active + 1).padStart(2, '0')}</span>
					<span>/ 03</span>
				</p>
			</div>
		</aside>
		<div bind:this={track} class="track">
			{#each rooms as room, i (room.shot)}
				<article class="room">
					<p class="room-idx">{String(i + 1).padStart(2, '0')}</p>
					<h2>{room.title}</h2>
					<p class="lede">{room.body}</p>
					<figure class="shot" data-shot={room.shot}>
						<div class="subject" aria-hidden="true">
							<span class="wash"></span>
							<span class="grid"></span>
							<span class="rule"></span>
							{#if room.shot === 'lock'}
								<span class="crop"></span>
								<span class="cross"></span>
								<span class="specimen">FLARE</span>
							{:else if room.shot === 'cut'}
								<span class="slats"></span>
								<span class="head"></span>
								<span class="window"></span>
								<span class="specimen">LIVE</span>
							{:else}
								<span class="bar"></span>
								<span class="ghost">COPY</span>
								<span class="strip"></span>
							{/if}
						</div>
						<figcaption>{room.fig}</figcaption>
					</figure>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.mast {
		--ink: #09090b;
		--paper: #f5f0ea;
		--accent: #ff5a1f;
		container-type: inline-size;
		background: var(--ink);
		color: var(--paper);
		font-family: var(--font-display, 'Unbounded Variable', Unbounded, ui-sans-serif, sans-serif);
	}

	.mast.paper {
		--accent: #f5f0ea;
	}

	.shell {
		display: grid;
		grid-template-columns: minmax(11rem, 38%) 1fr;
		align-items: start;
		min-height: 100dvh;
	}

	.rail {
		position: relative;
		z-index: 2;
		align-self: start;
		height: 100dvh;
		max-height: 100dvh;
		min-height: 100dvh;
		overflow: hidden;
		border-right: 1px solid rgba(245, 240, 234, 0.16);
		background: var(--ink);
	}

	.rail-lock {
		container-type: inline-size;
		position: sticky;
		top: 0;
		display: flex;
		height: 100dvh;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.25rem max(12px, 1rem) 1.35rem 1.25rem;
		background: var(--ink);
	}

	.meta,
	.idx,
	.progress,
	.room-idx,
	figcaption {
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.words {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		justify-content: center;
		gap: 0.35rem;
	}

	.line {
		display: grid;
		grid-template-columns: 1.55rem minmax(0, 1fr);
		align-items: baseline;
		gap: 0.4rem;
		margin: 0;
		min-width: 0;
		padding-bottom: 0.22rem;
		border-bottom: 1px solid transparent;
	}

	.line.on {
		border-bottom-color: var(--accent);
	}

	.line.on .idx::before {
		content: '';
		position: absolute;
		left: -0.45rem;
		top: 0.55em;
		width: 5px;
		height: 5px;
		background: var(--accent);
	}

	.line.on .idx,
	.progress span:first-child {
		color: var(--accent);
	}

	.idx {
		position: relative;
	}

	.word {
		position: relative;
		display: block;
		min-width: 0;
		overflow: hidden;
		font-size: clamp(2.25rem, 18cqi, 5rem);
		font-weight: 720;
		line-height: 0.92;
		letter-spacing: -0.05em;
		white-space: nowrap;
		opacity: 1;
		color: var(--paper);
	}

	.idle,
	.ember {
		display: block;
	}

	.ember {
		position: absolute;
		top: 0;
		left: 0;
		color: var(--accent);
		pointer-events: none;
	}

	.idle {
		clip-path: inset(0 0 var(--fill, 0%) 0);
	}

	.word.empty .ember {
		visibility: hidden;
	}

	.word.full .idle {
		visibility: hidden;
	}

	.mast.reduce .ember {
		display: none;
	}

	.mast.reduce .idle {
		clip-path: none;
	}

	.mast.reduce .line.on .idle {
		color: var(--accent);
	}

	.progress {
		display: flex;
		gap: 0.4rem;
	}

	.track {
		padding: 14vh 6vw 20vh;
	}

	.room {
		position: relative;
		min-height: 88dvh;
		padding: 0.2rem 0 12vh;
	}

	.room-idx {
		position: absolute;
		top: 0;
		right: 0;
	}

	h2 {
		margin: 0;
		max-width: 16ch;
		font-size: clamp(1.55rem, 2.2vw, 2rem);
		font-weight: 560;
		letter-spacing: -0.03em;
		line-height: 1.15;
	}

	.lede {
		margin: 1rem 0 0;
		max-width: 48ch;
		font-family: var(--font-body, 'IBM Plex Sans', ui-sans-serif, sans-serif);
		font-size: 13px;
		line-height: 1.7;
		color: #c4bbb0;
	}

	.shot {
		margin: 2rem 0 0;
		max-width: 42rem;
	}

	.subject {
		position: relative;
		height: min(38vh, 20rem);
		overflow: hidden;
		border: 1px solid rgba(245, 240, 234, 0.2);
		background: #101012;
	}

	.wash,
	.grid,
	.rule,
	.crop,
	.cross,
	.slats,
	.head,
	.window,
	.specimen,
	.bar,
	.ghost,
	.strip {
		position: absolute;
		pointer-events: none;
	}

	.wash {
		inset: -20%;
		background: radial-gradient(
			ellipse 60% 50% at 28% 70%,
			color-mix(in oklab, var(--accent) 36%, transparent),
			transparent 62%
		);
	}

	.grid {
		inset: 0;
		background:
			repeating-linear-gradient(0deg, transparent 0 20px, rgba(245, 240, 234, 0.055) 20px 21px),
			repeating-linear-gradient(90deg, transparent 0 20px, rgba(245, 240, 234, 0.04) 20px 21px);
		mask-image: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent);
	}

	.rule {
		top: 0.7rem;
		right: 0.75rem;
		bottom: 0.7rem;
		width: 10px;
		background: repeating-linear-gradient(180deg, var(--accent) 0 2px, transparent 2px 12px);
		opacity: 0.7;
	}

	.shot[data-shot='lock'] .crop {
		inset: 12% 14%;
		border: 1px solid rgba(245, 240, 234, 0.28);
		background:
			linear-gradient(var(--accent), var(--accent)) 0 0 / 18px 1px no-repeat,
			linear-gradient(var(--accent), var(--accent)) 0 0 / 1px 18px no-repeat,
			linear-gradient(var(--accent), var(--accent)) 100% 0 / 18px 1px no-repeat,
			linear-gradient(var(--accent), var(--accent)) 100% 0 / 1px 18px no-repeat,
			linear-gradient(var(--accent), var(--accent)) 0 100% / 18px 1px no-repeat,
			linear-gradient(var(--accent), var(--accent)) 0 100% / 1px 18px no-repeat,
			linear-gradient(var(--accent), var(--accent)) 100% 100% / 18px 1px no-repeat,
			linear-gradient(var(--accent), var(--accent)) 100% 100% / 1px 18px no-repeat;
	}

	.shot[data-shot='lock'] .cross {
		inset: 22% 24%;
		background:
			linear-gradient(var(--paper), var(--paper)) 50% 0 / 1px 100% no-repeat,
			linear-gradient(var(--paper), var(--paper)) 0 50% / 100% 1px no-repeat;
		opacity: 0.16;
	}

	.shot[data-shot='lock'] .specimen {
		right: 1rem;
		bottom: 0.15rem;
		left: 1rem;
		font-size: clamp(2.8rem, 7vw, 4.6rem);
		font-weight: 760;
		line-height: 0.78;
		letter-spacing: -0.06em;
		color: color-mix(in oklab, var(--paper) 22%, transparent);
	}

	.shot[data-shot='cut'] .slats {
		inset: 0;
		background: repeating-linear-gradient(
			90deg,
			transparent 0 18px,
			rgba(245, 240, 234, 0.09) 18px 19px,
			transparent 19px 42px
		);
	}

	.shot[data-shot='cut'] .head {
		top: 0;
		bottom: 0;
		left: 38%;
		width: 2px;
		background: var(--accent);
	}

	.shot[data-shot='cut'] .window {
		top: 18%;
		bottom: 18%;
		left: 22%;
		width: 36%;
		border: 1px solid color-mix(in oklab, var(--accent) 55%, rgba(245, 240, 234, 0.2));
		background: color-mix(in oklab, var(--ink) 55%, transparent);
	}

	.shot[data-shot='cut'] .specimen {
		top: 42%;
		left: 26%;
		font-size: 11px;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		letter-spacing: 0.16em;
		color: var(--accent);
	}

	.shot[data-shot='cut'] .wash {
		background: linear-gradient(115deg, #161618, #0c0c0e);
	}

	.shot[data-shot='keep'] .bar {
		top: 0;
		right: 0;
		left: 0;
		height: 4px;
		background: var(--accent);
	}

	.shot[data-shot='keep'] .ghost {
		right: 0.6rem;
		bottom: 0.2rem;
		left: 0.7rem;
		font-size: clamp(3rem, 8vw, 5.2rem);
		font-weight: 760;
		line-height: 0.78;
		letter-spacing: -0.06em;
		color: color-mix(in oklab, var(--accent) 28%, transparent);
	}

	.shot[data-shot='keep'] .strip {
		top: 1.4rem;
		left: 0.9rem;
		width: 42%;
		height: 4.2rem;
		background:
			linear-gradient(rgba(245, 240, 234, 0.22), rgba(245, 240, 234, 0.22)) 0 0 / 72% 1px no-repeat,
			linear-gradient(rgba(245, 240, 234, 0.14), rgba(245, 240, 234, 0.14)) 0 12px / 100% 1px no-repeat,
			linear-gradient(rgba(245, 240, 234, 0.1), rgba(245, 240, 234, 0.1)) 0 24px / 54% 1px no-repeat,
			linear-gradient(var(--accent), var(--accent)) 0 36px / 38% 1px no-repeat;
	}

	figcaption {
		margin: 0.65rem 0 0;
	}

	@container (max-width: 768px) {
		.shell {
			grid-template-columns: 1fr;
		}

		.rail {
			height: auto;
			max-height: none;
			min-height: 0;
			overflow: hidden;
			border-right: 0;
			border-bottom: 1px solid rgba(245, 240, 234, 0.16);
		}

		.rail-lock {
			position: relative;
			height: auto;
			padding: 1.25rem max(12px, 1.1rem) 1.1rem;
		}

		.word {
			font-size: clamp(2.1rem, 14cqi, 3.4rem);
		}
	}

	.mast.reduce .rail-lock {
		position: sticky;
	}

	.mast.reduce .word {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.rail-lock {
			position: sticky;
		}

		.word {
			opacity: 1;
			transform: none;
		}

		.ember {
			display: none;
		}

		.idle {
			clip-path: none;
		}

		.line.on .idle {
			color: var(--accent);
		}
	}
</style>
