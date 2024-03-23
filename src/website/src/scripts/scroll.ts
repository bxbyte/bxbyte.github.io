'use client'

import { onView } from './view'

export const scrollEventType = 'scrollViewport',
	watchedScrollElements: Set<Element> = new Set(), // Elements whose scroll factor is watched
	scrollInViewportElements: Set<Element> = new Set() // Those whose are in viewport

/**
 * Get a normalized value of the scroll relative position factor on element.
 */
export function getScrollFactor(element: Element): number {
	return (
		Math.round(
			((window.innerHeight - element.getBoundingClientRect().top) /
				window.innerHeight) *
				100,
		) / 100
	) // "Normalize" the scroll factor
}

/**
 * Callback with percentage of scroll on element
 */
export function onViewScroll(
	element: Element,
	onViewScrollCallback: (ev: CustomEvent | { detail: number }) => void,
) {
	element.addEventListener(scrollEventType, onViewScrollCallback as any)
	if (watchedScrollElements.has(element))
		// Avoid double watching the same elements
		return

	watchedScrollElements.add(element)
	onView(
		element,
		() => scrollInViewportElements.add(element),
		() => scrollInViewportElements.delete(element),
	)
}

// Update on scroll
window.addEventListener('scroll', () => {
	scrollInViewportElements.forEach(async (element) =>
		element.dispatchEvent(
			new CustomEvent(scrollEventType, { detail: getScrollFactor(element) }),
		),
	)
})
