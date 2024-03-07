import Logo from '../../assets/jewelry.svg';
import styles from './styles.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src={Logo} alt='Logo' />
            <h1>Valantis</h1>
        </header>
    );
};

export default Header;