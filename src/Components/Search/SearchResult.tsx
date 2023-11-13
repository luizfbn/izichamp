import styles from './SearchResult.module.css';
import { ReactComponent as ChampionIcon } from '../../Assets/champion.svg';
import { ReactComponent as SkinIcon } from '../../Assets/skin.svg';
import { ReactComponent as NotFoundIcon } from '../../Assets/not-found.svg';
import { ISeachSelect } from '../../Types/Search';

type ISearchResult = {
	list: ISeachSelect[];
	inputValue: string;
	onClickItem: (item: ISeachSelect) => void;
};

const SearchResult = ({ list, inputValue, onClickItem }: ISearchResult) => {
	return (
		<div className={`animeTopBottom ${styles.result}`}>
			<ul>
				{list
					.filter((item, idx) => idx < 20)
					.map((item) => (
						<li
							className={styles.resultItem}
							key={item.id}
							onClick={() => onClickItem(item)}
						>
							{item.type === 'Champion' ? <ChampionIcon /> : <SkinIcon />}
							<img
								width='50'
								height='50'
								src={item.tilePath}
								alt=''
								loading='lazy'
							/>
							<p>{item.name}</p>
						</li>
					))}
				{!list.length && inputValue && (
					<li className={styles.resultNotFound}>
						<NotFoundIcon />
						<p>Campeão ou skin não encontrado</p>
					</li>
				)}
			</ul>
		</div>
	);
};

export default SearchResult;
