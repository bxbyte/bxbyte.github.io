import { REPOSITERY_URL } from 'astro:env/client'
import { REPOSITERY_OWNER } from 'astro:env/server'

import infos from '@/data/infos'

export default {
	navLinks: [
		{ label: { fr: 'Accueil', en: 'Home' }, href: '/', match: 'equal' },
		{
			label: { fr: 'Posts', en: 'Posts' },
			href: '/posts',
			match: 'start',
		},
		{
			label: { fr: 'Contact', en: 'Contact' },
			href: '/#contact',
			match: 'start',
		},
	],
	footer: {
		links: [
			{
				name: { fr: 'Infos de Site', en: 'Website Infos' },
				links: [
					{
						label: { fr: "Condition d'utilisation", en: 'Terms of Service' },
						href: '/tos',
					},
					{
						label: { fr: 'Politique de Cookies', en: 'Privacy Policy' },
						href: '/policy',
					},
					{
						label: { fr: 'Depôt Github', en: 'Github Repositery' },
						href: REPOSITERY_URL,
					},
				],
			},
			{
				name: { fr: 'Infos de Contact', en: 'Contact Infos' },
				links: [
					{
						label: 'Github',
						href: `https://github.com/${REPOSITERY_OWNER}`,
					},
					{
						label: 'Email',
						href: `mailto:${infos.owner.email}`,
					},
				],
			},
		],
		copyrigth: {
			whenwho: {
				fr: `© ${new Date().getFullYear()} Par ${infos.owner.name},`,
				en: `© ${new Date().getFullYear()} By ${infos.owner.name},`,
			},
			license: {
				label: {
					fr: 'Tout Droits Reservés',
					en: 'All Rights Reserved',
				},
				href: '/license',
			},
		},
		asciiArt: `
        ／l、
       (°､ₒ︎ ７
       ⎱ 、ﾞ~ヽ  ⎞
ᘛ⁐̤ᕐᐷ  じしf_, )ノ`,
	},
}
