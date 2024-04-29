import styles from './radioinput.module.scss';

const RadioInput = ({
  id = '',
  name = '',
  className = '',
  value = '',
  label = '',
  required = false,
  disabled = false,
  checked,
  // otherAttributes = {},
  onChange,
}) => {
  return (
    <span className={`${styles['radio-input-wrp']} ${className}`}>
      <input
        id={id}
        required={required}
        className={styles['radioInput']}
        name={name}
        // {...otherAttributes}
        type="radio"
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
};

export default RadioInput;
