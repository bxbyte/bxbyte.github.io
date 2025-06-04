import { REPOSITERY_OWNER } from "astro:env/server"

const owner = {
	name: "Lucas Maillet",
	additionalName: "bxbyte",
	jobTitle: "IT Student",
	affiliation: "IUT 2 Grenoble",
	email: "mailletl@etu.univ-grenoble-alpes.fr",
}

export default {
	owner,
	links: [
		{
			label: "Linkedin",
			icon: "mdi:linkedin",
			href: "www.linkedin.com/in/mailletl",
		},
		{
			label: "Github",
			icon: "mdi:github",
			href: `https://github.com/${REPOSITERY_OWNER}`,
		},
		{
			label: "Email",
			icon: "mdi:email",
			href: `mailto:${owner.email}`,
		},
	],
}
