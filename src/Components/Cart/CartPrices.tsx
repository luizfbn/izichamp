import React from 'react';
import styles from './CartPrices.module.css';
import CartPrice from './CartPrice';
import LabeledCheckbox from '../LabeledCheckbox/LabeledCheckbox';
import { ICartItem } from '../../Types/Cart';
import { IChampion } from '../../Types/Api';
import { ReactComponent as BEIcon } from '../../Assets/be.svg';
import { ReactComponent as OEIcon } from '../../Assets/oe.svg';
import { ReactComponent as RPIcon } from '../../Assets/rp.svg';
import { ReactComponent as BEDiscountIcon } from '../../Assets/be-check.svg';
import { ReactComponent as RPDiscountIcon } from '../../Assets/rp-check.svg';

type ICartPrices = {
	cartItem: ICartItem;
	setCartItem: React.Dispatch<React.SetStateAction<ICartItem>>;
};

const CartPrices = ({ cartItem, setCartItem }: ICartPrices) => {
	const [timer, setTimer] = React.useState<number>();
	const [inputValue, setInputValue] = React.useState<number>(handleDiscount());

	function handleDiscount() {
		return Number(
			((1 - cartItem.discountRP.newPrice / cartItem.cost.rp) * 100).toFixed(2)
		);
	}

	function handleCheckbox(
		event: React.ChangeEvent<HTMLInputElement>,
		type: 'BE' | 'RP'
	) {
		if (type === 'BE') {
			setCartItem((item) => {
				return {
					...item,
					...(item.type === 'Champion' && {
						discountBE: {
							hasDiscount: event.target.checked,
							newPrice: event.target.checked
								? Number((item.cost.blueEssence * 0.6).toFixed(2))
								: item.cost.blueEssence,
						},
					}),
				};
			});
		}
		if (type === 'RP') {
			setCartItem((item) => {
				return {
					...item,
					discountRP: {
						hasDiscount: event.target.checked,
						newPrice: item.cost.rp,
					},
				};
			});
		}
	}

	function handleDisablePrice(type: 'BE' | 'OE' | 'RP') {
		setCartItem((item) => {
			return {
				...item,
				disabledPrice: {
					...item.disabledPrice,
					[type]: !item.disabledPrice[type],
				},
			};
		});
	}

	function handleRpDiscount(value: number) {
		const discount = value / 100;
		setCartItem((item) => {
			return {
				...item,
				discountRP: {
					newPrice: Number((item.cost.rp - item.cost.rp * discount).toFixed(2)),
					hasDiscount: true,
				},
			};
		});
	}

	function handleRpInputChange(inputValue: string) {
		const value = Number(inputValue);
		setInputValue(value);
		clearTimeout(timer);
		const timeout = setTimeout(() => {
			const validValue = value >= 0 && value <= 100;
			handleRpDiscount(validValue ? value : 0);
		}, 500);
		setTimer(timeout);
	}

	return (
		<div className={styles.prices}>
			<div className={styles.price}>
				<CartPrice
					icon={<RPIcon />}
					value={cartItem.discountRP.newPrice}
					oldValue={
						cartItem.discountRP.hasDiscount ? cartItem.cost.rp : undefined
					}
					disabled={cartItem.disabledPrice.RP}
					onClick={() => handleDisablePrice('RP')}
				/>
				<div className={styles.priceDiscount}>
					<LabeledCheckbox
						id={cartItem.id + '_rp'}
						label={<RPDiscountIcon />}
						title={'Desconto em riot points'}
						checked={cartItem.discountRP.hasDiscount}
						onChange={(event) => handleCheckbox(event, 'RP')}
					/>
					{cartItem.discountRP.hasDiscount && (
						<input
							type='number'
							value={inputValue}
							min='0'
							max='100'
							onChange={({ target }) => handleRpInputChange(target.value)}
						/>
					)}
				</div>
			</div>
			{cartItem.type === 'Skin' ? (
				<div className={styles.price}>
					<CartPrice
						icon={<OEIcon />}
						value={cartItem.cost.orangeEssence}
						disabled={cartItem.disabledPrice.OE}
						onClick={() => handleDisablePrice('OE')}
					/>
				</div>
			) : (
				<div className={styles.price}>
					<CartPrice
						icon={<BEIcon />}
						value={cartItem.discountBE.newPrice}
						oldValue={
							cartItem.discountBE.hasDiscount
								? (cartItem as IChampion).cost.blueEssence
								: undefined
						}
						disabled={cartItem.disabledPrice.BE}
						onClick={() => handleDisablePrice('BE')}
					/>
					<div className={styles.priceDiscount}>
						<LabeledCheckbox
							id={cartItem.id + '_be'}
							label={<BEDiscountIcon />}
							title={'Desconto em fragmento de campeão'}
							checked={cartItem.discountBE.hasDiscount}
							onChange={(event) => handleCheckbox(event, 'BE')}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPrices;
