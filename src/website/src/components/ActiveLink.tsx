'use client'

import { classNames } from '@/lib/utils'
import texts from '@/styles/module/texts.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Return a normal link with a texts active class name
 * if the href is in the current path.
 */
export default (function ActiveLink({ href, ...props }) {
	const currentHref = usePathname()
	return (
		<Link
			{...classNames(
				props,
				(((href as string).length > 1 &&
					currentHref.startsWith(href as string)) ||
					currentHref == href) &&
					texts.active,
			)}
			href={href}
		/>
	)
} as typeof Link)
