import { screen } from '@testing-library/react';

import { StyledDiv as PhotoContainer } from '../photo-container';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('PhotoContainer', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<PhotoContainer data-testid="photo-container" />);

    const photoContainer = screen.getByTestId('photo-container');

    expect(photoContainer).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.gapLarge,
      maxWidth: '1200px',
      margin: '0 auto',
    });
  });
});
