import React from 'react';
import styles from './SearchInput.module.css';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

const SearchInput = ({ ...props }: React.ComponentProps<'input'>) => {
	return (
		<div className={styles.inputWrapper}>
			<input {...props} />
			<div className={styles.inputIcon}>
				<SearchIcon />
			</div>
		</div>
	);
};

export default SearchInput;
