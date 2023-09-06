import styles from './SearchResult.module.css';
import { ReactComponent as ChampionIcon } from '../../assets/champion.svg';
import { ReactComponent as SkinIcon } from '../../assets/skin.svg';
import { ReactComponent as NotFoundIcon } from '../../assets/search-not-found.svg';
import { ISeachSelect, ISearchSkin } from '../../Types/Search';

type ISearchResult = {
	list: ISeachSelect[];
	inputValue: string;
	onClickItem: (item: ISeachSelect) => void;
};

function isSkin(item: ISeachSelect): item is ISearchSkin {
	return (item as ISearchSkin).tilePath !== undefined;
}

const SearchResult = ({ list, inputValue, onClickItem }: ISearchResult) => {
	return (
		<div className={styles.result}>
			<ul>
				{list.map((item) => (
					<li
						className={styles.resultItem}
						key={item.id}
						onClick={() => onClickItem(item)}
					>
						{isSkin(item) ? (
							<>
								<SkinIcon />
								<img
									width='50'
									height='50'
									src={item.tilePath}
									alt=''
									loading='lazy'
								/>
							</>
						) : (
							<>
								<ChampionIcon />
								<img
									width='50'
									height='50'
									src={item.icon}
									alt=''
									loading='lazy'
								/>
							</>
						)}
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
