import { screen } from '@testing-library/react';

import { Error } from '../error';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('ErrorMessage', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<Error.ErrorMessage data-testid="error-message">Error</Error.ErrorMessage>);
    const errorMessage = screen.getByTestId('error-message');

    expect(errorMessage).toHaveStyle({
      textAlign: 'center',
      marginBottom: theme.spacing.gapMedium,
    });
  });
});
