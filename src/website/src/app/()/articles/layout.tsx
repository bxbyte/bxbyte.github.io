import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Articles',
}

export default function WallLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}
