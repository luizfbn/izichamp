import React from 'react';
import styles from './Home.module.css';
import Search from '../Components/Search/Search';
import Cart from '../Components/Cart/Cart';
import { ISeachSelect } from '../Types/Search';
import { ICartItem } from '../Types/Cart';
import useChampionsAndSkins from '../Hooks/useChampionsAndSkins';

const Home = () => {
	const [selectedList, setSelectedList] = React.useState<ICartItem[]>([]);
	const { data, loading } = useChampionsAndSkins();

	if (loading) return <div style={{ color: 'white' }}>Carregando...</div>;
	if (!data) return null;
	return (
		<section className={`${styles.home} container`}>
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
