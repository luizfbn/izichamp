import React from 'react';
import styles from './CartItem.module.css';
import CartPrices from './CartPrices';
import { ICartItem } from '../../Types/Cart';
import { isSkin } from '../../helper';
import { ReactComponent as DeleteIcon } from '../../Assets/trash.svg';

type ICartItemProps = {
	item: ICartItem;
	list: ICartItem[];
	setList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
	setCartList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
};

const CartItem = ({ item, list, setList, setCartList }: ICartItemProps) => {
	const [cartItem, setCartItem] = React.useState<ICartItem>(item);
	const [checkedBe, setCheckedBe] = React.useState<number[]>([]);
	const [checkedRp, setCheckedRp] = React.useState<number[]>([]);
	const itemRef = React.useRef<HTMLLIElement>(null);
	const originalItem = list.find((elem) => elem.id === item.id);

	function handleDelete(item: ICartItem) {
		handleCheckboxDelete(item.id, [setCheckedBe, setCheckedRp]);
		setList((list) => {
			return list.filter((listItem) => {
				if (listItem.id === item.id) {
					listItem.selected = false;
					return false;
				}
				return true;
			});
		});
	}

	function handleCheckboxDelete(
		itemId: number,
		setCheckboxList: React.Dispatch<React.SetStateAction<number[]>>[]
	) {
		setCheckboxList.forEach((setCheckbox) => {
			setCheckbox((checkedItems) => {
				const itemIndex = checkedItems.indexOf(itemId);
				if (itemIndex === -1) return checkedItems;
				checkedItems.splice(itemIndex, 1);
				return checkedItems;
			});
		});
	}

	React.useEffect(() => {
		setCartList((cartList) => {
			const updatedCartList = cartList.map((item) => {
				if (item.id === cartItem.id) return cartItem;
				return item;
			});
			return updatedCartList;
		});
	}, [cartItem, setCartList]);

	if (!cartItem) return null;
	if (!originalItem) return null;
	return (
		<li
			ref={itemRef}
			key={cartItem.id}
			className={`${styles.cartItem} animeTopBottom`}
		>
			<img
				width='80'
				height='80'
				src={isSkin(cartItem) ? cartItem.tilePath : cartItem.icon}
				alt=''
				loading='lazy'
			/>
			<div className={styles.cartItemTitle}>
				<h2>{cartItem.name}</h2>
				{!isSkin(cartItem) && <h4>{cartItem.title}</h4>}
			</div>
			<CartPrices
				originalItem={originalItem}
				cartItem={cartItem}
				setCartItem={setCartItem}
				checked={{
					BE: {
						list: checkedBe,
						setList: setCheckedBe,
					},
					RP: {
						list: checkedRp,
						setList: setCheckedRp,
					},
				}}
			/>
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
