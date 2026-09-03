<!--
  Flare · bento-features
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<section class="bg-[#09090b] px-6 py-24 text-[#f5f0ea]">
	<div class="mx-auto mb-12 max-w-3xl">
		<p class="text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Product</p>
		<h2 class="mt-3 text-4xl font-semibold tracking-tight">Five surfaces. One grid.</h2>
		<p class="mt-3 max-w-lg text-[#a59c91]">
			A bento of features. The tall cell has hover motion. The rest stay still so the layout reads
			as a product, not a carnival.
		</p>
	</div>

	<div class="bento mx-auto grid max-w-5xl gap-3 md:grid-cols-4 md:grid-rows-2">
		<article class="cell hover-cell">
			<p class="kicker">Live traces</p>
			<h3 class="title">See the request, not the guess</h3>
			<p class="body">Hover this cell. The trace walks the hops without leaving the card.</p>
			<div class="trace" aria-hidden="true">
				<span class="hop"></span>
				<span class="hop"></span>
				<span class="hop"></span>
				<span class="hop"></span>
			</div>
		</article>

		<article class="cell">
			<p class="kicker">Previews</p>
			<h3 class="title">A URL per push</h3>
			<p class="body">Share a Harbor link. Same build, no staging ritual.</p>
		</article>

		<article class="cell">
			<p class="kicker">Checks</p>
			<h3 class="title">Lint · types · e2e</h3>
			<p class="body">Gate the merge. Keep the log in the same panel.</p>
		</article>

		<article class="cell">
			<p class="kicker">Access</p>
			<h3 class="title">Invite the reviewer</h3>
			<p class="body">Passwordless links. Expire them when the PR closes.</p>
		</article>

		<article class="cell">
			<p class="kicker">Rollback</p>
			<h3 class="title">One older SHA</h3>
			<p class="body">Restore the last good preview without a war room.</p>
		</article>
	</div>
</section>

<style>
	.bento {
		grid-template-columns: 1fr;
	}

	@media (min-width: 768px) {
		.bento {
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: repeat(2, minmax(12rem, auto));
		}

		.hover-cell {
			grid-column: span 2;
			grid-row: span 2;
		}
	}

	.cell {
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.25rem;
		background:
			radial-gradient(circle at 0% 0%, rgba(255, 90, 31, 0.08), transparent 42%), #111113;
		padding: 1.35rem 1.4rem 1.5rem;
	}

	.kicker {
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: #ff5a1f;
	}

	.title {
		margin-top: 0.55rem;
		font-size: 1.15rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.body {
		margin-top: 0.4rem;
		font-size: 0.92rem;
		color: #a59c91;
	}

	.trace {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 2.4rem;
		min-height: 4.5rem;
	}

	.hop {
		flex: 1;
		height: 6px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		transform-origin: left center;
	}

	.hover-cell:hover .hop {
		animation: hop-run 1.15s ease both;
	}

	.hover-cell:hover .hop:nth-child(2) {
		animation-delay: 0.12s;
	}
	.hover-cell:hover .hop:nth-child(3) {
		animation-delay: 0.24s;
	}
	.hover-cell:hover .hop:nth-child(4) {
		animation-delay: 0.36s;
	}

	@keyframes hop-run {
		0% {
			transform: scaleX(0.2);
			background: rgba(255, 90, 31, 0.25);
		}
		100% {
			transform: scaleX(1);
			background: #ff5a1f;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hover-cell:hover .hop {
			animation: none;
			background: #ff5a1f;
		}
	}
</style>
