<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	let {
		slug,
		title,
		source = null
	}: {
		slug: string;
		title: string;
		source?: string | null;
	} = $props();
</script>

<div class="relative h-full w-full bg-[#09090b]">
	<div
		class="absolute inset-x-0 top-0 z-20 flex items-center gap-2 border-b border-white/8 bg-[#0c0c0e]/95 px-3 py-1.5"
	>
		<span class="size-1.5 rounded-full bg-white/20"></span>
		<span class="size-1.5 rounded-full bg-white/20"></span>
		<span class="size-1.5 rounded-full bg-white/20"></span>
		<span class="ml-1 min-w-0 flex-1 truncate font-mono text-[10px] tracking-wide text-[#8b8278]"
			>{slug}.svelte</span
		>
		<a
			href="/blocks/{slug}"
			class="font-mono text-[11px] text-[#c4bbb0] underline-offset-4 hover:text-[#f5f0ea] hover:underline"
		>
			Open
		</a>
		{#if source}
			<CopyButton {source} compact />
		{/if}
	</div>
	<iframe
		title="{title} live preview"
		src="/blocks/{slug}/embed"
		class="h-full w-full border-0 bg-[#09090b] pt-7"
		loading="lazy"
	></iframe>
</div>
