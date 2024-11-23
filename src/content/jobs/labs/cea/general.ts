import logo from './cea.bmp?url'

export default {
	id: 'cea',
	letter: {
		coorp: {
			name: 'CEA',
			location: '38000 Grenoble',
			logo,
		},
		object:
			"Candidature de stage - Outils d'analyse automatique d'acquisitions en imagerie gamma",
		from: 'Grenoble',
		content: `
			Madame, Monsieur,
			
			Étudiant en deuxième année de BUT Informatique parcours réalisation d'applications, 
			à l'[IUT2 de Grenoble](https://iut2.univ-grenoble-alpes.fr/),
			je suis à la recherche d'un stage d'au minimum 10 semaines
			dans le cadre de mes études.
			Votre [offre de stage en outils d'analyse automatique d'acquisitions en imagerie gamma](https://fr.indeed.com/viewjob?jk=4b146cdf0ce0d848&tk=1i9rlv2dikheg8vp&from=serp&vjs=3),
			a particulièrement retenu mon attention, et ce pour les raisons suivantes :

			Premièrement, je souhaite à l'avenir contribuer à la recherche technologique,
			et le CEA étant un pilier de l'innovation en France, 
			votre offre est à mes yeux l'opportunité de découvrir ce domaine.
			<br>
			Deuxièmement, votre sujet de stage s'inscrit typiquement
			dans mon parcours en réalisation d'application,
			et sera, sans aucun doute, une expérience enrichissante.
			<br>
			Troisièmement, la mission même éveille ma curiosité 
			et sera l'occasion pour moi d'en apprendre plus
			sur l'imagerie gamma.
			
			Conscient des attentes, je pense être le type de candidat recherché :
			<br>
			Durant l'année précédente à l'IUT, j'ai pu appliquer et montrer
			mes capacités en mathématiques, conception et implémentation,
			au point d'être souvent sollicité pour diriger ces aspects
			lors de projets collaboratifs.
			Ces projets ont renforcé mes compétences en travail d'équipe,
			ce qui s'est avéré crucial, confronté à divers problèmes complexes.
			Persévérant et perfectionniste, je m'efforce toujours d'atteindre
			mes objectifs en temps et en heure.
			En bref, je vous garantis que je mettrai toutes mes compétences 
			au service de votre équipe du LASP.

			Enfin, je serais ravi de discuter de ma candidature lors d'un entretien,
			et je vous remercie pour votre attention, 
			aussi je reste à votre entière disposition pour tous renseignements supplémentaires.

			Dans l'attente d'une réponse,
			je vous prie d'agréer, Madame, Monsieur, 
			l'expression de mes salutations les plus sincères.
			`,
	},
	cv: {
		object:
			"Stage - Outils d'analyse automatique d'acquisitions en imagerie gamma",
		description: `
			Étudiant en deuxième année de BUT Informatique,
			je suis à la recherche d'un sujet de stage
			en accord avec mon projet professionnel,
			pour l'instant orienté vers la recherche informatique.  
		`,
		skills: [
			[
				'Concevoir, réaliser et maintenir des solutions logicielles',
				'Analyser, implémenter et optimiser des algorithmes',
				'Installer, interroger et sécuriser une BDD',
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
				title: "Étude d'algorithmes de classification",
				description: `
					Réalisé lors de ce projet en duo :
					- Implémentation en **Java** d'algorithmes de classification
					- Analyse et optimisation desdits algorithmes
					- Rédaction d'un compte-rendu des performances en **LaTeX**`,
				start: new Date('2023/10'),
				metadata: '1 semaines, IUT2 Grenoble (projet tutoré)',
			},
		],
		techs: [
			['Python, Jupyter', 'R, Quarto'],
			['C, C++', 'Java'],
			[
				'HTML, PHP, JSX',
				'CSS, SCSS',
				'JavaScript, TypeScript',
				'Astro.JS, Next.JS',
			],
			['SQL, PostgreSQL'],
			[
				'Git, Github, Gitlab',
				'Github Actions, Docker',
				'Linux system & utils',
				'VS Code, JetBrains IDE',
			],
			['Latex, Overleaf', 'UML, BPMN', 'Office 365'],
		],
	},
} satisfies Job
