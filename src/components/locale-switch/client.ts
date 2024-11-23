import { persistentAtom } from '@nanostores/persistent'

export const locales = JSON.parse(
	(document.querySelector('script#locales') as HTMLScriptElement).innerHTML,
)

const pathLocals = Object.values(locales),
	langRegexp = new RegExp(`(?<=^${window.location.origin})\/\\w*\/?`)

export const currentLocale = persistentAtom('locale', '/')

currentLocale.subscribe((localePath) => {
	let newHref = window.location.href.replace(langRegexp, (path) => {
		let newPath = localePath
		return pathLocals.includes(path)
			? newPath
			: newPath + path.replace(/^\//, '')
	})
	if (newHref != window.location.href) window.location.href = newHref
})
