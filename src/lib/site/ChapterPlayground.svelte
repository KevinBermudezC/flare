<script lang="ts">
	import ChapterPin from '../../blocks/chapter-pin/ChapterPin.svelte';
	import DeckPin from '../../blocks/deck-pin/DeckPin.svelte';
	import LaneScrub from '../../blocks/lane-scrub/LaneScrub.svelte';
	import MaskReveal from '../../blocks/mask-reveal/MaskReveal.svelte';
	import SplitMasthead from '../../blocks/split-masthead/SplitMasthead.svelte';
	import TypeCharge from '../../blocks/type-charge/TypeCharge.svelte';
	import type { ChapterSlug } from '../catalog';

	export type Accent = 'ember' | 'paper';

	let {
		slug,
		replay = 0,
		title,
		accent,
		reduceMotion
	}: {
		slug: ChapterSlug;
		replay?: number;
		title: string;
		accent: Accent;
		reduceMotion: boolean;
	} = $props();
</script>

{#key `${slug}-${replay}-${title}-${accent}-${reduceMotion}`}
	{#if slug === 'split-masthead'}
		<SplitMasthead lead={title} {accent} {reduceMotion} />
	{:else if slug === 'type-charge'}
		<TypeCharge word={title} {accent} {reduceMotion} />
	{:else if slug === 'lane-scrub'}
		<LaneScrub label={title} {accent} {reduceMotion} photoSrc="/blocks/lane-still.jpg" />
	{:else if slug === 'chapter-pin'}
		<ChapterPin lead={title} {accent} {reduceMotion} />
	{:else if slug === 'mask-reveal'}
		<MaskReveal headline={title} {accent} {reduceMotion} mediaSrc="/blocks/mask-yard.jpg" />
	{:else if slug === 'deck-pin'}
		<DeckPin lead={title} {accent} {reduceMotion} />
	{/if}
{/key}
