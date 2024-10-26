import markdownit from 'markdown-it'

import type ActiveLink from '@/components/navigation/ActiveLink.astro'

import type { LocaleContent } from '@/libs/i18n'

const mdCtx = markdownit({ html: true, breaks: false })

export function md(mdString: string): string {
	return mdCtx.render(mdString.replaceAll(/^([^\S\r\n]+)/gm, ''))
}

export type LocalLink = ComponentProps<typeof ActiveLink> & {
	label: LocaleContent | string
}

export function join<T>(arr: T[], delimiter = ', ', endDelimiter = ' & ') {
	return [
		...[...arr].slice(0, arr.length - 2),
		[...arr].splice(arr.length - 2, arr.length).join(endDelimiter),
	].join(delimiter)
}

export function joinUrl(...urls: string[]): string {
	return '/' + urls.map((url) => url.replace(/^\/|\/$/gm, '')).join('/')
}
