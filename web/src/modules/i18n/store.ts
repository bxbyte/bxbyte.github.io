import { persistentAtom } from "@nanostores/persistent"

import { defaultLocale } from "./config"

export function getLocaleUrl(locale: i18n.Locales): URL | undefined {
	const path = Object.fromEntries(
		(
			[
				...document.querySelectorAll("[rel=alternate][hreflang]"),
			] as HTMLLinkElement[]
		).map(({ hreflang, href }) => [hreflang, href])
	)[locale]
	if (!path) return

	const url = new URL(path)
	url.hash = window.location.hash
	return url
}

// Keep a track of the user preferred locale
export const $locale = persistentAtom<i18n.Locales>("locale", defaultLocale)

$locale.subscribe((locale) => {
	let url = getLocaleUrl(locale)
	if (url && url.href != window.location.href) window.location.href = url.href
})
