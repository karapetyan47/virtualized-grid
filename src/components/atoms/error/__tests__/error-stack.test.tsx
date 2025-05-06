import { screen } from '@testing-library/react';

import { Error } from '../error';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('ErrorStack', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<Error.ErrorStack data-testid="error-stack">Error</Error.ErrorStack>);
    const errorStack = screen.getByTestId('error-stack');

    expect(errorStack).toHaveStyle({
      padding: theme.spacing.gapMedium,
      borderRadius: theme.radius.sm,
      overflowX: 'auto',
      width: '100%',
      fontSize: '0.85rem',
    });
  });
});
