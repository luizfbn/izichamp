import styles from './NotFound.module.css';
import Head from '../Components/Helper/Head';
import { ReactComponent as NotFoundIcon } from '../Assets/not-found.svg';

const NotFound = () => {
	return (
		<div className={`${styles.notFound} container`}>
			<Head title='Não encontrado' />
			<NotFoundIcon />
			<p>Página não encontrada</p>
		</div>
	);
};

export default NotFound;
