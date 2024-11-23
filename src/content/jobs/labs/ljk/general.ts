import logo from './ljk.svg?url'

export default {
	id: 'ljk',
	letter: {
		coorp: {
			name: 'Laboratoire Jean Kuntzmann',
			location: "38401 Saint-Martin-d'Hères",
			logo,
		},
		object: 'Candidature spontanée de stage - Informatique',
		from: 'Grenoble',
		content: `
			Madame, Monsieur,
			
			Actuellement étudiant en deuxième année de BUT Informatique (parcours réalisation d'applications) 
			à l'[IUT2 de Grenoble](https://iut2.univ-grenoble-alpes.fr/),
			je recherche un stage d'une durée minimale de deux mois 
			aux alentours d'avril 2025 dans le cadre de mes études.
			<br>
			En l'absence d'offres publiées, je vous soumets aujourd'hui ma candidature spontanée
			dans l'espoir qu'un stage en lien avec mes compétences soit envisageable.
			
			J'ai choisi de postuler auprès de votre laboratoire pour les raisons suivantes :
			<br>
			Tout d'abord, ayant pour ambition de faire carrière 
			dans le domaine de la recherche informatique,
			je suis convaincu que le LJK,
			l'un des plus grands centres de recherche en informatique de l'UGA,
			est pour un étudiant l'environnement idéal pour avoir un premier aperçu
			du monde de la recherche.
			<br>
			Par ailleurs, étant curieux de nature,
			l'ensemble des sujets traités par votre centre 
			représente chacun une occasion pour moi de découvrir
			un axe de recherche, ce qui, dans tous les cas
			m'aidera à guider mes choix pour la suite de mes études.
			<br>
			De plus, j'ai déjà un vif intérêt pour les 
			missions de vos équipes MAVERICK, RobotLearn et DAO,
			étant particulièrement intrigué par tout ce qui 
			traite de modélisation, algorithmie et IA.

			Passionné d'informatique depuis plusieurs années,
			j'ai notamment appris tant lors de mes études que sur mon temps libre
			à concevoir, développer, déployer et mettre à jour une application.
			<br>
			L'année dernière à l'IUT,
			j'ai pu participer à divers projets collaboratifs qui ont su
			renforcer ces capacités et ont forgé une rigueur technique et méthodologique
			pour le travail d'équipe. 
			<br>
			Encore une fois, j'insiste sur ma volonté d'apporter ma contribution au LJK, 
			et je suis sûr que quelles que soient la ou les missions,
			je pourrais y donner le meilleur de moi-même,
			développer mes compétences et en tirer des enseignements.

			Enfin, je vous remercie pour votre attention, 
			et serais ravi de poursuivre cet échange lors d'un entretien,
			aussi je reste à votre disposition pour tous renseignements supplémentaires.

			Dans l'attente d'une réponse,
			je vous prie d'agréer, Madame, Monsieur, 
			l'expression de mes salutations les plus sincères.
			`,
	},
	cv: {
		object: 'Recherche de stage en informatique',
		description: `
			Étudiant passionné de technologie en deuxième année de BUT Informatique,
			je suis à la recherche d'un sujet de stage en accord 
			avec mon projet professionnel, souhaitant pour l'instant
			prolonger mon cursus en Master informatique.
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
