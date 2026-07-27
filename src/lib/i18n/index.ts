import { en, type Dictionary } from './locales/en';

export const locales = {
	en
} satisfies Record<string, Dictionary>;

export type LocaleCode = keyof typeof locales;

export const defaultLocale: LocaleCode = 'en';

/**
 * English only ships today. Resolving through a function (rather than
 * importing `en` directly everywhere) is what makes adding a second locale
 * later a routing change instead of a find-and-replace across every route.
 */
export function getLocale(code: string | undefined | null): LocaleCode {
	return code && code in locales ? (code as LocaleCode) : defaultLocale;
}

export function getDictionary(code: string | undefined | null = defaultLocale): Dictionary {
	return locales[getLocale(code)];
}
