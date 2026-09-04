<!--
  Flare · lane-scrub
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
  Type: Bricolage Grotesque + IBM Plex Mono (host loads fontsource).
  Photo: pass photoSrc, or this picsum still.
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	let {
		label = 'INK',
		accent = 'ember',
		reduceMotion = false,
		photoSrc = 'https://picsum.photos/id/1031/900/1400'
	}: {
		label?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
		photoSrc?: string;
	} = $props();

	const panels = $derived([
		{
			id: '01',
			mark: (label.trim() || 'INK').toUpperCase(),
			kind: 'type' as const,
			width: '42vw',
			title: label.trim() || 'INK',
			body: 'Scroll down. The track pans sideways. Four beats, then it stops.'
		},
		{
			id: '02',
			mark: 'STILL',
			kind: 'photo' as const,
			width: '34vw',
			title: 'Still',
			body: 'A photographic lock. Not a box. The lane holds this frame while you scrub.'
		},
		{
			id: '03',
			mark: 'EMBER',
			kind: 'type' as const,
			width: '30vw',
			title: 'Ember',
			body: 'One line of heat. The scrub is a hard stop. It does not loop.'
		},
		{
			id: '04',
			mark: 'COPY',
			kind: 'ember' as const,
			width: '40vw',
			title: 'Copy',
			body: 'Copy the file after the scrub ends. The chapter is yours.'
		}
	]);

	let root: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();
	let tick = $state(0);
	let playhead = $state(0);

	const active = $derived(panels[tick] ?? panels[0]);

	$effect(() => {
		const wrap = root;
		const row = track;
		const forced = reduceMotion;
		if (!wrap || !row) return;
		let ctx: gsap.Context | undefined;
		let cancelled = false;

		const run = () => {
			if (cancelled || !root || !track) return;
			if (forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

			ctx = gsap.context(() => {
				const distance = Math.max(row.scrollWidth - window.innerWidth, 0);
				gsap.to(row, {
					x: -distance,
					ease: 'none',
					scrollTrigger: {
						trigger: wrap,
						start: 'top top',
						end: () => `+=${distance}`,
						pin: true,
						scrub: 1,
						invalidateOnRefresh: true,
						onUpdate: (self) => {
							playhead = self.progress;
							tick = self.progress >= 1 ? 3 : Math.min(3, Math.floor(self.progress * 4));
						}
					}
				});
			}, wrap);
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
	class="lane"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	<div class="hud">
		<p>lane-scrub · scroll Y · pan X</p>
		<p>{active.id} / {active.mark}</p>
	</div>

	<div bind:this={track} class="track">
		{#each panels as panel, i (panel.id)}
			<article class="panel {panel.kind}" class:on={i === tick} style:flex-basis={panel.width}>
				<p class="tag">{panel.id} / {panel.mark}</p>
				{#if panel.kind === 'photo'}
					<figure>
						<img src={photoSrc} alt="Ink still. Dark facade, grid of glass." />
						<figcaption>{panel.body}</figcaption>
					</figure>
				{:else if panel.kind === 'type'}
					<h2>{panel.title}</h2>
					<p class="body">{panel.body}</p>
				{:else}
					<h2>{panel.title}</h2>
					<p class="body">{panel.body}</p>
					<div class="ember-col" aria-hidden="true">
						{#each panels as step, n (step.id)}
							<span class:hot={n === tick}>{step.id}</span>
						{/each}
					</div>
				{/if}
			</article>
		{/each}
	</div>

	<div class="ruler" aria-hidden="true">
		<div class="rail">
			<span class="playhead" style:left="{playhead * 100}%"></span>
		</div>
		<div class="stops">
			{#each panels as panel, i (panel.id)}
				<span class:on={i === tick}>{panel.id} {panel.mark}</span>
			{/each}
		</div>
	</div>
</section>

<style>
	.lane {
		--ink: #09090b;
		--paper: #f5f0ea;
		--accent: #ff5a1f;
		--card: #111113;
		position: relative;
		min-height: 100dvh;
		overflow: hidden;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
	}

	.lane.paper {
		--accent: #f5f0ea;
	}

	.hud {
		position: absolute;
		z-index: 2;
		top: 1.15rem;
		right: 1.25rem;
		left: 1.25rem;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
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

	.track {
		display: flex;
		height: 100dvh;
		width: max-content;
		align-items: stretch;
		padding: 3.6rem 0 4.2rem;
		gap: 1px;
		background: rgba(245, 240, 234, 0.1);
	}

	.panel {
		flex-grow: 0;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		min-width: 14rem;
		padding: 1.25rem;
		background: var(--ink);
	}

	.panel.photo {
		padding: 1.25rem 1.25rem 1.1rem;
		background: #101012;
	}

	.panel.ember {
		background: #101012;
		box-shadow: inset 8px 0 0 var(--accent);
	}

	.tag {
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.panel.on .tag {
		color: var(--accent);
	}

	h2 {
		margin: auto 0 0.75rem;
		max-width: 12ch;
		font-size: clamp(2rem, 4vw, 3.4rem);
		font-weight: 720;
		line-height: 0.92;
		letter-spacing: -0.04em;
	}

	.body {
		margin: 0;
		max-width: 28rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 12px;
		line-height: 1.6;
		color: #c4bbb0;
	}

	figure {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		margin: 1rem 0 0;
	}

	img {
		display: block;
		width: 100%;
		flex: 1;
		object-fit: cover;
		background: #161618;
	}

	figcaption {
		margin: 0.7rem 0 0;
		max-width: 28rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 12px;
		line-height: 1.5;
		color: #c4bbb0;
	}

	.ember-col {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		gap: 0.85rem;
		margin-top: 1.1rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.14em;
		color: rgba(245, 240, 234, 0.28);
	}

	.ember-col span {
		display: block;
		padding-bottom: 0.45rem;
		border-bottom: 1px solid rgba(245, 240, 234, 0.18);
	}

	.ember-col span.hot {
		color: var(--accent);
		border-bottom-color: var(--accent);
	}

	.ruler {
		position: absolute;
		z-index: 2;
		right: 1.25rem;
		bottom: 0.85rem;
		left: 1.25rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.rail {
		position: relative;
		height: 2px;
		margin-bottom: 0.55rem;
		background: rgba(245, 240, 234, 0.16);
	}

	.playhead {
		position: absolute;
		top: 50%;
		width: 10px;
		height: 10px;
		border: 5px solid transparent;
		border-bottom-color: var(--accent);
		transform: translate(-50%, calc(-50% - 6px));
	}

	.stops {
		display: flex;
		justify-content: space-between;
	}

	.stops .on {
		color: var(--accent);
	}

	.lane.reduce {
		overflow-x: auto;
		scroll-snap-type: x mandatory;
	}

	.lane.reduce .track {
		transform: none;
	}

	.lane.reduce .panel {
		scroll-snap-align: start;
	}

	@media (prefers-reduced-motion: reduce) {
		.lane {
			overflow-x: auto;
			scroll-snap-type: x mandatory;
		}

		.track {
			transform: none;
		}

		.panel {
			scroll-snap-align: start;
		}
	}
</style>
