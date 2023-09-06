export type ISearchItem = {
	id: number | string;
	name: string;
	selected?: boolean;
};

export type ISeachSelect = ISearchChampion | ISearchSkin;

export type ISearchChampion = ISearchItem & {
	icon: string;
};

export type ISearchSkin = ISearchItem & {
	tilePath: string;
};
