import { fireEvent, render } from '@testing-library/react';

import OutsideClickHandler from '..';

describe('OutsideClickHandler component', () => {
  const onOutsideClick = jest.fn();

  it('calls the provided function when a click occurs outside the component', () => {
    render(
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <div>Inside the component</div>
      </OutsideClickHandler>,
    );
    fireEvent.mouseDown(document.body);
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });
});
