import React from 'react';
import styles from './CartTotal.module.css';
import { ICartItem } from '../../Types/Cart';
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
				item.disabledPrice =
					item.type === 'Skin'
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
				if (item.type === 'Champion' && !item.disabledPrice.BE)
					total[0] += item.cost.blueEssence;
				if (item.type === 'Champion' && !item.disabledPrice.RP)
					total[2] += item.cost.rp;
				if (item.type === 'Skin' && !item.disabledPrice.RP)
					total[2] += item.cost.rp;
				if (item.type === 'Skin' && !item.disabledPrice.OE) {
					const originalItem = list.find((elem) => elem.id === item.id);
					if (!originalItem || originalItem.type === 'Champion') return;
					total[1] += originalItem.cost.orangeEssence;
				}
			});
			return total;
		});
	}, [cartList, list]);

	if (!cartList) return null;
	if (total)
		return (
			<div className={`${styles.total} animeTopBottom`}>
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
