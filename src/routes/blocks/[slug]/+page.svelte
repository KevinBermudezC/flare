<script lang="ts">
	import { getBlock } from '$lib/catalog';
	import CopyButton from '$lib/site/CopyButton.svelte';
	import CopyPanel from '$lib/site/CopyPanel.svelte';

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
	const primary = $derived(block?.files[0] ?? null);
</script>

<svelte:head>
	<title>{data.name} - Flare</title>
</svelte:head>

{#if block && primary}
	<div
		class="flare-chrome sticky top-12 z-40 border-b border-white/8 bg-[#09090b]/90 backdrop-blur-md"
	>
		<div class="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
			<p class="min-w-0 truncate text-sm text-[#8b8278]">
				<a href="/#catalog" class="hover:text-[#f5f0ea]">Chapters</a>
				<span class="mx-2 text-white/20">/</span>
				<span class="text-[#f5f0ea]">{block.name}</span>
			</p>
			<CopyButton source={primary.source} label="Copy {primary.name}" />
		</div>
	</div>

	<p class="mx-auto max-w-[1400px] px-4 pt-6 text-[#a59c91] sm:px-6">{block.tagline}</p>
	<p class="mx-auto max-w-[1400px] px-4 pt-2 font-mono text-[12px] text-[#8b8278] sm:px-6">
		Needs <span class="text-[#f5f0ea]">{block.extraDep}</span>
	</p>

	<div class="mt-6">
		<block.component />
	</div>

	<div class="mx-auto max-w-[1400px] space-y-4 px-4 py-10 sm:px-6">
		{#each block.files as file (file.name)}
			<CopyPanel filename={file.name} source={file.source} />
		{/each}
	</div>
{/if}
