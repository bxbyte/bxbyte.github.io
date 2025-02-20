import logo from "./ctrla.png?url"

export default {
	id: "inria-crtla-rutten",
	letter: {
		coorp: {
			name: "Ctrl-A / INRIA",
			location: "38054 Grenoble",
			logo,
			resp: "M. Rutten",
		},
		object: "Candidature spontanée de stage - Informatique",
		from: "Grenoble",
		content: `
			Monsieur Rutten,
			
			Actuellement étudiant en deuxième année de BUT Informatique (parcours réalisation d'applications) 
			à l'[IUT2 de Grenoble](https://iut2.univ-grenoble-alpes.fr/),
			je recherche un stage d'une durée minimale de deux mois 
			aux alentours d'avril 2025 dans le cadre de mes études.
			<br>
			En l'absence d'offres publiées, je vous soumets aujourd'hui ma candidature spontanée
			dans l'espoir qu'un stage en lien avec mes compétences soit envisageable.
			
			J'ai choisi de postuler dans votre équipe pour les raisons suivantes :
			<br>
			Tout d'abord, ayant pour ambition de faire un jour
			carrière dans la recherche informatique,
			il m'a semblé évident de réaliser ce stage à Ctrl-A,
			une équipe du prestigieux Institut National de Recherche en Informatique et en Automatique,
			pilier de ce domaine en France.
			<br>
			D'autant que l'environnement et les valeurs de l'INRIA
			facilitent grandement l'introduction à un étudiant
			aux métiers de la recherche scientifique.
			<br>
			De plus, travailler dans votre équipe sera l'occasion 
			de découvrir et d'étudier aussi bien l'informatique autonome
			que les domaines associés,
			ce qui m'aidera d'autant plus à préciser et spécialiser
			mon cursus.

			Passionné d'informatique depuis plusieurs années,
			j'ai appris et appliqué tant lors de mes études que sur mon temps libre
			les divers aspects de la réalisation d'une application,
			qui m'ont permis d'acquérir des compétences en programmation,
			mathématiques, gestion de projet et anglais.
			<br>
			Compétences renforcées l'année précédente à l'IUT,
			où j'ai participé à divers projets collaboratifs,
			qui m'ont permis de forger une rigueur technique et méthodologique
			pour le travail d'équipe. 
			<br>
			Encore une fois, j'insiste sur ma volonté de contribuer 
			aux missions de l'équipe Ctrl-A, et quel que soit le sujet de stage,
			je saurais y donner le meilleur de moi-même et en tirer des enseignements.

			Enfin, je vous remercie pour votre attention, 
			et serais ravi de poursuivre cet échange lors d'un entretien,
			aussi je reste à votre disposition pour tous renseignements supplémentaires.

			Dans l'attente d'une réponse,
			je vous prie d'agréer, Monsieur, 
			l'expression de mes salutations les plus sincères.
			`,
	},
	cv: {
		object: "Recherche de stage en informatique",
		description: `
			Étudiant passionné de technologie en deuxième année de BUT Informatique,
			je suis à la recherche d'un sujet de stage en accord 
			avec mon projet professionnel, souhaitant pour l'instant
			prolonger mon cursus pour un jour pouvoir contribuer dans la recherche informatique.
		`,
		skills: [
			[
				"Concevoir, réaliser, déployer et maintenir des applications",
				"Analyser, implémenter et optimiser des algorithmes",
				"Installer et sécuriser un service réseau (BDD, site web, ...)",
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
				title: "Mise en place de services réseau",
				description: `
					Réalisé lors de ce projet en solo :
					- Mise en place de services réseau (**PostgreSQL**, **Apache/PHP**, **SSH**, **UFW**, ...)
					sur une **VM Debian** **Qemu/KVM**
					- Rédaction d'un manuel d'installation en **Latex**`,
				start: new Date("2024/05"),
				metadata: "2 semaines, IUT2 Grenoble (projet tutoré)",
			},
		],
		techs: [
			["C, C++", "Java"],
			[
				"HTML, PHP, JSX",
				"CSS, SCSS",
				"JavaScript, TypeScript",
				"Astro.JS, Next.JS",
				"Cypress, Playwright, Puppeteer",
			],
			["SQL, PostgreSQL"],
			[
				"Git, Github, Gitlab",
				"Docker, Kubertenes",
				"Linux system & utils",
				"VS Code, JetBrains IDEs",
			],
			["Python, Jupyter", "R, Quarto"],
			["Latex, Overleaf", "UML, BPMN", "Jira, Office 365"],
		],
	},
} satisfies Job
