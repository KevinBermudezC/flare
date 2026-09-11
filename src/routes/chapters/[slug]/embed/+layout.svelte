<script lang="ts">
	import FlareLenis from '$lib/site/FlareLenis.svelte';

	let { children } = $props();
</script>

<FlareLenis />
{@render children()}
