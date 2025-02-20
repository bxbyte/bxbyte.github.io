import logo from "./logo.png?url"

export default {
	id: "mathdoc",
	letter: {
		coorp: {
			name: "Mathdoc",
			location: "38058 Grenoble",
			logo,
			resp: "M. Simon Chevance",
		},
		object: "Candidature de stage - Automatisation de tests pour le workflow du centre Mersenne",
		from: "Grenoble",
		content: `
			Monsieur Chevance,
			
			Étudiant en deuxième année de BUT Informatique (parcours réalisation d'applications), 
			à l'[IUT2 de Grenoble](https://iut2.univ-grenoble-alpes.fr/),
			je suis à la recherche d'un stage d'au minimum 10 semaines
			dans le cadre de mes études.
			Votre offre de stage pour la mise en place de tests automatiques pour votre workflow
			a particulièrement retenu mon attention, et ce pour les raisons suivantes :

			Premièrement, je souhaite à l'avenir trouver vocation 
			dans le domaine de la recherche,
			et votre prestigieuse unité étant membre du CNRS, 
			le plus grand organisme de recherche scientifique de France, 
			représente pour moi une piste potentielle pour
			guider mon parcours professionnel.
			<br>
			Deuxièmement, votre sujet de stage s'inscrit typiquement
			dans mon parcours en réalisation d'application,
			et me permettra d'améliorer mes compétences en matière de
			CI/CD.
			<br>
			Troisièmement, la finalité de la mission éveille ma curiosité 
			et sera l'occasion pour moi d'en savoir plus
			sur le traitement des articles scientifiques.
			
			Étant passionné d'informatique depuis plusieurs années,
			j'ai appris lors de mon cursus et pendant mon temps libre
			à utiliser divers systèmes Linux, que ce soit pour du développement
			ou du déploiement, ce qui m'a familiarisé au shell.
			<br>
			En parallèle, j'ai pu contribuer à beaucoup de projets, 
			souvent orienté web, qui m'ont permis de découvrir une multitude 
			de langages, frameworks et outils tel que ceux décris dans votre offre.
			<br>
			Bien sûr, ces nombreux projets ont forgé mes capacités à travailler en 
			équipe, aussi bien sur le plan social que technique.
			<br>
			En bref, je vous assure que je mettrai toutes mes compétences 
			afin de réaliser votre mission au sein de votre équipe de MathDoc.

			Enfin, je serais ravi de discuter de ma candidature lors d'un entretien,
			et je vous remercie pour votre attention, 
			aussi je reste à votre disposition pour tous renseignements supplémentaires.

			Dans l'attente d'une réponse,
			je vous prie d'agréer, Monsieur, 
			l'expression de mes salutations les plus sincères.
			`,
	},
	cv: {
		object: "Stage - Mise en place de tests automatiques pour le workflow du centre Mersenne",
		description: `
			Étudiant en deuxième année de BUT Informatique,
			je suis à la recherche d'un sujet de stage
			en accord avec mon projet professionnel,
			pour l'instant orienté vers la recherche informatique.
		`,
		skills: [
			[
				"Concevoir, réaliser et maintenir des solutions logicielles",
				"Analyser, implémenter et optimiser des algorithmes",
				"Installer, interroger et sécuriser une BDD",
			],
			[
				"Collaborer au sein d'une équipe",
				"Suivre un projet avec la méthodologie agile",
				"Communiquer efficacement à l'écrit et à l'oral, anglais compris",
			],
		],
		experiences: [
			{
				title: "Musigma - Application de gestion de festival",
				description: `
					Réalisé en collaboration avec 5 camarades :
					- **Cahier des charges** (fonctionnel, technique, marketing)
					- Modélisations **UML** (architecture, cas d'utilisations, ...)
					- Maquettes **IHM** respectant les **critères ergonomiques**
					- Implémentation en **Java**, en collaboration sur **Gitlab**
					- Présentations en français / anglais (Lean Canvas, démo, ...)`,
				start: new Date("2024/06"),
				metadata: "4 semaines, IUT2 Grenoble (projet tutoré)",
			},
			{
				title: "Étude du nutriscore",
				description: `
					Réalisé lors de ce projet en solo :
					- Extraction de données d'une **BDD PostgreSQL**
					- Formattage et **analyse statistique** des données
					- Présentation des résultats en anglais en **RMarkdown**`,
				start: new Date("2024/05"),
				metadata: "4 jours, IUT2 Grenoble (projet tutoré)",
			},
			{
				title: "Étude d'algorithmes de classification",
				description: `
					Réalisé lors de ce projet en duo :
					- Implémentation en **Java** d'algorithmes de classification
					- Analyse et optimisation desdits algorithmes
					- Rédaction d'un compte-rendu des performances en **LaTeX**`,
				start: new Date("2023/10"),
				metadata: "1 semaines, IUT2 Grenoble (projet tutoré)",
			},
		],
		techs: [
			["Python, Jupyter", "R, Quarto"],
			["C, C++", "Java"],
			[
				"HTML, PHP, JSX",
				"CSS, SCSS",
				"JavaScript, TypeScript",
				"Astro.JS, Next.JS",
			],
			["Cypress, Puppeteer"],
			["SQL, PostgreSQL"],
			[
				"Git, Github, Gitlab",
				"Github Actions, Docker",
				"Linux system & utils",
				"VS Code, JetBrains IDEs",
			],
			["Latex, Overleaf", "UML, BPMN", "Office 365"],
		],
	},
} satisfies Job
