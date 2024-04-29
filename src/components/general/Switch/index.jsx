import { useEffect, useState } from 'react';

import styles from './switch.module.scss';

const Switch = ({ id, onColor = '', onChange, status = false, disabled = false, className }) => {
  const [isOn, setValue] = useState(status);

  const handleChange = e => {
    if (!disabled) {
      setValue(!isOn);
      onChange(e);
    }
  };

  useEffect(() => {
    setValue(status);
  }, [status]);

  return (
    <span
      className={`${styles['switch-wrp']} ${disabled ? styles['switch-wrp'] : ''} ${
        styles[className]
      }`}
    >
      <input
        className={`${styles['switch-checkbox']}`}
        id={id}
        type="checkbox"
        checked={isOn}
        onChange={handleChange}
      />
      <label
        className={`${styles['switch-label']} ${
          isOn ? styles['switch-label--on'] + ' ' + styles[onColor] : ''
        }`}
        htmlFor={id}
      >
        <span className={`${styles['switch-button']}`} />
      </label>
    </span>
  );
};

export default Switch;
