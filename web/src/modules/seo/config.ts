import type { Blog, Person } from "schema-dts"

import favicon from "./assets/favicon.svg?url"
import type { SeoHeaders } from "./components"
import infos from "@/data/infos"

export default {
	title: `${infos.owner.name} Portfolio`,
	link: [
		{ rel: "icon", type: "image/svg+xml", href: favicon },
		{ rel: "sitemap", href: "/sitemap-index.xml" },
	],
	meta: {
		description: `${infos.owner.name} portfolio : resume, blog & contact`,
		keywords: [
			"IT student",
			"resume blog contact",
			(infos.owner.name as string).toLowerCase(),
		],
	},
	script: [
		{
			type: "application/ld+json",
			content: JSON.stringify({
				"@context": "http://schema.org",
				"@type": "Blog",
				name: `${infos.owner.name} Portfolio`,
				description: `${infos.owner.name} portfolio : resume, blog & contact`,
				author: {
					...(infos.owner as Object),
					"@type": "Person",
					url: process.env.SITE_URL || "noUrlFound",
				} as Person,
			} as Blog),
		},
	],
} satisfies component.Props_<typeof SeoHeaders>
