import React from 'react';
import styles from './Champions.module.css';
import useFetch from '../Hooks/useFetch';
import Card from '../Components/Card/Card';
import SearchInput from '../Components/Search/SearchInput';
import Loading from '../Components/Helper/Loading';
import Head from '../Components/Helper/Head';
import Error from './Error';
import { ISearchFilter } from '../Types/Search';
import { Link } from 'react-router-dom';
import { IChampionList } from '../Types/Api';

const Champions = () => {
	const { data, loading, error } = useFetch<IChampionList[]>(
		`${import.meta.env.VITE_API_URL}/champions`
	);
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
			if (!data) return;
			setChampionList(data);
		}
		handleData();
	}, [data]);

	React.useEffect(() => {
		setChampionLength(8);
		setInfinite(true);
	}, [searchInput]);

	React.useEffect(() => {
		let wait = false;

		function infiniteScroll() {
			if (infinite && championList.length) {
				const scroll = window.scrollY;
				const height = document.body.offsetHeight - window.innerHeight;
				if (scroll > height * 0.9 && !wait) {
					const length = championLength + 8;
					if (length > championList.length) {
						setChampionLength(championList.length);
						setInfinite(false);
					} else if (
						championListFiltered.length &&
						length > championListFiltered.length
					) {
						setChampionLength(
							championListFiltered.length ? championListFiltered.length : 8
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

	if (loading) return <Loading className='container' />;
	if (error) return <Error />;
	if (data)
		return (
			<section className={`${styles.champions} container animeTopBottom`}>
				<Head title='Campeões' />
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
									image={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
									onHoverStyle
								>
									<div className={styles.cardTitle}>
										<h3>{champion.name}</h3>
										<h4>{champion.title}</h4>
									</div>
								</Card>
							</Link>
						))}
				</div>
			</section>
		);
};

export default Champions;
