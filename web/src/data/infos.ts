import { REPOSITERY_OWNER } from "astro:env/server"

const owner = {
	name: "Lucas Maillet",
	additionalName: "bxbyte",
	jobTitle: "IT Student",
	affiliation: "IUT 2 Grenoble",
	email: "in@lucas-maillet.fr",
	tel: "+33 06 68 10 76 04",
}

export default {
	owner,
	networks: [
		{
			label: "Linkedin",
			icon: "mdi:linkedin",
			href: "https://www.linkedin.com/in/mailletl",
		},
		{
			label: "Github",
			icon: "mdi:github",
			href: `https://github.com/${REPOSITERY_OWNER}`,
		},
		{
			label: "Gitlab",
			icon: "mdi:gitlab",
			href: `https://gitlab.com/bxbyte1`,
		},
	],
	links: [
		{
			label: owner.email,
			icon: "mdi:email",
			href: `mailto:${owner.email}`,
		},
		{
			label: owner.tel,
			icon: "mdi:telephone",
			href: `tel:${owner.tel.replace(/\s+/g, "")}`,
		},
	],
}
