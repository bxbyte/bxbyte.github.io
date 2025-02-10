import meImgUrl from './me.png?url'

import type Timeline from '@/components/timeline'

interface Link {
	value: string
	link: string
	icon?: string
}

const contacts = {
	tel: {
		icon: 'mdi:telephone',
		value: '06 68 10 76 04',
		link: 'tel:+3306687604',
	},
	email: {
		icon: 'mdi:email',
		value: 'iut@lucas-maillet.com',
		link: 'mailto:iut@lucas-maillet.com',
	},
	linkedin: {
		icon: 'mdi:linkedin',
		value: 'linkedin.com/in/mailletl',
		link: 'https://www.linkedin.com/in/mailletl/',
	},
	location: {
		icon: 'mdi:location',
		value: 'Grenoble (38)',
		link: 'https://maps.app.goo.gl/LJpNcQuBueWpSTD98',
	},
} satisfies Record<string, Link>

const defaultJob = {
	me: {
		name: 'Lucas Maillet',
		img: meImgUrl,
		address: '20 avenue Edmond Esmonin',
		city: '38000 Grenoble',
		...contacts,
		contacts: [
			contacts.tel,
			contacts.email,
			contacts.linkedin,
			contacts.location,
		] as Link[],
		interests: [
			'Randonnée',
			'Minéralogie',
			'Cuisine',
			'Bricolage',
			'Design 2D/3D',
			'Informatique',
		],
	},
	cv: {
		diplomas: [
			{
				title: 'BUT informatique - IUT2',
				metadata: 'Grenoble',
				description:
					"Parcours réalisation d'applications + Option Maths Avancés",
				start: new Date('2023'),
				end: "Aujourd'hui",
			},
			{
				title: 'BAC général - Lycée Louis Armand',
				metadata: 'Villefranche sur Saône',
				description: 'Spécialités Maths et NSI + Option Maths Expertes',
				start: new Date('2020'),
				end: new Date('2023'),
			},
		] as component.Props_<typeof Timeline>['items'],
	},
}
export default defaultJob

type PartialRecursive<T extends object> = {
	[k in keyof T]?: T[k] extends object ? PartialRecursive<T[k]> : T[k]
}

declare global {
	type Job = {
		id: string
		letter?: {
			coorp: {
				name: string
				location: string
				logo: string
				resp?: string
			}
			object: string
			from: string
			content: string
		}
		cv: {
			object: string
			description: string
			skills: string[][]
			techs: string[][]
			experiences: component.Props_<typeof Timeline>['items']
		}
	} & PartialRecursive<typeof defaultJob>
}
