import { type CollectionEntry, getCollection, getEntries } from 'astro:content'
import { createHash } from 'crypto'

import { defaultLocale, locales } from '@/libs/i18n'

import type { AuthorData, JobProps, PostData } from './config'

export type * from './config'

const LOCALS_PATH_REGEXP = Object.fromEntries(
	locales.map((locale) => [
		locale,
		new RegExp(`\\/${locale}\\/|\\.${locale}\\..*$`),
	]),
) as { [locale in Locales]: RegExp }

type PostEntry = Omit<CollectionEntry<'posts'>, 'data'> & {
	data: PostData
}

export type PostHydrated = Omit<CollectionEntry<'posts'>, 'data'> & {
	hash: string
	locale: Locales
	data: Omit<PostData, 'authors'> & {
		authors?: AuthorData[]
	}
}

function getHash(value: string) {
	return encodeURIComponent(
		createHash('sha256').update(value).digest('hex').slice(0, 16),
	)
}

export function unDatafied<T>({ data }: { data: T }): T {
	return data
}

export async function getPostsByLocale(): Promise<{
	[locale in Locales]: PostHydrated[]
}> {
	const posts = await Promise.all(
		(await getCollection('posts')).map(async (post: PostEntry) => {
			const filePath = (post as any).filePath as string,
				localeRegexp = (
					Object.entries(LOCALS_PATH_REGEXP) as [Locales, RegExp][]
				)
					.map((t) => t[1].test(filePath) && t)
					.filter(Boolean)[0]

			var locale = defaultLocale as Locales,
				toHash: string = filePath

			if (localeRegexp) {
				locale = localeRegexp[0]
				toHash = filePath.replace(localeRegexp[1], '')
			}

			return {
				...post,
				hash: getHash(toHash),
				locale,
				data: {
					...post.data,
					authors: post.data.authors
						? (await getEntries(post.data.authors)).map(unDatafied<AuthorData>)
						: undefined,
				},
			}
		}),
	)

	let postByHash = (
		Object.values(Object.groupBy(posts, ({ hash }) => hash)) as PostHydrated[][]
	).map((posts) => Object.fromEntries(posts.map((post) => [post.locale, post])))

	let postByLocal = Object.fromEntries(
		locales.map((locale) => [
			locale,
			postByHash.map(
				(posts) =>
					// Local selection order: current locale > default locale > only locale
					posts[locale] || posts[defaultLocale] || Object.values(posts)[0],
			),
		]),
	) as {
		[locale in Locales]: PostHydrated[]
	}

	return postByLocal
}

export async function getJobs(): Promise<JobProps[]> {
	return (await getCollection('jobs')).map(unDatafied<JobProps>)
}
