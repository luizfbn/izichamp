import React from 'react';
import styles from './CartPrice.module.css';
import { ReactComponent as BEIcon } from '../../Assets/be.svg';
import { ReactComponent as OEIcon } from '../../Assets/oe.svg';
import { ReactComponent as RPIcon } from '../../Assets/rp.svg';
import { ReactComponent as BEDiscountIcon } from '../../Assets/be-check.svg';
import { ReactComponent as RPDiscountIcon } from '../../Assets/rp-check.svg';

type ICartPrice = {
	onClickPrice: React.MouseEventHandler<HTMLParagraphElement>;
	disablePrice?: boolean;
	price: number;
	oldPrice?: number;
} & (ICartPriceBECheckbox | ICartPriceOECheckbox | ICartPriceRPCheckbox);

type ICartPriceBECheckbox = {
	type: 'BE';
	checkbox: {
		id: string;
		checked: boolean;
		onChange: React.ChangeEventHandler<HTMLInputElement>;
	};
	inputNumber?: undefined;
};

type ICartPriceOECheckbox = {
	type: 'OE';
	checkbox?: undefined;
	inputNumber?: undefined;
};

type ICartPriceRPCheckbox = {
	type: 'RP';
	checkbox: {
		id: string;
		checked: boolean;
		onChange: React.ChangeEventHandler<HTMLInputElement>;
	};
	inputNumber?: {
		range?: {
			min: string;
			max: string;
		};
		onChange: React.ChangeEventHandler<HTMLInputElement>;
	};
};

const CartPrice = ({
	onClickPrice,
	disablePrice,
	price,
	oldPrice,
	checkbox,
	inputNumber,
	type,
}: ICartPrice) => {
	return (
		<div className={styles.price}>
			<div className={styles.priceTitle} onClick={onClickPrice}>
				{type === 'BE' && <BEIcon />}
				{type === 'OE' && <OEIcon />}
				{type === 'RP' && <RPIcon />}
				<h3
					style={{
						color: disablePrice ? '#9c9c9c' : '#f7f7f7',
					}}
				>
					{price}
				</h3>
				{oldPrice && checkbox && checkbox.checked && <h4>{oldPrice}</h4>}
			</div>
			{(checkbox || inputNumber) && (
				<div className={styles.priceDiscount}>
					{checkbox && (
						<div className={styles.priceCheckbox}>
							<input
								type='checkbox'
								id={checkbox.id}
								checked={checkbox.checked}
								onChange={checkbox.onChange}
							/>
							<label htmlFor={checkbox.id} className={styles[type]}>
								{type === 'BE' && <BEDiscountIcon />}
								{type === 'RP' && <RPDiscountIcon />}
							</label>
						</div>
					)}
					{inputNumber && (
						<input
							type='number'
							min={inputNumber.range ? inputNumber.range.min : '0'}
							max={inputNumber.range ? inputNumber.range.max : '100'}
							onChange={inputNumber.onChange}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default CartPrice;
