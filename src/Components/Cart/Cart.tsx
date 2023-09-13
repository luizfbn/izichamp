import React from 'react';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { ICartItem } from '../../Types/Cart';
import { isSkin } from '../../helper';
import { ReactComponent as CoinsIcon } from '../../Assets/coins.svg';

type ICart = {
	list: ICartItem[];
	setList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
};

function getRemainingItems(oldCartList: ICartItem[], newCartList: ICartItem[]) {
	return oldCartList.filter((item) => {
		return newCartList.some((elem) => elem.id === item.id);
	});
}

function getAddedItems(oldCartList: ICartItem[], newCartList: ICartItem[]) {
	const newCartItems = newCartList
		.filter((item) => {
			return !oldCartList.some((elem) => elem.id === item.id);
		})
		.map((item) => {
			return {
				...item,
				disabledPrice: {
					RP: false,
					...(isSkin(item) ? { OE: false } : { BE: false }),
				},
			};
		});
	return [...oldCartList, ...newCartItems];
}

const Cart = ({ list, setList }: ICart) => {
	const [cartList, setCartList] = React.useState<ICartItem[]>(() => list);

	React.useEffect(() => {
		setCartList((oldCartList) => {
			const newCartItems =
				list.length < oldCartList.length
					? getRemainingItems(oldCartList, list)
					: getAddedItems(oldCartList, list);
			return newCartItems.length ? newCartItems : list;
		});
	}, [list]);

	if (!cartList.length)
		return (
			<div className={styles.emptyCart}>
				<CoinsIcon />
				<h2>Sua lista está vazia</h2>
			</div>
		);
	return (
		<div className={styles.cart}>
			<ul>
				{cartList.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						list={list}
						setList={setList}
						setCartList={setCartList}
					/>
				))}
			</ul>
			<CartTotal list={list} cartList={cartList} setList={setList} />
		</div>
	);
};

export default Cart;
