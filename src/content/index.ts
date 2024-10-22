import { type CollectionEntry, getCollection, getEntries } from 'astro:content'
import { createHash } from 'crypto'

import type { AuthorData, JobProps, PostData } from './config'

export type * from './config'

type PostEntry = Omit<CollectionEntry<'posts'>, 'data'> & {
	data: PostData
}

export type PostHydrated = Omit<CollectionEntry<'posts'>, 'data'> & {
	hash: string
	data: Omit<PostData, 'authors'> & {
		authors?: AuthorData[]
	}
}

function getHash(value: string) {
	return encodeURIComponent(
		createHash('sha256').update(value).digest('base64').slice(0, 8),
	)
}

export function unDatafied<T>({ data }: { data: T }): T {
	return data
}

export async function getPosts(): Promise<PostHydrated[]> {
	return await Promise.all(
		(await getCollection('posts')).map(async (post: PostEntry) => ({
			...post,
			hash: getHash(post.slug),
			data: {
				...post.data,
				authors: post.data.authors
					? (await getEntries(post.data.authors)).map(unDatafied<AuthorData>)
					: undefined,
			},
		})),
	)
}

export async function getJobs(): Promise<JobProps[]> {
	return (await getCollection('jobs')).map(unDatafied<JobProps>)
}
