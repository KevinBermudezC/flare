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
		if (!live) {
			document.documentElement.classList.remove('flare-cursor');
			return;
		}

		document.documentElement.classList.add('flare-cursor');
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
			rx += (x - rx) * 0.16;
			ry += (y - ry) * 0.16;
			frame = window.requestAnimationFrame(tick);
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		frame = window.requestAnimationFrame(tick);

		return () => {
			document.documentElement.classList.remove('flare-cursor');
			window.removeEventListener('pointermove', onMove);
			window.cancelAnimationFrame(frame);
		};
	});
</script>

{#if live}
	<div class="cursor" aria-hidden="true">
		<span class="dot" style:transform="translate3d({x}px, {y}px, 0)"></span>
		<span class="ring" style:transform="translate3d({rx}px, {ry}px, 0)"></span>
	</div>
{/if}

<style>
	:global(html.flare-cursor),
	:global(html.flare-cursor *) {
		cursor: none !important;
	}

	:global(html.flare-cursor input),
	:global(html.flare-cursor textarea),
	:global(html.flare-cursor select),
	:global(html.flare-cursor [contenteditable='true']) {
		cursor: text !important;
	}

	.cursor {
		position: fixed;
		inset: 0;
		z-index: var(--z-cursor);
		pointer-events: none;
	}

	.dot,
	.ring {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
		will-change: transform;
	}

	.dot {
		width: 7px;
		height: 7px;
		margin: -3.5px 0 0 -3.5px;
		background: var(--color-ember);
		box-shadow: 0 0 10px color-mix(in oklab, var(--color-ember) 55%, transparent);
	}

	.ring {
		width: 22px;
		height: 22px;
		margin: -11px 0 0 -11px;
		border: 1px solid color-mix(in oklab, var(--color-ember) 70%, var(--color-paper));
		opacity: 0.72;
	}
</style>
