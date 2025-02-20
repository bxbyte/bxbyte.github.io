import { type CollectionEntry, getCollection, getEntries } from "astro:content"
import { createHash } from "crypto"

import { defaultLocale, locales } from "@/modules/i18n/config"
import { matchLocalePattern } from "@/modules/i18n/content"

import type { AuthorData, JobProps, PostData } from "./config"

export type * from "./config"

/**
 * Try to match a path to some locale
 */
const matchLocalePath = matchLocalePattern((l) => `\\/${l}\\/|\\.${l}\\..*$`)

type PostEntry = Omit<CollectionEntry<"posts">, "data"> & {
	data: PostData
}

export type PostHydrated = Omit<CollectionEntry<"posts">, "data"> & {
	hash: string
	locale: i18n.Locales
	data: Omit<PostData, "authors"> & {
		authors?: AuthorData[]
	}
}

function getHash(value: string) {
	return encodeURIComponent(
		createHash("sha256").update(value).digest("hex").slice(0, 16)
	)
}

export function unDatafied<T>({ data }: { data: T }): T {
	return data
}

export async function getPostsByLocale(): Promise<{
	[locale in i18n.Locales]: PostHydrated[]
}> {
	const posts = await Promise.all(
		(await getCollection("posts")).map(async (post: PostEntry) => {
			const filePath = (post as any).filePath as string,
				localeMatch = matchLocalePath(filePath)

			var locale = defaultLocale,
				toHash = filePath

			// If the path match a locale specific content
			if (localeMatch) {
				locale = localeMatch[0]
				// Make sure the hash stay the same for any other locales
				toHash = filePath.replace(localeMatch[1], "")
			}

			return {
				...post,
				hash: getHash(toHash),
				locale,
				data: {
					...post.data,
					authors: post.data.authors
						? (await getEntries(post.data.authors)).map(
								unDatafied<AuthorData>
							)
						: undefined,
				},
			}
		})
	)

	let postByHash = (
		Object.values(
			Object.groupBy(posts, ({ hash }) => hash)
		) as PostHydrated[][]
	).map((posts) =>
		Object.fromEntries(posts.map((post) => [post.locale, post]))
	)

	let postByLocal = Object.fromEntries(
		locales.map((locale) => [
			locale,
			postByHash.map(
				(posts) =>
					// Local selection order: current locale > default locale > only locale
					posts[locale] ||
					posts[defaultLocale] ||
					Object.values(posts)[0]
			),
		])
	) as {
		[locale in i18n.Locales]: PostHydrated[]
	}

	return postByLocal
}

export async function getJobs(): Promise<JobProps[]> {
	return (await getCollection("jobs")).map(unDatafied<JobProps>)
}
