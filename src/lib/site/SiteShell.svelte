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
				<a class="item" href={github} rel="noreferrer">GitHub</a>
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
					<p class="pitch">Scroll chapters. Preview. Copy.</p>
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
		padding: var(--gutter);
		background: var(--color-ink);
	}

	.shell-frame {
		max-width: var(--shell-max);
		min-height: calc(100dvh - 2 * var(--gutter));
		margin: 0 auto;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		overflow: visible;
		background: var(--color-ink);
	}

	.shell-nav {
		position: sticky;
		top: 0;
		z-index: var(--z-nav);
		display: flex;
		height: var(--nav-h);
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 0 1.25rem;
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
		align-items: center;
		gap: 1.25rem;
	}

	.item {
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
		padding: 2.25rem 1rem 1.35rem;
	}

	.foot-top {
		display: grid;
		gap: 2.25rem;
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
		gap: 2rem 2.5rem;
	}

	.shell-foot nav {
		display: grid;
		gap: 0.55rem;
		align-content: start;
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
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.65rem 1.5rem;
		margin-top: 2.25rem;
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

	@media (min-width: 768px) {
		.shell-foot {
			padding: 2.75rem 1.35rem 1.5rem;
		}

		.foot-top {
			grid-template-columns: minmax(14rem, 1fr) auto;
			align-items: start;
			justify-content: space-between;
			gap: 3rem;
		}

		.cols {
			min-width: 18rem;
			gap: 2rem 3.5rem;
		}
	}

	@media (min-width: 1024px) {
		.shell-foot {
			padding: 3.25rem 1.6rem 1.7rem;
		}
	}
</style>
