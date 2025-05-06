import { screen } from '@testing-library/react';

import { StyledDiv as InfoSection } from '../info-section';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('InfoSection', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<InfoSection data-testid="info-section" />);

    const container = screen.getByTestId('info-section');

    expect(container).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.gapMedium,
      flex: 1,
    });
  });
});
