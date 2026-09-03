<script lang="ts">
	let {
		source,
		label = 'Copy',
		compact = false
	}: {
		source: string;
		label?: string;
		compact?: boolean;
	} = $props();

	let copied = $state(false);

	async function copy(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
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

<button
	type="button"
	onclick={copy}
	class="flare-chrome rounded-full border border-white/12 bg-[#09090b]/80 font-mono text-[11px] text-[#f5f0ea] backdrop-blur-sm hover:border-white/24 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a1f] {compact
		? 'px-2.5 py-1'
		: 'px-3 py-1.5'}"
>
	{copied ? 'Copied' : label}
</button>
