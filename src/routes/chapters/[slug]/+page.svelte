<script lang="ts">
	import { untrack } from 'svelte';
	import { editFieldLabel, getBlock } from '$lib/catalog';
	import ChapterNav from '$lib/site/ChapterNav.svelte';
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
	let title = $state('');
	let accent = $state<Accent>('ember');
	let reduceMotion = $state(false);

	$effect.pre(() => {
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
	<div class="layout">
		<ChapterNav current={block.slug} />

		<div class="main">
			<header class="head">
				<p class="crumb">
					<a href="/">FLARE</a>
					<span>/</span>
					<a href="/#chapters">Chapters</a>
					<span>/</span>
					<span class="here">{block.slug}</span>
				</p>
				<h1>{block.slug}</h1>
				<p class="tagline">{block.tagline}</p>
				<p class="need">Needs {block.extraDep}</p>
			</header>

			<div class="flare-chrome bar">
				<div class="group">
					<button
						type="button"
						onclick={() => setMode('preview')}
						class="tab"
						class:on={mode === 'preview'}
					>
						Preview
					</button>
					<button
						type="button"
						onclick={() => setMode('code')}
						class="tab"
						class:on={mode === 'code'}
					>
						Code
					</button>
				</div>
				<button
					type="button"
					onclick={() => {
						replay += 1;
					}}
					class="ghost"
				>
					Replay
				</button>
				<div class="group">
					{#each [1440, 768, 390] as size (size)}
						<button
							type="button"
							onclick={() => setViewport(size as Viewport)}
							class="size"
							class:on={viewport === size}
						>
							{size}
						</button>
					{/each}
				</div>
				<div class="copy">
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
	.layout {
		display: flex;
		flex-wrap: wrap;
		min-height: calc(100dvh - var(--nav-h));
		background: var(--color-ink);
	}

	.main {
		min-width: 0;
		flex: 1 1 16rem;
	}

	.head {
		padding: 1.5rem 1rem 1.25rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	.crumb {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0 0 1rem;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: #8b8278;
	}

	.crumb a {
		color: #c4bbb0;
		text-decoration: none;
	}

	.crumb a:hover,
	.crumb a:focus-visible {
		color: var(--color-ember);
	}

	.crumb a:focus-visible,
	.tab:focus-visible,
	.ghost:focus-visible,
	.size:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 2px;
	}

	.here {
		color: var(--color-ember);
	}

	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3.25rem);
		font-weight: 600;
		line-height: 0.95;
		letter-spacing: -0.04em;
	}

	.tagline {
		margin: 0.7rem 0 0;
		max-width: 36rem;
		color: #a59c91;
	}

	.need {
		margin: 0.7rem 0 0;
		font-family: var(--font-mono);
		font-size: 12px;
		color: #8b8278;
	}

	.bar {
		position: sticky;
		top: var(--nav-h);
		z-index: 30;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 0.75rem;
		height: auto;
		min-height: var(--nav-h);
		padding: 0.45rem 0.75rem;
		border-bottom: 1px solid var(--color-hairline);
		background: var(--color-ink);
	}

	.group {
		display: flex;
		padding: 0.15rem;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
	}

	.tab,
	.ghost,
	.size {
		border: 0;
		background: transparent;
		font-family: var(--font-mono);
		font-size: 11px;
		color: #c4bbb0;
	}

	.tab,
	.ghost {
		border-radius: 10px;
		padding: 0.35rem 0.65rem;
	}

	.ghost {
		border: 1px solid rgba(245, 240, 234, 0.12);
		border-radius: 12px;
	}

	.size {
		border-radius: 10px;
		padding: 0.35rem 0.5rem;
		color: #8b8278;
	}

	.tab.on {
		background: var(--color-ember);
		color: #1a0703;
	}

	.size.on {
		color: var(--color-ember);
	}

	.ghost:hover,
	.size:hover {
		color: var(--color-paper);
	}

	.copy {
		margin-left: auto;
	}

	.stage-wrap {
		overflow-x: auto;
		background: var(--color-ink);
	}

	.stage {
		min-height: 100dvh;
		margin: 0 auto;
	}

	.docs {
		display: grid;
		gap: 1.5rem;
		padding: 1.5rem 1rem 3rem;
		border-top: 1px solid var(--color-hairline);
	}

	.edit {
		display: grid;
		gap: 1rem;
		max-width: 28rem;
		padding: 1rem 1.1rem 1.15rem;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		background: var(--color-card);
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
		background: var(--color-ink);
		padding: 0.65rem 0.75rem;
		font-family: var(--font-sans);
		font-size: 15px;
		letter-spacing: 0;
		text-transform: none;
		color: var(--color-paper);
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
		background: var(--color-ember);
		border-color: var(--color-ember);
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
		.head {
			padding: 2rem 1.5rem 1.5rem;
		}

		.docs {
			padding: 2rem 1.5rem 4rem;
		}

		.bar {
			padding: 0.45rem 1rem;
		}
	}
</style>
