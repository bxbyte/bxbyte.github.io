const content = {
	title: {
		fr: "Mon parcours",
		en: "My story",
	},
	description: {
		fr: "Un petit résumé des grandes étapes qui m'ont guidé sur le chemin de l'informatique.",
		en: "A short resume of the big step that lead me on the path of informatics.",
	},
	timeline: [
		{
			start: new Date("2020-03-17"),
			title: {
				fr: "Confinement Covid-19",
				en: "Covid-19 lockdown",
			},
			description: {
				fr: `Beaucoup de temps libres, découverte et experimentation de la programmation.`,
				en: `Lots of free time, discovery and experimentation of programming.`,
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
				fr: `Entre mathématics et informatiques, apprentissage des fondamentaux`,
				en: `Between mathematics and informatics, learning of the basis.`,
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
				en: "Minor in Computer Sciences",
			},
			description: {
				fr: `Etude appliquer de multiple domaine de l'informatique, spécialisé dans le devellopement d'application`,
				en: `Applicated study of multiple informatics domains, with a specialisation in application development`,
			},
			items: [
				{
					start: new Date("2025-04-14"),
					end: new Date("2025-06-20"),
					title: {
						fr: "Stage dans l'équipe AIRSEA du LJK",
						en: "Internship in the AIRSEA teams of the LJK",
					},
					description: {
						fr: `Evaluation de méthodes de compensation d'erreurs et implémentation dans le compilateur Poseidon`,
						en: `Errors compensation methods evaluation and implementation in the Poseidon compilateur.`,
					},
				},
			],
		},
	],
}

export default content
