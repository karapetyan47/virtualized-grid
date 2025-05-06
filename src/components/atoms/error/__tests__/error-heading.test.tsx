import { screen } from '@testing-library/react';

import { Error } from '../error';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('ErrorHeading', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<Error.ErrorHeading data-testid="error-heading">Error</Error.ErrorHeading>);
    const errorHeading = screen.getByTestId('error-heading');

    expect(errorHeading).toHaveStyle({
      color: theme.colors.danger,
    });
  });
});
