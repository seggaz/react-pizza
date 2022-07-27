import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import searchInput from '../../assets/img/search.svg';
import closeInput from '../../assets/img/close.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filter/slice';

const Search: React.FC = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		// if (inputRef.current) {
		// 	inputRef.current.focus();
		// }
		inputRef.current?.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 250),
		[],
	);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	}


	
	return (
    <div className={styles.root}>
      <img src={searchInput} className={styles.icon} alt='Search' />
        
      <input 
	  	ref={inputRef}
	  	value={value}
	  	onChange={onChangeInput} 
		className={styles.input} 
		placeholder="Поиск пицц..." />
		{value && (
			<img onClick={onClickClear} src={closeInput} className={styles.closeIcon} alt='Close' />
		)}
    </div>
  );
};

export default Search;