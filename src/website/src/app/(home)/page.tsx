import CSSIndexer from '@/components/CSSIndexer'
import SVGHandler from '@/components/SVGHandler'
import SVGSlice from '@/components/SVGSlice'
import Scroller from '@/components/Scroller'
import colors from '@/styles/module/colors.module.scss'
import texts from '@/styles/module/texts.module.scss'

import { MaskDiv, MaskedDiv } from './client'
import './styles.scss'

export default function HomePage() {
	const { usePattern, loadPatterns } = SVGHandler()
	return (
		<>
			<CSSIndexer>
				<div className={colors.backIndex}>
					{Array.from({ length: 20 }, (_, i) => (
						<h1 key={i}>{i}</h1>
					))}
				</div>
			</CSSIndexer>
			<section id="welcome">
				<div>
					<h1 className={texts.title}>Bienvenue,</h1>
					<h2>Je m'appelle Lucas Maillet</h2>
					<div>
						<h3 className={texts.title}>Je suis</h3>
						<ul>
							<li>étudiant</li>
							<li>développeur</li>
						</ul>
					</div>
				</div>
			</section>
			<section id="skills">
				<h1 className={texts.title}>Compétences</h1>
				<ul>
					<li>Organiser et travailler avec une équipe</li>
					<li>Développement et maintenance d'application</li>
					<li>Implémentation et optimisation d'algorithme</li>
					<li>Conception et exploitation d'une base de données</li>
				</ul>
			</section>
			<Scroller>
				<section id="windows">
					<MaskedDiv id="mask" className={colors.backNoisy}>
						<svg xmlns="http://www.w3.org/2000/svg">
							<rect width="100%" height="100%" fill={usePattern('hash')} />
							<image
								className={colors.filterBW}
								href="/img/mountain-0.webp"
								width="100%"
								height="75%"
								y="25%"
								preserveAspectRatio="xMidYMin slice"
							/>
						</svg>
					</MaskedDiv>
					<div>
						<MaskDiv></MaskDiv>
						<MaskDiv>
							<h1 className={texts.pixel}>44203</h1>
						</MaskDiv>
						<MaskDiv></MaskDiv>
						<MaskDiv></MaskDiv>
						<MaskDiv></MaskDiv>
					</div>
				</section>
			</Scroller>
			<SVGSlice svg="plane" />
			{loadPatterns()}
		</>
	)
}
