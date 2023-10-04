import React from 'react';

const useDragScroll = (activeClass: string) => {
	const contentRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
	React.useEffect(() => {
		const content = contentRef.current;
		if (content) {
			const handleMouseDown = (e: MouseEvent) => {
				isDown = true;
				startX = e.pageX - content.offsetLeft;
				scrollLeft = content.scrollLeft;
				content.classList.add(activeClass);
			};
			const handleMouseMove = (e: MouseEvent) => {
				if (!isDown) return;
				e.preventDefault();
				const x = e.pageX - content.offsetLeft;
				const walk = x - startX;
				content.scrollLeft = scrollLeft - walk;
			};
			const handleLeave = () => {
				isDown = false;
				content.classList.remove(activeClass);
			};

			let isDown = false;
			let startX: number;
			let scrollLeft: number;
			content.addEventListener('mousedown', handleMouseDown);
			content.addEventListener('mousemove', handleMouseMove);
			content.addEventListener('mouseleave', handleLeave);
			content.addEventListener('mouseup', handleLeave);

			return () => {
				content.removeEventListener('mousedown', handleMouseDown);
				content.removeEventListener('mousemove', handleMouseMove);
				content.removeEventListener('mouseleave', handleLeave);
				content.removeEventListener('mouseup', handleLeave);
			};
		}
	}, [activeClass]);
	return contentRef;
};

export default useDragScroll;
