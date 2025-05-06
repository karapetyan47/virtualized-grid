import { screen } from '@testing-library/react';

import { StyledDiv as ImageContainer } from '../image-container';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

const C_Dimensions = {
  width: 300,
  height: 400,
};

describe('ImageContainer', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(
      <ImageContainer
        data-testid="image-container"
        $width={C_Dimensions.width}
        $height={C_Dimensions.height}
      />
    );

    const imageContainer = screen.getByTestId('image-container');

    expect(imageContainer).toHaveStyle({
      position: 'relative',
      maxHeight: theme.sizes.maxImageHeight,
      minHeight: '300px',
      maxWidth: `calc(${C_Dimensions.width} / ${C_Dimensions.height} * ${theme.sizes.maxImageHeight})`,
      minWidth: `calc(${C_Dimensions.width} / ${C_Dimensions.height} * 300px)`,
      margin: '0 auto',
    });
  });
});
