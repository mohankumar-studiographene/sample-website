import { fireEvent, render, screen } from '@testing-library/react';

import Button from '..';

describe('Button component', () => {
  it('renders a button with the provided label', () => {
    const label = 'Click me';
    render(<Button label={label} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
  });

  it('renders a button with the provided children', () => {
    const children = <span>Click me</span>;
    render(<Button>{children}</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toContainHTML('<span>Click me</span>');
  });

  it('calls the provided function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call the provided function when loading is true', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading={true} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('does not call the provided function when disabled is true', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled={true} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('renders a button with the provided className', () => {
    const className = 'my-class';
    render(<Button className={className} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(className);
  });

  it('renders a button with the default variant class when no variant is provided', () => {
    const className = 'btn-default';
    render(<Button className={className} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-default');
  });

  it('renders a button with the provided variant class', () => {
    const variant = 'primary';
    const className = `btn-${variant}`;
    render(<Button variant={variant} className={className} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(`btn-${variant}`);
  });

  it('renders a button with the provided attributes', () => {
    const dataTestId = 'my-button';
    render(<Button otherAttributes={{ 'data-testid': dataTestId }} />);
    const button = screen.getByTestId(dataTestId);
    expect(button).toBeInTheDocument();
  });
});
