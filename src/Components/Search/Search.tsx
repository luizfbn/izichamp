import React from 'react';
import styles from './Search.module.css';
import SearchResult from './SearchResult';
import SearchInput from './SearchInput';
import { ISeachSelect, ISearchItem } from '../../Types/Search';

type ISearch = {
	placeholder?: string;
} & (ISelectSettings | IFilterSettings);

type ISelectSettings = {
	mode: 'select';
	list: ISeachSelect[];
	responseList: ISeachSelect[];
	setResponseList: React.Dispatch<React.SetStateAction<ISeachSelect[]>>;
};

type IFilterSettings = {
	mode: 'filter';
	list: ISearchItem[];
	responseList?: undefined;
	setResponseList: React.Dispatch<React.SetStateAction<ISearchItem[]>>;
};

const Search = ({
	list,
	placeholder,
	mode,
	responseList,
	setResponseList,
}: ISearch) => {
	const [resultList, setResultList] = React.useState<ISeachSelect[]>([]);
	const [searchInput, setSearchInput] = React.useState('');
	const [showResult, setShowResult] = React.useState(false);
	const searchRef = React.useRef<HTMLDivElement>(null);

	function handleClickOutside(event: MouseEvent) {
		if (
			searchRef.current &&
			!searchRef.current.contains(event.target as Node)
		) {
			setShowResult(false);
		}
	}

	function handleSelect(item: ISeachSelect) {
		if (mode === 'filter') return;
		item.selected = true;
		setShowResult(false);
		setResponseList((selected) => [...selected, item]);
	}

	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside, false);
		return () => {
			document.removeEventListener('click', handleClickOutside, false);
		};
	}, []);

	React.useEffect(() => {
		function updateListResult(search: string) {
			const searchResult = list.filter((item) => {
				if ((!search || item.selected) && mode === 'select') return;
				return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
			});
			mode === 'filter'
				? setResponseList(searchResult)
				: setResultList(searchResult as ISeachSelect[]);
		}
		const timeout = setTimeout(() => {
			updateListResult(searchInput);
		}, 500);
		return () => {
			clearTimeout(timeout);
		};
	}, [searchInput, list, mode, responseList, setResponseList]);

	return (
		<div className={styles.search} ref={searchRef}>
			<SearchInput
				type='text'
				value={searchInput}
				onChange={({ target }) => setSearchInput(target.value)}
				onFocus={() => setShowResult(true)}
				placeholder={placeholder}
			/>
			{mode === 'select' && showResult && searchInput && (
				<SearchResult
					inputValue={searchInput}
					list={resultList}
					onClickItem={handleSelect}
				/>
			)}
		</div>
	);
};

export default Search;
