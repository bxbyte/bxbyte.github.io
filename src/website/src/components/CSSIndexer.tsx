import { type FunctionComponent, cloneElement } from 'react'

type CSSIndexerProps = {
	children: JSX.Element & { props: { children: JSX.Element[] } }
}

/**
 * Clone one 2 level children with 2 more css variable :
 * --n-n on 1st level child corresponding to it's number of children.
 * --n-i on 2nd level children corresponding to child's index.
 */
export default (function CSSIndexer({ children }) {
	const n = children.props.children.length
	return cloneElement(children, {
		style: { '--n-n': n },
		children: (children.props.children as JSX.Element[]).map((child, i) => {
			return cloneElement(child, { key: i, style: { '--n-i': i } })
		}),
	})
} as FunctionComponent<CSSIndexerProps>)
