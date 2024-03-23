'use client'

const ViewClassName = 'viewed'

export const viewEvent = new CustomEvent('inViewport'),
	hideEvent = new CustomEvent('outViewport'),
	viewObserver = new IntersectionObserver((entries) =>
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(ViewClassName)
				entry.target.dispatchEvent(viewEvent)
			} else {
				entry.target.classList.remove(ViewClassName)
				entry.target.dispatchEvent(hideEvent)
			}
		}),
	)

/**
 * If element is in viewport
 */
export function isViewed(element: Element): boolean {
	return element.classList.contains(ViewClassName)
}

/**
 * Callback if an element is in viewport
 */
export function onView(
	element: Element,
	onViewCallback: () => void,
	onHideCallback: () => void,
) {
	element.addEventListener(viewEvent.type, onViewCallback)
	if (onHideCallback) element.addEventListener(hideEvent.type, onHideCallback)
	viewObserver.observe(element)
}
