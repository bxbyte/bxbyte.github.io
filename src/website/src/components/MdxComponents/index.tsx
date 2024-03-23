import { ArticleFileInfo } from '@/lib/articles'
import { classNames } from '@/lib/utils'
import { MDXComponents } from 'mdx/types'
import { ReactNode } from 'react'

import styles from './styles.module.scss'

/**
 * Create MDX components for some article.
 *
 * @param options Article informations
 * @returns MDX components for article
 */
export default function getMdxComponents({
	filepath,
}: ArticleFileInfo): MDXComponents {
	return {
		// Parse code by line
		code: function ({ children, ...props }) {
			const lines: JSX.Element[] = []
			let lineContent: ReactNode[] = [],
				i = 0

			while (i < (children as ReactNode[]).length) {
				const child = (children as ReactNode[])[i]
				if (typeof child == 'string' && child.includes('\n')) {
					const breakLines = child.match(/.*?\n|.+$/g) as string[]
					lines.push(
						<span key={i}>
							{lineContent}
							{breakLines[0]}
						</span>,
					)

					let j = 1
					for (; j < breakLines.length - 1; j++) {
						lines.push(<span key={i + j}>{breakLines[j]}</span>)
					}
					lineContent = breakLines.length > 1 ? [breakLines[j]] : []
				} else lineContent.push(child)
				i++
			}
			if (lineContent.length > 0)
				lines.push(<span key={lineContent.length}>{lineContent}</span>)
			return <code {...props}>{lines}</code>
		},
		// Center content
		Center: function ({ ...props }) {
			return <div {...classNames(props, styles.center)}></div>
		},
		// Set content flow horizontaly
		Horizontal: function ({ ...props }) {
			return <div {...classNames(props, styles.horizontal)}></div>
		},
		// Set content flow verticaly
		Vertical: function ({ ...props }) {
			return <div {...classNames(props, styles.vertical)}></div>
		},
	}
}
