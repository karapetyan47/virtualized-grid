import { screen } from '@testing-library/react';

import { StyledDiv as LoadMoreTrigger } from '../load-more-trigger';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('LoadMoreTrigger', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<LoadMoreTrigger data-testid="load-more-trigger" />);

    const loadMoreTrigger = screen.getByTestId('load-more-trigger');

    expect(loadMoreTrigger).toHaveStyle({
      height: theme.sizes.loadMoreTriggerHeight,
    });
  });
});
