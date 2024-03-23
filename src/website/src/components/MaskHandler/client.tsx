'use client'

import { classNames } from '@/lib/utils'
import type { ComponentProps, FunctionComponent } from 'react'
import { useEffect, useRef } from 'react'

import './styles.scss'

export type MaskDivProps = {
	id: string
} & ComponentProps<'div'>

/**
 * @param id Mask real id
 * @returns Mask custom id
 */
export function maskById(id: string) {
	return `${id}-mask`
}

/**
 * Create a masked div.
 */
export default (function MaskedDiv({ children, id, ...props }) {
	const ref = useRef<HTMLDivElement>(null),
		maskId = maskById(id)

	useEffect(() => {
		// Construct the blank html
		var div = ref.current as HTMLDivElement,
			maskSVGParent = div.lastElementChild as SVGSVGElement,
			mask = maskSVGParent.querySelector('mask') as SVGMaskElement

		// Add some defaults properties
		div.style.mask = `url(#${maskId})`

		// Generate mask child
		const maskChilds = Array.from(
			document.querySelectorAll(`.${maskId}`),
			(child) => {
				const childMask = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'rect',
				)
				mask.appendChild(childMask)
				return [child, childMask]
			},
		) as [HTMLElement, SVGRectElement][]

		// Update mask on resize
		import('@/scripts/size').then(({ onViewResize }) => {
			// Update parent size
			onViewResize(div, () =>
				maskSVGParent.setAttribute(
					'viewBox',
					`0 0 ${div.offsetWidth} ${div.offsetHeight}`,
				),
			)
			// Update childs masks size & position
			maskChilds.forEach(([child, childMask]) =>
				onViewResize(child, () => {
					childMask.setAttribute('x', child.offsetLeft.toString())
					childMask.setAttribute('y', child.offsetTop.toString())
					childMask.setAttribute('width', child.offsetWidth.toString())
					childMask.setAttribute('height', child.offsetHeight.toString())
				}),
			)
		})
	})
	return (
		<>
			<div ref={ref} id={id} {...classNames(props, 'mask')}>
				{children}
				<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
					<defs>
						<mask id={maskId} fill="#fff">
							<rect fill="#000" x="0" y="0" width="100%" height="100%" />
						</mask>
					</defs>
				</svg>
			</div>
		</>
	)
} as FunctionComponent<MaskDivProps>)
