import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Button from '../../../components/general/Button';

describe('Contact us button component', () => {
  it('renders with the provided label', () => {
    const label = 'Contact us';
    const { getByText } = render(<Button label={label} />);
    expect(getByText(label)).toBeInTheDocument();
  });
  // Add more test cases for onClick behavior, styling, etc.
});
