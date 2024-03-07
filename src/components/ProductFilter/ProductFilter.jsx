import { useState, useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import lupa from '../../assets/lupa.svg';
import { NavButton } from '../NavButton/NavButton';

const options = [
  { value: 'product', label: 'Продукт' },
  { value: 'brand', label: 'Бренд' },
  { value: 'price', label: 'Стоимость' },
];

export const ProductFilter = memo(function ProductFilter({ disabled, onSubmit }) {
  const [state, setState] = useState({
    category: 'product',
    value: '',
  });

  const searchParams = new URLSearchParams(window.location.search);
  const categoryQueryParam = searchParams.get('category');
  const valueQueryParam = searchParams.get('value');

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      category: categoryQueryParam || 'product',
      value: valueQueryParam || '',
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(state.value !== '' ? state : null);
  }, [state, onSubmit]);

  const handleReset = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      value: '',
    }));
    onSubmit(null);
  }, [onSubmit]);

  const handleCategoryChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      category: event.target.value,
      value: '',
    }));
  }, []);

  const handleValueChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      const parsedValue = state.category === 'price' && newValue ? Number(newValue) : newValue;

      setState((prevState) => ({
        ...prevState,
        value: parsedValue,
      }));
    },
    [state.category]
  );

  return (
    <>
      <div className={styles.navigation}>
        <label className={styles.selectWrapper}>
          <select className={styles.select} name="category" value={state.category} onChange={handleCategoryChange}>
            {options.map((option) => (
              <option className={styles.item} key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <input
          type={state.category === 'price' ? 'number' : 'text'}
          name="value"
          value={state.value}
          className={styles.input}
          placeholder={'Введите значение'}
          onChange={handleValueChange}
          min={state.category === 'price' ? 0 : undefined}
        />
          <button onClick={handleReset} className={styles.deleteButton}>
            ×
          </button>
        <NavButton onClick={handleSubmit} disabled={disabled || !state.value}>
          <img src={lupa} className={styles.search} />
        </NavButton>
      </div>
    </>
  );
});

ProductFilter.propTypes = {
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};