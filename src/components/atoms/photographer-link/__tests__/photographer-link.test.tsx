import { fireEvent, screen } from '@testing-library/react';

import { StyledLink as PhotographerLink } from '../photographer-link';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('PhotographerLink', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<PhotographerLink data-testid="photographer-link" />);

    const photographerLink = screen.getByTestId('photographer-link');

    expect(photographerLink).toHaveStyle({
      color: theme.colors.link,
      textDecoration: 'none',
      transition: 'color 0.2s',
    });

    fireEvent.mouseEnter(photographerLink);

    expect(photographerLink).toHaveStyle({
      color: theme.colors.linkHover,
      textDecoration: 'underline',
    });
  });
});
