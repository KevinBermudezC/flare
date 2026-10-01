<!--
  Flare · type-linger
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
		word = 'CHARGE',
		accent = 'ember',
		reduceMotion = false
	}: {
		word?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	type Slot = {
		form: string;
		formOpacity: number;
		formY: number;
		linger: string;
		lingerOpacity: number;
		lingerY: number;
	};

	type Room = {
		id: string;
		word: string;
		body: string;
		tone: 'charge' | 'hold' | 'release';
	};

	const rooms = $derived<Room[]>([
		{
			id: '01',
			word: (word.trim() || 'CHARGE').toUpperCase(),
			body: 'The room takes the charge.',
			tone: 'charge'
		},
		{
			id: '02',
			word: 'HOLD',
			body: 'Leftover letters stay while the next word forms.',
			tone: 'hold'
		},
		{
			id: '03',
			word: 'RELEASE',
			body: 'The last room lets the line go.',
			tone: 'release'
		}
	]);

	let root: HTMLElement | undefined = $state();
	let roomTrack: HTMLElement | undefined = $state();
	let mediaQuiet = $state(false);
	let active = $state(0);
	let slots = $state<Slot[]>(finished('CHARGE'));

	const quiet = $derived(reduceMotion || mediaQuiet);

	const activeRoom = $derived(rooms[active] ?? rooms[0]);

	function finished(value: string): Slot[] {
		return [...value].map((ch) => ({
			form: ch,
			formOpacity: 1,
			formY: 0,
			linger: '',
			lingerOpacity: 0,
			lingerY: 0
		}));
	}

	function lingerAt(progress: number, words: string[]): { slots: Slot[]; active: number } {
		const last = Math.max(0, words.length - 1);
		const p = Math.min(1, Math.max(0, progress));
		if (words.length < 2 || p <= 0) {
			return { slots: finished(words[0] ?? 'CHARGE'), active: 0 };
		}
		if (p >= 1) {
			return { slots: finished(words[last] ?? 'RELEASE'), active: last };
		}

		const scaled = p * last;
		const fromIndex = Math.min(last - 1, Math.floor(scaled));
		const local = scaled - fromIndex;
		const from = words[fromIndex] ?? '';
		const to = words[fromIndex + 1] ?? '';
		const len = Math.max(from.length, to.length);
		const next: Slot[] = [];

		for (let k = 0; k < len; k += 1) {
			const fromCh = from[k] ?? '';
			const toCh = to[k] ?? '';
			const stagger = len <= 1 ? 0 : k / (len - 1);
			const formStart = stagger * 0.4;
			const lingerEnd = 0.55 + stagger * 0.45;

			if (fromCh && fromCh === toCh) {
				next.push({
					form: fromCh,
					formOpacity: 1,
					formY: 0,
					linger: '',
					lingerOpacity: 0,
					lingerY: 0
				});
				continue;
			}

			let lingerOpacity = 0;
			let lingerY = 0;
			if (fromCh && local < lingerEnd) {
				const fadeStart = Math.max(0, lingerEnd - 0.2);
				lingerOpacity = local <= fadeStart ? 1 : Math.max(0, (lingerEnd - local) / 0.2);
				lingerY = (1 - lingerOpacity) * -22;
			}

			let formOpacity = 0;
			let formY = 18;
			if (toCh && local >= formStart) {
				const formed = Math.min(1, (local - formStart) / 0.38);
				formOpacity = formed;
				formY = (1 - formed) * 18;
			}

			if (!fromCh && formOpacity <= 0) continue;
			if (!toCh && lingerOpacity <= 0) continue;

			next.push({
				form: toCh,
				formOpacity,
				formY,
				linger: fromCh,
				lingerOpacity,
				lingerY
			});
		}

		const index = local > 0.55 ? fromIndex + 1 : fromIndex;
		return { slots: next.length > 0 ? next : finished(to || from), active: index };
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
		const el = root;
		const row = roomTrack;
		const words = rooms.map((room) => room.word);
		const isQuiet = quiet;
		if (!el || isQuiet) {
			slots = finished(words[0] ?? 'CHARGE');
			active = 0;
			return;
		}
		if (!row) return;

		const opened = lingerAt(0, words);
		slots = opened.slots;
		active = opened.active;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					start: 'top top',
					end: '+=320%',
					pin: true,
					scrub: true,
					invalidateOnRefresh: true,
					onUpdate: (self) => {
						const next = lingerAt(self.progress, words);
						slots = next.slots;
						active = next.active;
					}
				}
			});
			tl.to(row, { yPercent: -66.666, ease: 'none' }, 0);
		}, el);

		void document.fonts?.ready.then(() => ScrollTrigger.refresh());

		return () => ctx.revert();
	});
</script>

<section
	bind:this={root}
	class="linger"
	class:paper={accent === 'paper'}
	class:quiet
>
	{#if quiet}
		<div class="quiet-stack">
			{#each rooms as room, i (room.id)}
				<article class="room {room.tone}">
					<p class="idx">
						<span class="tick" class:on={i === 0}></span>
						{room.id}
					</p>
					<h2>{room.word}</h2>
					<p class="body">{room.body}</p>
				</article>
			{/each}
		</div>
	{:else}
		<div class="pin">
			<div bind:this={roomTrack} class="room-track">
				{#each rooms as room (room.id)}
					<article class="room {room.tone}">
						<div class="field" aria-hidden="true">
							<span class="wash"></span>
							<span class="grid"></span>
							<span class="beam"></span>
						</div>
						<p class="body">{room.body}</p>
					</article>
				{/each}
			</div>

			<div class="overlay">
				<ol class="ticks" aria-label="Rooms">
					{#each rooms as room, i (room.id)}
						<li class:on={i === active}>
							<span class="tick"></span>
							{room.id}
						</li>
					{/each}
				</ol>

				<div class="title-block">
					<p class="meta">type-linger · {activeRoom.id} / 03</p>
					<h2 aria-label={activeRoom.word}>
						{#each slots as slot, i (i)}
							<span class="cell" aria-hidden="true">
								{#if slot.linger && slot.lingerOpacity > 0}
									<span
										class="ghost"
										style:opacity={slot.lingerOpacity}
										style:transform={`translateY(${slot.lingerY}px)`}
									>{slot.linger}</span>
								{/if}
								{#if slot.form && slot.formOpacity > 0}
									<span
										class="form"
										style:opacity={slot.formOpacity}
										style:transform={`translateY(${slot.formY}px)`}
									>{slot.form}</span>
								{/if}
							</span>
						{/each}
					</h2>
					<p class="chip">Letters stay. The next word forms.</p>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.linger {
		--ink: #09090b;
		--paper: #f5f0ea;
		--accent: #ff5a1f;
		position: relative;
		background: var(--ink);
		color: var(--paper);
		font-family: var(--font-display, 'Unbounded Variable', Unbounded, ui-sans-serif, sans-serif);
	}

	.linger.paper {
		--accent: #f5f0ea;
	}

	.pin {
		position: relative;
		height: 100dvh;
		overflow: hidden;
	}

	.room-track {
		display: flex;
		flex-direction: column;
		height: 300%;
	}

	.room {
		position: relative;
		display: flex;
		flex: 1 0 0;
		flex-direction: column;
		justify-content: flex-end;
		min-height: 0;
		padding: 12vh 8vw 8vh;
		background: var(--ink);
	}

	.field {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.wash,
	.grid,
	.beam {
		position: absolute;
		inset: 0;
	}

	.wash {
		background: radial-gradient(
			ellipse 55% 42% at 70% 40%,
			color-mix(in oklab, var(--accent) 22%, transparent),
			transparent 68%
		);
	}

	.room.hold .wash {
		background: radial-gradient(
			ellipse 40% 30% at 18% 70%,
			color-mix(in oklab, var(--paper) 10%, transparent),
			transparent 70%
		);
	}

	.room.release .wash {
		background: radial-gradient(
			ellipse 70% 50% at 80% 80%,
			color-mix(in oklab, var(--accent) 34%, transparent),
			transparent 64%
		);
	}

	.grid {
		background:
			repeating-linear-gradient(0deg, transparent 0 48px, rgba(245, 240, 234, 0.045) 48px 49px),
			repeating-linear-gradient(90deg, transparent 0 48px, rgba(245, 240, 234, 0.045) 48px 49px);
		mask-image: radial-gradient(ellipse at 50% 45%, #000 10%, transparent 72%);
	}

	.beam {
		background: linear-gradient(
			108deg,
			transparent 58%,
			color-mix(in oklab, var(--accent) 16%, transparent) 64%,
			transparent 70%
		);
		opacity: 0.2;
	}

	.room.release .beam {
		opacity: 0.85;
	}

	.overlay {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: center;
		gap: 1.5rem;
		padding: 8vh 6vw;
		pointer-events: none;
	}

	.ticks {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 12px;
		letter-spacing: 0.14em;
		color: #8b8278;
	}

	.ticks li,
	.idx {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}

	.ticks li.on {
		color: var(--accent);
	}

	.tick {
		display: block;
		width: 1.1rem;
		height: 2px;
		background: rgba(245, 240, 234, 0.28);
	}

	.ticks li.on .tick,
	.tick.on {
		background: var(--accent);
	}

	.title-block {
		min-width: 0;
	}

	.meta,
	.chip,
	.idx {
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
	}

	.meta,
	.chip {
		margin: 0;
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.meta {
		margin-bottom: 0.8rem;
		color: var(--accent);
	}

	h2 {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		font-size: clamp(3.2rem, 12vw, 8.5rem);
		font-weight: 740;
		line-height: 0.84;
		letter-spacing: -0.06em;
	}

	.cell {
		display: grid;
		min-width: 0.42em;
	}

	.cell > span {
		grid-area: 1 / 1;
		display: inline-block;
	}

	.ghost {
		color: color-mix(in oklab, var(--paper) 42%, transparent);
	}

	.chip {
		margin-top: 0.9rem;
	}

	.body {
		position: relative;
		z-index: 1;
		margin: 0;
		max-width: 26rem;
		font-family: var(--font-body, 'IBM Plex Sans', ui-sans-serif, sans-serif);
		font-size: 14px;
		line-height: 1.5;
		color: #c4bbb0;
	}

	.quiet-stack {
		display: grid;
	}

	.linger.quiet .room {
		min-height: 100dvh;
		flex-basis: auto;
	}

	.idx {
		position: relative;
		z-index: 1;
		margin: 0 0 1rem;
		font-size: 12px;
		letter-spacing: 0.14em;
		color: var(--accent);
	}

	@media (max-width: 720px) {
		.overlay {
			grid-template-columns: 1fr;
			align-content: center;
		}

		.ticks {
			flex-direction: row;
		}
	}
</style>
