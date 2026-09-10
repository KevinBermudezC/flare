<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { getBlock } from '$lib/catalog';
	import ChapterPlayground from '$lib/site/ChapterPlayground.svelte';
	import { readEmbedSearch } from '$lib/site/chapter-embed';

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
	const knobs = $derived(readEmbedSearch(page.url.searchParams));
	let primed = $state(false);

	onMount(() => {
		primed = true;
	});
</script>

<svelte:head>
	<title>{data.name} preview - Flare</title>
</svelte:head>

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
