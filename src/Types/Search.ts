import { IChampion, ISkin, IChampionList } from './Api';

export type ISeachSelect = (IChampion | ISkin) & {
	selected?: boolean;
};

export type ISearchFilter = IChampionList & {
	selected?: boolean;
};
