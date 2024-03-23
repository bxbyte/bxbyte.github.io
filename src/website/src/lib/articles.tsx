import getMdxComponents from '@/components/MdxComponents'
import config from '@/config.json'
import { ressourceHrefbyPath } from '@/lib/ressources'
import { readFileSync } from 'fs'
import { globSync } from 'glob'
import { compileMDX } from 'next-mdx-remote/rsc'
import { basename } from 'path'
import { dirname, join } from 'path'
import type { JSXElementConstructor, ReactElement } from 'react'
import readingTime from 'reading-time'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import { addResource } from './ressources'
import { getPosOf } from './utils'

// Article frontmatter (meta infos)
type ArticleFrontmatter = {
	title: string
	date: Date
	tags: string[]
}

// Article
export type Article = {
	filepath: string
	readTime: number
	content: ReactElement<any, string | JSXElementConstructor<any>>
	refRessourceHrefs: Set<string>
	refArticleIds: Set<string>
} & ArticleFrontmatter

// Minimal article infos
export type ArticleInfo = {
	id: string
	title: string
	date: Date
	readTime: number
	tags: string[]
}

// Article file infos
export type ArticleFileInfo = {
	filepath: string
	id: string
}

/**
 * Map every article id by its path.
 */
export const articleIdByPath = Object.fromEntries(
	// Mapping article with ids
	globSync(`${config.articlesDir}/**/*.mdx`).map((filepath, id) => [
		filepath,
		id.toString(),
	]),
)

// Loading ressources in public
globSync(`${config.articlesDir}/**/*[!.mdx]`, { nodir: true }).forEach(
	addResource,
)

/**
 * Map every articles with its id.
 */
export const articleById: Record<string, Article> = Object.fromEntries(
	// Generating articles
	await Promise.all(
		Object.entries(articleIdByPath).map(async ([filepath, id]) => {
			const refRessourceHrefs = new Set<string>(),
				refArticleIds = new Set<string>()

			// Load source code
			let source = readFileSync(filepath, { encoding: 'utf-8' })

			// Replace relative path
			source = source.replaceAll(
				/\[(.*)\]\((\..*)\)/g,
				(match, name: string, href: string) => {
					const relativePath = join(dirname(filepath), href)
					if (href.endsWith('.mdx')) {
						href = articleIdByPath[relativePath]
						refArticleIds.add(href)
					} else {
						href = ressourceHrefbyPath[relativePath]
						refRessourceHrefs.add(href)
					}
					if (!href)
						throw new Error(
							`Unfound file '${relativePath}' referenced in ${filepath}:${getPosOf(source, match)} !`,
						)
					return `[${name}](${href})`
				},
			)

			const {
				content,
				frontmatter: { title, tags, date },
			} = await compileMDX<ArticleFrontmatter>({
				source,
				components: getMdxComponents({
					filepath,
					id,
				}),
				options: {
					parseFrontmatter: true,
					mdxOptions: {
						remarkPlugins: [remarkGfm],
						rehypePlugins: [rehypeHighlight],
					},
				},
			})

			return [
				id,
				{
					filepath,
					readTime: readingTime(source).minutes,
					content: content,
					title,
					tags,
					date,
					refRessourceHrefs: refRessourceHrefs,
					refArticleIds: refArticleIds,
				},
			]
		}),
	),
)

/**
 * All minimal informations of every articles.
 */
export const articleInfos: ArticleInfo[] = Object.entries(articleById)
	// Generating articles minimal infos
	.filter(
		([_, { filepath }]) =>
			!basename(filepath).startsWith(config.hiddenArticlePrefix),
	)
	.map(([id, { title, date, readTime, tags }]) => ({
		id,
		title,
		date,
		readTime,
		tags,
	}))

/**
 * All unique tags recorded in every articles.
 */
export const articleTags = Array.from(
	new Set(articleInfos.flatMap(({ tags }) => tags)),
)
