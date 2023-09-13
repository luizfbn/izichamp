/* Home page */

export const CHAMPIONS_WITH_PRICES_URL =
	'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json';
export type IChampionWithPrice = Omit<IChampionPrices, 'skins'> & {
	id: number;
	key: string;
	name: string;
	title: string;
	icon: string;
	skins: ISkinWithPrice[];
};
export type ISkinWithPrice = {
	id: number;
	name: string;
	availability: 'Available' | 'Legacy' | 'Upcoming';
	cost: number | 'Special';
	tilePath: string;
};

export const SKINS_PT_BR_URL =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/skins.json';
export type ISkinPortuguese = {
	id: number;
	name: string;
};

/* Champions page */

export const CHAMPIONS_URL =
	'https://ddragon.leagueoflegends.com/cdn/13.17.1/data/pt_BR/champion.json';
export type IChampion = {
	id: string;
	key: string;
	name: string;
	title: string;
	image: {
		full: string;
	};
};

/* Champion page */

export const CHAMPION_WITH_PRICES_URL =
	'http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions/';
export type IChampionPrices = {
	price: {
		blueEssence: number;
		rp: number;
	};
	skins: Omit<ISkinWithPrice, 'tilePath'>[];
};

export const CHAMPION_PT_BR_URL =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champions/';
export type IChampionPortuguese = {
	id: number;
	name: string;
	title: string;
	shortBio: string;
	passive: {
		name: string;
		abilityIconPath: string;
		description: string;
	};
	spells: {
		spellKey: string;
		name: string;
		abilityIconPath: string;
		description: string;
	}[];
	skins: ISkinPortuguese &
		{
			loadScreenPath: string;
		}[];
};
