import React from 'react';
import styles from './CartPrices.module.css';
import CartPrice from './CartPrice';
import { getOrangeEssenceValue, isSkin } from '../../helper';
import { ICartItem, IChampionCart, ISkinCart } from '../../Types/Cart';

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
		if (isSkin(originalItem)) return;
		setCartItem((item) => {
			const updatedItem = {
				...item,
				...(!isSkin(item) && {
					price: {
						...item.price,
						blueEssence: checkedBeList.includes(itemId)
							? Number((originalItem.price.blueEssence * 0.6).toFixed(2))
							: originalItem.price.blueEssence,
					},
				}),
			};
			return updatedItem;
		});
	}

	function handleRpDiscount(value: number) {
		setCartItem((item) => {
			const updatedItem = {
				...item,
				...(isSkin(originalItem) &&
					isSkin(item) && {
						cost: Number(
							(originalItem.cost - originalItem.cost * (value / 100)).toFixed(2)
						),
					}),
				...(!isSkin(originalItem) &&
					!isSkin(item) && {
						price: {
							...item.price,
							rp: Number(
								(
									originalItem.price.rp -
									originalItem.price.rp * (value / 100)
								).toFixed(2)
							),
						},
					}),
			};
			return updatedItem;
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
		const originalValue = isSkin(originalItem)
			? originalItem.cost
			: originalItem.price.rp;
		const currentValue = isSkin(item) ? item.cost : item.price.rp;
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
				price={isSkin(cartItem) ? cartItem.cost : cartItem.price.rp}
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
			{isSkin(cartItem) ? (
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
					price={getOrangeEssenceValue((originalItem as ISkinCart).cost)}
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
					price={cartItem.price.blueEssence}
					oldPrice={(originalItem as IChampionCart).price.blueEssence}
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
