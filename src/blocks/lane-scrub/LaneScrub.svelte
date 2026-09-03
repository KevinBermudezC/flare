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

	const panels = [
		{
			id: '01',
			kind: 'type',
			width: '36vw',
			title: 'Soft ends',
			body: 'The lane stops when the track is out of width. No loop. Rest is a feature.'
		},
		{
			id: '02',
			kind: 'photo',
			width: '18vw',
			title: 'Photo',
			body: ''
		},
		{
			id: '03',
			kind: 'type',
			width: '42vw',
			title: 'Systemic momentum',
			body: 'In motion, systems show their edges. We build for a walk you can repeat.'
		},
		{
			id: '04',
			kind: 'ember',
			width: '14vw',
			title: 'Ember',
			body: ''
		},
		{
			id: '05',
			kind: 'type',
			width: '32vw',
			title: 'Hold the mark',
			body: 'Vertical distance becomes a horizontal walk. Ease stays none.'
		},
		{
			id: '06',
			kind: 'photo',
			width: '22vw',
			title: 'Still',
			body: ''
		}
	] as const;

	let root: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();
	let tick = $state(2);

	$effect(() => {
		const wrap = root;
		const row = track;
		if (!wrap || !row) return;
		let ctx: gsap.Context | undefined;
		let cancelled = false;

		const run = () => {
			if (cancelled || !root || !track) return;
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
							tick = Math.min(5, Math.floor(self.progress * 6));
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

<section bind:this={root} class="lane">
	<div class="hud">
		<span>section: lane-scrub</span>
		<span>pin: true</span>
	</div>

	<div bind:this={track} class="track">
		{#each panels as panel}
			<article class="panel {panel.kind}" style:flex-basis={panel.width}>
				<p class="tag">{panel.id} / {panel.kind}</p>
				{#if panel.kind === 'type'}
					<h2>{panel.title}</h2>
					<p class="body">{panel.body}</p>
				{:else if panel.kind === 'photo'}
					<div class="photo" aria-hidden="true"></div>
				{:else}
					<div class="ember-col" aria-hidden="true">
						{#each [0, 1, 2, 3, 4, 5, 6, 7, 8] as n}
							<span class:hot={n === 3}></span>
						{/each}
					</div>
				{/if}
			</article>
		{/each}
	</div>

	<div class="ruler" aria-hidden="true">
		{#each panels as panel, i}
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
		--ember: #ff5a1f;
		--card: #111113;
		position: relative;
		min-height: 100dvh;
		overflow: hidden;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
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
		background: var(--ember);
		box-shadow: 0 0 0 6px color-mix(in oklab, var(--ember) 18%, transparent);
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
		color: var(--ember);
	}

	.ruler i {
		position: absolute;
		top: -0.7rem;
		left: 50%;
		width: 0;
		height: 0;
		border: 4px solid transparent;
		border-bottom-color: var(--ember);
		transform: translateX(-50%);
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
