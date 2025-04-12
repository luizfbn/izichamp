import React from 'react';
import styles from './CartTotal.module.css';
import { ICartItem } from '../../Types/Cart';
import { ReactComponent as BEIcon } from '../../Assets/be.svg';
import { ReactComponent as OEIcon } from '../../Assets/oe.svg';
import { ReactComponent as RPIcon } from '../../Assets/rp.svg';

type ICartTotal = {
	list: ICartItem[];
	onDelete: () => void;
};

const CartTotal = ({ list, onDelete }: ICartTotal) => {
	const [total, setTotal] = React.useState([0, 0, 0]);

	React.useEffect(() => {
		setTotal(() => {
			const total = [0, 0, 0];
			list.forEach((item) => {
				if (item.type === 'Champion' && !item.disabledPrice.BE)
					total[0] += item.discountBE.newPrice;
				if (item.type === 'Champion' && !item.disabledPrice.RP)
					total[2] += item.discountRP.newPrice;
				if (item.type === 'Skin' && !item.disabledPrice.RP)
					total[2] += item.discountRP.newPrice;
				if (item.type === 'Skin' && !item.disabledPrice.OE)
					total[1] += item.cost.orangeEssence;
			});
			return total;
		});
	}, [list]);

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
			<button onClick={onDelete}>Remover tudo</button>
		</div>
	);
};

export default CartTotal;
