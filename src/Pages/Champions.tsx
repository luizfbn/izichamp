import React from 'react';
import styles from './Champions.module.css';
import useFetch from '../Hooks/useFetch';
import SearchInput from '../Components/Search/SearchInput';
import Card from '../Components/Card';
import { ISearchFilter } from '../Types/Search';
import { CHAMPIONS_URL, IChampion } from '../api';
import { Link } from 'react-router-dom';

type IRequestChampion = { data: { [key: string]: IChampion } };

const Champions = () => {
	const requestChampions = useFetch<IRequestChampion>(CHAMPIONS_URL);
	const [championList, setChampionList] = React.useState<ISearchFilter[]>([]);
	const [searchInput, setSearchInput] = React.useState('');
	const [infinite, setInfinite] = React.useState(true);
	const [championLength, setChampionLength] = React.useState(8);
	const championListFiltered = searchInput
		? championList.filter((item) => {
				return (
					item.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
				);
		  })
		: [];

	React.useEffect(() => {
		function handleData() {
			if (!requestChampions.data) return;
			const champions = Object.values(requestChampions.data.data);
			setChampionList(champions);
		}
		handleData();
	}, [requestChampions.data]);

	React.useEffect(() => {
		setChampionLength(8);
		setInfinite(true);
	}, [searchInput]);

	React.useEffect(() => {
		let wait = false;

		function infiniteScroll() {
			if (infinite) {
				const scroll = window.scrollY;
				const height = document.body.offsetHeight - window.innerHeight;
				if (scroll > height * 0.9 && !wait) {
					const length = championLength + 4;
					if (
						length > championList.length ||
						(championListFiltered.length &&
							length > championListFiltered.length)
					) {
						setChampionLength(
							championListFiltered.length
								? championListFiltered.length
								: championList.length
						);
						setInfinite(false);
					} else {
						setChampionLength(length);
					}
					wait = true;
					setTimeout(() => {
						wait = false;
					}, 500);
				}
			}
		}

		window.addEventListener('wheel', infiniteScroll);
		window.addEventListener('scroll', infiniteScroll);
		return () => {
			window.removeEventListener('wheel', infiniteScroll);
			window.removeEventListener('scroll', infiniteScroll);
		};
	}, [
		infinite,
		championLength,
		championList.length,
		championListFiltered.length,
	]);

	if (requestChampions.loading === true) return <div>Carregando...</div>;
	if (requestChampions.data === null) return null;
	return (
		<section className={`${styles.champions} container`}>
			<div className={styles.searchContainer}>
				<SearchInput
					type='text'
					value={searchInput}
					onChange={({ target }) => setSearchInput(target.value)}
					placeholder='Busque seu campeão'
				/>
			</div>
			<div className={styles.championList}>
				{(searchInput ? championListFiltered : championList)
					.filter((item, idx) => idx < championLength)
					.map((champion) => (
						<Link to={champion.id} key={champion.id}>
							<Card
								item={champion}
								image={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
							/>
						</Link>
					))}
			</div>
		</section>
	);
};

export default Champions;
