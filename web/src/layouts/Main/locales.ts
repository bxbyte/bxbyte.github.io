import { REPOSITERY } from "astro:env/client"

import infos from "@/data/infos"

export default {
	navLinks: [
		{ label: { fr: "Accueil", en: "Home" }, href: "/", match: "equal" },
		{
			label: { fr: "Posts", en: "Posts" },
			href: "/posts",
			match: "start",
		},
		{
			label: { fr: "Contact", en: "Contact" },
			href: "/#contact",
			match: "start",
		},
	],
	footer: {
		links: [
			{
				name: "Contacts",
				links: infos.links,
			},
			{
				name: { fr: "Infos sur le site", en: "Website infos" },
				links: [
					// {
					// 	label: {
					// 		fr: "Condition d'utilisation",
					// 		en: "Terms of Service",
					// 	},
					// 	href: "/tos",
					// },
					// {
					// 	label: {
					// 		fr: "Politique de Cookies",
					// 		en: "Privacy Policy",
					// 	},
					// 	href: "/policy",
					// },
					{
						label: { fr: "Depôt Github", en: "Github Repositery" },
						icon: "mdi:git",
						href: `https://github.com/${REPOSITERY}`,
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
					fr: "Tout Droits Reservés",
					en: "All Rights Reserved",
				},
				href: "/license",
			},
		},
		asciiArt: `
        ／l、
       (°､ₒ︎ ７
       ⎱ 、ﾞ~ヽ  ⎞
ᘛ⁐̤ᕐᐷ  じしf_, )ノ`,
	},
}
