import styles from './styles.module.css';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.ring}>
                <div className={styles.diamond}></div>
            </div>
        </div>
    );
};

export default Loader;