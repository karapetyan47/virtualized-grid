import { screen } from '@testing-library/react';

import { StyledDiv as FallbackGridPhoto } from '../fallback-grid-photo';

import { renderWithProviders } from '@/test/utils/render-with-providers';

const C_Color = 'red';

describe('FallbackGridPhoto', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(
      <FallbackGridPhoto $avgColor={C_Color} data-testid="fallback-grid-photo" />
    );

    const fallbackGridPhoto = screen.getByTestId('fallback-grid-photo');

    expect(fallbackGridPhoto).toHaveStyle({
      width: '100%',
      height: '100%',
      backgroundColor: C_Color,
    });
  });
});
