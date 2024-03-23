import { type FunctionComponent, PropsWithChildren, cloneElement } from 'react'

type ConditionalProps = {
	if: boolean
} & PropsWithChildren

/**
 * Return children if the condition is true.
 */
export default (function Conditional({ if: if_, children }) {
	return if_ ? <>{children}</> : <></>
} as FunctionComponent<ConditionalProps>)
