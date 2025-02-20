import type { Blog, Person } from "schema-dts"

import favicon from "./assets/favicon.svg?url"
import type { SeoHeaders } from "./components"

const owner = {
	name: "Lucas Maillet",
	additionalName: "bxbyte",
	jobTitle: "IT Student",
	affiliation: "IUT 2 Grenoble",
	email: "in@lucas-maillet.fr",
}

export default {
	title: `${owner.name} Portfolio`,
	link: [
		{ rel: "icon", type: "image/svg+xml", href: favicon },
		{ rel: "sitemap", href: "/sitemap-index.xml" },
	],
	meta: {
		description: `${owner.name} portfolio : resume, blog & contact`,
		keywords: [
			"IT student",
			"resume blog contact",
			(owner.name as string).toLowerCase(),
		],
	},
	script: [
		{
			type: "application/ld+json",
			content: JSON.stringify({
				"@context": "http://schema.org",
				"@type": "Blog",
				name: `${owner.name} Portfolio`,
				description: `${owner.name} portfolio : resume, blog & contact`,
				author: {
					...(owner as Object),
					"@type": "Person",
					url: process.env.SITE_URL || "noUrlFound",
				} as Person,
			} as Blog),
		},
	],
} satisfies component.Props_<typeof SeoHeaders>
