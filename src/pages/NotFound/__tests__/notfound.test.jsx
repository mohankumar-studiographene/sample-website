import { render, screen } from '@testing-library/react';

import NotFound from '..';

describe('Notfound component', () => {
  it('should render Notfound component correctly', () => {
    render(<NotFound />);
    const element = screen.getByText('Page not found');
    expect(element).toBeInTheDocument();
  });
});
