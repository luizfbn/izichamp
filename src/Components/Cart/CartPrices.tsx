import React from 'react';
import styles from './CartPrices.module.css';
import CartPrice from './CartPrice';
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
			<CartPrice
				icon={<RPIcon />}
				price={{
					value: cartItem.discountRP.newPrice,
					oldValue: cartItem.discountRP.hasDiscount
						? cartItem.cost.rp
						: undefined,
					disabled: cartItem.disabledPrice.RP,
					onClick: () => handleDisablePrice('RP'),
				}}
				checkbox={{
					id: cartItem.id + '_rp',
					checked: cartItem.discountRP.hasDiscount,
					icon: <RPDiscountIcon />,
					onChange: (event) => handleCheckbox(event, 'RP'),
				}}
				inputNumber={
					cartItem.discountRP.hasDiscount
						? {
								value: inputValue,
								onChange: ({ target }) => handleRpInputChange(target.value),
						  }
						: undefined
				}
			/>
			{cartItem.type === 'Skin' ? (
				<CartPrice
					icon={<OEIcon />}
					price={{
						value: cartItem.cost.orangeEssence,
						disabled: cartItem.disabledPrice.OE,
						onClick: () => handleDisablePrice('OE'),
					}}
				/>
			) : (
				<CartPrice
					icon={<BEIcon />}
					price={{
						value: cartItem.discountBE.newPrice,
						oldValue: cartItem.discountBE.hasDiscount
							? (cartItem as IChampion).cost.blueEssence
							: undefined,
						disabled: cartItem.disabledPrice.BE,
						onClick: () => handleDisablePrice('BE'),
					}}
					checkbox={{
						id: cartItem.id + '_be',
						checked: cartItem.discountBE.hasDiscount,
						icon: <BEDiscountIcon />,
						onChange: (event) => handleCheckbox(event, 'BE'),
					}}
				/>
			)}
		</div>
	);
};

export default CartPrices;
