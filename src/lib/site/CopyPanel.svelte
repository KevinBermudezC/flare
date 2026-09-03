<script lang="ts">
	let { filename, source }: { filename: string; source: string } = $props();
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(source);
			copied = true;
			window.setTimeout(() => {
				copied = false;
			}, 1600);
		} catch {
			copied = false;
		}
	}
</script>

<div class="overflow-hidden rounded-2xl border border-white/8 bg-[#0c0c0e]">
	<div class="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-2.5">
		<p class="font-mono text-[12px] text-[#c4bbb0]">{filename}</p>
		<button
			type="button"
			onclick={copy}
			class="rounded-full border border-white/12 px-3 py-1 font-mono text-[11px] text-[#f5f0ea]"
		>
			{copied ? 'Copied' : 'Copy'}
		</button>
	</div>
	<pre class="max-h-[36rem] overflow-auto p-4 font-mono text-[12px] leading-6 text-[#ddd4c8]">{source}</pre>
</div>
