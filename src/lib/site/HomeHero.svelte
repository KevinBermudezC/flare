<script lang="ts">
	import { blocks } from '$lib/catalog';

	const firstSlug = blocks[0]?.slug ?? 'split-masthead';
	const mark = '/brand/flare-mark.svg';
</script>

<section id="hero" class="flare-chrome hero" aria-label="Flare">
	<img class="ticks" src={mark} alt="" width="36" height="36" />
	<h1>FLARE</h1>
	<p>Preview. Copy.</p>
	<div class="actions">
		<a class="open" href="/chapters/{firstSlug}">Open</a>
		<a class="jump" href="/#chapters">Chapters</a>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		min-height: clamp(280px, 48vh, 36rem);
		flex-direction: column;
		justify-content: flex-end;
		gap: 1.1rem;
		padding: 2.5rem 1rem 2.4rem;
		background: var(--color-ink);
		animation: rise 280ms ease both;
	}

	.ticks {
		display: block;
		width: 36px;
		height: 36px;
	}

	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(4.25rem, 16vw, 8.5rem);
		font-weight: 700;
		line-height: 0.86;
		letter-spacing: -0.055em;
		text-wrap: pretty;
		color: var(--color-paper);
	}

	p {
		margin: 0;
		font-family: var(--font-body);
		font-size: 16px;
		color: #c4bbb0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.85rem 1.15rem;
		margin-top: 0.35rem;
	}

	.open {
		display: inline-flex;
		align-items: center;
		height: 36px;
		padding: 0 1.05rem;
		border: 1px solid var(--color-ember);
		border-radius: 999px;
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		color: var(--color-ember);
		text-decoration: none;
	}

	.open:hover {
		background: color-mix(in oklab, var(--color-ember) 16%, transparent);
	}

	.jump {
		font-family: var(--font-body);
		font-size: 14px;
		color: #c4bbb0;
		text-decoration: none;
	}

	.jump:hover {
		color: var(--color-paper);
	}

	.open:focus-visible,
	.jump:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 3px;
	}

	@keyframes rise {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@media (min-width: 768px) {
		.hero {
			padding: 3.25rem 1.35rem 2.75rem;
		}
	}

	@media (min-width: 1024px) {
		.hero {
			padding: 3.75rem 1.6rem 3rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero {
			animation: none;
		}
	}
</style>
