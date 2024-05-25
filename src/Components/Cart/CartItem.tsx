import React from 'react';
import styles from './CartItem.module.css';
import CartPrices from './CartPrices';
import { ICartItem } from '../../Types/Cart';
import { ReactComponent as DeleteIcon } from '../../Assets/trash.svg';

type ICartItemProps = {
	item: ICartItem;
	setList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
	onDelete: (item: ICartItem) => void;
};

const CartItem = ({ item, setList, onDelete }: ICartItemProps) => {
	const [cartItem, setCartItem] = React.useState<ICartItem>(item);
	const itemRef = React.useRef<HTMLLIElement>(null);

	function handleDelete(item: ICartItem) {
		if (itemRef.current) {
			itemRef.current.classList.add('animeBottomTop');
		}
		setTimeout(() => {
			onDelete(item);
		}, 500);
	}

	React.useEffect(() => {
		setList((cartList) => {
			const updatedCartList = cartList.map((item) => {
				if (item.id === cartItem.id) return cartItem;
				return item;
			});
			return updatedCartList;
		});
	}, [cartItem, setList]);

	if (!cartItem) return null;
	return (
		<li ref={itemRef} className={`${styles.cartItem} animeTopBottom`}>
			<img
				width='80'
				height='80'
				src={cartItem.tilePath}
				alt=''
				loading='lazy'
			/>
			<div className={styles.cartItemTitle}>
				<h2>{cartItem.name}</h2>
				{cartItem.type === 'Champion' && <h4>{cartItem.title}</h4>}
			</div>
			<CartPrices cartItem={cartItem} setCartItem={setCartItem} />
			<button
				className={styles.deleteButton}
				onClick={() => handleDelete(cartItem)}
			>
				<DeleteIcon />
			</button>
		</li>
	);
};

export default CartItem;
