import React from 'react';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { ICartItem } from '../../Types/Cart';
import { ReactComponent as CoinsIcon } from '../../Assets/coins.svg';
import { IChampion, ISkin } from '../../Types/Api';

type ICart = {
	list: ICartItem[];
	setList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
	setSearchList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
};

export function resetItem(item: IChampion | ISkin): ICartItem {
	return {
		...item,
		selected: false,
		disabledPrice: {
			...(item.type === 'Champion' ? { BE: false } : { OE: false }),
			RP: false,
		},
		discountRP: {
			hasDiscount: false,
			newPrice: item.cost.rp,
		},
		discountBE: {
			hasDiscount: false,
			newPrice: item.type === 'Champion' ? item.cost.blueEssence : 0,
		},
	};
}

const Cart = ({ list, setList, setSearchList }: ICart) => {
	function handleDelete(item: ICartItem) {
		setList((list) => {
			return list.filter((listItem) => listItem.id !== item.id);
		});
		setSearchList((list) => {
			return list.map((itemSearch) => {
				if (itemSearch.id === item.id) {
					return resetItem(itemSearch);
				}
				return itemSearch;
			});
		});
	}

	function handleDeleteAll() {
		setList([]);
		setSearchList((list) => {
			return list.map((itemSearch) => {
				return resetItem(itemSearch);
			});
		});
	}

	if (!list.length)
		return (
			<div className={`${styles.emptyCart} animeTopBottom`}>
				<CoinsIcon />
				<h2>Seu carrinho está vazio</h2>
			</div>
		);
	return (
		<div className={styles.cart}>
			<ul>
				{list.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						setList={setList}
						onDelete={handleDelete}
					/>
				))}
			</ul>
			<CartTotal list={list} onDelete={handleDeleteAll} />
		</div>
	);
};

export default Cart;
