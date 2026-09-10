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
			shot: 'lock'
		},
		{
			title: 'Preview is the live chapter.',
			body: 'Scroll is the only transport. You watch the frame while it is still loose.',
			shot: 'cut'
		},
		{
			title: 'Copy the file. It is yours.',
			body: 'Paste the .svelte. Add gsap. The pin still runs.',
			shot: 'keep'
		}
	]);

	let root: HTMLElement | undefined = $state();
	let rail: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();
	let active = $state(0);

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
			if (forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				active = 0;
				return;
			}

			ctx = gsap.context(() => {
				const stacked = el.clientWidth <= 768;
				if (!stacked) {
					ScrollTrigger.create({
						trigger: left,
						start: 'top top',
						endTrigger: right,
						end: 'bottom bottom',
						pin: true,
						pinSpacing: false,
						invalidateOnRefresh: true
					});
				}

				const steps = gsap.utils.toArray<HTMLElement>('.room');
				steps.forEach((step, i) => {
					ScrollTrigger.create({
						trigger: step,
						start: 'top 45%',
						end: 'bottom 45%',
						invalidateOnRefresh: true,
						onEnter: () => {
							active = i;
						},
						onEnterBack: () => {
							active = i;
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
	class="mast"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	<div class="shell">
		<aside class="rail">
			<div bind:this={rail} class="rail-lock">
				{#each words as word, i (word + i)}
					<p class="word" class:on={i === active}>{word}</p>
				{/each}
			</div>
		</aside>
		<div bind:this={track} class="track">
			{#each rooms as room (room.shot)}
				<article class="room">
					<h2>{room.title}</h2>
					<p>{room.body}</p>
					<figure class="shot" data-shot={room.shot} aria-hidden="true"></figure>
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
		grid-template-columns: minmax(10rem, 38%) 1fr;
		min-height: 100dvh;
	}

	.rail {
		position: relative;
		z-index: 2;
		min-height: 100dvh;
		border-right: 1px solid rgba(245, 240, 234, 0.16);
		background: var(--ink);
	}

	.rail-lock {
		position: sticky;
		top: 0;
		display: flex;
		height: 100dvh;
		flex-direction: column;
		justify-content: center;
		gap: 0.15em;
		padding: 2rem 1.5rem 2rem 6vw;
		background: var(--ink);
	}

	.word {
		margin: 0;
		font-size: clamp(4.5rem, 8vw, 6.875rem);
		font-weight: 720;
		line-height: 0.9;
		letter-spacing: -0.04em;
		color: var(--paper);
	}

	.word.on {
		color: var(--accent);
	}

	.track {
		padding: 18vh 8vw 24vh;
	}

	.room {
		min-height: 88dvh;
		padding-bottom: 12vh;
	}

	h2 {
		margin: 0;
		max-width: 18ch;
		font-size: clamp(1.6rem, 2.4vw, 2.1rem);
		font-weight: 560;
		letter-spacing: -0.03em;
		line-height: 1.15;
	}

	.room p {
		margin: 1.25rem 0 0;
		max-width: 42rem;
		font-family: var(--font-body, 'IBM Plex Sans', ui-sans-serif, sans-serif);
		font-size: 13px;
		line-height: 1.7;
		color: #c4bbb0;
	}

	.shot {
		margin: 2.5rem 0 0;
		height: min(42vh, 22rem);
		border: 1px solid rgba(245, 240, 234, 0.2);
	}

	.shot[data-shot='lock'] {
		background:
			radial-gradient(circle at 22% 70%, color-mix(in oklab, var(--accent) 42%, transparent), transparent 28%),
			linear-gradient(180deg, #1a1c22 0%, #0c1014 48%, #14110c 100%);
	}

	.shot[data-shot='cut'] {
		background:
			repeating-linear-gradient(90deg, rgba(245, 240, 234, 0.07) 0 10px, transparent 10px 34px),
			linear-gradient(115deg, #161618, #0c0c0e);
	}

	.shot[data-shot='keep'] {
		background:
			linear-gradient(var(--accent), var(--accent)) 0 0 / 100% 4px no-repeat,
			radial-gradient(ellipse at 78% 80%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 46%),
			#101012;
	}

	@container (max-width: 768px) {
		.shell {
			grid-template-columns: 1fr;
		}

		.rail {
			min-height: 0;
			border-right: 0;
			border-bottom: 1px solid rgba(245, 240, 234, 0.16);
		}

		.rail-lock {
			position: relative;
			height: auto;
			padding: 2rem 6vw 1rem;
		}

		.word {
			font-size: clamp(2.8rem, 16vw, 4.5rem);
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
	}
</style>
