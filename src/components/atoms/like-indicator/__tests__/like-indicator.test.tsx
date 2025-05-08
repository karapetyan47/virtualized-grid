import { screen } from '@testing-library/react';

import { StyledDiv as LikeIndicator } from '../like-indicator';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('LikeIndicator', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(
      <>
        <LikeIndicator $liked={false} data-testid="liked-indicator" />
        <LikeIndicator $liked={true} data-testid="like-indicator" />
      </>
    );

    const likeIndicator = screen.getByTestId('liked-indicator');
    const likedIndicator = screen.getByTestId('like-indicator');

    expect(likeIndicator).toHaveStyle({
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      width: theme.sizes.likeSize,
      height: theme.sizes.likeSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.likeNeutral,
      borderRadius: theme.radius.round,
      color: theme.colors.textPrimary,
      boxShadow: `0 2px 8px ${theme.colors.shadow}`,
    });

    expect(likedIndicator).toHaveStyle({
      backgroundColor: theme.colors.liked,
      color: 'white',
    });
  });
});
