import { screen } from '@testing-library/react';

import { StyledDiv as ImageRelativeContainer } from '../image-relative-container';

import { renderWithProviders } from '@/test/utils/render-with-providers';

describe('ImageRelativeContainer', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<ImageRelativeContainer data-testid="image-relative-container" />);

    const imageRelativeContainer = screen.getByTestId('image-relative-container');

    expect(imageRelativeContainer).toHaveStyle({
      position: 'relative',
      width: '100%',
      height: '0',
      paddingBottom: '150%',
    });
  });
});
