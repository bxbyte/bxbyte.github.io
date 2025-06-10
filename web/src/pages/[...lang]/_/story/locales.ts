const content = {
	title: {
		fr: "Mon parcours",
		en: "My journey",
	},
	description: {
		fr: "Un petit résumé des grandes étapes qui m'ont guidé sur le chemin de l'informatique.",
		en: "A short summary of the major steps that led me on the path to computer science.",
	},
	timeline: [
		{
			start: new Date("2020-03-17"),
			title: {
				fr: "Confinement Covid-19",
				en: "Covid-19 lockdown",
			},
			description: {
				fr: `Beaucoup de temps libre, découverte et expérimentation de la programmation.`,
				en: `Lots of free time, discovering and experimenting with programming.`,
			},
		},
		{
			start: new Date("2020-09-02"),
			end: new Date("2023-06-20"),
			title: {
				fr: "Baccalauréat Général",
				en: "High School Diploma",
			},
			description: {
				fr: `Entre mathématiques et informatique, apprentissage des fondamentaux.`,
				en: `Between mathematics and computer science, learning the fundamentals.`,
			},
		},
		{
			start: new Date("2023-09-02"),
			end: {
				fr: "Aujourd'hui",
				en: "Today",
			},
			title: {
				fr: "BUT en Informatique",
				en: "Bachelor in Computer Science",
			},
			description: {
				fr: `Étude appliquée de multiples domaines de l'informatique, spécialisé dans le développement d'applications.`,
				en: `Applied study of multiple computer science fields, specialized in application development.`,
			},
			items: [
				{
					start: new Date("2025-04-14"),
					end: new Date("2025-06-20"),
					title: {
						fr: "Stage dans l'équipe AIRSEA du LJK",
						en: "Internship in the AIRSEA team at LJK",
					},
					description: {
						fr: `Implémentation d'optimisation au sein du compilateur Poseidon.`,
						en: `Optimisation implementation inside the Poseidon compiler.`,
					},
				},
			],
		},
	],
}

export default content
