import { screen } from '@testing-library/react';

import { StyledDiv as SkeletonPulse } from '../skeleton-pulse';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('SkeletonPulse', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<SkeletonPulse data-testid="skeleton-pulse" />);

    const skeletonPulse = screen.getByTestId('skeleton-pulse');

    expect(skeletonPulse).toHaveStyle({
      background: `linear-gradient(90deg, ${theme.colors.skeletonStart} 25%, ${theme.colors.skeletonMiddle} 50%, ${theme.colors.skeletonStart} 75%)`,
      backgroundSize: '200px 100%',
      borderRadius: '4px',
      height: '100%',
      width: '100%',
    });
  });
});
