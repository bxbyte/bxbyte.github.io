import { persistentAtom } from "@nanostores/persistent"

import { defaultLocale } from "./config"

export const localePaths = Object.fromEntries(
	(
		[
			...document.querySelectorAll("[rel=alternate][hreflang]"),
		] as HTMLLinkElement[]
	).map(({ hreflang, href }) => [hreflang, href])
)

// Keep a track of the user preferred locale
export const $locale = persistentAtom<i18n.Locales>("locale", defaultLocale)

$locale.subscribe((locale) => {
	if (!(locale in localePaths)) return
	let newURL = new URL(localePaths[locale])
	newURL.hash = window.location.hash
	if (newURL.href != window.location.href) window.location.href = newURL.href
})
