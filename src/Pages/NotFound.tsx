import styles from './NotFound.module.css';
import { ReactComponent as NotFoundIcon } from '../Assets/not-found.svg';

const NotFound = () => {
	return (
		<div className={`${styles.notFound} container`}>
			<NotFoundIcon />
			<p>Página não encontrada</p>
		</div>
	);
};

export default NotFound;
