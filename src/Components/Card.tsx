import React from 'react';
import styles from './Card.module.css';
import { IChampion } from '../api';

type ICard = {
	item: IChampion;
	image: string;
};

const Card = ({ item, image }: ICard) => {
	return (
		<div className={styles.card} style={{ backgroundImage: `url(${image})` }}>
			<div>
				<h3>{item.name}</h3>
				<h4>{item.title}</h4>
			</div>
		</div>
	);
};

export default Card;
