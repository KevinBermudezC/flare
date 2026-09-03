<script lang="ts">
	import { blocks, kindLabel } from '$lib/catalog';
	import PreviewFrame from '$lib/site/PreviewFrame.svelte';
</script>

<svelte:head>
	<title>Flare - Svelte 5 scroll chapters</title>
</svelte:head>

<main class="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
	<section class="max-w-2xl">
		<p class="font-mono text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Flare</p>
		<h1 class="mt-4 text-4xl leading-[1.05] font-semibold tracking-tight text-pretty sm:text-6xl">
			Preview. Copy the .svelte.
			<span class="block text-[#c4bbb0]">It's yours.</span>
		</h1>
		<p class="mt-5 max-w-xl text-lg text-[#a59c91]">
			A Svelte 5 gallery of scroll chapters. Live preview. Copy the .svelte.
		</p>
	</section>

	<ul id="catalog" class="mt-14 grid scroll-mt-20 grid-cols-1 gap-5">
		{#each blocks as block (block.slug)}
			<li class="flare-chrome overflow-hidden rounded-xl border border-white/8 bg-[#111113]">
				<div class="relative h-[88svh] min-h-[32rem] overflow-hidden border-b border-white/8">
					<PreviewFrame slug={block.slug} title={block.name} source={block.files[0].source} />
				</div>
				<div class="px-4 py-3.5">
					<p class="font-mono text-[10px] tracking-[0.2em] text-[#ff5a1f] uppercase">
						{kindLabel(block.kind)}
					</p>
					<h2 class="mt-1 text-[15px] font-semibold tracking-tight">{block.name}</h2>
					<p class="mt-1 text-sm text-[#8b8278]">{block.tagline}</p>
				</div>
			</li>
		{/each}
	</ul>
</main>
