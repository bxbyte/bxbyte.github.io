import Conditional from '@/components/Conditional'
import { articleById } from '@/lib/articles'
import texts from '@/styles/module/texts.module.scss'
import type { Metadata } from 'next'
import Link from 'next/link'
import { basename } from 'path'

import styles from './styles.module.scss'

type ArticleParams = {
	params: {
		id: string & keyof typeof articleById
	}
}

export async function generateStaticParams() {
	return Object.keys(articleById).map((id) => ({ id }))
}

export async function generateMetadata({
	params: { id },
}: ArticleParams): Promise<Metadata> {
	return {
		title: articleById[id].title,
	}
}

export default async function ArticlePage({ params: { id } }: ArticleParams) {
	const {
		content,
		title,
		readTime,
		tags,
		date,
		refArticleIds,
		refRessourceHrefs,
	} = articleById[id]
	return (
		<>
			<section className={`${styles.header} ${texts.links}`}>
				<div>
					<p className={texts.filepath}>
						<Link href="/articles">Articles</Link>
						<span>{title}</span>
					</p>
					<ul className={texts.tags}>
						<p>Tags :</p>
						{tags.map((tag, i) => (
							<li key={i}>
								<Link href={`/..?tag=${tag}`}>{tag}</Link>
							</li>
						))}
					</ul>
				</div>
				<p>
					{date.toLocaleDateString('fr-FR', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}{' '}
					• {Math.ceil(readTime)} min de lecture
				</p>
			</section>
			<section className={`${styles.content} ${texts.links} ${texts.pTitle}`}>
				{content}
			</section>
			<Conditional if={refArticleIds.size > 0}>
				<section className={`${styles.also} ${texts.links}`}>
					<h1>See also</h1>
					{[...refArticleIds].map((id, i) => {
						return (
							<Link href={id} key={i}>
								{articleById[id].title}
							</Link>
						)
					})}
				</section>
			</Conditional>
			<Conditional if={refRessourceHrefs.size > 0}>
				<section className={`${styles.ressources} ${texts.links}`}>
					<h1>Ressources</h1>
					<ul>
						{[...refRessourceHrefs].map((href, i) => {
							return (
								<li key={i}>
									<Link href={href}>{basename(href)}</Link>
								</li>
							)
						})}
					</ul>
				</section>
			</Conditional>
		</>
	)
}
