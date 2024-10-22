import type { Blog, Person } from 'schema-dts'

import type Head from '@/components/Head.astro'

import logo from '@/assets/logo.svg?url'

const OWNER = {
	name: 'Lucas Maillet',
	additionalName: 'bxbyte',
	jobTitle: 'IT Student',
	affiliation: 'IUT 2 Grenoble',
	email: 'iut@lucas-maillet.com',
} as Record<string, string> & Person

export default {
	owner: OWNER,
	formspreeId: 'mdoqjapd',
	head: {
		title: `${OWNER.name} Portfolio`,
		link: [
			{ rel: 'icon', type: 'image/svg+xml', href: logo },
			{ rel: 'sitemap', href: '/sitemap-index.xml' },
		],
		meta: {
			description: `${OWNER.name} portfolio : resume, blog & contact`,
			keywords: [
				'IT student',
				'resume blog contact',
				(OWNER.name as string).toLowerCase(),
			],
		},
		script: [
			{
				type: 'application/ld+json',
				content: JSON.stringify({
					'@context': 'http://schema.org',
					'@type': 'Blog',
					name: `${OWNER.name} Portfolio`,
					description: `${OWNER.name} portfolio : resume, blog & contact`,
					author: {
						...(OWNER as Object),
						'@type': 'Person',
						url: process.env.SITE_URL || 'noUrlFound',
					} as Person,
				} as Blog),
			},
		],
	} as ComponentProps<typeof Head>,
}
