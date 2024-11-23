export default {
	id: 'coorps',
	cv: {
		object: 'Recherche de stage en informatique',
		description: `
			Étudiant passionné de technologie en deuxième année de BUT Informatique,
			je suis à la recherche d'un sujet de stage dans le cadre de mes études,
			de préférences autour du développement d'application.
			Curieux et dynamique, j'ai hâte de découvrir les ficelles du monde professionnel. 
		`,
		skills: [
			[
				'Concevoir, réaliser, déployer et maintenir des applications',
				'Analyser, implémenter et optimiser des algorithmes',
				'Installer et sécuriser un service réseau (BDD, site web, ...)',
			],
			[
				"Collaborer au sein d'une équipe",
				'Suivre un projet avec la méthodologie agile',
				"Communiquer efficacement à l'écrit et à l'oral, anglais compris",
			],
		],
		experiences: [
			{
				title: 'Musigma - Application de gestion de festival',
				description: `
					Réalisé en collaboration avec 5 camarades :
					- **Cahier des charges** (fonctionnel, technique, marketing)
					- Modélisations **UML** (architecture, cas d'utilisations, ...)
					- Maquettes **IHM** respectant les **critères ergonomiques**
					- Implémentation en **Java**, en collaboration sur **Gitlab**
					- Présentations en français / anglais (Lean Canvas, démo, ...)`,
				start: new Date('2024/06'),
				metadata: '4 semaines, IUT2 Grenoble (projet tutoré)',
			},
			{
				title: 'Étude du nutriscore',
				description: `
					Réalisé lors de ce projet en solo :
					- Extraction de données d'une **BDD PostgreSQL**
					- Formattage et **analyse statistique** des données
					- Présentation des résultats en anglais en **RMarkdown**`,
				start: new Date('2024/05'),
				metadata: '4 jours, IUT2 Grenoble (projet tutoré)',
			},
			{
				title: 'Mise en place de services réseau',
				description: `
					Réalisé lors de ce projet en solo :
					- Mise en place de services réseau (**PostgreSQL**, **Apache/PHP**, **SSH**, **UFW**, ...)
					sur une **VM Debian** **Qemu/KVM**
					- Rédaction d'un manuel d'installation en **Latex**`,
				start: new Date('2024/05'),
				metadata: '2 semaines, IUT2 Grenoble (projet tutoré)',
			},
		],
		techs: [
			['C, C++', 'Java'],
			[
				'HTML, PHP, JSX',
				'CSS, SCSS',
				'JavaScript, TypeScript',
				'Astro.JS, Next.JS',
				'Cypress, Playwright, Puppeteer',
			],
			['SQL, PostgreSQL'],
			[
				'Git, Github, Gitlab',
				'Docker, Kubertenes',
				'Linux system & utils',
				'VS Code, JetBrains IDEs',
			],
			['Python, Jupyter', 'R, Quarto'],
			['Latex, Overleaf', 'UML, BPMN', 'Jira, Office 365'],
		],
	},
} satisfies Job
