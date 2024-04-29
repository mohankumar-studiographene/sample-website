import Select from 'react-select';

import './style.scss';

function Dropdown(props) {
  const {
    className = '',
    classNamePrefix = '',
    id,
    value,
    options,
    onChange,
    placeholder = '',
    isSearchable,
    defaultValue,
    menuPlacement,
  } = props;
  return (
    <Select
      id={id}
      className={`select-input ${className}`}
      classNamePrefix={classNamePrefix}
      value={value}
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder}
      isSearchable={isSearchable}
      menuPlacement={menuPlacement}
    />
  );
}

export default Dropdown;
