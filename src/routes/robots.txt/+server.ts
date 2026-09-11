import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
	const sitemap = new URL('/sitemap.xml', url.origin).href;
	const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
