import { screen } from '@testing-library/react';

import { Error } from '../error';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('ErrorContainer: should be rendered with correct styles', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<Error.ErrorContainer data-testid="error-container" />);

    const errorContainer = screen.getByTestId('error-container');

    expect(errorContainer).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.gapLarge,
      margin: `${theme.spacing.gapLarge} auto`,
      maxWidth: '800px',
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.md,
      // boxShadow: `0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px ${theme.colors.shadow}`,
    });
  });
});
