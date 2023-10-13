import { useParams } from 'react-router-dom';
import styles from './Champion.module.css';
import Card from '../Components/Card/Card';
import SlideSkins from '../Components/Slide/SlideSkins';
import useChampion from '../Hooks/useChampion';
import Spells from '../Components/Spells';
import ShowMore from '../Components/ShowMore';
import CardChampion from '../Components/Card/CardChampion';
import NotFound from './NotFound';
import Loading from '../Components/Loading';
import Error from './Error';

const Champion = () => {
	const { id } = useParams();
	const { data, loading, error } = useChampion(id ? id : '');

	if (loading) return <Loading className='container' />;
	if (error) return <Error />;
	if (data)
		return (
			<section className={`${styles.champion} container animeTopBottom`}>
				<div className={styles.title}>
					<img src={data.squarePortraitPath} alt='' />
					<h1>{data.name}</h1>
					<h3>{data.title}</h3>
					<div>
						<CardChampion
							rp={data.price.rp}
							blueEssence={data.price.blueEssence}
						/>
					</div>
				</div>
				<div className={styles.championCardContainer}>
					<Card
						image={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.alias}_0.jpg`}
						size={{ width: '280px', height: '504px' }}
					>
						<CardChampion
							rp={data.price.rp}
							blueEssence={data.price.blueEssence}
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
	else return <NotFound />;
};

export default Champion;
