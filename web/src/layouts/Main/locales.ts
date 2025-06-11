import type { AstroGlobal } from "astro"
import { REPOSITERY } from "astro:env/client"

import infos from "@/data/infos"

export default {
	navLinks: [
		{ label: { fr: "Accueil", en: "Home" }, href: "/", match: "equal" },
		{
			label: "Publications",
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
				name: "Networks",
				links: infos.networks,
			},
			{
				name: "Contacts",
				links: infos.links,
			},
			// {
			// 	name: { fr: "Infos sur le site", en: "Website infos" },
			// 	links: [
			// 		// {
			// 		// 	label: {
			// 		// 		fr: "Condition d'utilisation",
			// 		// 		en: "Terms of Service",
			// 		// 	},
			// 		// 	href: "/tos",
			// 		// },
			// 		// {
			// 		// 	label: {
			// 		// 		fr: "Politique de Cookies",
			// 		// 		en: "Privacy Policy",
			// 		// 	},
			// 		// 	href: "/policy",
			// 		// },
			// 		{
			// 			label: { fr: "Depôt Github", en: "Github Repositery" },
			// 			icon: "mdi:git",
			// 			href: `https://github.com/${REPOSITERY}`,
			// 		},
			// 	],
			// },
		],
		copyrigth: {
			whenwho: {
				fr: `© ${new Date().getFullYear()}, hébergé sur`,
				en: `© ${new Date().getFullYear()}, hosted on`,
			},
			license: {
				label: "Github Pages",
				href: `https://github.com/${REPOSITERY}`,
			},
		},
		asciiArtTitle: "Meoww",
		asciiArt: `
        ／l、
       (°､ₒ︎ ７
       ⎱ 、ﾞ~ヽ  ⎞
ᘛ⁐̤ᕐᐷ  じしf_, )ノ`,
	},
}
