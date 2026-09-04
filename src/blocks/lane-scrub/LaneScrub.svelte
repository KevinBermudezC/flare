<!--
  Flare · lane-scrub
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
		label = 'INK',
		accent = 'ember',
		reduceMotion = false
	}: {
		label?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	const panels = $derived([
		{
			id: '01',
			kind: 'type',
			width: '44vw',
			title: label.trim() || 'INK',
			body: 'The field is ink. Vertical scroll drives the walk. Nothing else shares this lane.'
		},
		{
			id: '02',
			kind: 'photo',
			width: '20vw',
			title: 'Still',
			body: ''
		},
		{
			id: '03',
			kind: 'type',
			width: '30vw',
			title: 'Ember',
			body: 'One line of heat. The scrub is a hard stop. It does not loop.'
		},
		{
			id: '04',
			kind: 'ember',
			width: '38vw',
			title: 'Copy',
			body: 'Copy the file after the scrub ends. The chapter is yours.'
		}
	] as const);

	let root: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();
	let tick = $state(0);

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
							tick = Math.min(3, Math.floor(self.progress * 4));
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
		<span>section: lane-scrub</span>
		<span>pin: true</span>
	</div>

	<div bind:this={track} class="track">
		{#each panels as panel (panel.id)}
			<article class="panel {panel.kind}" style:flex-basis={panel.width}>
				<p class="tag">{panel.id} / {panel.kind}</p>
				{#if panel.kind === 'type'}
					<h2>{panel.title}</h2>
					<p class="body">{panel.body}</p>
				{:else if panel.kind === 'photo'}
					<div class="photo" aria-hidden="true"></div>
				{:else}
					<h2>{panel.title}</h2>
					<p class="body">{panel.body}</p>
					<div class="ember-col" aria-hidden="true">
						{#each [0, 1, 2, 3, 4, 5, 6, 7, 8] as n (n)}
							<span class:hot={n === 3}></span>
						{/each}
					</div>
				{/if}
			</article>
		{/each}
	</div>

	<div class="ruler" aria-hidden="true">
		{#each panels as panel, i (panel.id)}
			<span class:on={i === tick}>
				{#if i === tick}
					<i></i>
				{/if}
				{panel.id}
			</span>
		{/each}
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
		top: 1rem;
		right: 1.25rem;
		left: 1.25rem;
		display: flex;
		justify-content: space-between;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		color: #8b8278;
	}

	.track {
		display: flex;
		height: 100dvh;
		width: max-content;
		align-items: stretch;
		padding: 3.5rem 0 3rem;
		gap: 1px;
		background: rgba(245, 240, 234, 0.08);
	}

	.panel {
		flex-grow: 0;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		min-width: 12rem;
		padding: 1.25rem;
		background: var(--ink);
	}

	.panel.photo {
		background: #111113;
	}

	.panel.ember {
		background: #101012;
		box-shadow: inset 8px 0 0 var(--accent);
	}

	.tag {
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #8b8278;
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

	.photo {
		flex: 1;
		margin-top: 1rem;
		background:
			linear-gradient(180deg, rgba(9, 9, 11, 0.15), rgba(9, 9, 11, 0.55)),
			radial-gradient(circle at 50% 20%, #8b8278, transparent 42%),
			linear-gradient(180deg, #2a2d33, #111318 60%, #09090b);
	}

	.ember-col {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		gap: 0.65rem;
		margin-top: 1rem;
	}

	.ember-col span {
		display: block;
		height: 1px;
		background: rgba(245, 240, 234, 0.22);
	}

	.ember-col span.hot {
		background: var(--accent);
		box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 18%, transparent);
	}

	.ruler {
		position: absolute;
		right: 1.25rem;
		bottom: 1rem;
		left: 1.25rem;
		display: flex;
		justify-content: space-between;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 10px;
		color: #8b8278;
		border-top: 1px solid rgba(245, 240, 234, 0.12);
		padding-top: 0.45rem;
	}

	.ruler span {
		position: relative;
	}

	.ruler .on {
		color: var(--accent);
	}

	.ruler i {
		position: absolute;
		top: -0.7rem;
		left: 50%;
		width: 0;
		height: 0;
		border: 4px solid transparent;
		border-bottom-color: var(--accent);
		transform: translateX(-50%);
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
