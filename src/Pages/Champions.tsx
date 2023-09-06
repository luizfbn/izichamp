import React from 'react';
import Search from '../Components/Search/Search';
import useFetch from '../Hooks/useFetch';
import { ISearchItem } from '../Types/Search';

type IChampion = {
	id: string;
	key: string;
	name: string;
	title: string;
	image: {
		full: string;
	};
};

type IRequestChampion = { data: { [key: string]: IChampion } };

const Champions = () => {
	const requestChampions = useFetch<IRequestChampion>(
		`https://ddragon.leagueoflegends.com/cdn/13.17.1/data/pt_BR/champion.json`
	);
	const [championList, setChampionList] = React.useState<IChampion[]>([]);
	const [championListFiltered, setChampionListFiltered] = React.useState<
		ISearchItem[]
	>([]);

	React.useEffect(() => {
		function handleData() {
			if (!requestChampions.data) return;
			const champions = Object.values(requestChampions.data.data);
			setChampionList(champions);
			setChampionListFiltered(champions);
		}
		handleData();
	}, [requestChampions.data]);

	if (requestChampions.loading === true) return <div>Carregando...</div>;
	if (requestChampions.data === null) return null;
	return (
		<div>
			<h1>Champions</h1>
			<Search
				list={championList}
				mode='filter'
				placeholder='Busque seu campeão'
				setResponseList={setChampionListFiltered}
			/>
			{championListFiltered.map((champion) => (
				<p key={champion.id}>{champion.name}</p>
			))}
		</div>
	);
};

export default Champions;
