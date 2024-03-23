import { classNames } from '@/lib/utils'
import type { ComponentProps, FunctionComponent } from 'react'

import MaskedDiv, { type MaskDivProps, maskById } from './client'

/**
 * A mask handler to create and manipulate a HTML interactive mask.
 */
export default class MaskElementHandler {
	id!: string

	/**
	 * Div masking with a rect.
	 */
	MaskedDiv = ((props) => {
		this.id = props.id
		return MaskedDiv(props)
	}) as FunctionComponent<MaskDivProps>

	/**
	 * Masked div parent.
	 */
	MaskDiv = (({ children, ...props }) => {
		return <div {...classNames(props, maskById(this.id))}>{children}</div>
	}) as FunctionComponent<ComponentProps<'div'>>
}
