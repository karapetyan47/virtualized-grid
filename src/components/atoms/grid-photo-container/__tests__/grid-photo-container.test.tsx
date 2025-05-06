import { fireEvent, screen } from '@testing-library/react';

import { StyledDiv as GridPhotoContainer } from '../grid-photo-container';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

const C_Dimensions = {
  width: 200,
  height: 300,
};

const C_Positions = {
  top: 27,
  left: 12,
};

describe('GridPhotoContainer', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(
      <GridPhotoContainer
        data-testid="grid-photo-container"
        $top={C_Positions.top}
        $left={C_Positions.left}
        $width={C_Dimensions.width}
        $height={C_Dimensions.height}
      />
    );

    const container = screen.getByTestId('grid-photo-container');

    expect(container).toHaveStyle({
      position: 'absolute',
      overflow: 'hidden',
      transition: 'transform 0.2s ease-in-out',
      willChange: 'transform',
      cursor: 'pointer',
      borderRadius: theme.radius.md,
      outline: 'none',
      top: `${C_Positions.top}px`,
      left: `${C_Positions.left}px`,
      width: `${C_Dimensions.width}px`,
      height: `${C_Dimensions.height}px`,
    });

    fireEvent.mouseEnter(container);

    expect(container).toHaveStyle({
      transform: 'scale(1.02)',
    });
  });
});
