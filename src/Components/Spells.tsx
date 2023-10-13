import React from 'react';
import styles from './Spells.module.css';
import ShowMore from './ShowMore';
import { IChampionPortuguese } from '../api';

const Spells = ({ spells }: { spells: IChampionPortuguese['spells'] }) => {
	const [activeTab, setActiveTab] = React.useState(0);
	const infoRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (infoRef.current) {
			infoRef.current.classList.remove('animeTopBottom');
			void infoRef.current.offsetWidth;
			infoRef.current.classList.add('animeTopBottom');
		}
	}, [activeTab]);

	return (
		<div className={styles.spells}>
			<ul>
				{spells.map((spell, idx) => (
					<li
						key={spell.name}
						className={`${styles.ability} ${
							activeTab === idx ? styles.active : ''
						}`}
						onClick={() => setActiveTab(idx)}
					>
						<img src={spell.abilityIconPath} alt='' />
						<h4>{spell.spellKey}</h4>
					</li>
				))}
			</ul>
			<div ref={infoRef} className={styles.info}>
				<h3>{spells[activeTab].name}</h3>
				<p>
					<ShowMore text={spells[activeTab].description} length={200} />
				</p>
			</div>
		</div>
	);
};

export default Spells;
