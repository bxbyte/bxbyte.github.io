/**
 * This module is in charge of every locale related content
 */
import type { GetStaticPaths } from 'astro'
import { getRelativeLocaleUrl } from 'astro:i18n'
// Prefered this function to structuredClone cause functions aren't serializable
import cloneDeep from 'clone-deep'
import deepmerge from 'deepmerge'

import { locales } from './config'

export type UnNestedLocalContent<T> =
	T extends Record<Locales, any>
		? T[keyof T]
		: T extends
					| { new (...args: any[]): any }
					| { [Symbol.toPrimitive]: unknown }
			? T
			: { [k in keyof T]: UnNestedLocalContent<T[k]> }

export const localePaths = Object.fromEntries(
	locales.map((locale) => [locale, getRelativeLocaleUrl(locale)]),
)

export function getStaticPaths() {
	return locales.map((locale) => ({
		params: {
			lang: getRelativeLocaleUrl(locale),
		},
	}))
}

function cleanLocale<T>(
	locale: Locales,
	localeContent: T,
): UnNestedLocalContent<T> {
	if (Array.isArray(localeContent)) {
		return localeContent.map((v) => cleanLocale(locale, v)) as any
	} else if (localeContent && typeof localeContent == 'object') {
		let keys = Object.keys(localeContent)
		if (locales.every((locale) => keys.includes(locale))) {
			return (localeContent as any)[locale]
		} else {
			keys.forEach(
				(k) =>
					((localeContent as any)[k] = cleanLocale(
						locale,
						(localeContent as any)[k],
					)),
			)
		}
	}
	return localeContent as any
}

export function getLocalContent<T extends Object>(
	localeContent: T,
	astro: { currentLocale?: string },
): UnNestedLocalContent<T> {
	const contentByLang = Object.fromEntries(
		locales.map((locale) => [
			localePaths[locale],
			cleanLocale(locale, cloneDeep(localeContent)),
		]),
	)

	const lang = astro.currentLocale ? localePaths[astro.currentLocale] : '/'
	return contentByLang[lang]
}

export function useLocaleContents<T extends Object, S extends GetStaticPaths>(
	localeContent: T,
	oldGetStaticPaths?: S,
): {
	getLocaleContent: (astro: {
		currentLocale?: string
	}) => UnNestedLocalContent<T>
	getStaticPaths: S
} {
	const contentByLang = Object.fromEntries(
		locales.map((locale) => [
			localePaths[locale],
			cleanLocale(locale, cloneDeep(localeContent)),
		]),
	)

	return {
		getLocaleContent(astro) {
			const lang = astro.currentLocale ? localePaths[astro.currentLocale] : '/'
			return contentByLang[lang]
		},
		getStaticPaths: oldGetStaticPaths
			? async (params) => {
					const oldPaths = await oldGetStaticPaths(params)
					return oldPaths.every(
						(path) =>
							path.params && locales.includes(path.params.locale as any),
					)
						? oldPaths.map((path) => {
								path.params.lang = getRelativeLocaleUrl(
									path.params.locale as any,
								)
								return path
							}) // Juste convert the locales to the lang parameters
						: oldPaths.flatMap(
								(
									path, // Open path to every lang
								) =>
									getStaticPaths().map((localPath) =>
										deepmerge(path, localPath),
									),
							)
				}
			: (getStaticPaths as any),
	}
}
