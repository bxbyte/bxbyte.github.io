'use client'

import type { ArticleInfo, articleInfos, articleTags } from '@/lib/articles'
import texts from '@/styles/module/texts.module.scss'
import Link from 'next/link'
import { type FunctionComponent, type MouseEventHandler, useState } from 'react'

import style from './styles.module.scss'

type ArticleSearchProps = {
	articleInfos: typeof articleInfos
	articleTags: typeof articleTags
}

const sortMethods: {
	label: string
	method: (a: ArticleInfo, b: ArticleInfo) => number
}[] = [
	{
		label: 'plus récents',
		method: (a, b) => b.date.getTime() - a.date.getTime(),
	},
	{
		label: 'plus vieux',
		method: (a, b) => a.date.getTime() - b.date.getTime(),
	},
	{ label: 'plus long', method: (a, b) => b.readTime - a.readTime },
	{ label: 'plus court', method: (a, b) => a.readTime - b.readTime },
]

export default (function ArticleSearch({ articleInfos, articleTags }) {
	const [sortMethodIdx, setSortMethodIdx] = useState(0),
		[requiredTags, setRequiredTags] = useState(
			[] as (typeof articleTags)[number][],
		)

	const handleRequiredTags = function ({ currentTarget }) {
		const tagIdx = requiredTags.indexOf(currentTarget.value)
		if (tagIdx == -1) setRequiredTags([...requiredTags, currentTarget.value])
		else {
			requiredTags.splice(tagIdx, 1)
			setRequiredTags([...requiredTags])
		}
	} as MouseEventHandler<HTMLButtonElement>

	const treatedArticles = (
		requiredTags.length > 0
			? articleInfos.filter(({ tags }) =>
					requiredTags.every((tag) => tags.includes(tag)),
				)
			: articleInfos
	).sort(sortMethods[sortMethodIdx].method)

	return (
		<>
			<form className={style.navigation}>
				<div>
					<input
						name="search"
						type="text"
						placeholder="Rechercher un titre..."
					/>
					<div>
						<select
							name="sort"
							defaultValue={sortMethodIdx}
							onChange={({ target }) =>
								setSortMethodIdx(parseInt(target.value))
							}
						>
							{sortMethods.map(({ label }, i) => (
								<option key={i} value={i}>
									{label}
								</option>
							))}
						</select>
						<label htmlFor="sort">
							<svg viewBox="0 0 24 24">
								<use href="/img/icons.svg#sort" />
							</svg>
						</label>
					</div>
				</div>
				<div className={`${texts.links} ${texts.tags}`}>
					{articleTags.sort().map((tag, i) => (
						<button
							key={i}
							type="button"
							value={tag}
							onClick={handleRequiredTags}
						>
							<a>{tag}</a>
						</button>
					))}
				</div>
			</form>
			<section className={style.articles}>
				{(treatedArticles.length > 0 &&
					treatedArticles.map(({ id, title, tags }, i) => (
						<div key={i}>
							<Link href={`articles/${id}`}>
								<h1>{title}</h1>
							</Link>
							<hr />
							<ul className={`${texts.links} ${texts.tags}`}>
								{tags.map((tag, j) => (
									<li key={j}>
										<button value={tag} onClick={handleRequiredTags}>
											<a>{tag}</a>
										</button>
									</li>
								))}
							</ul>
						</div>
					))) || <p>Rien ne correspond à votre recherche.</p>}
			</section>
		</>
	)
} as FunctionComponent<ArticleSearchProps>)
