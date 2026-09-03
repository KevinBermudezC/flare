<!--
  Flare · text-flip
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const words = ['landings', 'motion', 'sections', 'Svelte 5'];
	let index = $state(0);
	let reduceMotion = $state(false);

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) return;
		const id = window.setInterval(() => {
			index = (index + 1) % words.length;
		}, 2300);
		return () => window.clearInterval(id);
	});
</script>

<section class="flex min-h-[100svh] items-center bg-[#09090b] px-6 py-24 text-[#f5f0ea]">
	<div class="mx-auto max-w-4xl text-center">
		<p class="text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Headline</p>
		<h1 class="mt-5 text-4xl leading-[1.12] font-semibold tracking-tight sm:text-6xl">
			Ship
			<span class="flip">
				{#each words as word}
					<span class="ghost">{word}</span>
				{/each}
				{#key index}
					<span
						class="word"
						in:fly={{ y: reduceMotion ? 0 : 18, duration: reduceMotion ? 0 : 320 }}
						out:fly={{ y: reduceMotion ? 0 : -18, duration: reduceMotion ? 0 : 280 }}
					>
						{words[index]}
					</span>
				{/key}
			</span>
			that feel finished.
		</h1>
		<p class="mx-auto mt-6 max-w-lg text-lg text-[#a59c91]">
			One rotating word. The rest of the line stays put. Reduced motion keeps the first word and the
			same width.
		</p>
	</div>
</section>

<style>
	.flip {
		position: relative;
		display: inline-grid;
		margin-inline: 0.18em;
		vertical-align: bottom;
		color: #ff5a1f;
	}

	.ghost {
		grid-column: 1;
		grid-row: 1;
		visibility: hidden;
		white-space: nowrap;
	}

	.word {
		position: absolute;
		inset-inline-start: 0;
		inset-block-start: 0;
		white-space: nowrap;
	}
</style>
