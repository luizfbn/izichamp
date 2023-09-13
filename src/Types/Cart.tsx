import { IChampionWithPrice, ISkinWithPrice } from '../api';

export type ICartItem = {
	selected?: boolean;
	disabledPrice: ICartPriceDisabled;
} & (IChampionCart | ISkinCart);

export type IChampionCart = IChampionWithPrice & {
	skins: ISkinCart[];
};

export type ISkinCart = ISkinWithPrice & {
	cost: number;
};

export type ICartPriceDisabled =
	| { BE: boolean; OE?: undefined; RP: boolean }
	| { BE?: undefined; OE: boolean; RP: boolean };
