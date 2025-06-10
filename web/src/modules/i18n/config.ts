/**
 *i18n.Locales definition
 */
export const localeDefs = {
	// Language traduction in other locale by locale
	fr: { en: "FR" },
	en: { fr: "EN" },
}

export const locales = Object.keys(localeDefs) as i18n.Locales[]

/**
 * Default locale (without path)
 */
export const defaultLocale = "en"
