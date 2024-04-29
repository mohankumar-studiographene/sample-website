import { fireEvent, render, screen } from '@testing-library/react';

import InputBox from '..';

describe('InputBox component', () => {
  const label = 'Name';
  const name = 'name';
  const id = 'name-input';
  const value = 'John Doe';
  const error = 'Name is required';
  const helpDeskMessage = 'Please enter your full name';
  const otherAttributes = { 'data-testid': 'name-input' };
  const onChange = jest.fn();
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const onKeyDown = jest.fn();
  const onSelect = jest.fn();
  const onPaste = jest.fn();

  it('renders an input box with the provided props', () => {
    render(
      <InputBox
        type="text"
        placeholder="Enter your name"
        value={value}
        label={label}
        name={name}
        id={id}
        error={error}
        className="my-class"
        helpDeskMessage={helpDeskMessage}
        autoComplete={false}
        autoFocus={true}
        readOnly={true}
        requiredField={true}
        disableCopyPaste={true}
        showHidePassword={false}
        disabled={false}
        stripTags={true}
        otherAttributes={otherAttributes}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onSelect={onSelect}
        onPaste={onPaste}
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
    expect(input).toHaveValue('John Doe');
    // expect(screen.getByLabelText('Name')).toBeInTheDocument();
    // expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('id', 'name-input');
    // expect(input).toHaveAttribute('className', 'my-class');
    expect(input).toHaveAttribute('autocomplete', 'off');
    // expect(input).toHaveAttribute('autofocus');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('data-testid', 'name-input');
    expect(input).not.toBeDisabled();
  });

  it('calls the provided function when the input value changes', () => {
    render(<InputBox value={value} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Jane Doe' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls the provided function when the input is focused', () => {
    render(<InputBox value={value} onFocus={onFocus} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(2);
    expect(onFocus).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls the provided function when the input loses focus', () => {
    render(<InputBox value={value} onBlur={onBlur} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls the provided function when a key is pressed down on the input', () => {
    render(<InputBox value={value} onKeyDown={onKeyDown} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'a', keyCode: 65 });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls the provided function when text is selected in the input', () => {
    render(<InputBox value={value} onSelect={onSelect} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    fireEvent.select(input);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls the provided function when text is pasted into the input', () => {
    render(<InputBox value={value} onPaste={onPaste} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    fireEvent.paste(input);
    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(onPaste).toHaveBeenCalledWith(expect.any(Object));
  });

  it('renders an input box with the provided error message', () => {
    render(<InputBox value={value} error={error} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    // expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('renders an input box with the provided help desk message', () => {
    render(<InputBox value={value} helpDeskMessage={helpDeskMessage} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
  });

  it('renders an input box with the provided value', () => {
    render(<InputBox type="text" value="Jane Doe" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Jane Doe');
  });

  it('renders an input box with the provided placeholder', () => {
    render(<InputBox type="text" placeholder="Enter your name" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  it('renders an input box with the provided attributes', () => {
    render(
      <InputBox
        type="text"
        otherAttributes={{ 'data-testid': 'name-input' }}
        onChange={() => {}}
      />,
    );
    const input = screen.getByTestId('name-input');
    expect(input).toBeInTheDocument();
  });

  // it('renders an input box with the show/hide password feature', () => {
  //     render(
  //         <InputBox
  //             type="password"
  //             showHidePassword={true}
  //             otherAttributes={{ 'data-testid': 'name-input' }}
  //         />,
  //     );
  //     // const input = screen.getByRole('textbox');
  //     const input = screen.getByTestId('name-input');
  //     expect(input).toHaveAttribute('type', 'password');
  //     expect(screen.getByRole('button')).toBeInTheDocument();
  // });

  // it('renders an input box with the password visible when the show/hide password button is clicked', () => {
  //     render(
  //         <InputBox
  //             type="password"
  //             showHidePassword={true}
  //             otherAttributes={{ 'data-testid': 'name-input' }}
  //         />,
  //     );
  //     const input = screen.getByTestId('name-input');
  //     const button = screen.getByRole('button');
  //     fireEvent.click(button);
  //     expect(input).toHaveAttribute('type', 'text');
  //     fireEvent.click(button);
  //     expect(input).toHaveAttribute('type', 'password');
  // });
});
