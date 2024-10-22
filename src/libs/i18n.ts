import type { GetStaticPaths } from 'astro'
import { getRelativeLocaleUrl } from 'astro:i18n'
import deepmerge from 'deepmerge'

import astroConfig from '!/astro.config'

export type Locals = (typeof astroConfig)['i18n']['locales'][number]
export type LocalContent = { [local in Locals]: any }

export type UnNestedLocalContent<T> =
	T extends Record<Locals, any>
		? T[keyof T]
		: T extends
					| { new (...args: any[]): any }
					| { [Symbol.toPrimitive]: unknown }
			? T
			: { [k in keyof T]: UnNestedLocalContent<T[k]> }

export const locals: Locals[] = astroConfig.i18n.locales,
	localPaths = Object.fromEntries(
		locals.map((local) => [local, getRelativeLocaleUrl(local)]),
	)

export function getStaticPaths() {
	return locals.map((lang) => ({
		params: {
			lang: getRelativeLocaleUrl(lang),
		},
	}))
}

function cleanLocal<T>(
	local: Locals,
	localContent: T,
): UnNestedLocalContent<T> {
	if (Array.isArray(localContent)) {
		return localContent.map((v) => cleanLocal(local, v)) as any
	} else if (localContent && typeof localContent == 'object') {
		let keys = Object.keys(localContent)
		if (locals.every((local) => keys.includes(local))) {
			return (localContent as any)[local]
		} else {
			keys.forEach(
				(k) =>
					((localContent as any)[k] = cleanLocal(
						local,
						(localContent as any)[k],
					)),
			)
		}
	}
	return localContent as any
}

export function useLocalContents<T extends Object, S extends GetStaticPaths>(
	localContent: T,
	oldGetStaticPaths?: S,
): {
	getLocalContent: (astro: {
		currentLocale?: string
	}) => UnNestedLocalContent<T>
	getStaticPaths: S
} {
	const contentByLang = Object.fromEntries(
		locals.map((local) => [
			localPaths[local],
			cleanLocal(local, structuredClone(localContent)),
		]),
	)

	return {
		getLocalContent(astro) {
			const lang = astro.currentLocale ? localPaths[astro.currentLocale] : '/'
			return contentByLang[lang]
		},
		getStaticPaths: oldGetStaticPaths
			? async (params) =>
					(await oldGetStaticPaths(params)).flatMap((path) =>
						getStaticPaths().map((localPath) => deepmerge(path, localPath)),
					)
			: (getStaticPaths as any),
	}
}
