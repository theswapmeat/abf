import type { Handle } from '@sveltejs/kit';
import { defaultLocale, getDictionary } from '$lib/i18n';

/**
 * Locale is hardcoded to the default today (English only ships). Resolving
 * it here — rather than inlining `lang="en" dir="ltr"` in app.html — is what
 * lets an Arabic route/cookie/header check slot in later without touching
 * every page: app.html stays untouched, only this function's body changes.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const locale = defaultLocale;
	const dict = getDictionary(locale);

	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', dict.meta.lang).replace('%dir%', dict.meta.dir)
	});
};
