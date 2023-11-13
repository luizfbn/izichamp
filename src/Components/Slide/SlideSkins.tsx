import styles from './SlideSkins.module.css';
import Slide from './Slide';
import Card from '../Card/Card';
import { IChampionById } from '../../Types/Api';
import { ReactComponent as OEIcon } from '../../Assets/oe.svg';
import { ReactComponent as RPIcon } from '../../Assets/rp.svg';

const SlideSkins = ({ skins }: { skins: IChampionById['skins'] }) => {
	return (
		<Slide>
			{skins.map((skin) => (
				<Card key={skin.id} image={skin.loadScreenPath}>
					<div className={styles.cardTitleSkin}>
						<h3>{skin.name}</h3>
						<ul>
							<li>
								<RPIcon />
								<h4>{skin.cost.rp}</h4>
							</li>
							<li>
								<OEIcon />
								<h4>{skin.cost.orangeEssence}</h4>
							</li>
						</ul>
					</div>
				</Card>
			))}
		</Slide>
	);
};

export default SlideSkins;
