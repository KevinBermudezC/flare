import type { Component } from 'svelte';
import ChapterPin from '../blocks/chapter-pin/ChapterPin.svelte';
import chapterPinSource from '../blocks/chapter-pin/ChapterPin.svelte?raw';
import DeckPin from '../blocks/deck-pin/DeckPin.svelte';
import deckPinSource from '../blocks/deck-pin/DeckPin.svelte?raw';
import LaneScrub from '../blocks/lane-scrub/LaneScrub.svelte';
import laneScrubSource from '../blocks/lane-scrub/LaneScrub.svelte?raw';
import MaskReveal from '../blocks/mask-reveal/MaskReveal.svelte';
import maskRevealSource from '../blocks/mask-reveal/MaskReveal.svelte?raw';
import SplitMasthead from '../blocks/split-masthead/SplitMasthead.svelte';
import splitMastheadSource from '../blocks/split-masthead/SplitMasthead.svelte?raw';
import TypeCharge from '../blocks/type-charge/TypeCharge.svelte';
import typeChargeSource from '../blocks/type-charge/TypeCharge.svelte?raw';

export type ChapterSlug =
	| 'split-masthead'
	| 'type-charge'
	| 'lane-scrub'
	| 'chapter-pin'
	| 'mask-reveal'
	| 'deck-pin';

export type ChapterKind = 'masthead' | 'type' | 'lane' | 'pin' | 'mask' | 'deck';

export type EditField = 'lead' | 'word' | 'label' | 'headline';

export type BlockFile = {
	name: string;
	source: string;
};

export type BlockEntry = {
	slug: ChapterSlug;
	name: string;
	tagline: string;
	kind: ChapterKind;
	extraDep: string;
	editField: EditField;
	editDefault: string;
	component: Component;
	files: BlockFile[];
};

export const blocks: BlockEntry[] = [
	{
		slug: 'split-masthead',
		name: 'Split Masthead',
		tagline: 'Left column holds. Right column walks.',
		kind: 'masthead',
		extraDep: 'pnpm add gsap',
		editField: 'lead',
		editDefault: 'Hold',
		component: SplitMasthead,
		files: [{ name: 'SplitMasthead.svelte', source: splitMastheadSource }]
	},
	{
		slug: 'type-charge',
		name: 'Type Charge',
		tagline: 'One line. One glyph of heat.',
		kind: 'type',
		extraDep: 'pnpm add gsap',
		editField: 'word',
		editDefault: 'CHARGE',
		component: TypeCharge,
		files: [{ name: 'TypeCharge.svelte', source: typeChargeSource }]
	},
	{
		slug: 'lane-scrub',
		name: 'Lane Scrub',
		tagline: 'Vertical scroll drives the lane.',
		kind: 'lane',
		extraDep: 'pnpm add gsap',
		editField: 'label',
		editDefault: 'LANE',
		component: LaneScrub,
		files: [{ name: 'LaneScrub.svelte', source: laneScrubSource }]
	},
	{
		slug: 'chapter-pin',
		name: 'Chapter Pin',
		tagline: 'Rooms pin. The rail keeps count.',
		kind: 'pin',
		extraDep: 'pnpm add gsap',
		editField: 'lead',
		editDefault: 'Capture',
		component: ChapterPin,
		files: [{ name: 'ChapterPin.svelte', source: chapterPinSource }]
	},
	{
		slug: 'mask-reveal',
		name: 'Mask Reveal',
		tagline: 'An ink window opens on the frame.',
		kind: 'mask',
		extraDep: 'pnpm add gsap',
		editField: 'headline',
		editDefault: 'Open the cut',
		component: MaskReveal,
		files: [{ name: 'MaskReveal.svelte', source: maskRevealSource }]
	},
	{
		slug: 'deck-pin',
		name: 'Deck Pin',
		tagline: 'Cards stick. The top one keeps the line.',
		kind: 'deck',
		extraDep: 'pnpm add gsap',
		editField: 'lead',
		editDefault: 'Hold',
		component: DeckPin,
		files: [{ name: 'DeckPin.svelte', source: deckPinSource }]
	}
];

export const featuredSlugs = ['type-charge', 'lane-scrub'] as const satisfies readonly ChapterSlug[];

export function getBlock(slug: string): BlockEntry | undefined {
	return blocks.find((block) => block.slug === slug);
}

export function editFieldLabel(field: EditField): string {
	switch (field) {
		case 'lead':
			return 'Title';
		case 'word':
			return 'Word';
		case 'label':
			return 'Label';
		case 'headline':
			return 'Headline';
		default: {
			const _never: never = field;
			return _never;
		}
	}
}

export function kindLabel(kind: ChapterKind): string {
	switch (kind) {
		case 'masthead':
			return 'Masthead';
		case 'type':
			return 'Type';
		case 'lane':
			return 'Lane';
		case 'pin':
			return 'Pin';
		case 'mask':
			return 'Mask';
		case 'deck':
			return 'Deck';
		default: {
			const _never: never = kind;
			return _never;
		}
	}
}
