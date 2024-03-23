'use client'

import { onView } from './view'

interface SizeEvent extends Event {
	readonly detail: ResizeObserverEntry
	initCustomEvent(
		typeArg: string,
		canBubbleArg: boolean,
		cancelableArg: boolean,
		detailArg: ResizeObserverEntry,
	): void
}

const sizeEventType = 'size',
	sizeObserver = new ResizeObserver((entries) =>
		entries.forEach((entry) => {
			entry.target.dispatchEvent(
				new CustomEvent(sizeEventType, { detail: entry }),
			)
		}),
	)

/**
 * Callback when the window resize
 */
export function onResize(
	element: Element,
	onResizeCallback: (evt: SizeEvent) => void,
) {
	element.addEventListener(
		sizeEventType,
		onResizeCallback as (evt: Event) => void,
	)
	sizeObserver.observe(element)
}

/**
 * Callback when the window resize
 */
export function onViewResize(
	element: Element,
	onResizeCallback: (evt: SizeEvent) => void,
) {
	element.addEventListener(
		sizeEventType,
		onResizeCallback as (evt: Event) => void,
	)
	onView(
		element,
		() => {
			sizeObserver.observe(element)
		},
		() => {
			sizeObserver.unobserve(element)
		},
	)
}
