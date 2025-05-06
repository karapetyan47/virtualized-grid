import { screen } from '@testing-library/react';

import { Error } from '../error';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('ErrorContainer', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(
      <>
        <Error.ErrorContainer data-testid="error-container" />
        <Error.ErrorHeading data-testid="error-heading">Error</Error.ErrorHeading>
        <Error.ErrorMessage data-testid="error-message">Error</Error.ErrorMessage>
        <Error.ErrorStack data-testid="error-stack">Error</Error.ErrorStack>
      </>
    );

    const errorContainer = screen.getByTestId('error-container');
    const errorHeading = screen.getByTestId('error-heading');
    const errorMessage = screen.getByTestId('error-message');
    const errorStack = screen.getByTestId('error-stack');

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

    expect(errorHeading).toHaveStyle({
      color: theme.colors.danger,
    });

    expect(errorMessage).toHaveStyle({
      textAlign: 'center',
      marginBottom: theme.spacing.gapMedium,
    });

    expect(errorStack).toHaveStyle({
      padding: theme.spacing.gapMedium,
      borderRadius: theme.radius.sm,
      overflowX: 'auto',
      width: '100%',
      fontSize: '0.85rem',
    });
  });
});
