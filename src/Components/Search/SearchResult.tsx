import styles from './SearchResult.module.css';
import { ReactComponent as ChampionIcon } from '../../Assets/champion.svg';
import { ReactComponent as SkinIcon } from '../../Assets/skin.svg';
import { ReactComponent as NotFoundIcon } from '../../Assets/search-not-found.svg';
import { ISeachSelect } from '../../Types/Search';
import { isSkin } from '../../helper';

type ISearchResult = {
	list: ISeachSelect[];
	inputValue: string;
	onClickItem: (item: ISeachSelect) => void;
};

const SearchResult = ({ list, inputValue, onClickItem }: ISearchResult) => {
	return (
		<div className={styles.result}>
			<ul>
				{list
					.filter((item, idx) => idx < 20)
					.map((item) => (
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
