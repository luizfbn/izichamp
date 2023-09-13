import React from 'react';
import styles from './CartTotal.module.css';
import { ICartItem } from '../../Types/Cart';
import { getOrangeEssenceValue, isSkin } from '../../helper';
import { ReactComponent as BEIcon } from '../../Assets/be.svg';
import { ReactComponent as OEIcon } from '../../Assets/oe.svg';
import { ReactComponent as RPIcon } from '../../Assets/rp.svg';

type ICartTotal = {
	list: ICartItem[];
	cartList: ICartItem[];
	setList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
};

const CartTotal = ({ list, cartList, setList }: ICartTotal) => {
	const [total, setTotal] = React.useState([0, 0, 0]);

	function handleDeleteAll() {
		setList((list) => {
			list.forEach((item) => {
				item.selected = false;
				item.disabledPrice = isSkin(item)
					? {
							OE: false,
							RP: false,
					  }
					: {
							BE: false,
							RP: false,
					  };
			});
			return [];
		});
	}

	React.useEffect(() => {
		setTotal(() => {
			const total = [0, 0, 0];
			cartList.map((item) => {
				if (!isSkin(item) && !item.disabledPrice.BE)
					total[0] += item.price.blueEssence;
				if (!isSkin(item) && !item.disabledPrice.RP) total[2] += item.price.rp;
				if (isSkin(item) && !item.disabledPrice.RP) total[2] += item.cost;
				if (isSkin(item) && !item.disabledPrice.OE) {
					const originalItem = list.find((elem) => elem.id === item.id);
					if (!originalItem || !isSkin(originalItem)) return;
					total[1] += getOrangeEssenceValue(originalItem.cost);
				}
			});
			return total;
		});
	}, [cartList, list]);

	if (!cartList) return null;
	if (total)
		return (
			<div className={styles.total}>
				<h3>Totais</h3>
				<ul>
					<li>
						<p>Total de essência azul</p>
						<span>
							<BEIcon />
							{total[0]}
						</span>
					</li>
					<li>
						<p>Total de essência laranja</p>
						<span>
							<OEIcon />
							{total[1]}
						</span>
					</li>
					<li>
						<p>Total de riot points</p>
						<span>
							<RPIcon />
							{total[2]}
						</span>
					</li>
				</ul>
				<button onClick={handleDeleteAll}>Remover tudo</button>
			</div>
		);
};

export default CartTotal;
