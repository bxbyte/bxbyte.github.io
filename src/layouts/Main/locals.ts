import infos from '@/data/infos'
import type { LocalLink } from '@/libs/format'

export default {
	navLinks: [
		{ label: { fr: 'Accueil', en: 'Home' }, href: '/', relation: 'abs' },
		{ label: { fr: 'Posts', en: 'Posts' }, href: '/posts', relation: 'rel' },
		{
			label: { fr: 'Contact', en: 'Contact' },
			href: '/#contact',
			relation: 'rel',
		},
	] satisfies LocalLink[],
	footerLinkSections: [
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
					href: process.env.SERVER_URL || 'noServerUrlFound',
				},
			] satisfies LocalLink[],
		},
		{
			name: { fr: 'Infos de Contact', en: 'Contact Infos' },
			links: [
				{
					label: 'Email',
					href: `mailto:${infos.owner.email}`,
				},
				{
					label: 'Github',
					href: `https://github.com/bxbyte`,
				},
			] satisfies LocalLink[],
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
		} satisfies LocalLink,
	},
}
