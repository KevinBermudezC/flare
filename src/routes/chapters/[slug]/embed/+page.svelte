<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { getBlock } from '$lib/catalog';
	import ChapterPlayground from '$lib/site/ChapterPlayground.svelte';
	import SeoHead from '$lib/site/SeoHead.svelte';
	import { readEmbedSearch } from '$lib/site/chapter-embed';
	import { OG, chapterDescription, chapterTitle } from '$lib/site/seo';

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
	const knobs = $derived(readEmbedSearch(page.url.searchParams));
	let primed = $state(false);

	onMount(() => {
		primed = true;
	});
</script>

{#if block}
	<SeoHead
		title="{chapterTitle(block.slug)} preview"
		description={chapterDescription(block.slug)}
		image={OG.fallback}
		index={false}
	/>
{/if}

{#if block && primed}
	<div class="embed">
		<ChapterPlayground
			slug={block.slug}
			replay={knobs.replay}
			title={knobs.title}
			accent={knobs.accent}
			reduceMotion={knobs.reduceMotion}
		/>
	</div>
{/if}

<style>
	.embed {
		min-height: 100dvh;
		background: #09090b;
	}
</style>
