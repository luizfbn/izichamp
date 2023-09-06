import React from 'react';
import Search from '../Components/Search/Search';
import Cart from '../Components/Cart';
import useFetch from '../Hooks/useFetch';
import { ISeachSelect } from '../Types/Search';

type IChampion = {
	id: number;
	name: string;
	title: string;
	icon: string;
	price?: {
		blueEssence: number;
		rp: number;
	};
	skins?: ISkin[];
	selected?: boolean;
};

type ISkin = {
	id: number;
	name: string;
	tilePath: string;
	loadScreenPath: string;
	availability: 'Available' | 'Legacy' | 'Upcoming';
	cost: number | 'Special';
	selected?: boolean;
};

type IRequestSkin = { [key: string]: Omit<ISkin, 'availability' | 'cost'> };
type IRequestChampion = { [key: string]: IChampion };

const Home = () => {
	const requestChampions = useFetch<IRequestChampion>(
		`https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json`,
		{
			cache: 'force-cache',
		}
	);
	const requestSkins = useFetch<IRequestSkin>(
		'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/skins.json'
	);
	const [searchList, setSearchList] = React.useState<ISeachSelect[]>([]);
	const [searchSelected, setSearchSelected] = React.useState<ISeachSelect[]>(
		[]
	);

	React.useEffect(() => {
		function handleData() {
			if (!requestChampions.data || !requestSkins.data) return;
			setSearchList([]);
			setSearchSelected([]);
			Object.values(requestChampions.data).forEach((item) => {
				item.skins = item.skins!.filter((skin) => {
					if (
						skin.name === 'Original' ||
						skin.cost === 'Special' ||
						skin.availability === 'Upcoming'
					) {
						return false;
					}
					if (requestSkins.data && requestSkins.data[skin.id]) {
						skin.name = requestSkins.data[skin.id].name;
					}
					return true;
				});
				setSearchList((skins) => [...skins, ...item.skins!]);
			});
			setSearchList((skins) => [
				...(requestChampions.data ? Object.values(requestChampions.data) : []),
				...skins,
			]);
		}
		handleData();
	}, [requestChampions.data, requestSkins.data]);

	if (requestChampions.loading === true || requestSkins.loading === true)
		return <div>Carregando...</div>;
	if (requestChampions.data === null || requestSkins.data === null) return null;
	return (
		<div>
			<h1>Home</h1>
			<Search
				list={searchList}
				mode='select'
				placeholder='Busque e adicione seu campeão ou skin'
				responseList={searchSelected}
				setResponseList={setSearchSelected}
			/>
			<Cart cartItems={searchSelected} setCartItems={setSearchSelected} />
		</div>
	);
};

export default Home;
