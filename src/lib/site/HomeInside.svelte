<section id="inside" class="inside" aria-labelledby="inside-h">
	<header class="head">
		<p class="kicker">Inside</p>
		<h2 id="inside-h">What you get</h2>
	</header>
	<ul class="cards">
		<li>
			<p class="n">01</p>
			<h3>Preview</h3>
			<p>Live chapter canvas. Pin reads.</p>
		</li>
		<li>
			<p class="n">02</p>
			<h3>Copy</h3>
			<p>One click. The whole <code>.svelte</code>.</p>
		</li>
		<li>
			<p class="n">03</p>
			<h3>Scroll</h3>
			<p>Six chapters. GSAP where it earns it.</p>
		</li>
	</ul>
</section>

<style>
	.inside {
		scroll-margin-top: var(--nav-h);
		padding: 2rem 1rem 2.25rem;
		border-top: 1px solid var(--color-hairline);
		background: var(--color-ink);
	}

	.head {
		display: grid;
		gap: 0.45rem;
		margin-bottom: 1.25rem;
	}

	.kicker {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ember);
	}

	h2 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.7rem, 4vw, 2.4rem);
		font-weight: 600;
		letter-spacing: -0.04em;
		text-wrap: pretty;
		color: var(--color-paper);
	}

	.cards {
		display: grid;
		gap: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		background: var(--color-card);
		overflow: hidden;
	}

	li {
		display: grid;
		gap: 0.4rem;
		padding: 1.15rem 1.1rem 1.2rem;
	}

	li + li {
		border-top: 1px solid var(--color-hairline);
	}

	.n {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		color: var(--color-ember);
	}

	h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		letter-spacing: -0.03em;
		color: var(--color-paper);
	}

	li p:last-child {
		margin: 0;
		max-width: 28rem;
		font-family: var(--font-body);
		font-size: 14px;
		line-height: 1.5;
		color: #8b8278;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		color: var(--color-paper);
	}

	@media (min-width: 768px) {
		.inside {
			padding: 2.5rem 1.35rem 2.75rem;
		}

		.cards {
			grid-template-columns: 1fr 1fr 1fr;
		}

		li + li {
			border-top: 0;
			border-left: 1px solid var(--color-hairline);
		}
	}

	@media (min-width: 1280px) {
		.inside {
			padding: 2.75rem 2rem 3rem;
		}
	}
</style>
