import { screen } from '@testing-library/react';

import { Meta } from '../meta';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { theme } from '@/core/constants/theme';

describe('Meta', () => {
  it('should be rendered with correct styles', () => {
    renderWithProviders(
      <>
        <Meta.MetaInfo data-testid="meta-info" />
        <Meta.MetaItem data-testid="meta-item" />
        <Meta.MetaLabel data-testid="meta-label" />
        <Meta.MetaValue data-testid="meta-value" />
      </>
    );

    const metaInfo = screen.getByTestId('meta-info');
    const metaItem = screen.getByTestId('meta-item');
    const metaLabel = screen.getByTestId('meta-label');
    const metaValue = screen.getByTestId('meta-value');

    expect(metaInfo).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.gapSmall,
    });

    expect(metaItem).toHaveStyle({
      display: 'flex',
      alignItems: 'flex-start',
      gap: theme.spacing.gapTiny,
    });

    expect(metaLabel).toHaveStyle({
      fontWeight: 500,
      color: theme.colors.textMuted,
      minWidth: '100px',
    });

    expect(metaValue).toHaveStyle({
      color: theme.colors.textPrimary,
    });
  });
});
