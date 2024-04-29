import { fireEvent, render, screen } from '@testing-library/react';

import RadioInput from '..';

describe('RadioInput component', () => {
  const id = 'radio-input';
  const name = 'radio';
  const className = 'my-class';
  const value = 'option1';
  const label = 'Option 1';
  const required = true;
  const disabled = false;
  const checked = false;
  const otherAttributes = { 'data-testid': 'radio-input' };
  const onChange = jest.fn();

  it('renders a radio input with the provided props', () => {
    render(
      <RadioInput
        id={id}
        name={name}
        className={className}
        value={value}
        label={label}
        required={required}
        disabled={disabled}
        checked={checked}
        otherAttributes={otherAttributes}
        onChange={onChange}
      />,
    );
    const input = screen.getByTestId('radio-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'radio-input');
    expect(input).toHaveAttribute('name', 'radio');
    // expect(input).toHaveAttribute('class', 'my-class');
    expect(input).toHaveAttribute('value', 'option1');
    expect(input).toHaveAttribute('type', 'radio');
    expect(input).not.toBeDisabled();
    expect(input).not.toBeChecked();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('data-testid', 'radio-input');
  });

  it('calls the provided function when the radio input is clicked', () => {
    render(<RadioInput value={value} onChange={onChange} />);
    const input = document.querySelector('input[type="radio"]');
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('renders a radio input that is checked', () => {
    render(<RadioInput value={value} checked={true} onChange={onChange} />);
    const input = screen.getByRole('radio');
    expect(input).toBeChecked();
  });

  it('renders a disabled radio input', () => {
    render(<RadioInput value={value} disabled={true} />);
    const input = screen.getByRole('radio');
    expect(input).toBeDisabled();
  });
});
