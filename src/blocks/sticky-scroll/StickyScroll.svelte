<!--
  Flare · sticky-scroll
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const features = [
		{
			kicker: '01 · Capture',
			title: 'Every push gets a URL',
			body: 'Harbor opens a preview the moment CI is green. Share it in the PR. No staging dance.'
		},
		{
			kicker: '02 · Review',
			title: 'Comments land on the build',
			body: 'Pin a note to the hero, the form, the empty state. The next SHA keeps the thread.'
		},
		{
			kicker: '03 · Promote',
			title: 'Ship the SHA you already saw',
			body: 'Promote the preview. Same artifact, new hostname. Rollback is the previous card.'
		}
	];

	let active = $state(0);
	let list: HTMLElement | undefined = $state();
	let reduceMotion = $state(false);

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!list) return;
		const nodes = [...list.querySelectorAll<HTMLElement>('[data-step]')];
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const index = Number(entry.target.getAttribute('data-step'));
					if (!Number.isNaN(index)) active = index;
				}
			},
			{ threshold: 0.55 }
		);
		for (const node of nodes) io.observe(node);
		return () => io.disconnect();
	});
</script>

<section class="bg-[#09090b] text-[#f5f0ea]">
	<div class="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16">
		<div class="lg:sticky lg:top-0 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center">
			<p class="text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">How it ships</p>
			{#key reduceMotion ? 0 : active}
				<div in:fade={{ duration: reduceMotion ? 0 : 280 }}>
					<p class="mt-4 font-mono text-xs text-[#8b8278]">{features[active].kicker}</p>
					<h2 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
						{features[active].title}
					</h2>
					<p class="mt-4 max-w-md text-lg text-[#a59c91]">{features[active].body}</p>
				</div>
			{/key}
			<ol class="mt-8 flex gap-2" aria-hidden="true">
				{#each features as _, i}
					<li class="h-1 flex-1 rounded-full {i === active ? 'bg-[#ff5a1f]' : 'bg-white/10'}"></li>
				{/each}
			</ol>
		</div>

		<div bind:this={list} class="space-y-6 pb-10">
			{#each features as feature, i}
				<article
					data-step={i}
					class="min-h-[70svh] rounded-2xl border border-white/10 bg-[#111113] p-8 md:p-10"
					class:on={i === active}
				>
					<p class="font-mono text-xs text-[#ff5a1f]">{feature.kicker}</p>
					<h3 class="mt-4 text-2xl font-semibold tracking-tight">{feature.title}</h3>
					<p class="mt-3 max-w-md text-[#a59c91]">{feature.body}</p>
					<div class="mt-10 h-32 rounded-xl border border-white/8 bg-[#0c0c0e]" aria-hidden="true">
						<div class="pane" class:live={i === active}></div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.on {
		border-color: rgba(255, 90, 31, 0.35);
	}

	.pane {
		height: 100%;
		border-radius: inherit;
		background:
			linear-gradient(90deg, transparent, rgba(255, 90, 31, 0.35), transparent),
			repeating-linear-gradient(
				90deg,
				rgba(255, 255, 255, 0.04) 0 12px,
				transparent 12px 24px
			);
		background-size:
			40% 100%,
			auto;
		background-repeat: no-repeat;
		opacity: 0.35;
	}

	.pane.live {
		opacity: 1;
		animation: scan 2.4s linear infinite;
	}

	@keyframes scan {
		from {
			background-position:
				-40% 0,
				0 0;
		}
		to {
			background-position:
				140% 0,
				0 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pane.live {
			animation: none;
			background-position: 30% 0, 0 0;
		}
	}
</style>
