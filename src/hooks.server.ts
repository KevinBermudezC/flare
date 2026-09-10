import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname, search } = event.url;
	if (pathname === '/blocks' || pathname.startsWith('/blocks/')) {
		redirect(308, `${pathname.replace(/^\/blocks/, '/chapters')}${search}`);
	}
	return resolve(event);
};
