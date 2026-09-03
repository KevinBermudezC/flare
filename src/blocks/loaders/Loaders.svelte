<!--
  Flare · loaders
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<script lang="ts">
	const steps = ['Upload', 'Build', 'Promote'];
	let step = $state(0);

	$effect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;
		const id = window.setInterval(() => {
			step = (step + 1) % steps.length;
		}, 1400);
		return () => window.clearInterval(id);
	});
</script>

<section class="bg-[#09090b] px-6 py-24 text-[#f5f0ea]">
	<div class="mx-auto mb-12 max-w-3xl">
		<p class="text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Waiting states</p>
		<h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Four loaders. No spinner kit.</h2>
	</div>

	<div class="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
		<figure class="panel">
			<div class="stage" aria-hidden="true">
				<span class="spinner"></span>
			</div>
			<figcaption>
				<p class="label">Spinner</p>
				<p class="hint">Ring for a single unknown wait.</p>
			</figcaption>
		</figure>

		<figure class="panel">
			<div class="stage" aria-hidden="true">
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
			</div>
			<figcaption>
				<p class="label">Dots</p>
				<p class="hint">Three pulses when the copy is casual.</p>
			</figcaption>
		</figure>

		<figure class="panel">
			<div class="stage" aria-hidden="true">
				<span class="bar"><span class="bar-fill"></span></span>
			</div>
			<figcaption>
				<p class="label">Bar</p>
				<p class="hint">Indeterminate pass across a track.</p>
			</figcaption>
		</figure>

		<figure class="panel">
			<div class="stage" aria-hidden="true">
				<ol class="steps">
					{#each steps as name, i}
						<li class:active={i === step} class:done={i < step}>
							<span class="tick">{i + 1}</span>
							<span>{name}</span>
						</li>
					{/each}
				</ol>
			</div>
			<figcaption>
				<p class="label">Multi-step</p>
				<p class="hint">Named hops when the wait has a plot.</p>
			</figcaption>
		</figure>
	</div>
</section>

<style>
	.panel {
		display: flex;
		flex-direction: column;
		min-height: 16rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.2rem;
		background: #111113;
		padding: 1.1rem 1.15rem 1.2rem;
	}

	.stage {
		display: grid;
		min-height: 8.5rem;
		place-items: center;
	}

	.label {
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.hint {
		margin-top: 0.25rem;
		font-size: 0.85rem;
		color: #a59c91;
	}

	.spinner {
		width: 2.1rem;
		height: 2.1rem;
		border-radius: 999px;
		border: 2px solid rgba(255, 255, 255, 0.1);
		border-top-color: #ff5a1f;
		animation: spin 0.8s linear infinite;
	}

	.dot {
		width: 0.55rem;
		height: 0.55rem;
		margin-inline: 0.18rem;
		border-radius: 999px;
		background: #ff5a1f;
		animation: bounce 0.9s ease-in-out infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.12s;
	}
	.dot:nth-child(3) {
		animation-delay: 0.24s;
	}

	.bar {
		display: block;
		width: 9rem;
		height: 0.35rem;
		overflow: hidden;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
	}

	.bar-fill {
		display: block;
		width: 38%;
		height: 100%;
		border-radius: inherit;
		background: #ff5a1f;
		animation: bar-run 1.2s ease-in-out infinite;
	}

	.steps {
		display: grid;
		gap: 0.55rem;
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.steps li {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		font-size: 0.85rem;
		color: #8b8278;
	}

	.tick {
		display: grid;
		width: 1.35rem;
		height: 1.35rem;
		place-items: center;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		font-size: 0.7rem;
	}

	.steps li.active {
		color: #f5f0ea;
	}

	.steps li.active .tick {
		border-color: #ff5a1f;
		background: #ff5a1f;
		color: #1a0703;
		animation: pulse 1.1s ease infinite;
	}

	.steps li.done .tick {
		border-color: #ff5a1f;
		background: rgba(255, 90, 31, 0.2);
		color: #ff5a1f;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: translateY(0);
			opacity: 0.4;
		}
		40% {
			transform: translateY(-5px);
			opacity: 1;
		}
	}

	@keyframes bar-run {
		0% {
			transform: translateX(-120%);
		}
		100% {
			transform: translateX(320%);
		}
	}

	@keyframes pulse {
		50% {
			box-shadow: 0 0 0 4px rgba(255, 90, 31, 0.18);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner,
		.dot,
		.bar-fill,
		.steps li.active .tick {
			animation: none;
		}

		.dot {
			opacity: 1;
		}

		.bar-fill {
			width: 55%;
			transform: none;
		}
	}
</style>
