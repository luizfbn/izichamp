import React from 'react';
import styles from './CartPrices.module.css';
import CartPrice from './CartPrice';
import { ICartItem } from '../../Types/Cart';
import { IChampion, ISkin } from '../../Types/Api';
type ICartPrices = {
	originalItem: ICartItem;
	cartItem: ICartItem;
	setCartItem: React.Dispatch<React.SetStateAction<ICartItem>>;
	checked: {
		[key in 'BE' | 'RP']: {
			list: number[];
			setList: React.Dispatch<React.SetStateAction<number[]>>;
		};
	};
};

const CartPrices = ({
	originalItem,
	cartItem,
	setCartItem,
	checked,
}: ICartPrices) => {
	const [timer, setTimer] = React.useState<number>();

	function handleCheckbox(
		itemId: number,
		setCheckboxList: React.Dispatch<React.SetStateAction<number[]>>,
		type: 'BE' | 'RP'
	) {
		setCheckboxList((checkboxList) => {
			const checkedList: number[] = JSON.parse(JSON.stringify(checkboxList));
			const itemIndex = checkedList.indexOf(itemId);
			itemIndex !== -1
				? checkedList.splice(itemIndex, 1)
				: checkedList.push(itemId);
			type === 'BE' && handleBlueEssenceDiscount(itemId, checkedList);
			type === 'RP' && handleRpDiscount(0);
			return checkedList;
		});
	}

	function handleBlueEssenceDiscount(itemId: number, checkedBeList: number[]) {
		if (originalItem.type === 'Skin') return;
		setCartItem((item) => {
			return item.type === 'Champion'
				? {
						...item,
						cost: {
							rp: item.cost.rp,
							blueEssence: checkedBeList.includes(itemId)
								? Number((originalItem.cost.blueEssence * 0.6).toFixed(2))
								: originalItem.cost.blueEssence,
						},
				  }
				: item;
		});
	}

	function handleRpDiscount(value: number) {
		const discount = Number(
			(originalItem.cost.rp - originalItem.cost.rp * (value / 100)).toFixed(2)
		);
		setCartItem((item) => {
			return item.type === 'Champion'
				? {
						...item,
						cost: {
							blueEssence: item.cost.blueEssence,
							rp: discount,
						},
				  }
				: {
						...item,
						cost: {
							orangeEssence: item.cost.orangeEssence,
							rp: discount,
						},
				  };
		});
	}

	function handleRpInputChange(inputValue: string) {
		clearTimeout(timer);
		const timeout = setTimeout(() => {
			const value = Number(inputValue);
			const validValue = value >= 0 && value <= 100;
			handleRpDiscount(validValue ? value : 0);
		}, 500);
		setTimer(timeout);
	}

	function handleRpOldPrice(item: ICartItem) {
		const originalValue = originalItem.cost.rp;
		const currentValue = item.cost.rp;
		if (originalValue !== currentValue) return originalValue;
		return undefined;
	}

	return (
		<div className={styles.prices}>
			<CartPrice
				type='RP'
				onClickPrice={() => {
					setCartItem((item) => {
						return (item = {
							...item,
							disabledPrice: {
								...item.disabledPrice,
								RP: !item.disabledPrice.RP,
							},
						});
					});
				}}
				disablePrice={cartItem.disabledPrice.RP}
				price={cartItem.cost.rp}
				oldPrice={handleRpOldPrice(cartItem)}
				checkbox={{
					id: cartItem.id + '_rp',
					checked: checked.RP.list.includes(cartItem.id),
					onChange: () => {
						handleCheckbox(cartItem.id, checked.RP.setList, 'RP');
					},
				}}
				inputNumber={
					checked.RP.list.includes(cartItem.id)
						? {
								onChange: ({ target }) => handleRpInputChange(target.value),
						  }
						: undefined
				}
			/>
			{cartItem.type === 'Skin' ? (
				<CartPrice
					type='OE'
					onClickPrice={() => {
						setCartItem((item) => {
							return (item = {
								...item,
								disabledPrice: {
									RP: item.disabledPrice.RP,
									OE: !item.disabledPrice.OE,
								},
							});
						});
					}}
					disablePrice={cartItem.disabledPrice.OE}
					price={(originalItem as ISkin).cost.orangeEssence}
				/>
			) : (
				<CartPrice
					type='BE'
					onClickPrice={() => {
						setCartItem((item) => {
							return (item = {
								...item,
								disabledPrice: {
									RP: item.disabledPrice.RP,
									BE: !item.disabledPrice.BE,
								},
							});
						});
					}}
					disablePrice={cartItem.disabledPrice.BE}
					price={cartItem.cost.blueEssence}
					oldPrice={(originalItem as IChampion).cost.blueEssence}
					checkbox={{
						id: cartItem.id + '_be',
						checked: checked.BE.list.includes(cartItem.id),
						onChange: () => {
							handleCheckbox(cartItem.id, checked.BE.setList, 'BE');
						},
					}}
				/>
			)}
		</div>
	);
};

export default CartPrices;
