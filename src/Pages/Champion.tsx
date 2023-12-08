import styles from './Champion.module.css';
import useFetch from '../Hooks/useFetch';
import Spells from '../Components/Spells';
import SlideSkins from '../Components/Slide/SlideSkins';
import Card from '../Components/Card/Card';
import CardChampion from '../Components/Card/CardChampion';
import ShowMore from '../Components/Helper/ShowMore';
import Loading from '../Components/Helper/Loading';
import Head from '../Components/Helper/Head';
import NotFound from './NotFound';
import Error from './Error';
import { useParams } from 'react-router-dom';
import { IChampionById } from '../Types/Api';

const Champion = () => {
	const { id } = useParams();
	const { data, loading, error } = useFetch<IChampionById>(
		`${import.meta.env.VITE_API_URL}/champions/${id}`
	);

	if (loading) return <Loading className='container' />;
	if (error === '404') return <NotFound />;
	if (data)
		return (
			<section className={`${styles.champion} container animeTopBottom`}>
				<Head title={data.name} />
				<div className={styles.title}>
					<img src={data.squarePortraitPath} alt='' />
					<h1>{data.name}</h1>
					<h3>{data.title}</h3>
					<div>
						<CardChampion
							rp={data.cost.rp}
							blueEssence={data.cost.blueEssence}
						/>
					</div>
				</div>
				<div className={styles.championCardContainer}>
					<Card
						image={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.alias}_0.jpg`}
						size={{ width: '280px', height: '504px' }}
					>
						<CardChampion
							rp={data.cost.rp}
							blueEssence={data.cost.blueEssence}
						/>
					</Card>
				</div>
				<div className={styles.about}>
					<h2>Sobre</h2>
					<p>
						<ShowMore text={data.shortBio} length={250} />
					</p>
				</div>
				<div className={styles.spells}>
					<h2>Habilidades</h2>
					<Spells
						spells={[{ spellKey: 'p', ...data.passive }, ...data.spells]}
					/>
				</div>
				<div className={styles.skins}>
					<h2>Skins</h2>
					<SlideSkins skins={data.skins} />
				</div>
			</section>
		);
	else return <Error />;
};

export default Champion;
