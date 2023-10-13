import React from 'react';

type IShowMore = {
	text: string;
	length: number;
};

const ShowMore = ({ text, length }: IShowMore) => {
	const [showMore, setShowMore] = React.useState(false);

	return (
		<>
			{text.length > length ? (
				<>
					<span>{showMore ? text : `${text.substring(0, length)}...`}</span>
					<button onClick={() => setShowMore(!showMore)}>
						{showMore ? 'Ver menos' : 'Ver mais'}
					</button>
				</>
			) : (
				text
			)}
		</>
	);
};

export default ShowMore;
