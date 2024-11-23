import { file, glob } from 'astro/loaders'
import {
	type ImageFunction,
	defineCollection,
	reference,
	z,
} from 'astro:content'
import deepmerge from 'deepmerge'

import defaultJob from './jobs/_default'

const AUTHORS_DATA_PATH = 'src/data/authors.json'

export type JobProps = typeof defaultJob & Job

const AuthorData = z.object({
	id: z.string(),
	social: z.string().url(),
	name: z.string(),
})

const PostData = z.object({
	title: z.string(),
	description: z.optional(z.string()),
	keywords: z.optional(z.array(z.string())),
	date: z.date(),
	authors: z.array(reference('authors')).optional(),
	type: z.enum(['pdf', 'post']).default('post'),
})

export type PostData = z.infer<typeof PostData> & {
	cover?: z.infer<ReturnType<ImageFunction>>
}

export type AuthorData = z.infer<typeof AuthorData>

export const collections = {
	authors: defineCollection({
		loader: file(AUTHORS_DATA_PATH),
		schema: AuthorData,
	}),
	posts: defineCollection({
		loader: glob({
			pattern: ['./posts/**/*.mdx', '!./posts/**/_*.mdx'],
			base: import.meta.dirname,
		}),
		schema: ({ image }: { image: ImageFunction }) =>
			PostData.and(
				z.object({
					cover: z.optional(image()),
				}),
			),
	}),
	jobs: defineCollection<JobProps[]>({
		loader: async () =>
			await Promise.all(
				Object.values(
					import.meta.glob(['./jobs/**/*.ts', '!./jobs/**/_*.ts'], {
						import: 'default',
					}),
				).map(
					async (v: any) =>
						deepmerge(defaultJob, await v()) as unknown as JobProps,
				),
			),
	}),
}
