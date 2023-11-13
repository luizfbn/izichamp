// /

export type IChampion = {
	type: 'Champion';
	id: number;
	key: string;
	name: string;
	title: string;
	tilePath: string;
	cost: {
		rp: number;
		blueEssence: number;
	};
};

export type ISkin = {
	type: 'Skin';
	id: number;
	name: string;
	tilePath: string;
	loadScreenPath: string;
	cost: {
		rp: number;
		orangeEssence: number;
	};
};

// /champions

export type IChampionList = Omit<IChampion, 'tilePath' | 'cost'> & {
	id: string;
};

// /champions/:id

export type IChampionById = {
	id: number;
	name: string;
	alias: string;
	title: string;
	shortBio: string;
	squarePortraitPath: string;
	cost: {
		rp: number;
		blueEssence: number;
	};
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
	skins: ISkin[];
};
