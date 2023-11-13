import { IChampion, ISkin } from './Api';

export type ICartItem = (IChampion | ISkin) & {
	selected?: boolean;
	disabledPrice: ICartPriceDisabled;
};

export type ICartPriceDisabled =
	| { BE: boolean; OE?: undefined; RP: boolean }
	| { BE?: undefined; OE: boolean; RP: boolean };
