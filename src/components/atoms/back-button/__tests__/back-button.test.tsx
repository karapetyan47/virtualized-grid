import { fireEvent, screen } from '@testing-library/react';

import { StyledButton as BackButton } from '../back-button';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('BackButton', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<BackButton />);

    const button = screen.getByRole('button');

    expect(button).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.gapTiny,
      background: 'none',
      border: 'none',
      fontSize: '1rem',
      color: theme.colors.textPrimary,
      cursor: 'pointer',
      padding: `${theme.spacing.gapTiny} 0`,
      marginBottom: theme.spacing.gapMedium,
      transition: 'color 0.2s',
    });

    fireEvent.mouseEnter(button);

    expect(button).toHaveStyle({
      color: theme.colors.link,
    });
  });
});
