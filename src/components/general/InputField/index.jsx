import { useState } from 'react';

import styles from './inputfield.module.scss';

// Handle strip tags from input text
// <div><p>Hey that's <span>something</span></p></div> to Hey that's something
const handleStripTags = text => {
  return ((text !== '' && typeof text === 'string') || text instanceof String) &&
    text.match(/(<([^>]+)>)/gi)
    ? text.replace(/(<([^>]+)>)/gi, '')
    : text;
};

const InputBox = ({
  type = 'text',
  placeholder = '',
  showPasswordIcon = '/images/eye.svg',
  hidePasswordIcon = '/images/eye-off.svg',
  value,
  label,
  name,
  id,
  error = '',
  className = '',
  helpDeskMessage = '',
  autoComplete = false,
  autoFocus = false,
  readOnly = false,
  requiredField = false,
  disableCopyPaste = false,
  showHidePassword = false,
  disabled = false,
  stripTags = true,
  // otherAttributes = {},
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onSelect,
  onPaste,
}) => {
  //section for states
  const [showPassword, handleShowPwd] = useState(false);
  const inputConfig = {
    // ...otherAttributes,
    id,
    type,
    name,
    autoFocus,
    readOnly,
    placeholder,
    disabled,
    readOnly,
    value: stripTags ? handleStripTags(value) : value,
    required: requiredField,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onSelect,
  };

  const keyValidators = {
    number: disableCopyPaste ? [8, 46, 190] : [8, 17, 46, 65, 67, 91, 190],
    tel: [
      8, 9, 17, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104,
      105,
    ],
  };
  // disable autoComplete
  inputConfig.autoComplete = !autoComplete
    ? type === 'password'
      ? 'new-password'
      : 'off'
    : undefined;

  // Number input validation
  if (type === 'number') {
    inputConfig.onKeyDown = function onKeyDown(e) {
      if (!(keyValidators?.number.includes(e.keyCode) || !isNaN(Number(e.key)))) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  }

  // Telephone input validation
  if (type === 'tel') {
    inputConfig.onKeyDown = function onKeyDown(e) {
      if (!keyValidators?.tel.includes(e.keyCode)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  }

  function handlePasswordVisibility() {
    return (
      <div
        data-level-up={true}
        className={styles['visibility-icon']}
        onClick={() => handleShowPwd(!showPassword)}
        aria-hidden={true}
      >
        <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="visibility-icon" />
      </div>
    );
  }

  if (showHidePassword) inputConfig.type = showPassword ? 'text' : 'password';

  return (
    <div className={`${styles['input-box-wrp']} ${className} ${error ? styles['has-error'] : ''}`}>
      {/* this label is to be used for text or number based inputs */}
      <label htmlFor={name}>{label}</label>
      <div className={styles['input-field']}>
        <input
          // {...inputConfig}
          onCopy={e => {
            if (disableCopyPaste) {
              e.preventDefault();
              return false;
            }
          }}
          onPaste={e => {
            if (disableCopyPaste) {
              e.preventDefault();
              return false;
            }
            onPaste(e);
          }}
          onWheel={e => e.target.blur()}
        />
        {showHidePassword && handlePasswordVisibility()}
      </div>
      {/* If the input has error */}
      {error ? (
        <div className={styles['error-message']}>
          <span>{error}</span>
        </div>
      ) : (
        ''
      )}
      {/* If the input has error help Desk Message will not be displayed*/}
      {helpDeskMessage && !error ? (
        <div className={styles['help-desk']}>
          <span>{helpDeskMessage}</span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default InputBox;
