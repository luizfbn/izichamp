import React from 'react';
import styles from './Card.module.css';

type ICard = React.PropsWithChildren<{
	image: string;
	size?: {
		width: string;
		height: string;
	};
}>;

const Card = ({ image, size, children }: ICard) => {
	return (
		<div
			className={styles.card}
			style={{
				backgroundImage: `url(${image}), url(/src/Assets/splash-loading.svg)`,
				backgroundPosition: 'center',
				backgroundSize: 'contain',
				...size,
			}}
		>
			<div>{children}</div>
		</div>
	);
};

export default Card;
