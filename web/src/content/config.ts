import { file, glob } from "astro/loaders"
import {
	type ImageFunction,
	defineCollection,
	reference,
	z,
} from "astro:content"

const AUTHORS_DATA_PATH = "src/data/authors.json"

const AuthorData = z.object({
	id: z.string(),
	social: z.string().url(),
	name: z.string(),
})

const types = ["post", "pdf"] as const

const PostData = z.object({
	type: z.enum(types).default(types[0]),
	title: z.string(),
	description: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	tags: z.optional(z.array(z.string())),
	date: z.date(),
	authors: z.array(reference("authors")).optional(),
	links: z.record(z.string(), z.string()).optional(),
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
			pattern: ["./posts/**/*.mdx", "!./posts/**/_*.mdx"],
			base: (import.meta as any).dirname,
		}),
		schema: ({ image }) =>
			PostData.and(
				z.object({
					cover: z.optional(image()),
				})
			),
	}),
}
