import { screen } from '@testing-library/react';

import { StyledDiv as GridContainer } from '../grid-container';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { C_Gap } from '@/core/constants/grid';

describe('GridContainer', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<GridContainer data-testid="grid-container" />);

    const gridContainer = screen.getByTestId('grid-container');

    expect(gridContainer).toHaveStyle({
      height: `calc(100vh - 20px - 5rem)`,
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
      padding: `0 ${C_Gap}px`,
      margin: '10px 0',
    });
  });
});
