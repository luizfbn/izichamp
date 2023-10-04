import styles from './SlideSkins.module.css';
import Slide from './Slide';
import Card from '../Card/Card';
import { IChampionPrice } from '../../api';
import { getOrangeEssenceValue } from '../../helper';
import { ReactComponent as OEIcon } from '../../Assets/oe.svg';
import { ReactComponent as RPIcon } from '../../Assets/rp.svg';

const SlideSkins = ({ skins }: { skins: IChampionPrice['skins'] }) => {
	return (
		<Slide>
			{skins.map((skin) => (
				<Card key={skin.id} image={skin.loadScreenPath}>
					<div className={styles.cardTitleSkin}>
						<h3>{skin.name}</h3>
						<ul>
							<li>
								<RPIcon />
								<h4>{skin.cost}</h4>
							</li>
							<li>
								<OEIcon />
								<h4>{getOrangeEssenceValue(skin.cost as number)}</h4>
							</li>
						</ul>
					</div>
				</Card>
			))}
		</Slide>
	);
};

export default SlideSkins;
