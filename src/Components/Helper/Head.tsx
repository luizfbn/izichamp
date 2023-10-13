import React from 'react';

const Head = (props: { title: string; description?: string }) => {
	React.useEffect(() => {
		document.title = 'Izi champ | ' + props.title;
		document
			.querySelector('meta[name="description"]')
			?.setAttribute('content', props.description || '');
	}, [props]);

	return <></>;
};

export default Head;
