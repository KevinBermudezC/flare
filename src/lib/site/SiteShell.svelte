<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const onHome = $derived(page.url.pathname === '/');
</script>

<div class="shell-page">
	<div class="shell-frame">
		<header class="flare-chrome shell-nav">
			<a href="/" class="wordmark">FLARE</a>
			<nav class="links" aria-label="Site">
				<a class="item" class:on={onHome} href="/#chapters">Chapters</a>
				<a class="item" href="https://github.com/KevinBermudezC/flare" rel="noreferrer">GitHub</a>
				<a class="ember" href="/chapters/split-masthead">
					<svg class="flame" viewBox="0 0 16 16" aria-hidden="true">
						<path
							fill="currentColor"
							d="M8.1 1.2c.4 1.8-.2 3.1-1.2 4.2-.7.8-1.1 1.5-1.1 2.4 0 1.2.6 2.2 1.6 2.8-.6-.2-1-1-1-1.8 0-.3.1-.6.2-.9 1.4 1 2.4 2.4 2.4 4.1 0 2.2-1.6 3.6-3.6 3.6S3 14.2 3 12c0-2.3 1.4-3.9 2.6-5.3C6.8 5.3 7.4 4.4 7.2 2.8c.6.4 1.2.9 1.6 1.7.3-.9.1-2.1-.7-3.3Z"
						/>
						<path
							fill="currentColor"
							d="M11.4 5.2c.2 1.2-.4 2.2-1.2 3.1 1 .8 1.6 1.9 1.6 3.2 0 2.3-1.8 3.7-3.8 3.7h-.2c2.2-.4 3.6-2 3.6-4.2 0-1.5-.8-2.6-1.8-3.4.8-.7 1.4-1.5 1.8-2.4Z"
						/>
					</svg>
					Ember
				</a>
			</nav>
		</header>
		<div class="shell-body">
			{@render children()}
		</div>
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

	.wordmark {
		font-family: var(--font-display);
		font-size: 15px;
		font-weight: 650;
		letter-spacing: 0.04em;
		color: var(--color-paper);
		text-decoration: none;
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
	.wordmark:focus-visible,
	.ember:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 3px;
	}

	.ember {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		height: 32px;
		padding: 0 0.85rem 0 0.7rem;
		border: 1px solid var(--color-ember);
		border-radius: 999px;
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		color: var(--color-ember);
		text-decoration: none;
	}

	.ember:hover {
		background: color-mix(in oklab, var(--color-ember) 16%, transparent);
	}

	.flame {
		width: 14px;
		height: 14px;
	}
</style>
