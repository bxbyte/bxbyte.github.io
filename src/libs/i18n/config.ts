export type Locales = keyof typeof localeDefs
export type LocaleContent = { [locale in Locales]: any }

export const localeDefs = {
		// Language traduction in other language by locale
		fr: { en: '🇫🇷' },
		en: { fr: '🇬🇧' },
	} as const,
	locales = Object.keys(localeDefs) as Locales[],
	localesConfig = {
		defaultLocale: 'en',
		locales,
		fallback: { fr: 'en' } satisfies { [locale in Locales]?: Locales },
	} as const,
	defaultLocale = localesConfig.defaultLocale
