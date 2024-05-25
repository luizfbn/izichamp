import React from 'react';
import styles from './Home.module.css';
import useFetch from '../Hooks/useFetch';
import Search from '../Components/Search/Search';
import Cart, { resetItem } from '../Components/Cart/Cart';
import Loading from '../Components/Helper/Loading';
import Head from '../Components/Helper/Head';
import Error from './Error';
import { ISeachSelect } from '../Types/Search';
import { ICartItem } from '../Types/Cart';
import { IChampion, ISkin } from '../Types/Api';

const Home = () => {
	const [selectedList, setSelectedList] = React.useState<ICartItem[]>(
		getSavedData()
	);
	const [searchList, setSearchList] = React.useState<ICartItem[]>([]);
	const { data, loading, error } = useFetch<(IChampion | ISkin)[]>(
		import.meta.env.VITE_API_URL
	);

	function getSavedData() {
		const savedList = window.localStorage.getItem('cartList');
		const list: ICartItem[] = savedList ? JSON.parse(savedList) : [];
		return list;
	}

	React.useEffect(() => {
		if (data && data.length) {
			const list = data.map((item) => {
				return resetItem(item as ICartItem);
			});

			const savedData = getSavedData();
			if (savedData.length) {
				const savedSearchList = list.map((item) => {
					const i = savedData.find((savedItem) => savedItem.id === item.id);
					return i ? i : item;
				});
				setSearchList(savedSearchList);
			} else {
				setSearchList(list);
			}
		}
	}, [data]);

	React.useEffect(() => {
		window.localStorage.setItem('cartList', JSON.stringify(selectedList));
	}, [selectedList]);

	if (error) return <Error />;
	return (
		<section className={`${styles.home} container animeTopBottom`}>
			<Head title='Home' />
			<h1>Planeje e compre</h1>
			<h2>
				Simule um carrinho de compras para ver se os campeões e skins cabem no
				seu bolso
			</h2>
			{data && (
				<>
					<div className={styles.searchContainer}>
						<Search
							list={searchList}
							placeholder='Busque e adicione seu campeão ou skin'
							setResponseList={
								setSelectedList as React.Dispatch<
									React.SetStateAction<ISeachSelect[]>
								>
							}
						/>
					</div>
					<Cart
						list={selectedList}
						setList={setSelectedList}
						setSearchList={setSearchList}
					/>
				</>
			)}
			{loading && <Loading className='container' />}
		</section>
	);
};

export default Home;
