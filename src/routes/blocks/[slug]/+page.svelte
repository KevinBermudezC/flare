<script lang="ts">
	import { untrack } from 'svelte';
	import { blocks, editFieldLabel, getBlock } from '$lib/catalog';
	import CopyButton from '$lib/site/CopyButton.svelte';
	import CopyPanel from '$lib/site/CopyPanel.svelte';
	import ChapterPlayground, { type Accent } from '$lib/site/ChapterPlayground.svelte';

	type Mode = 'preview' | 'code';
	type Viewport = 1440 | 768 | 390;

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
	const primary = $derived(block?.files[0] ?? null);

	let mode = $state<Mode>('preview');
	let viewport = $state<Viewport>(1440);
	let replay = $state(0);
	let title = $state(getBlock(data.slug)?.editDefault ?? '');
	let accent = $state<Accent>('ember');
	let reduceMotion = $state(false);

	$effect(() => {
		const next = getBlock(data.slug);
		untrack(() => {
			title = next?.editDefault ?? '';
			accent = 'ember';
			reduceMotion = false;
			replay = 0;
			mode = 'preview';
			viewport = 1440;
		});
	});

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
		const target = next === 'code' ? 'chapter-code' : 'chapter-stage';
		document.getElementById(target)?.scrollIntoView({ block: 'start' });
	}

	function setViewport(next: Viewport) {
		viewport = next;
	}

	function setAccent(next: Accent) {
		accent = next;
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
			<header class="border-b border-white/8 px-4 py-6 sm:px-6">
				<h1 class="text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] font-semibold tracking-tight">
					{block.name}
				</h1>
				<p class="mt-2 max-w-xl text-[#a59c91]">{block.tagline}</p>
				<p class="mt-3 font-mono text-[12px] text-[#8b8278]">Needs {block.extraDep}</p>
			</header>

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

			<div id="chapter-stage" class="stage-wrap">
				<div class="stage" style:width={frameWidth(viewport)}>
					<ChapterPlayground
						slug={block.slug}
						{replay}
						{title}
						{accent}
						{reduceMotion}
					/>
				</div>
			</div>

			<section id="chapter-code" class="docs" aria-label="Copy and edit">
				{#each block.files as file (file.name)}
					<CopyPanel filename={file.name} source={file.source} />
				{/each}

				<div class="edit">
					<p class="edit-kicker">Edit</p>
					<label class="field">
						<span>{editFieldLabel(block.editField)}</span>
						<input bind:value={title} type="text" autocomplete="off" />
					</label>
					<fieldset class="field">
						<legend>Accent</legend>
						<div class="pills">
							<button type="button" class:on={accent === 'ember'} onclick={() => setAccent('ember')}>
								Ember
							</button>
							<button type="button" class:on={accent === 'paper'} onclick={() => setAccent('paper')}>
								Paper
							</button>
						</div>
					</fieldset>
					<label class="check">
						<input bind:checked={reduceMotion} type="checkbox" />
						Reduced motion
					</label>
				</div>
			</section>
		</div>
	</div>
{/if}

<style>
	.stage-wrap {
		overflow-x: auto;
		background: #09090b;
	}

	.stage {
		min-height: 100dvh;
		margin: 0 auto;
	}

	.docs {
		display: grid;
		gap: 1.5rem;
		padding: 1.5rem 1rem 3rem;
		border-top: 1px solid rgba(245, 240, 234, 0.08);
	}

	.edit {
		display: grid;
		gap: 1rem;
		max-width: 28rem;
		padding: 1rem 1.1rem 1.15rem;
		border: 1px solid rgba(245, 240, 234, 0.08);
		border-radius: 12px;
		background: #111113;
	}

	.edit-kicker {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.field {
		display: grid;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		border: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.field input {
		border: 1px solid rgba(245, 240, 234, 0.12);
		border-radius: 12px;
		background: #09090b;
		padding: 0.65rem 0.75rem;
		font-family: var(--font-sans);
		font-size: 15px;
		letter-spacing: 0;
		text-transform: none;
		color: #f5f0ea;
	}

	.pills {
		display: flex;
		gap: 0.4rem;
	}

	.pills button {
		border: 1px solid rgba(245, 240, 234, 0.12);
		border-radius: 12px;
		background: transparent;
		padding: 0.45rem 0.7rem;
		font-family: var(--font-mono);
		font-size: 11px;
		color: #c4bbb0;
	}

	.pills button.on {
		background: #ff5a1f;
		border-color: #ff5a1f;
		color: #1a0703;
	}

	.check {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		font-family: var(--font-mono);
		font-size: 12px;
		color: #c4bbb0;
	}

	@media (min-width: 900px) {
		.docs {
			padding: 2rem 1.5rem 4rem;
		}
	}
</style>
