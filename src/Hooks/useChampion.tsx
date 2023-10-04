import React from 'react';
import useFetch from './useFetch';
import {
	CHAMPION_PT_BR_URL,
	CHAMPION_WITH_PRICES_URL,
	IChampionPortuguese,
	IChampionPrice,
} from '../api';
import { mapImagePath, removeTagsFromText } from '../helper';

type IRequestChampionProcessed = IChampionPrice & IChampionPortuguese;

function processChampion(champion: IChampionPortuguese) {
	const champ = { ...champion };
	champ.squarePortraitPath = mapImagePath(champ.squarePortraitPath);
	champ.passive.abilityIconPath = mapImagePath(champ.passive.abilityIconPath);
	champ.passive.description = removeTagsFromText(champ.passive.description);
	champ.spells.map((spell) => {
		spell.abilityIconPath = mapImagePath(spell.abilityIconPath);
		spell.description = removeTagsFromText(spell.description);
	});
	return champ;
}

function processSkins(
	skins: IChampionPrice['skins'],
	translatedSkins: IChampionPortuguese['skins']
) {
	return skins.filter((skin) => {
		if (
			skin.name === 'Original' ||
			skin.cost === 'Special' ||
			skin.availability === 'Upcoming'
		) {
			return false;
		}
		const translatedSkin = translatedSkins.find((elem) => elem.id === skin.id);
		if (translatedSkin) {
			skin.name = translatedSkin.name;
			skin.loadScreenPath = mapImagePath(translatedSkin.loadScreenPath);
		}
		return true;
	});
}

const useChampion = (id: string) => {
	const requestChampionPrices = useFetch<IChampionPrice>(
		`${CHAMPION_WITH_PRICES_URL}/${id}.json`,
		{
			cache: 'force-cache',
		}
	);
	const requestChampionTranslate = useFetch<IChampionPortuguese>(
		requestChampionPrices.data
			? `${CHAMPION_PT_BR_URL}/${requestChampionPrices.data.id}.json`
			: ''
	);
	const [data, setData] = React.useState<IRequestChampionProcessed>();

	React.useEffect(() => {
		function handleData() {
			if (!requestChampionPrices.data || !requestChampionTranslate.data) return;
			const champion = processChampion(requestChampionTranslate.data);
			const champPrices = requestChampionPrices.data;
			champPrices.skins = processSkins(
				champPrices.skins,
				requestChampionTranslate.data.skins
			);
			const result = {
				...champion,
				price: champPrices.price,
				skins: champPrices.skins,
			};
			setData(result);
		}

		handleData();
	}, [requestChampionPrices.data, requestChampionTranslate.data]);

	return {
		data,
		loading: requestChampionPrices.loading || requestChampionTranslate.loading,
		error: requestChampionPrices.error || requestChampionTranslate.error,
	};
};

export default useChampion;
