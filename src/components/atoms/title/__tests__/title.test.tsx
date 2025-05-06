import { screen } from '@testing-library/react';

import { StyledH1 as Title } from '../title';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('Title', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(<Title data-testid="title">Title</Title>);

    const title = screen.getByTestId('title');

    expect(title).toHaveStyle({
      fontSize: theme.typography.fontSizeLarge,
      fontWeight: 700,
      margin: '0',
      color: theme.colors.textPrimary,
    });
  });
});
