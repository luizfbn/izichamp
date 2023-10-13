import styles from './Error.module.css';
import { ReactComponent as ErrorIcon } from '../Assets/error.svg';

const Error = () => {
	return (
		<div className={`${styles.error} container`}>
			<ErrorIcon />
			<p>Estamos indiponíveis no momento. Tente mais tarde.</p>
		</div>
	);
};

export default Error;
