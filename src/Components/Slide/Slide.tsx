import React from 'react';
import styles from './Slide.module.css';
import useDragScroll from '../../Hooks/useDragScroll';
import { ReactComponent as ArrowLeft } from '../../Assets/arrow-to-left.svg';
import { ReactComponent as ArrowRight } from '../../Assets/arrow-to-right.svg';

const Slide = ({ children }: React.PropsWithChildren) => {
	const contentRef = useDragScroll(styles.active);

	function slidePrev() {
		const { width } = contentRef.current.getBoundingClientRect();
		contentRef.current.scrollLeft -= width;
	}

	function slideNext() {
		const { width } = contentRef.current.getBoundingClientRect();
		contentRef.current.scrollLeft += width;
	}

	return (
		<section className={styles.slide}>
			<button className={styles.button} onClick={slidePrev}>
				<ArrowLeft />
			</button>
			<div ref={contentRef} className={styles.content}>
				{children}
			</div>
			<button className={styles.button} onClick={slideNext}>
				<ArrowRight />
			</button>
		</section>
	);
};

export default Slide;
