import styles from './styles.module.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export const NavButton = ({ label, onClick, disabled, variant, children, className }) => {
    const buttonClass = clsx(styles.button, {
        [styles['rounded-button']]: variant === 'rounded' || variant === 'outlined',
        [styles['outlined']]: variant === 'outlined',
    });

    return (
        <button className={buttonClass} onClick={onClick} disabled={disabled}>
            {label}
            {children}
        </button>
    );
};

NavButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    variant: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};