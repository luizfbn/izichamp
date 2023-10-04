import { ISkinPrice } from './api';

export function isSkin<T>(item: T): item is T & ISkinPrice & { cost: number } {
	return (item as ISkinPrice).cost !== undefined;
}

export function mapImagePath(path: string) {
	const newPath = path.toLocaleLowerCase().split('/lol-game-data/assets/')[1];
	return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${newPath}`;
}

export function removeTagsFromText(text: string) {
	return text.replace(/<\/?[\w\s]*>|<.+[\W]>/g, ' ');
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
