import { screen } from '@testing-library/react';

import { StyledDiv as Container } from '../container';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('Container', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<Container data-testid="container" />);

    const container = screen.getByTestId('container');

    expect(container).toHaveStyle({
      width: '100%',
      minHeight: '100vh',
      padding: theme.spacing.containerPaddingMobile,
      backgroundColor: theme.colors.background,
    });
  });
});
