import React from 'react';
import styles from './Card.module.css';

type ICard = React.PropsWithChildren<{
	image: string;
	onHoverStyle?: boolean;
	size?: {
		width: string;
		height: string;
	};
}>;

const Card = ({ image, onHoverStyle, size, children }: ICard) => {
	return (
		<div
			className={`${styles.card} ${onHoverStyle && styles.cardOnHover}`}
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
