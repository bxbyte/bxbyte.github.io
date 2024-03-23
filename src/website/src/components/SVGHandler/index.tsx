import type { FunctionComponent } from 'react'

import styles from './styles.module.scss'

/**
 * Registered svg patterns.
 */
const surfaces = {
	grid: (
		<>
			<path d="M50,0 L50,100 M0,50 L100,50" />
		</>
	),
	cross: (
		<>
			<path d="M50,30 L50,70 M30,50L70,50" />
		</>
	),
	hash: (
		<>
			<path d="M-100 100 L100,-100 M0,100 L100,0 M0,200 L200,0" />
		</>
	),
	dot: (
		<>
			<circle cx="50" cy="50" r="10" />
		</>
	),
}

/**
 * Create a new pattern handler :
 * - the method 'usePattern' return a ref to a pattern.
 * - the method 'loadPatterns' actually return the ref of the pattern.
 *
 * @returns Patterns handler
 */
export default function SVGHandler() {
	const usedSurfaces: Set<keyof typeof surfaces> = new Set()
	return {
		usePattern(id: keyof typeof surfaces): string {
			usedSurfaces.add(id)
			return `url(#${id})`
		},
		loadPatterns: () => (
			<svg className={styles.surfaces} xmlns="http://www.w3.org/2000/svg">
				<defs>
					{[...usedSurfaces].map((id, i) => (
						<pattern
							id={id}
							key={i}
							viewBox="0 0 100 100"
							patternUnits="userSpaceOnUse"
							width="1em"
							height="1em"
						>
							{surfaces[id]}
						</pattern>
					))}
				</defs>
			</svg>
		),
	}
}
