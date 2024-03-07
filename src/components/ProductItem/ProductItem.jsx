import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { formatAmount } from '../../utils';

const ProductItem = ({ product }) => {
    return (
        <div key={product.id} className={styles.card}>
            <div className={styles.card2}>
                <p>{product.brand}</p>
                <h3>{product.product}</h3>
                <p>{formatAmount(product.price)} ₽</p>
                <p className={styles.id}>ID: {product.id}</p>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        product: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        brand: PropTypes.string
    }).isRequired
};

export default ProductItem;