import { persistentAtom } from '@nanostores/persistent'

import { defaultLocale } from './config'

export const localePaths = JSON.parse(
	(document.querySelector('script#locales') as HTMLScriptElement).innerHTML,
)

const pathLocals = Object.values(localePaths),
	langRegexp = new RegExp(`(?<=^${window.location.origin})\/\\w*\/?`)

// Keep a track of the user preferred locale
export const $locale = persistentAtom<i18n.Locales>('locale', defaultLocale)

$locale.subscribe((locale) => {
	let newHref = window.location.href.replace(langRegexp, (path) => {
		let newPath = localePaths[locale]
		return pathLocals.includes(path)
			? newPath
			: newPath + path.replace(/^\//, '')
	})
	if (newHref != window.location.href) window.location.href = newHref
})
