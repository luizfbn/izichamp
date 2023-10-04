import { IChampionPriceList, ISkinPrice } from '../api';

export type ICartItem = {
	selected?: boolean;
	disabledPrice: ICartPriceDisabled;
} & (IChampionCart | ISkinCart);

export type IChampionCart = IChampionPriceList & {
	skins: ISkinCart[];
};

export type ISkinCart = ISkinPrice & {
	cost: number;
};

export type ICartPriceDisabled =
	| { BE: boolean; OE?: undefined; RP: boolean }
	| { BE?: undefined; OE: boolean; RP: boolean };
