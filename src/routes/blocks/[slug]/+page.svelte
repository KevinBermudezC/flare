<script lang="ts">
	import { blocks, getBlock } from '$lib/catalog';
	import CopyButton from '$lib/site/CopyButton.svelte';
	import CopyPanel from '$lib/site/CopyPanel.svelte';

	type Mode = 'preview' | 'code';
	type Viewport = 1440 | 768 | 390;

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
	const primary = $derived(block?.files[0] ?? null);

	let mode = $state<Mode>('preview');
	let viewport = $state<Viewport>(1440);
	let replay = $state(0);

	function frameWidth(size: Viewport): string {
		switch (size) {
			case 1440:
				return 'min(1440px, 100%)';
			case 768:
				return '768px';
			case 390:
				return '390px';
			default: {
				const _never: never = size;
				return _never;
			}
		}
	}

	function setMode(next: Mode) {
		mode = next;
	}

	function setViewport(next: Viewport) {
		viewport = next;
	}
</script>

<svelte:head>
	<title>{data.name} - Flare</title>
</svelte:head>

{#if block && primary}
	<div class="flex min-h-[calc(100dvh-52px)] bg-[#09090b]">
		<aside
			class="sticky top-[52px] hidden h-[calc(100dvh-52px)] w-52 shrink-0 flex-col border-r border-white/8 px-3 py-5 lg:flex"
		>
			<p class="px-2 font-mono text-[10px] tracking-[0.18em] text-[#8b8278] uppercase">Chapters</p>
			<nav class="mt-3 flex flex-col gap-1">
				{#each blocks as item (item.slug)}
					<a
						href="/blocks/{item.slug}"
						class="rounded-[12px] px-2 py-1.5 text-[13px] {item.slug === block.slug
							? 'text-[#ff5a1f]'
							: 'text-[#c4bbb0] hover:text-[#f5f0ea]'}"
					>
						{item.name}
					</a>
				{/each}
			</nav>
		</aside>

		<div class="min-w-0 flex-1">
			<div
				class="flare-chrome sticky top-[52px] z-40 flex h-[52px] flex-wrap items-center gap-2 border-b border-white/8 bg-[#09090b] px-3 sm:gap-3 sm:px-4"
			>
				<div class="flex rounded-[12px] border border-white/8 p-0.5">
					<button
						type="button"
						onclick={() => setMode('preview')}
						class="rounded-[10px] px-2.5 py-1 font-mono text-[11px] {mode === 'preview'
							? 'bg-[#ff5a1f] text-[#1a0703]'
							: 'text-[#c4bbb0]'}"
					>
						Preview
					</button>
					<button
						type="button"
						onclick={() => setMode('code')}
						class="rounded-[10px] px-2.5 py-1 font-mono text-[11px] {mode === 'code'
							? 'bg-[#ff5a1f] text-[#1a0703]'
							: 'text-[#c4bbb0]'}"
					>
						Code
					</button>
				</div>
				<button
					type="button"
					onclick={() => {
						replay += 1;
					}}
					class="rounded-[12px] border border-white/12 px-2.5 py-1 font-mono text-[11px] text-[#c4bbb0] hover:text-[#f5f0ea]"
				>
					Replay
				</button>
				<div class="flex rounded-[12px] border border-white/8 p-0.5">
					{#each [1440, 768, 390] as size (size)}
						<button
							type="button"
							onclick={() => setViewport(size as Viewport)}
							class="rounded-[10px] px-2 py-1 font-mono text-[11px] {viewport === size
								? 'text-[#ff5a1f]'
								: 'text-[#8b8278] hover:text-[#f5f0ea]'}"
						>
							{size}
						</button>
					{/each}
				</div>
				<div class="ml-auto">
					<CopyButton source={primary.source} label="Copy" />
				</div>
			</div>

			{#if mode === 'preview'}
				<div class="mx-auto min-h-[100dvh] bg-[#09090b]" style:width={frameWidth(viewport)}>
					{#key replay}
						<block.component />
					{/key}
				</div>
			{:else}
				<div class="grid gap-0 lg:grid-cols-2">
					<div class="hidden min-h-[100dvh] overflow-hidden border-r border-white/8 lg:block">
						{#key replay}
							<block.component />
						{/key}
					</div>
					<div class="p-4 sm:p-6">
						<p class="mb-3 font-mono text-[12px] text-[#8b8278]">Needs {block.extraDep}</p>
						{#each block.files as file (file.name)}
							<CopyPanel filename={file.name} source={file.source} />
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
