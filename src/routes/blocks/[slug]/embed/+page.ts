import { error } from '@sveltejs/kit';
import { blocks, getBlock } from '$lib/catalog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => {
	return blocks.map((block) => ({ slug: block.slug }));
};

export const load: PageLoad = ({ params }) => {
	const block = getBlock(params.slug);
	if (!block) error(404, 'Unknown block');
	return { slug: block.slug, name: block.name };
};
