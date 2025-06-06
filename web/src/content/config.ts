import { file, glob } from "astro/loaders"
import {
	type ImageFunction,
	defineCollection,
	reference,
	z,
} from "astro:content"
import deepmerge from "deepmerge"

import defaultJob from "./jobs/_default"

const AUTHORS_DATA_PATH = "src/data/authors.json"

export type JobProps = typeof defaultJob & Job

const AuthorData = z.object({
	id: z.string(),
	social: z.string().url(),
	name: z.string(),
})

const types = ["post", "pdf"] as const,
	groups = ["iut", "project"] as const

const PostData = z.object({
	title: z.string(),
	description: z.optional(z.string()),
	keywords: z.optional(z.array(z.string())),
	date: z.date(),
	authors: z.array(reference("authors")).optional(),
	group: z.array(z.enum(groups)).or(z.enum(groups)),
	type: z.enum(types).default(types[0]),
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
	jobs: defineCollection<JobProps[]>({
		loader: async () =>
			await Promise.all(
				Object.entries(
					await import.meta.glob("./jobs/**/*.ts", {
						import: "default",
						eager: true,
					})
				)
					.filter(([k]) => !k.includes("_"))
					.map(
						async ([k, v]: any) =>
							deepmerge(defaultJob, v) as JobProps
					)
			),
	}),
}
