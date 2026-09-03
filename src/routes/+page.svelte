<script lang="ts">
	import { blocks } from '$lib/catalog';
	import PreviewFrame from '$lib/site/PreviewFrame.svelte';
</script>

<svelte:head>
	<title>Flare - Svelte 5 scroll chapters</title>
</svelte:head>

<main class="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
	<section class="max-w-2xl">
		<h1 class="text-4xl leading-[1.05] font-semibold tracking-tight text-pretty sm:text-6xl">
			Preview. Copy.
		</h1>
		<p class="mt-5 max-w-xl text-lg text-[#a59c91]">
			A Svelte 5 gallery of scroll chapters.
		</p>
	</section>

	<ul id="catalog" class="mt-14 grid scroll-mt-20 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each blocks as block (block.slug)}
			<li class="flare-chrome overflow-hidden rounded-[12px] border border-white/8 bg-[#111113]">
				<a href="/blocks/{block.slug}" class="block">
					<div class="max-h-[200px] overflow-hidden border-b border-white/8">
						<PreviewFrame slug={block.slug} title={block.name} />
					</div>
					<div class="px-4 py-3.5">
						<div class="flex items-center gap-2">
							<h2 class="text-[15px] font-semibold tracking-tight">{block.name}</h2>
							<span
								class="rounded-[12px] border border-white/12 px-2 py-0.5 font-mono text-[10px] tracking-wide text-[#c4bbb0] uppercase"
							>
								scroll
							</span>
						</div>
						<p class="mt-1 text-sm text-[#8b8278]">{block.tagline}</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</main>
