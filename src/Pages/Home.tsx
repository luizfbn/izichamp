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

function processSkins(skins: ISkinWithPrice[], translatedSkins: IRequestSkins) {
	return skins.filter((skin) => {
		if (
			skin.name === 'Original' ||
			skin.cost === 'Special' ||
			skin.availability === 'Upcoming'
		) {
			return false;
		}
		if (translatedSkins[skin.id]) {
			skin.name = translatedSkins[skin.id].name;
		}
		return true;
	});
}

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
				if (item.key === 'Briar') return;
				if (
					requestChampionsTranslate.data!.data &&
					requestChampionsTranslate.data!.data[item.key]
				) {
					item.title = requestChampionsTranslate.data!.data[item.key].title;
				}
				item.skins = processSkins(item.skins, requestSkins.data!);
				setSearchList((skins) => [
					...skins,
					item as IRequestChampionsProcessed,
					...(item.skins as IRequestSkinsProcessed[]),
				]);
			});
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
