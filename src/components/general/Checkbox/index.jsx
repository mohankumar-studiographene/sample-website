import styles from './checkbox.module.scss';

const Checkbox = ({
  id = '',
  name = '',
  className = '',
  value = '',
  label = '',
  required = false,
  disabled = false,
  // otherAttributes = {},
  checked,
  onChange,
}) => {
  return (
    <span className={`${styles['checkbox-wrp']} ${className}`}>
      <input
        id={id || name}
        required={required}
        className={styles['styled-checkbox']}
        name={name}
        // {...otherAttributes}
        type="checkbox"
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id || name}>{label}</label>
    </span>
  );
};

export default Checkbox;
