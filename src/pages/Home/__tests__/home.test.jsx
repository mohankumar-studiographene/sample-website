import { render, screen } from '@testing-library/react';

import { CountDown } from '@/components/general';

import Home from '..';

describe('Home component test for countdown', () => {
  it('should render countdown component correctly', () => {
    const label = 'send';
    const timer = 10;
    const { getByText } = render(<CountDown text={label} seconds={timer} />);
    expect(getByText(label)).toBeInTheDocument();
  });
});

describe('Render home component corrctly', () => {
  it('renders with the provided label', () => {
    render(<Home />);
    const element = screen.getByText('Common components');
    expect(element).toBeInTheDocument();
  });
  // Add more test cases for onClick behavior, styling, etc.
});
