import React from 'react';
import styles from './Home.module.css';
import useFetch from '../Hooks/useFetch';
import Search from '../Components/Search/Search';
import Cart from '../Components/Cart/Cart';
import Loading from '../Components/Helper/Loading';
import Head from '../Components/Helper/Head';
import Error from './Error';
import { ISeachSelect } from '../Types/Search';
import { ICartItem } from '../Types/Cart';
import { IChampion, ISkin } from '../Types/Api';

const Home = () => {
	const [selectedList, setSelectedList] = React.useState<ICartItem[]>([]);
	const { data, loading, error } = useFetch<(IChampion | ISkin)[]>(
		import.meta.env.VITE_API_URL
	);

	if (loading) return <Loading className='container' />;
	if (error) return <Error />;
	if (data)
		return (
			<section className={`${styles.home} container animeTopBottom`}>
				<Head title='Home' />
				<h1>Planeje e compre</h1>
				<h2>
					Simule um carrinho de compras para ver se os campeões e skins cabem no
					seu bolso
				</h2>
				<div className={styles.searchContainer}>
					<Search
						list={data}
						placeholder='Busque e adicione seu campeão ou skin'
						setResponseList={
							setSelectedList as React.Dispatch<
								React.SetStateAction<ISeachSelect[]>
							>
						}
					/>
				</div>
				<Cart list={selectedList} setList={setSelectedList} />
			</section>
		);
};

export default Home;
