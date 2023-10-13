import React from 'react';

const style: React.CSSProperties = {
	border: '0.25rem solid var(--color-p6)',
	borderRightColor: 'var(--color-p2)',
	width: '2rem',
	height: '2rem',
	borderRadius: '50%',
	animation: 'spin 1s infinite',
	margin: '0 auto',
};

const Loading = ({ className }: { className?: string }) => {
	return (
		<section className={className}>
			<div style={style}>
				<style>
					{`@keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }`}
				</style>
			</div>
		</section>
	);
};

export default Loading;
