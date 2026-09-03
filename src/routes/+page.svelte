<script lang="ts">
	import { blocks, kindLabel } from '$lib/catalog';
	import PreviewFrame from '$lib/site/PreviewFrame.svelte';
</script>

<svelte:head>
	<title>Flare — Svelte 5 marketing + motion sections</title>
</svelte:head>

<main class="mx-auto max-w-6xl px-6 py-14">
	<section class="max-w-2xl">
		<p class="font-mono text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Flare</p>
		<h1 class="mt-4 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
			Preview. Copy the .svelte.
			<span class="block text-[#c4bbb0]">It’s yours.</span>
		</h1>
		<p class="mt-5 max-w-xl text-lg text-[#a59c91]">
			A Svelte 5 gallery of marketing + motion blocks. Live previews, not screenshots. Not a design
			system. Not shadcn. Not Tangram.
		</p>
	</section>

	<ul class="mt-14 grid gap-5 md:grid-cols-2">
		{#each blocks as block (block.slug)}
			<li class="overflow-hidden rounded-2xl border border-white/8 bg-[#111113]">
				<div class="relative h-64 overflow-hidden border-b border-white/8 md:h-72">
					<PreviewFrame slug={block.slug} title={block.name} />
				</div>
				<a href="/blocks/{block.slug}" class="block px-5 py-4">
					<p class="font-mono text-[10px] tracking-[0.2em] text-[#ff5a1f] uppercase">
						{kindLabel(block.kind)}
					</p>
					<h2 class="mt-1 text-lg font-semibold tracking-tight">{block.name}</h2>
					<p class="mt-1 text-sm text-[#8b8278]">{block.tagline}</p>
				</a>
			</li>
		{/each}
	</ul>
</main>
