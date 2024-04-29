import { useEffect, useRef, useState } from 'react';

import style from './countDown.module.scss';

const CountDown = ({ text, seconds, handleFunction, type = 'button' }) => {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(seconds);
  let counterRef = useRef();

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(seconds);
      setDisabledBtn(false);
    } else if (disabledBtn) {
      counterRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(counterRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledBtn, timeLeft]);

  const handleClick = () => {
    setDisabledBtn(true);
    handleFunction();
  };

  return type === 'button' ? (
    <button className={style.countDown} disabled={disabledBtn} onClick={handleClick}>
      {disabledBtn ? `${text} (${timeLeft})` : text}
    </button>
  ) : (
    <span
      className={disabledBtn ? `${style.linkCountDown} ${style.disabled}` : style.linkCountDown}
      onClick={handleClick}
    >
      {disabledBtn ? `${text} (${timeLeft})` : text}
    </span>
  );
};

export default CountDown;
