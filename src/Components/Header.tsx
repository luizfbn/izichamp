import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../Assets/logo.svg';

const Header = () => {
	return (
		<header className={styles.header}>
			<nav className={`${styles.nav} container`}>
				<div>
					<NavLink to='/'>Home</NavLink>
				</div>
				<Logo className={styles.logo} />
				<div>
					<NavLink to='/champions'>Campeões</NavLink>
				</div>
			</nav>
		</header>
	);
};

export default Header;
