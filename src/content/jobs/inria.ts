export default {
	id: 'inria',
	name: 'Stage - Nom',
	coorp: {
		name: 'Inria',
		location: 'Grenoble, 38000',
		logo: 'https://pbs.twimg.com/profile_images/1466072964789645316/EJ4VIRSY_400x400.png',
	},
	letter: {
		object: 'Candidature au poste de stagiaire (imagerie gamma)',
		from: 'Grenoble',
		content: `
			Madame, Monsieur,
			
			Étudiant en deuxième année de BUT Informatique à l'IUT2 de Grenoble,
			avec un parcours mettant l'accent sur la réalisation d'applications,
			je suis à la recherche d'un sujet de stage dans le cadre de mes études.
			Mon attention a été retenue par votre offre de stage en
			outils d'analyse automatique d'acquisitions en imagerie gamma,
			et ce pour les raisons suivantes :

			Premièrement, le CEA, étant un pilier de l'innovation scientifique 
			et technologique en France, incarne un domaine
			qui me passionne où je souhaiterai contribuer à l'avenir.
			Deuxièmement, la mission proposé porte sur 


			Ce pourquoi votre offre de stage représente, pour moi,
			une opportunité majeure de découvrir le monde de la recherche.
			
			Conscient des attentes de votre annonce,
			je pense avoir les requis pour la mission : <br>
			Curieux et passionné d'informatique, j'ai pu mettre en pratique à l'IUT
			mes capacités en mathématiques, conception et implémentation,
			au point d'être souvent sollicité pour diriger 
			ces aspects lors de projets collaboratifs.
			L'IUT m'a aussi permis de cultiver mes compétences en travail d'équipe,
			que ce soit en termes de communication, de coordination ou de soutien, 
			ce qui s'est avéré crucial une fois confronté à divers problèmes complexes. <br>
			Aussi, persévérant et perfectionniste, je vous garantie de mettre tout
			en oeuvre pour compléter mes objectifs en temps et en heure.

			Dans l'attente d'une réponse,
			je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations les plus sincères, 
			et reste à votre entière disposition pour tous renseignements supplémentaires.
		`,
	},
	cv: {
		description: `
			Étudiant en deuxième année de BUT Informatique,
			je suis à la recherche d'un sujet de stage
			en accord avec mon projet professionnel, 
			orienté vers la recherche technologique.  
	
			Curieux et motivé, je candidate sur votre offre de stage,
			afin de faire un premier pas dans le monde de l'innovation.
		`,
		skills: [
			[
				'Concevoir, coder, tester et intégrer des solutions logicielles',
				'Analyser, construire et implémenter des algorithmes',
				'Concevoir, interroger et sécuriser une BDD',
			],
			[
				"Manipuler l'anglais technique",
				"Collaborer au sein d'une équipe",
				'Coordoner / suivre un projet avec les méthodes Agiles',
				"Communiquer efficacement à l'écrit et à l'oral",
			],
		],
		experiences: [
			{
				title: "Projet réalisation d'une application",
				description: `Management, conception, développement et présentation
					d'une application de gestion d'événements.`,
				start: new Date('2024'),
				metadata: '4 semaines, IUT2 Grenoble (projet tutoré)',
			},
			{
				title: "Exploitation d'une base de données",
				description: `Étude du nutriscore à partir d'une BDD PostgreSQL, 
					avec présentation des résultats sous formes de
					graphiques en RMarkdown.`,
				start: new Date('2024/05'),
				metadata: '4 jours, IUT2 Grenoble (projet tutoré)',
			},
			{
				title: "Étude d'algorithmes de classification",
				description: `Implémentation d'algorithmes de classification
					 en Java et rédaction du compte-rendu des perfomances en LaTeX.`,
				start: new Date('2023/10'),
				metadata: '1 semaines, IUT2 Grenoble (projet tutoré)',
			},
			{
				title: 'Vendanges dans le Beaujolais',
				description:
					'Cueillette de grappe pour un caveaux de vins beaujolais AOC.',
				start: new Date('2022/08'),
				metadata: '2 semaines, Domaine des Teissonnieres, Clochermerle',
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
			['Git, Github, Gitlab', 'Linux system & utils', 'VS Code, JetBrains IDE'],
			['Latex, Overleaf', 'Office 365'],
		],
	},
} satisfies Job
