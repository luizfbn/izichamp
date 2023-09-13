import { IChampion, IChampionWithPrice, ISkinWithPrice } from '../api';

export type ISeachSelect = ISearchChampion | ISearchSkin;

export type ISearchFilter = IChampion & {
	selected?: boolean;
};

export type ISearchChampion = IChampionWithPrice & {
	skins: ISearchSkin[];
	selected?: boolean;
};

export type ISearchSkin = ISkinWithPrice & {
	cost: number;
	selected?: boolean;
};
