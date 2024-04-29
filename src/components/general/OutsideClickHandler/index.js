import { useEffect, useRef } from 'react';

const OutsideClickHandler = props => {
  const { children, onOutsideClick } = props;
  const wrapperRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    try {
      if (wrapperRef?.current && !wrapperRef?.current.contains(event.target)) {
        onOutsideClick();
      }
    } catch (error) {}
  };

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickHandler;
