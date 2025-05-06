import { screen } from '@testing-library/react';

import { StyledDiv as PhotoWrapper } from '../photo-wrapper';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('PhotoWrapper', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<PhotoWrapper data-testid="photo-wrapper" />);

    const photoWrapper = screen.getByTestId('photo-wrapper');

    expect(photoWrapper).toHaveStyle({
      position: 'relative',
      borderRadius: theme.radius.md,
      overflow: 'hidden',
      boxShadow: `0 4px 12px ${theme.colors.shadow}`,
      flex: 2,
    });
  });
});
