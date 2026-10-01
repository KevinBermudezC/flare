<!--
  Flare · lane-morph
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
		word = 'LANE',
		accent = 'ember',
		reduceMotion = false
	}: {
		word?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	type Glyph = {
		ch: string;
		weight: number;
		tracking: string;
		y: number;
	};

	type Plate = {
		id: string;
		word: string;
		title: string;
		body: string;
		tone: 'grid' | 'hatch' | 'wash' | 'ticks' | 'ember';
	};

	const plates = $derived<Plate[]>([
		{
			id: '01',
			word: (word.trim() || 'LANE').toUpperCase(),
			title: 'Stage',
			body: 'The stage locks. The lane is about to walk.',
			tone: 'grid'
		},
		{
			id: '02',
			word: 'WALK',
			title: 'Track',
			body: 'Vertical scroll drives the plates sideways.',
			tone: 'hatch'
		},
		{
			id: '03',
			word: 'BEND',
			title: 'Bend',
			body: 'The word tightens, then opens with the scrub.',
			tone: 'wash'
		},
		{
			id: '04',
			word: 'HOLD',
			title: 'Hold',
			body: 'One plate keeps the ember outline.',
			tone: 'ticks'
		},
		{
			id: '05',
			word: 'COPY',
			title: 'Copy',
			body: 'When the pin lets go, the file is yours.',
			tone: 'ember'
		}
	]);

	let root: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();
	let mediaQuiet = $state(false);
	let active = $state(0);
	let glyphs = $state<Glyph[]>(settle('LANE', 0));

	const quiet = $derived(reduceMotion || mediaQuiet);

	const countLabel = $derived(String(plates.length).padStart(2, '0'));
	const activePlate = $derived(plates[active] ?? plates[0]);

	function settle(value: string, tension: number): Glyph[] {
		const tracking = (-0.07 + tension * 0.12).toFixed(3);
		const weight = Math.round(560 + tension * 180);
		return [...value].map((ch, index) => ({
			ch,
			weight,
			tracking: `${tracking}em`,
			y: Math.sin(index * 0.8) * tension * 4
		}));
	}

	function morphAt(progress: number, words: string[]): { glyphs: Glyph[]; active: number } {
		const last = Math.max(0, words.length - 1);
		const p = Math.min(1, Math.max(0, progress));
		const index = Math.round(p * last);
		if (words.length < 2 || p <= 0) {
			return { glyphs: settle(words[0] ?? 'LANE', 0), active: 0 };
		}
		if (p >= 1) {
			return { glyphs: settle(words[last] ?? 'COPY', 1), active: last };
		}

		const scaled = p * last;
		const fromIndex = Math.min(last - 1, Math.floor(scaled));
		const local = scaled - fromIndex;
		const from = words[fromIndex] ?? '';
		const to = words[fromIndex + 1] ?? '';
		const len = Math.max(from.length, to.length);
		const next: Glyph[] = [];

		for (let k = 0; k < len; k += 1) {
			const threshold = (k + 1) / (len + 1);
			const useTo = local >= threshold;
			const ch = (useTo ? to[k] : from[k]) ?? '';
			if (!ch) continue;
			const wave = Math.sin(local * Math.PI + k * 0.55);
			const weight = Math.round(500 + local * 280 + Math.abs(wave) * 36);
			const tracking = -0.08 + local * 0.18;
			next.push({
				ch,
				weight,
				tracking: `${tracking.toFixed(3)}em`,
				y: wave * 9 * Math.sin(local * Math.PI)
			});
		}

		return { glyphs: next.length > 0 ? next : settle(from || to, local), active: index };
	}

	$effect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const sync = () => {
			mediaQuiet = media.matches;
		};
		sync();
		media.addEventListener('change', sync);
		return () => media.removeEventListener('change', sync);
	});

	$effect(() => {
		const wrap = root;
		const row = track;
		const words = plates.map((plate) => plate.word);
		const isQuiet = quiet;
		if (!wrap || isQuiet) {
			const first = morphAt(0, words);
			glyphs = first.glyphs;
			active = 0;
			return;
		}
		if (!row) return;

		const opened = morphAt(0, words);
		glyphs = opened.glyphs;
		active = opened.active;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.word',
				{ y: 16, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' }
			);
			gsap.to(row, {
				x: () => -Math.max(row.scrollWidth - wrap.clientWidth, 0),
				ease: 'none',
				scrollTrigger: {
					trigger: wrap,
					start: 'top top',
					end: '+=380%',
					pin: true,
					scrub: true,
					invalidateOnRefresh: true,
					onUpdate: (self) => {
						const next = morphAt(self.progress, words);
						glyphs = next.glyphs;
						active = next.active;
						wrap.style.setProperty('--p', String(self.progress));
					}
				}
			});
		}, wrap);

		const refresh = () => ScrollTrigger.refresh();
		void document.fonts?.ready.then(refresh);

		return () => ctx.revert();
	});
</script>

<section
	bind:this={root}
	class="stage"
	class:paper={accent === 'paper'}
	class:quiet
>
	{#if quiet}
		<div class="quiet-stack">
			{#each plates as plate, i (plate.id)}
					<article class="panel tone-{plate.tone}" class:on={i === 0}>
					<p class="tag">FIG {plate.id}</p>
					<h2>{plate.word}</h2>
					<p class="plate-title">{plate.title}</p>
					<p class="body">{plate.body}</p>
				</article>
			{/each}
		</div>
	{:else}
		<div class="hud">
			<p>lane-morph · pin · type</p>
			<p>{activePlate.id} / {countLabel}</p>
		</div>

		<div class="mast">
			<h2 class="word" aria-label={glyphs.map((glyph) => glyph.ch).join('')}>
				{#each glyphs as glyph, i (i)}
					<span
						aria-hidden="true"
						style:font-weight={glyph.weight}
						style:letter-spacing={glyph.tracking}
						style:transform={`translateY(${glyph.y}px)`}
					>{glyph.ch}</span>
				{/each}
			</h2>
			<p class="chip">Pin. Track walks. Type morphs.</p>
		</div>

		<div class="lane-window">
			<div bind:this={track} class="track">
				{#each plates as plate, i (plate.id)}
					<article class="panel tone-{plate.tone}" class:on={i === active}>
						<p class="tag">FIG {plate.id}</p>
						<div class="field" aria-hidden="true">
							<span class="ghost">{plate.word}</span>
							<span class="wash"></span>
							<span class="hatch"></span>
							<span class="grid"></span>
							<span class="ticks"></span>
							<span class="corners"></span>
						</div>
						<h3>{plate.title}</h3>
						<p class="body">{plate.body}</p>
					</article>
				{/each}
			</div>
		</div>

		<div class="ruler" aria-hidden="true">
			<div class="rail">
				<span class="playhead"></span>
			</div>
			<div class="stops">
				{#each plates as plate, i (plate.id)}
					<span class:on={i === active}>{plate.id} {plate.title}</span>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
	.stage {
		--ink: #09090b;
		--paper: #f5f0ea;
		--accent: #ff5a1f;
		--card: #111113;
		--p: 0;
		container-type: inline-size;
		position: relative;
		height: 100dvh;
		min-height: 100dvh;
		overflow: hidden;
		background: var(--ink);
		color: var(--paper);
		font-family: var(--font-display, 'Unbounded Variable', Unbounded, ui-sans-serif, sans-serif);
	}

	.stage.paper {
		--accent: #f5f0ea;
	}

	.hud,
	.chip,
	.tag,
	.ruler {
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
	}

	.hud {
		position: absolute;
		z-index: 3;
		top: 1.15rem;
		right: 1.25rem;
		left: 1.25rem;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin: 0;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.hud p {
		margin: 0;
	}

	.hud p:last-child {
		color: var(--accent);
	}

	.mast {
		position: absolute;
		z-index: 2;
		top: 14%;
		right: 1.25rem;
		left: 1.25rem;
	}

	.word {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		font-size: clamp(3.4rem, 13cqw, 8.4rem);
		font-weight: 640;
		line-height: 0.84;
		letter-spacing: -0.06em;
	}

	.word span {
		display: inline-block;
	}

	.chip {
		margin: 0.85rem 0 0;
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.lane-window {
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 4.4rem;
		left: 0;
		height: 46%;
		overflow: hidden;
	}

	.track {
		display: flex;
		width: max-content;
		height: 100%;
		align-items: stretch;
		gap: 0.7rem;
		padding: 0 1.25rem;
	}

	.panel {
		display: flex;
		flex: 0 0 62vw;
		flex-direction: column;
		min-width: 16rem;
		padding: 0.85rem;
		border: 1px solid rgba(245, 240, 234, 0.14);
		background: var(--card);
	}

	.panel:nth-child(1) {
		flex-basis: 74vw;
	}

	.panel:nth-child(3) {
		flex-basis: 48vw;
	}

	.panel:nth-child(5) {
		flex-basis: 70vw;
	}

	.panel.on {
		border-color: var(--accent);
		box-shadow: inset 0 0 0 1px var(--accent);
	}

	.tag {
		margin: 0;
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.panel.on .tag {
		color: var(--accent);
	}

	.field {
		position: relative;
		flex: 1;
		min-height: 5.5rem;
		margin: 0.7rem 0;
		overflow: hidden;
		background: #101012;
	}

	.ghost {
		position: absolute;
		right: 0.2rem;
		bottom: -0.12em;
		left: 0.35rem;
		font-size: clamp(2.4rem, 8cqw, 4.2rem);
		font-weight: 740;
		line-height: 0.8;
		letter-spacing: -0.06em;
		color: color-mix(in oklab, var(--paper) 18%, transparent);
	}

	.wash,
	.hatch,
	.grid,
	.ticks,
	.corners {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.wash {
		background: radial-gradient(
			ellipse 80% 70% at 20% 80%,
			color-mix(in oklab, var(--accent) 28%, transparent),
			transparent 62%
		);
		opacity: 0.35;
	}

	.panel.tone-wash .wash,
	.panel.tone-ember .wash {
		opacity: 1;
	}

	.hatch {
		opacity: 0;
		background: repeating-linear-gradient(
			-16deg,
			transparent 0 10px,
			rgba(245, 240, 234, 0.05) 10px 11px
		);
	}

	.panel.tone-hatch .hatch,
	.panel.tone-ticks .hatch {
		opacity: 1;
	}

	.grid {
		background:
			repeating-linear-gradient(0deg, transparent 0 16px, rgba(245, 240, 234, 0.06) 16px 17px),
			repeating-linear-gradient(90deg, transparent 0 16px, rgba(245, 240, 234, 0.05) 16px 17px);
		mask-image: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent);
	}

	.ticks {
		inset: 0.45rem 0.55rem auto auto;
		width: 10px;
		height: calc(100% - 0.9rem);
		background: repeating-linear-gradient(180deg, var(--accent) 0 2px, transparent 2px 9px);
		opacity: 0.25;
	}

	.panel.tone-ticks .ticks,
	.panel.on .ticks {
		opacity: 0.85;
	}

	.corners {
		inset: 0.4rem;
		background:
			linear-gradient(var(--paper), var(--paper)) 0 0 / 10px 1px no-repeat,
			linear-gradient(var(--paper), var(--paper)) 0 0 / 1px 10px no-repeat,
			linear-gradient(var(--paper), var(--paper)) 100% 100% / 10px 1px no-repeat,
			linear-gradient(var(--paper), var(--paper)) 100% 100% / 1px 10px no-repeat;
		opacity: 0.28;
	}

	.panel.tone-ember {
		box-shadow: inset 6px 0 0 var(--accent);
	}

	.panel.tone-ember.on {
		box-shadow:
			inset 6px 0 0 var(--accent),
			inset 0 0 0 1px var(--accent);
	}

	h3,
	.plate-title {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 620;
		letter-spacing: -0.04em;
	}

	.body {
		margin: 0.4rem 0 0;
		max-width: 28rem;
		font-family: var(--font-body, 'IBM Plex Sans', ui-sans-serif, sans-serif);
		font-size: 12px;
		line-height: 1.5;
		color: #c4bbb0;
	}

	.ruler {
		position: absolute;
		z-index: 3;
		right: 1.25rem;
		bottom: 0.85rem;
		left: 1.25rem;
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.rail {
		position: relative;
		height: 2px;
		margin-bottom: 0.5rem;
		background: rgba(245, 240, 234, 0.16);
	}

	.playhead {
		position: absolute;
		top: 50%;
		left: calc(var(--p) * 100%);
		width: 10px;
		height: 10px;
		border: 5px solid transparent;
		border-bottom-color: var(--accent);
		transform: translate(-50%, calc(-50% - 6px));
	}

	.stops {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.stops .on {
		color: var(--accent);
	}

	.quiet-stack {
		display: grid;
	}

	.stage.quiet {
		height: auto;
		overflow: visible;
	}

	.stage.quiet .panel {
		min-height: 100dvh;
		justify-content: flex-end;
		padding: 1.5rem;
		border-right: 0;
		border-left: 0;
		border-radius: 0;
	}

	.stage.quiet h2 {
		margin: 0 0 0.8rem;
		font-size: clamp(3.2rem, 14vw, 7rem);
		font-weight: 720;
		line-height: 0.86;
		letter-spacing: -0.06em;
	}

	@media (prefers-reduced-motion: reduce) {
		.stage:not(.quiet) .track {
			transform: none;
		}
	}
</style>
