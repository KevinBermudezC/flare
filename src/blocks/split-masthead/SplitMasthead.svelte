<!--
  Flare · split-masthead
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
		lead = 'Hold',
		accent = 'ember',
		reduceMotion = false
	}: {
		lead?: string;
		accent?: 'ember' | 'paper';
		reduceMotion?: boolean;
	} = $props();

	const words = $derived([lead.trim() || 'Hold', 'Preview', 'Keep']);

	const rooms = $derived([
		{
			title: 'The first room is a lock-off.',
			body: 'The left column holds the index. The right column is the walk. Nothing else enters this room.',
			shot: 'lock'
		},
		{
			title: 'Preview is the live cut.',
			body: 'You watch the frame while it is still loose. Scroll is the only transport. Share what you just saw.',
			shot: 'cut'
		},
		{
			title: 'Keep the file you already held.',
			body: 'Copy the chapter. Same cut, your tree. The next edit starts from this keep.',
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
				gsap.from('.word', {
					x: -12,
					opacity: 0,
					stagger: 0.08,
					duration: 0.45,
					ease: 'power2.out'
				});

				ScrollTrigger.create({
					trigger: left,
					start: 'top top',
					endTrigger: right,
					end: 'bottom bottom',
					pin: true,
					pinSpacing: false
				});

				const steps = gsap.utils.toArray<HTMLElement>('.room');
				steps.forEach((step, i) => {
					ScrollTrigger.create({
						trigger: step,
						start: 'top 45%',
						end: 'bottom 45%',
						onEnter: () => {
							active = i;
						},
						onEnterBack: () => {
							active = i;
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
	class="mast"
	class:paper={accent === 'paper'}
	class:reduce={reduceMotion}
>
	<div class="shell">
		<aside bind:this={rail} class="rail">
			{#each words as word, i (word + i)}
				<p class="word" class:on={i === active}>{word}</p>
			{/each}
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
		background: var(--ink);
		color: var(--paper);
		font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, sans-serif;
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.15em;
		min-height: 100dvh;
		padding: 2rem 1.5rem 2rem 6vw;
		border-right: 1px solid rgba(245, 240, 234, 0.16);
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
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
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

	@media (max-width: 768px) {
		.shell {
			grid-template-columns: 1fr;
		}

		.rail {
			min-height: auto;
			padding: 2rem 6vw 1rem;
			border-right: 0;
			border-bottom: 1px solid rgba(245, 240, 234, 0.16);
		}

		.word {
			font-size: clamp(2.8rem, 16vw, 4.5rem);
		}
	}

	.mast.reduce .rail {
		position: relative;
	}

	.mast.reduce .word {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.rail {
			position: relative;
		}

		.word {
			opacity: 1;
			transform: none;
		}
	}
</style>
