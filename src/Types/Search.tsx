import { IChampion, IChampionPriceList, ISkinPrice } from '../api';

export type ISeachSelect = ISearchChampion | ISearchSkin;

export type ISearchFilter = IChampion & {
	selected?: boolean;
};

export type ISearchChampion = IChampionPriceList & {
	skins: ISearchSkin[];
	selected?: boolean;
};

export type ISearchSkin = ISkinPrice & {
	cost: number;
	selected?: boolean;
};
