<script lang="ts">
	let live = $state(false);
	let x = $state(0);
	let y = $state(0);
	let rx = $state(0);
	let ry = $state(0);

	$effect(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

		const sync = () => {
			live = fine.matches && !reduce.matches;
		};

		sync();
		fine.addEventListener('change', sync);
		reduce.addEventListener('change', sync);

		return () => {
			fine.removeEventListener('change', sync);
			reduce.removeEventListener('change', sync);
		};
	});

	$effect(() => {
		if (!live) return;

		x = window.innerWidth / 2;
		y = window.innerHeight / 2;
		rx = x;
		ry = y;

		let frame = 0;
		const onMove = (event: PointerEvent) => {
			x = event.clientX;
			y = event.clientY;
		};
		const tick = () => {
			rx += (x - rx) * 0.14;
			ry += (y - ry) * 0.14;
			frame = window.requestAnimationFrame(tick);
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		frame = window.requestAnimationFrame(tick);

		return () => {
			window.removeEventListener('pointermove', onMove);
			window.cancelAnimationFrame(frame);
		};
	});
</script>

{#if live}
	<div class="trail" aria-hidden="true">
		<span class="ring" style:transform="translate3d({rx}px, {ry}px, 0)"></span>
	</div>
{/if}

<style>
	.trail {
		position: fixed;
		inset: 0;
		z-index: var(--z-cursor);
		pointer-events: none;
	}

	.ring {
		position: absolute;
		top: 0;
		left: 0;
		width: 22px;
		height: 22px;
		margin: -11px 0 0 -11px;
		border: 1px solid color-mix(in oklab, var(--color-ember) 62%, var(--color-paper));
		border-radius: 50%;
		opacity: 0.55;
		will-change: transform;
	}

	@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
		.trail {
			display: none;
		}
	}
</style>
