import React from 'react';
import styles from './CardChampion.module.css';
import { ReactComponent as BEIcon } from '../../Assets/be.svg';
import { ReactComponent as RPIcon } from '../../Assets/rp.svg';

type ICardChampion = {
	rp: number;
	blueEssence: number;
};

const CardChampion = ({ rp, blueEssence }: ICardChampion) => {
	return (
		<ul className={styles.championCard}>
			<li>
				<RPIcon />
				<h4>{rp}</h4>
			</li>
			<li>
				<BEIcon />
				<h4>{blueEssence}</h4>
			</li>
		</ul>
	);
};

export default CardChampion;
