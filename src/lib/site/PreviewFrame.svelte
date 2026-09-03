<script lang="ts">
	let { slug, title }: { slug: string; title: string } = $props();
</script>

<iframe
	title="{title} live preview"
	src="/blocks/{slug}/embed"
	class="pointer-events-none h-[200px] w-full max-h-[200px] border-0 bg-[#09090b]"
	tabindex="-1"
></iframe>
