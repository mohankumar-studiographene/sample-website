import { render, screen } from '@testing-library/react';

import Loader from '..';

describe('Loader component', () => {
  it('renders the text "Loading..."', () => {
    render(<Loader />);
    const text = screen.getByText('Loading...');
    expect(text).toBeInTheDocument();
  });
});
