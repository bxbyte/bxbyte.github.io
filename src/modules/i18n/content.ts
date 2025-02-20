import type { GetStaticPaths } from "astro"
import { getRelativeLocaleUrl } from "astro:i18n"
import cloneDeep from "clone-deep"
import deepmerge from "deepmerge"

import { locales } from "./config"

/**
 * Associate each locale to its corresponding path in the url parameters.
 */
export const localePaths = Object.fromEntries(
	locales.map((locale) => [locale, getRelativeLocaleUrl(locale)])
)

/**
 * Generate default static routes for lang pages.
 *
 * @returns default static routes
 */
export function getStaticPaths() {
	return locales.map((locale) => ({
		params: {
			lang: getRelativeLocaleUrl(locale),
		},
	}))
}

/**
 * Unnest locale content, e.g. transform something like
 * `{ v: { [i18n.Locales]: T } }` to `{ v: T }`
 *
 * @param locale selected locale to unnest values from
 * @param localeContent locale nested content
 * @returns unnested content
 */
function unnestLocaleContent<T>(
	locale: i18n.Locales,
	localeContent: T
): i18n.UnNestedLocaleContent<T> {
	if (Array.isArray(localeContent)) {
		return localeContent.map((v) => unnestLocaleContent(locale, v)) as any
	} else if (localeContent && typeof localeContent == "object") {
		let keys = Object.keys(localeContent)
		if (locales.every((locale) => keys.includes(locale))) {
			return (localeContent as any)[locale]
		} else {
			keys.forEach(
				(k) =>
					((localeContent as any)[k] = unnestLocaleContent(
						locale,
						(localeContent as any)[k]
					))
			)
		}
	}
	return localeContent as any
}

/**
 *
 * @param localeContent
 * @param astro
 * @returns
 */
export function getLocaleContent<T extends Object>(
	localeContent: T,
	astro: { currentLocale?: string }
): i18n.UnNestedLocaleContent<T> {
	const contentByLang = Object.fromEntries(
		locales.map((locale) => [
			localePaths[locale],
			unnestLocaleContent(locale, cloneDeep(localeContent)),
		])
	)

	const lang = astro.currentLocale ? localePaths[astro.currentLocale] : "/"
	return contentByLang[lang]
}

/**
 * Generate a getStaticPath and getLocaleContent functions
 * to pass locale specific content with the Astro url parameters.
 *
 * @param localeContent locale nested content
 * @param oldGetStaticPaths existing static paths
 * @returns functions to use inside the component
 */
export function useLocaleContents<T extends Object, S extends GetStaticPaths>(
	localeContent: T,
	oldGetStaticPaths?: S
): {
	getLocaleContent: (astro: {
		currentLocale?: string
	}) => i18n.UnNestedLocaleContent<T>
	getStaticPaths: S
} {
	const contentByLang = Object.fromEntries(
		locales.map((locale) => [
			localePaths[locale],
			unnestLocaleContent(locale, cloneDeep(localeContent)),
		])
	)

	return {
		getLocaleContent(astro) {
			const lang = astro.currentLocale
				? localePaths[astro.currentLocale]
				: "/"
			return contentByLang[lang]
		},
		getStaticPaths: oldGetStaticPaths
			? async (params) => {
					const oldPaths = await oldGetStaticPaths(params)
					return oldPaths.every(
						(path) =>
							path.params &&
							locales.includes(path.params.locale as any)
					)
						? oldPaths.map((path) => {
								path.params.lang = getRelativeLocaleUrl(
									path.params.locale as any
								)
								return path
							}) // Set the lang parameter for each locale
						: oldPaths.flatMap(
								(
									path // Open path for each locale
								) =>
									getStaticPaths().map((localPath) =>
										deepmerge(path, localPath)
									)
							)
				}
			: (getStaticPaths as any),
	}
}

/**
 * Create a function that will try to match some string to some locale,
 * based on regexp pattern generated for each locale.
 *
 * @param regexGenerator callback to create regexp template to match based on locale
 * @returns function that will try to match some string to some locale
 */
export function matchLocalePattern(regexGenerator: (locale: string) => string) {
	const patterns = locales.map((locale) => [
		locale,
		new RegExp(regexGenerator(locale)),
	]) as [i18n.Locales, RegExp][]

	return (value: string) => {
		return patterns.map((t) => t[1].test(value) && t).find(Boolean)
	}
}
