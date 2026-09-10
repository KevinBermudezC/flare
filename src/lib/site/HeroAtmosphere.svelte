<!--
  Site chrome only. Copyable chapters keep their own field layers.
  TypeCharge wash / grid / beam / grain, with a looping CSS drift.
-->
<script lang="ts">
	let { motion = true }: { motion?: boolean } = $props();
</script>

<div class="field" class:motion aria-hidden="true">
	<div class="wash"></div>
	<div class="grid"></div>
	<div class="beam"></div>
	<div class="motes"></div>
	<div class="grain"></div>
</div>

<style>
	.field {
		--accent: var(--color-ember);
		--paper: var(--color-paper);
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.wash,
	.grid,
	.beam,
	.motes,
	.grain {
		position: absolute;
		inset: 0;
	}

	.wash {
		inset: -28%;
		background:
			radial-gradient(
				ellipse 54% 62% at 86% 64%,
				color-mix(in oklab, var(--accent) 30%, transparent),
				transparent 68%
			),
			radial-gradient(
				ellipse 36% 40% at 72% 28%,
				color-mix(in oklab, var(--accent) 14%, transparent),
				transparent 58%
			),
			radial-gradient(circle at 12% 18%, color-mix(in oklab, var(--paper) 5%, transparent), transparent 26%);
		background-repeat: no-repeat;
	}

	.grid {
		opacity: 0.45;
		background:
			repeating-linear-gradient(
				0deg,
				transparent 0 56px,
				rgba(245, 240, 234, 0.04) 56px 57px
			),
			repeating-linear-gradient(
				90deg,
				transparent 0 56px,
				rgba(245, 240, 234, 0.04) 56px 57px
			);
		mask-image: radial-gradient(ellipse at 74% 52%, #000 10%, transparent 74%);
	}

	.beam {
		background:
			linear-gradient(
				114deg,
				transparent 58%,
				color-mix(in oklab, var(--accent) 12%, transparent) 66%,
				transparent 74%
			),
			linear-gradient(102deg, transparent 70%, rgba(245, 240, 234, 0.04) 76%, transparent 82%);
	}

	.motes {
		background-image:
			radial-gradient(1.15px 1.15px at 62% 18%, color-mix(in oklab, var(--accent) 78%, white), transparent),
			radial-gradient(1px 1px at 71% 27%, color-mix(in oklab, var(--accent) 70%, transparent), transparent),
			radial-gradient(1.4px 1.4px at 83% 22%, color-mix(in oklab, var(--accent) 85%, white), transparent),
			radial-gradient(0.9px 0.9px at 76% 41%, color-mix(in oklab, var(--accent) 62%, transparent), transparent),
			radial-gradient(1.2px 1.2px at 91% 38%, color-mix(in oklab, var(--accent) 74%, white), transparent),
			radial-gradient(1px 1px at 68% 56%, color-mix(in oklab, var(--accent) 58%, transparent), transparent),
			radial-gradient(1.3px 1.3px at 88% 61%, color-mix(in oklab, var(--accent) 80%, white), transparent),
			radial-gradient(0.85px 0.85px at 79% 73%, color-mix(in oklab, var(--accent) 55%, transparent), transparent),
			radial-gradient(1.1px 1.1px at 94% 78%, color-mix(in oklab, var(--accent) 68%, white), transparent),
			radial-gradient(1px 1px at 73% 84%, color-mix(in oklab, var(--accent) 48%, transparent), transparent);
		background-repeat: no-repeat;
	}

	.grain {
		inset: -32%;
		opacity: 0.16;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E");
		background-repeat: repeat;
		background-size: 160px 160px;
	}

	.field.motion .wash {
		will-change: transform, opacity;
		animation: wash-drift 10s ease-in-out infinite alternate;
		animation-delay: -2.4s;
	}

	.field.motion .beam {
		will-change: transform;
		animation: beam-drift 14s ease-in-out infinite alternate;
		animation-delay: -3s;
	}

	.field.motion .motes {
		will-change: transform, opacity;
		animation: mote-drift 9s ease-in-out infinite alternate;
		animation-delay: -1.8s;
	}

	.field.motion .grain {
		will-change: transform;
		animation: grain-shift 8s linear infinite;
	}

	@keyframes wash-drift {
		from {
			transform: translate3d(-9%, -8%, 0) scale(1);
			opacity: 0.55;
		}

		to {
			transform: translate3d(10%, 9%, 0) scale(1.12);
			opacity: 1;
		}
	}

	@keyframes beam-drift {
		from {
			transform: translate3d(-6.5%, -2%, 0) rotate(-3.6deg);
		}

		to {
			transform: translate3d(7%, 3%, 0) rotate(3.4deg);
		}
	}

	@keyframes mote-drift {
		from {
			transform: translate3d(2%, 6.5%, 0);
			opacity: 0.55;
		}

		to {
			transform: translate3d(-7%, -6.5%, 0);
			opacity: 1;
		}
	}

	@keyframes grain-shift {
		from {
			transform: translate3d(0, 0, 0);
		}

		to {
			transform: translate3d(-14%, -12%, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.field.motion .wash,
		.field.motion .beam,
		.field.motion .motes,
		.field.motion .grain {
			animation: none !important;
			opacity: 1;
			transform: none;
		}
	}
</style>
