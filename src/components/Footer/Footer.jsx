import styles from './styles.module.css';
import Telegram from '../../assets/telegram.svg';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a target='_blank' rel='noreferrer' href='https://t.me/anastasiiakunstman'>
                <img className={styles.telegram} src={Telegram} alt='Telegram'/>
            </a>
            <p>Anastasiia Kunstman © {new Date().getFullYear()}</p>
        </footer>
    )
};

export default Footer;