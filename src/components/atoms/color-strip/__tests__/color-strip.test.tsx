import { screen } from '@testing-library/react';

import { StyledDiv as ColorStrip } from '../color-strip';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

const C_Color = '#f0f0f0';

describe('ColorStrip', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<ColorStrip data-testid="color-strip" $color={C_Color} />);

    const colorStrip = screen.getByTestId('color-strip');

    expect(colorStrip).toHaveStyle({
      width: '100%',
      height: theme.sizes.colorStripHeight,
      backgroundColor: C_Color,
    });
  });
});
