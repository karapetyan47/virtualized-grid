import { screen } from '@testing-library/react';

import { StyledImage as Photo } from '../photo';

import { renderWithProviders } from '@/test/utils/render-with-providers';

describe('Photo', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<Photo $loaded={true} $placeholder={false} data-testid="photo" />);

    const photo = screen.getByTestId('photo');

    expect(photo).toHaveStyle({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'none',
      opacity: 1,
      transition: 'opacity 0.3s ease-in-out,filter 0.3s ease-in-out',
    });
  });
});
