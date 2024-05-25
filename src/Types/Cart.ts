import { ISeachSelect } from './Search';

export type ICartItem = ISeachSelect & {
	disabledPrice: ICartPriceDisabled;
	discountRP: {
		hasDiscount: boolean;
		newPrice: number;
	};
	discountBE: {
		hasDiscount: boolean;
		newPrice: number;
	};
};

export type ICartPriceDisabled =
	| { BE: boolean; OE?: undefined; RP: boolean }
	| { BE?: undefined; OE: boolean; RP: boolean };
