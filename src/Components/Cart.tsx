import React from 'react';
import { ISeachSelect } from '../Types/Search';

const Cart = ({
	cartItems,
	setCartItems,
}: {
	cartItems: ISeachSelect[];
	setCartItems: React.Dispatch<React.SetStateAction<ISeachSelect[]>>;
}) => {
	function handleDelete(item: ISeachSelect) {
		item.selected = false;
		const updateCart = cartItems.filter((cartItem) => {
			return cartItem.id != item.id;
		});
		setCartItems(updateCart);
	}

	return (
		<div>
			<h1>Cart</h1>
			<ul>
				{cartItems.map((item) => (
					<li key={item.id} onClick={() => handleDelete(item)}>
						{item.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Cart;
