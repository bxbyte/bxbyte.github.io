import ActiveLink from '@/components/ActiveLink'
import config from '@/config.json'
import texts from '@/styles/module/texts.module.scss'
import '@/styles/styles.scss'
import type { Metadata } from 'next'
import Link from 'next/link'

import './globals.scss'

export const metadata: Metadata = {
	title: config.shortName,
	description: 'Home',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<header>
					<nav className={`${texts.right} ${texts.links}`}>
						<ul>
							<li>
								<ActiveLink href="/">Home</ActiveLink>
							</li>
							<li>
								<ActiveLink href="/articles">Articles</ActiveLink>
							</li>
							<li>
								<ActiveLink href="/contact">Contact</ActiveLink>
							</li>
						</ul>
					</nav>
				</header>
				<main>{children}</main>
				<footer className={texts.links}>
					<div>
						{Object.entries(config.footerLinks).map(([title, links], i) => {
							return (
								<div key={i}>
									<ul>
										<li>{title}</li>
										{Object.entries(links).map(([label, href], j) => (
											<li key={j}>
												<Link href={href}>{label}</Link>
											</li>
										))}
									</ul>
								</div>
							)
						})}
					</div>
					<div className={texts.right}>
						<ul>
							<li>
								© {new Date().getFullYear()} - Today by {config.shortName},
							</li>
							<li>
								<Link href="/infos/license" rel="license">
									All Rights Reserved.
								</Link>
							</li>
						</ul>
					</div>
				</footer>
			</body>
		</html>
	)
}
