<script lang="ts">
	let { slug, title }: { slug: string; title: string } = $props();
</script>

<iframe
	title="{title} live preview"
	src="/blocks/{slug}/embed"
	class="h-full w-full border-0 bg-[#09090b]"
	loading="lazy"
></iframe>
