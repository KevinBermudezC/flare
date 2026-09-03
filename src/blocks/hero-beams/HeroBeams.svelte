<!--
  Flare · hero-beams
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<section class="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0d10] text-[#e8edf2]">
	<div class="beam-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
	<svg
		class="pointer-events-none absolute inset-0 h-full w-full"
		viewBox="0 0 1200 800"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<defs>
			<linearGradient id="flare-beam" x1="0" y1="1" x2="0" y2="0">
				<stop offset="0%" stop-color="#7dd3fc" stop-opacity="0" />
				<stop offset="46%" stop-color="#38bdf8" stop-opacity="0.95" />
				<stop offset="100%" stop-color="#ff5a1f" stop-opacity="0" />
			</linearGradient>
		</defs>
		<path class="beam beam-a" d="M180 820 C 220 520, 140 260, 210 -40" />
		<path class="beam beam-b" d="M430 840 C 400 540, 520 280, 470 -30" />
		<path class="beam beam-c" d="M690 830 C 740 500, 620 240, 710 -50" />
		<path class="beam beam-d" d="M940 850 C 900 530, 1020 250, 980 -20" />
		<path class="beam beam-e" d="M1100 820 C 1140 500, 1080 220, 1160 -40" />
	</svg>

	<div
		class="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center gap-12 px-6 py-20 lg:flex-row lg:items-center"
	>
		<div class="max-w-xl">
			<p class="mb-4 font-mono text-[11px] tracking-[0.22em] text-sky-300 uppercase">
				relay / us-east-1
			</p>
			<h1 class="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
				Preview every push
				<span class="block text-[#93a0ad]">before it ships.</span>
			</h1>
			<p class="mt-5 max-w-md text-base text-[#8b96a3]">
				A hero for tools, not templates. Beams, a live console, and two actions. No purple blobs.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<button
					type="button"
					class="rounded-md bg-[#e8edf2] px-4 py-2 text-sm font-medium text-[#0b0d10]"
				>
					Install the agent
				</button>
				<button
					type="button"
					class="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-[#e8edf2]"
				>
					Read the docs
				</button>
			</div>
		</div>

		<div
			class="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#11151b]/90 shadow-[0_0_80px_rgba(56,189,248,0.08)] backdrop-blur-sm"
		>
			<div class="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
				<span class="size-2.5 rounded-full bg-[#ff5a1f]"></span>
				<span class="size-2.5 rounded-full bg-[#f5c16c]"></span>
				<span class="size-2.5 rounded-full bg-[#3dd68c]"></span>
				<span class="ml-3 font-mono text-[11px] text-[#7c8794]">harbor preview — main</span>
			</div>
			<pre
				class="space-y-1 px-4 py-4 font-mono text-[12px] leading-6 text-[#b7c2cd]"><span class="text-[#5eead4]">$</span> harbor open pr 1842
<span class="text-[#7c8794]">→ ready</span>  https://1842.harbor.dev
<span class="text-[#7c8794]">→ checks</span> lint · types · e2e
<span class="cursor-line text-sky-300">▍ streaming logs</span></pre>
		</div>
	</div>
</section>

<style>
	.beam-grid {
		background-image:
			linear-gradient(to right, rgba(148, 163, 184, 0.06) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
		background-size: 48px 48px;
	}

	.beam {
		fill: none;
		stroke: url(#flare-beam);
		stroke-width: 1.6;
		stroke-dasharray: 160 720;
		animation: beam-run 7.5s linear infinite;
	}

	.beam-b {
		animation-duration: 9s;
		animation-delay: -2s;
	}
	.beam-c {
		animation-duration: 8s;
		animation-delay: -4.2s;
	}
	.beam-d {
		animation-duration: 10s;
		animation-delay: -1.4s;
	}
	.beam-e {
		animation-duration: 6.8s;
		animation-delay: -3s;
	}

	.cursor-line {
		animation: blink 1.1s steps(1) infinite;
	}

	@keyframes beam-run {
		to {
			stroke-dashoffset: -880;
		}
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.beam,
		.cursor-line {
			animation: none;
		}

		.beam {
			stroke-dasharray: none;
			opacity: 0.45;
		}
	}
</style>
