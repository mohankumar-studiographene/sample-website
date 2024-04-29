import styles from './button.module.scss';

function Button({
  variant = 'default',
  type = 'button',
  label = '',
  className,
  disabled = false,
  loading = false,
  otherAttributes,
  onClick,
  children = '',
}) {
  function handleClick(e) {
    if (!loading || disabled) {
      onClick(e);
    }
  }
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles['btn-' + variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...otherAttributes}
    >
      {loading ? <span className={styles['btn-loader']} /> : children ? children : label}
    </button>
  );
}

export default Button;
