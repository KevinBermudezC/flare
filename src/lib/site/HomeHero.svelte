<script lang="ts">
	import HeroAtmosphere from '$lib/site/HeroAtmosphere.svelte';

	const mark = '/brand/flare-mark.svg';
</script>

<section id="hero" class="flare-chrome hero" aria-label="Flare">
	<HeroAtmosphere />
	<div class="copy">
		<img class="ticks" src={mark} alt="" width="36" height="36" />
		<h1>FLARE</h1>
		<p class="pitch">Preview. Copy.</p>
		<div class="actions">
			<a class="open" href="/chapters/split-masthead">Open</a>
			<a class="jump" href="/#chapters">Chapters</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		overflow: hidden;
		box-sizing: border-box;
		min-height: var(--hero-stage);
		flex-direction: column;
		justify-content: center;
		padding: 1.5rem 1rem 1.65rem;
		background: var(--color-ink);
	}

	.copy {
		position: relative;
		z-index: 1;
		display: flex;
		max-width: min(100%, 54rem);
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
	}

	.ticks {
		display: block;
		width: 28px;
		height: 28px;
	}

	h1 {
		margin: 0;
		max-width: 100%;
		font-family: var(--font-display);
		font-size: clamp(3.5rem, 18vw, 5.5rem);
		font-weight: 700;
		line-height: 0.82;
		letter-spacing: -0.06em;
		overflow-wrap: anywhere;
		text-wrap: pretty;
		color: var(--color-paper);
	}

	.pitch {
		margin: 0;
		padding-top: 0.85rem;
		border-top: 1px solid var(--color-hairline);
		width: min(22rem, 100%);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0.08em;
		color: #c4bbb0;
	}

	.pitch::before {
		content: '';
		display: inline-block;
		width: 5px;
		height: 5px;
		margin-right: 0.7rem;
		border-radius: 50%;
		background: color-mix(in oklab, var(--color-ember) 72%, var(--color-paper));
		vertical-align: 1px;
	}

	.actions {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: stretch;
		gap: 0.65rem;
		margin-top: 0.55rem;
	}

	.open,
	.jump {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		height: 44px;
		padding: 0 1.15rem;
		border-radius: 999px;
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
	}

	.open {
		border: 1px solid var(--color-ember);
		color: var(--color-ember);
	}

	.open:hover {
		background: color-mix(in oklab, var(--color-ember) 16%, transparent);
	}

	.jump {
		border: 1px solid var(--color-hairline);
		color: #c4bbb0;
	}

	.jump:hover {
		color: var(--color-paper);
		border-color: rgba(245, 240, 234, 0.2);
	}

	.open:focus-visible,
	.jump:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 3px;
	}

	@media (min-width: 768px) {
		.hero {
			padding: 2.75rem 1.5rem 2.5rem;
		}

		.ticks {
			width: 36px;
			height: 36px;
		}

		.copy {
			gap: 1.05rem;
		}

		h1 {
			font-size: clamp(5.5rem, 14vw, 11rem);
		}

		.pitch {
			font-size: 14px;
		}

		.actions {
			width: auto;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.75rem;
		}

		.open,
		.jump {
			width: auto;
			min-width: 7.25rem;
			height: 40px;
			min-height: 40px;
		}
	}

	@media (min-width: 1024px) {
		.hero {
			height: var(--hero-stage);
			padding: 3.25rem 2rem 2.75rem;
		}

		h1 {
			font-size: clamp(6.5rem, 13vw, 12.5rem);
		}
	}

	@media (min-width: 1280px) {
		.hero {
			padding: 3.5rem 2.25rem 3rem;
		}

		.copy {
			gap: 1.15rem;
		}
	}
</style>
