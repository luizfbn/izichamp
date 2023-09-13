import { ISkinWithPrice } from './api';

export function isSkin<T>(
	item: T
): item is T & ISkinWithPrice & { cost: number } {
	return (item as ISkinWithPrice).cost !== undefined;
}

export function getOrangeEssenceValue(rp: number) {
	switch (rp) {
		case 520:
			return 220;
		case 750:
			return 450;
		case 975:
			return 675;
		case 1350:
			return 1050;
		case 1820:
			return 1520;
		default:
			return rp;
	}
}
