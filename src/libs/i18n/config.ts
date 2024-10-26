export type Locales = keyof typeof localeDefs
export type LocaleContent = { [locale in Locales]: any }

export const localeDefs = {
		// Language traduction in other language by locale
		fr: { en: 'french 🇫🇷' },
		en: { fr: 'anglais 🇬🇧' },
	} as const,
	locales = Object.keys(localeDefs) as Locales[],
	localesConfig = {
		defaultLocale: 'en' satisfies Locales,
		locales,
		fallback: { fr: 'en' } satisfies { [locale in Locales]?: Locales },
	},
	defaultLocale = localesConfig.defaultLocale
