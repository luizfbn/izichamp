export const CHAMPIONS_WITH_PRICES_URL =
	'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json';
export type IChampionPriceList = Omit<IChampionPrice, 'skins'> & {
	key: string;
	name: string;
	title: string;
	icon: string;
	skins: ISkinPrice[];
};

export const CHAMPION_WITH_PRICES_URL =
	'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions';
export type IChampionPrice = {
	id: number;
	price: {
		blueEssence: number;
		rp: number;
	};
	skins: ISkinPrice[];
};

export type ISkinPrice = {
	id: number;
	name: string;
	availability: 'Available' | 'Legacy' | 'Upcoming';
	cost: number | 'Special';
	tilePath: string;
	loadScreenPath: string;
};

export const CHAMPION_PT_BR_URL =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champions';
export type IChampionPortuguese = {
	id: number;
	name: string;
	alias: string;
	title: string;
	shortBio: string;
	squarePortraitPath: string;
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
	skins: ISkinPortuguese[];
};

export const SKINS_PT_BR_URL =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/skins.json';
export type ISkinPortuguese = Omit<ISkinPrice, 'availability' | 'cost'>;

export const CHAMPIONS_URL =
	'https://ddragon.leagueoflegends.com/cdn/{version}/data/pt_BR/champion.json';
export type IChampion = {
	id: string;
	key: string;
	name: string;
	title: string;
};
