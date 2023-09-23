import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../Assets/logo.svg';

const Header = () => {
	return (
		<header className={styles.header}>
			<nav className={`${styles.nav} container`}>
				<NavLink to='/'>Home</NavLink>
				<Logo className={styles.logo} />
				<NavLink to='/champions'>Campeões</NavLink>
			</nav>
		</header>
	);
};

export default Header;
