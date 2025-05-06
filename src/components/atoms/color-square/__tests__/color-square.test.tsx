import { screen } from '@testing-library/react';

import { StyledDiv as ColorSquare } from '../color-square';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

const C_Color = '#f0f0f0';

describe('ColorSquare', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<ColorSquare data-testid="color-square" $color={C_Color} />);

    const colorSquare = screen.getByTestId('color-square');

    expect(colorSquare).toHaveStyle({
      width: '1rem',
      height: '1rem',
      borderRadius: '2px',
      border: `1px solid ${theme.colors.shadow}`,
      backgroundColor: C_Color,
    });
  });
});
