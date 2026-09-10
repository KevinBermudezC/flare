<script lang="ts">
	import { page } from '$app/state';
	import { blocks } from '$lib/catalog';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const onHome = $derived(page.url.pathname === '/');
	const firstSlug = blocks[0]?.slug ?? 'split-masthead';
	const mark = '/brand/flare-mark.svg';
	const loveMark = '<3';
	const portfolio = 'https://kevinbermudez.vercel.app';
	const github = 'https://github.com/KevinBermudezC/flare';
	const license = 'https://github.com/KevinBermudezC/flare/blob/main/LICENSE';
</script>

<div class="shell-page">
	<div class="shell-frame">
		<header class="flare-chrome shell-nav">
			<a href="/" class="brand">
				<img class="mark" src={mark} alt="" width="22" height="22" />
				<span class="wordmark">FLARE</span>
			</a>
			<nav class="links" aria-label="Site">
				<a class="item" class:on={onHome} href="/#chapters">Chapters</a>
				<a class="cta" href="/chapters/{firstSlug}">Open</a>
			</nav>
		</header>
		<div class="shell-body">
			{@render children()}
		</div>
		<footer class="shell-foot">
			<div class="foot-top">
				<div class="ident">
					<a href="/" class="foot-brand">
						<img class="foot-mark" src={mark} alt="" width="28" height="28" />
						<span class="foot-word">FLARE</span>
					</a>
					<p class="pitch">Preview. Copy.</p>
				</div>
				<div class="cols">
					<nav aria-label="Chapter index">
						<p class="col-h">Chapters</p>
						<a href="/#chapters">Index</a>
						{#each blocks as block (block.slug)}
							<a href="/chapters/{block.slug}">{block.name}</a>
						{/each}
					</nav>
					<nav aria-label="Project">
						<p class="col-h">Project</p>
						<a href={github} rel="noreferrer">GitHub</a>
						<a href={portfolio} rel="noreferrer">Portfolio</a>
						<a href={license} rel="noreferrer">MIT</a>
					</nav>
				</div>
			</div>
			<div class="foot-bar">
				<p class="sign">
					<a href={portfolio} rel="noreferrer">with <span>love {loveMark}</span></a>
				</p>
				<p class="legal">
					© 2026 Flare · <a href={license} rel="noreferrer">MIT</a>
				</p>
			</div>
		</footer>
	</div>
</div>

<style>
	.shell-page {
		min-height: 100dvh;
		padding-top: max(var(--gutter), env(safe-area-inset-top, 0px));
		padding-right: max(var(--gutter), env(safe-area-inset-right, 0px));
		padding-bottom: max(var(--gutter), env(safe-area-inset-bottom, 0px));
		padding-left: max(var(--gutter), env(safe-area-inset-left, 0px));
		background: var(--color-ink);
	}

	.shell-frame {
		max-width: var(--shell-max);
		min-width: 0;
		min-height: calc(100dvh - 2 * var(--gutter));
		margin: 0 auto;
		border: 1px solid var(--color-hairline);
		border-radius: var(--frame-radius);
		overflow: visible;
		background: var(--color-ink);
	}

	.shell-body {
		min-width: 0;
	}

	.shell-nav {
		position: sticky;
		top: 0;
		z-index: var(--z-nav);
		display: flex;
		height: var(--nav-h);
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0 1rem;
		border-bottom: 1px solid var(--color-hairline);
		background: var(--color-ink);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		min-width: 0;
		color: inherit;
		text-decoration: none;
	}

	.mark {
		display: block;
		width: 22px;
		height: 22px;
		flex-shrink: 0;
	}

	.wordmark {
		font-family: var(--font-display);
		font-size: 15px;
		font-weight: 650;
		letter-spacing: 0.04em;
		color: var(--color-paper);
	}

	.links {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 1rem;
	}

	.item {
		display: none;
		min-height: 44px;
		align-items: center;
		font-family: var(--font-body);
		font-size: 13px;
		color: #c4bbb0;
		text-decoration: none;
	}

	.item:hover,
	.item.on {
		color: var(--color-paper);
	}

	.item.on {
		color: var(--color-ember);
	}

	.item:focus-visible,
	.brand:focus-visible,
	.cta:focus-visible,
	.foot-brand:focus-visible,
	.shell-foot a:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 3px;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		height: 32px;
		padding: 0 0.9rem;
		border: 1px solid var(--color-ember);
		border-radius: 999px;
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		color: var(--color-ember);
		text-decoration: none;
	}

	.cta:hover {
		background: color-mix(in oklab, var(--color-ember) 16%, transparent);
	}

	.shell-foot {
		border-top: 1px solid var(--color-hairline);
		padding: 2rem 1rem 1.25rem;
	}

	.foot-top {
		display: grid;
		gap: 2rem;
	}

	.ident {
		display: grid;
		gap: 0.7rem;
		align-content: start;
	}

	.foot-brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: inherit;
		text-decoration: none;
	}

	.foot-mark {
		display: block;
		width: 28px;
		height: 28px;
		flex-shrink: 0;
	}

	.foot-word {
		font-family: var(--font-display);
		font-size: 18px;
		font-weight: 650;
		letter-spacing: 0.04em;
		color: var(--color-paper);
	}

	.pitch {
		margin: 0;
		max-width: 22rem;
		font-family: var(--font-body);
		font-size: 13px;
		line-height: 1.5;
		color: #8b8278;
	}

	.cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem 1.75rem;
		min-width: 0;
	}

	.shell-foot nav {
		display: grid;
		gap: 0.55rem;
		align-content: start;
		min-width: 0;
	}

	.col-h {
		margin: 0 0 0.35rem;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #8b8278;
	}

	.shell-foot a {
		font-family: var(--font-body);
		font-size: 13px;
		color: #c4bbb0;
		text-decoration: none;
	}

	.shell-foot a:hover {
		color: var(--color-paper);
	}

	.foot-bar {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.45rem;
		margin-top: 2rem;
		padding-top: 1.15rem;
		border-top: 1px solid var(--color-hairline);
	}

	.sign,
	.legal {
		margin: 0;
		font-family: var(--font-body);
		font-size: 13px;
		color: #8b8278;
	}

	.sign a {
		color: #8b8278;
	}

	.sign span {
		color: var(--color-ember);
	}

	.sign a:hover {
		color: var(--color-paper);
	}

	.legal a:hover {
		color: var(--color-paper);
	}

	@media (min-width: 480px) {
		.item {
			display: inline-flex;
		}

		.shell-nav {
			gap: 1.25rem;
			padding: 0 1.25rem;
		}

		.links {
			gap: 1.25rem;
		}
	}

	@media (min-width: 900px) {
		.shell-foot {
			padding: 2.75rem 1.6rem 1.5rem;
		}

		.foot-top {
			grid-template-columns: minmax(16rem, 1fr) minmax(16rem, 1fr);
			align-items: start;
			gap: 3rem;
		}

		.cols {
			gap: 2rem 3rem;
		}

		.foot-bar {
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: 0.65rem 1.5rem;
		}
	}

	@media (min-width: 1280px) {
		.shell-foot {
			padding: 3.25rem 2rem 1.7rem;
		}

		.shell-nav {
			padding: 0 2rem;
		}
	}
</style>
