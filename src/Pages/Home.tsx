import React from 'react';
import Search from '../Components/Search/Search';
import Cart from '../Components/Cart/Cart';
import useFetch from '../Hooks/useFetch';
import { ISeachSelect } from '../Types/Search';
import { ICartItem } from '../Types/Cart';
import {
	CHAMPIONS_WITH_PRICES_URL,
	SKINS_PT_BR_URL,
	ISkinPortuguese,
	IChampionWithPrice,
	ISkinWithPrice,
	CHAMPIONS_URL,
	IChampion,
} from '../api';

type IRequestSkins = { [key: string]: ISkinPortuguese };
type IRequestChampions = { [key: string]: IChampionWithPrice };
type IRequestChampionsTranslate = { data: { [key: string]: IChampion } };
type IRequestChampionsProcessed = IChampionWithPrice & {
	skins: IRequestSkinsProcessed[];
};
type IRequestSkinsProcessed = ISkinWithPrice & { cost: number };

const Home = () => {
	const requestChampions = useFetch<IRequestChampions>(
		CHAMPIONS_WITH_PRICES_URL,
		{
			cache: 'force-cache',
		}
	);
	const requestChampionsTranslate =
		useFetch<IRequestChampionsTranslate>(CHAMPIONS_URL);
	const requestSkins = useFetch<IRequestSkins>(SKINS_PT_BR_URL);
	const [searchList, setSearchList] = React.useState<ISeachSelect[]>([]);
	const [selectedList, setSelectedList] = React.useState<ICartItem[]>([]);

	React.useEffect(() => {
		function handleData() {
			if (
				!requestChampions.data ||
				!requestSkins.data ||
				!requestChampionsTranslate.data
			)
				return;
			setSearchList([]);
			setSelectedList([]);
			Object.values(requestChampions.data).forEach((item) => {
				if (
					requestChampionsTranslate.data?.data &&
					requestChampionsTranslate.data?.data[item.key]
				) {
					item.title = requestChampionsTranslate.data?.data[item.key].title;
				}
				item.skins = item.skins.filter((skin) => {
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
				setSearchList((skins) => [
					...skins,
					...(item.skins as IRequestSkinsProcessed[]),
				]);
			});
			setSearchList((skins) => [
				...((requestChampions.data
					? Object.values(requestChampions.data)
					: []) as IRequestChampionsProcessed[]),
				...skins,
			]);
		}
		handleData();
	}, [
		requestChampions.data,
		requestSkins.data,
		requestChampionsTranslate.data,
	]);

	if (
		requestChampions.loading === true ||
		requestChampionsTranslate.loading === true ||
		requestSkins.loading === true
	)
		return <div>Carregando...</div>;
	if (
		requestChampions.data === null ||
		requestChampionsTranslate.data === null ||
		requestSkins.data === null
	)
		return null;
	return (
		<div>
			<h1>Home</h1>
			<Search
				list={searchList}
				mode='select'
				placeholder='Busque e adicione seu campeão ou skin'
				responseList={selectedList}
				setResponseList={
					setSelectedList as React.Dispatch<
						React.SetStateAction<ISeachSelect[]>
					>
				}
			/>
			<Cart list={selectedList} setList={setSelectedList} />
		</div>
	);
};

export default Home;
