'use client'

import { type FunctionComponent, cloneElement } from 'react'
import { useEffect, useRef } from 'react'

type ScrollerProps = {
	children: JSX.Element
}

/**
 * Apply a hooks update a CSS variable
 * named --f-scroll updating a factor
 * with scrolling.
 *
 * @returns Scrolling hook
 */
function useScroll() {
	var scrollRef = useRef<HTMLElement>(null)

	useEffect(() => {
		var element = scrollRef.current as HTMLElement

		function updateScroll(t: number) {
			element.style.setProperty('--f-scroll', t.toString())
		}

		import('@/scripts/scroll').then(({ onViewScroll, getScrollFactor }) => {
			onViewScroll(element, ({ detail }) => {
				updateScroll(detail)
			})
			updateScroll(getScrollFactor(element))
		})
	})

	return scrollRef
}

/**
 * Clone the passed children with the scroll hook added.
 */
export default (function Scroller({ children }) {
	return cloneElement(children, { ref: useScroll() })
} as FunctionComponent<ScrollerProps>)
