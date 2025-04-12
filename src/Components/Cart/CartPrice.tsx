import React, { ReactNode } from 'react';
import styles from './CartPrice.module.css';

type ICartPrice = {
	icon: ReactNode;
	value: number;
	oldValue?: number;
	disabled?: boolean;
	onClick: React.MouseEventHandler<HTMLParagraphElement>;
};

const CartPrice = ({
	icon,
	value,
	oldValue,
	disabled,
	onClick,
}: ICartPrice) => {
	return (
		<div
			className={styles.priceTitle}
			onClick={onClick}
			data-testid='price-content'
		>
			{icon}
			<h3
				style={{
					color: disabled ? '#9c9c9c' : '#f7f7f7',
				}}
			>
				{value}
			</h3>
			{oldValue && <h4>{oldValue}</h4>}
		</div>
	);
};

export default CartPrice;
