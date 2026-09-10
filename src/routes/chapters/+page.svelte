<script lang="ts">
	import ChapterNav from '$lib/site/ChapterNav.svelte';

</script>

<svelte:head>
	<title>Chapters - Flare</title>
</svelte:head>

<div class="layout">
	<ChapterNav />

	<article class="main">
		<header class="head">
			<p class="crumb">
				<a href="/">FLARE</a>
				<span>/</span>
				<span class="here">Chapters</span>
			</p>
			<h1>Introduction</h1>
			<p class="pitch">Preview. Copy.</p>
		</header>

		<div class="body">
			<div class="lede">
				<p>
					Flare is a Svelte 5 gallery of scroll chapters. Live preview. Copy the whole
					<code>.svelte</code>. Six chapters.
				</p>
				<p>Official gsap where the gesture earns it. Open a chapter. Pin and scrub at real height.</p>
			</div>

			<section class="how" aria-labelledby="how-h">
				<h2 id="how-h">How it works</h2>
				<ol class="steps">
					<li>
						<div class="step-top">
							<span class="n">01</span>
							<img src="/brand/intro-01-preview.svg" alt="" width="28" height="28" />
						</div>
						<h3>Preview</h3>
						<p>Live chapter canvas. Pin and scrub read true.</p>
					</li>
					<li>
						<div class="step-top">
							<span class="n">02</span>
							<img src="/brand/intro-02-copy.svg" alt="" width="28" height="28" />
						</div>
						<h3>Copy</h3>
						<p>One click. The whole <code>.svelte</code> file.</p>
					</li>
					<li>
						<div class="step-top">
							<span class="n">03</span>
							<img src="/brand/intro-03-paste.svg" alt="" width="28" height="28" />
						</div>
						<h3>Paste</h3>
						<p>Drop into SvelteKit 5 + Tailwind v4. Yours.</p>
					</li>
				</ol>
			</section>

			<div class="actions">
				<a class="browse" href="/chapters/split-masthead">Browse chapters →</a>
				<a class="catalog" href="/#chapters">All chapters</a>
			</div>

			<section class="mission" aria-labelledby="is-h">
				<h2 id="is-h">What Flare is</h2>
				<p class="mission-lede">A gallery you preview and copy from. That is the whole product.</p>
				<ul>
					<li>
						<span class="dot" aria-hidden="true"></span>
						<div class="item">
							<strong>Gallery site</strong>
							<p>Six scroll chapters, live at real height.</p>
						</div>
					</li>
					<li>
						<span class="dot" aria-hidden="true"></span>
						<div class="item">
							<strong>Preview + Copy</strong>
							<p>One click takes the whole <code>.svelte</code>.</p>
						</div>
					</li>
					<li>
						<span class="dot" aria-hidden="true"></span>
						<div class="item">
							<strong>Not a design system</strong>
							<p>No kit, no registry, no shared Button.</p>
						</div>
					</li>
				</ul>
			</section>

			<section class="notes" aria-labelledby="notes-h">
				<h2 id="notes-h">Ship notes</h2>
				<p>
					Paste into an existing SvelteKit 5 app. Tailwind v4 is the chrome. Add official gsap when
					the chapter asks for it.
				</p>
			</section>

			<p class="next">Next <a href="/chapters/split-masthead">split-masthead</a></p>
		</div>
	</article>
</div>

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
	.crumb a:focus-visible,
	.next a:hover,
	.next a:focus-visible,
	.catalog:hover,
	.catalog:focus-visible {
		color: var(--color-ember);
	}

	.crumb a:focus-visible,
	.browse:focus-visible,
	.catalog:focus-visible,
	.next a:focus-visible {
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

	.pitch {
		margin: 0.7rem 0 0;
		max-width: 36rem;
		color: #a59c91;
	}

	.body {
		display: grid;
		gap: 2.1rem;
		max-width: 52rem;
		padding: 1.5rem 1rem 3.25rem;
		font-family: var(--font-body);
		font-size: 16px;
		line-height: 1.55;
		color: #c4bbb0;
	}

	.lede {
		display: grid;
		gap: 0.9rem;
		max-width: 40rem;
	}

	.lede p,
	.mission-lede,
	.notes p,
	.next {
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		color: var(--color-paper);
	}

	h2 {
		margin: 0 0 0.85rem;
		font-family: var(--font-display);
		font-size: clamp(1.35rem, 3vw, 1.7rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		color: var(--color-paper);
	}

	.steps {
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

	.steps li {
		display: grid;
		gap: 0.4rem;
		padding: 1.15rem 1.1rem 1.2rem;
	}

	.steps li + li {
		border-top: 1px solid var(--color-hairline);
	}

	.step-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.n {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		color: var(--color-ember);
	}

	.steps img {
		display: block;
		width: 28px;
		height: 28px;
	}

	.steps h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		letter-spacing: -0.03em;
		color: var(--color-paper);
	}

	.steps p {
		margin: 0;
		font-size: 14px;
		line-height: 1.5;
		color: #8b8278;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.85rem 1.15rem;
	}

	.browse {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 0 1.15rem;
		border: 1px solid var(--color-ember);
		border-radius: 999px;
		font-size: 14px;
		font-weight: 500;
		color: var(--color-ember);
		text-decoration: none;
	}

	.browse:hover {
		background: color-mix(in oklab, var(--color-ember) 16%, transparent);
	}

	.catalog {
		font-size: 14px;
		color: #c4bbb0;
		text-decoration: none;
	}

	.mission-lede {
		margin-bottom: 1rem;
		max-width: 38rem;
	}

	.mission ul {
		display: grid;
		gap: 0.7rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.mission li {
		display: grid;
		grid-template-columns: 0.5rem minmax(0, 1fr);
		column-gap: 0.75rem;
		align-items: start;
	}

	.mission .dot {
		width: 5px;
		height: 5px;
		margin-top: 0.55rem;
		border-radius: 50%;
		background: var(--color-ember);
	}

	.mission .item {
		min-width: 0;
	}

	.mission strong {
		display: block;
		font-weight: 600;
		color: var(--color-paper);
	}

	.mission .item p {
		margin: 0.2rem 0 0;
		color: #c4bbb0;
	}

	.notes p {
		max-width: 38rem;
		color: #8b8278;
	}

	.next {
		padding-top: 0.25rem;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		color: #8b8278;
	}

	.next a {
		color: var(--color-ember);
		text-decoration: none;
	}

	@media (min-width: 768px) {
		.steps {
			grid-template-columns: 1fr 1fr 1fr;
		}

		.steps li + li {
			border-top: 0;
			border-left: 1px solid var(--color-hairline);
		}
	}

	@media (min-width: 900px) {
		.head {
			padding: 2rem 1.5rem 1.5rem;
		}

		.body {
			padding: 2rem 1.5rem 4rem;
			gap: 2.4rem;
		}
	}
</style>
