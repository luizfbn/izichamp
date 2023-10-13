import useFetch from './useFetch';
import { CHAMPIONS_URL, IChampion } from '../api';

type IRequestChampion = { data: { [key: string]: IChampion } };

const useChampions = () => {
	/* const requestLoLVersion = useFetch<string[]>(
		'https://ddragon.leagueoflegends.com/api/versions.json'
	);
    const urlVersion = requestLoLVersion.data
    ? CHAMPIONS_URL.replace('{version}', requestLoLVersion.data[0])
    : '' */
	const requestChampions = useFetch<IRequestChampion>(
		CHAMPIONS_URL.replace('{version}', '13.17.1')
	);
	const loading =
		!(/* requestLoLVersion.data &&  */ requestChampions.data) &&
		!(/* requestLoLVersion.error ||  */ requestChampions.error);

	return {
		data: requestChampions.data,
		loading,
		error: requestChampions.error /*  || requestLoLVersion.error */,
	};
};

export default useChampions;
