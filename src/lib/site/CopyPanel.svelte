<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	let { filename, source }: { filename: string; source: string } = $props();
</script>

<div class="overflow-hidden rounded-[12px] border border-white/8 bg-[#111113]">
	<div class="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-2">
		<p class="truncate font-mono text-[12px] text-[#c4bbb0]">{filename}</p>
		<CopyButton {source} compact />
	</div>
	<pre
		class="max-h-[70dvh] overflow-auto p-4 font-mono text-[12px] leading-6 text-[#ddd4c8]">{source}</pre>
</div>
