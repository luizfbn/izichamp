import React from 'react';
import styles from './Search.module.css';
import SearchResult from './SearchResult';
import { ISeachSelect, ISearchFilter } from '../../Types/Search';
import SearchInput from './SearchInput';

type ISearch = {
	placeholder?: string;
	list: ISeachSelect[];
	setResponseList: React.Dispatch<React.SetStateAction<ISeachSelect[]>>;
};

const Search = ({ placeholder, list, setResponseList }: ISearch) => {
	const [inputValue, setInputValue] = React.useState('');
	const [showResult, setShowResult] = React.useState(false);
	const searchRef = React.useRef<HTMLDivElement>(null);
	const resultList = inputValue ? updateListResult() : [];

	function handleClickOutside(event: MouseEvent) {
		searchRef.current &&
			!searchRef.current.contains(event.target as Node) &&
			setShowResult(false);
	}

	function handleSelect(item: ISeachSelect) {
		item.selected = true;
		setShowResult(false);
		setResponseList((selected) => [...selected, item]);
	}

	function updateListResult() {
		const searchResult = list.filter((item) => {
			if (item.selected) return;
			return item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
		});
		return searchResult;
	}

	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside, false);
		return () => {
			document.removeEventListener('click', handleClickOutside, false);
		};
	}, []);

	return (
		<div className={styles.search} ref={searchRef}>
			<SearchInput
				type='text'
				value={inputValue}
				onChange={({ target }) => setInputValue(target.value)}
				onFocus={() => setShowResult(true)}
				placeholder={placeholder}
			/>
			{showResult && inputValue && (
				<SearchResult
					inputValue={inputValue}
					list={resultList as ISeachSelect[]}
					onClickItem={handleSelect}
				/>
			)}
		</div>
	);
};

export default Search;
