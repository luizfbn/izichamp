import React from 'react';
import useFetch from './useFetch';
import {
	CHAMPIONS_WITH_PRICES_URL,
	IChampionPriceList,
	ISkinPortuguese,
	ISkinPrice,
	SKINS_PT_BR_URL,
} from '../api';
import { mapImagePath } from '../helper';
import useChampions from './useChampions';

type IRequestSkins = { [key: string]: ISkinPortuguese };
type IRequestChampions = { [key: string]: IChampionPriceList };
type IRequestChampionsProcessed = IChampionPriceList & {
	skins: IRequestSkinsProcessed[];
};
type IRequestSkinsProcessed = ISkinPrice & { cost: number };

function processSkins(skins: ISkinPrice[], translatedSkins: IRequestSkins) {
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
			skin.tilePath = mapImagePath(translatedSkins[skin.id].tilePath);
		}
		return true;
	});
}

const useChampionsAndSkins = () => {
	const requestChampions = useFetch<IRequestChampions>(
		CHAMPIONS_WITH_PRICES_URL,
		{
			cache: 'force-cache',
		}
	);
	const requestChampionsTranslate = useChampions();
	const requestSkins = useFetch<IRequestSkins>(SKINS_PT_BR_URL);
	const [data, setData] = React.useState<
		(IRequestChampionsProcessed | IRequestSkinsProcessed)[]
	>([]);

	React.useEffect(() => {
		function handleData() {
			if (
				!requestChampions.data ||
				!requestSkins.data ||
				!requestChampionsTranslate.data
			)
				return;
			Object.values(requestChampions.data).forEach((item) => {
				if (item.key === 'Briar') return;
				if (
					requestChampionsTranslate.data &&
					requestChampionsTranslate.data.data[item.key]
				) {
					item.title = requestChampionsTranslate.data.data[item.key].title;
				}
				item.skins = processSkins(item.skins, requestSkins.data!);
				setData((elem) => [
					...elem,
					item as IRequestChampionsProcessed,
					...(item.skins as IRequestSkinsProcessed[]),
				]);
			});
		}

		handleData();
	}, [
		requestChampions.data,
		requestChampionsTranslate.data,
		requestSkins.data,
	]);

	return {
		data,
		loading:
			requestChampions.loading ||
			requestChampionsTranslate.loading ||
			requestSkins.loading,
		error:
			requestChampions.error ||
			requestChampionsTranslate.error ||
			requestSkins.error,
	};
};

export default useChampionsAndSkins;
