import { screen } from '@testing-library/react';

import { StyledDiv as GridPhotoInfo } from '../grid-photo-info';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('GridPhotoInfo', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<GridPhotoInfo data-testid="grid-photo-info" />);

    const container = screen.getByTestId('grid-photo-info');

    expect(container).toHaveStyle({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: `linear-gradient(transparent, ${theme.colors.shadow})`,
      color: theme.colors.background,
      padding: theme.spacing.gapSmall,
      opacity: 0,
      transition: 'opacity 0.2s ease-in-out',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.gapTiny,
    });
  });
});
