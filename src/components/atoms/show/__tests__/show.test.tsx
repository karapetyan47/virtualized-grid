import { screen } from '@testing-library/react';

import { Show } from '../show';

import { renderWithProviders } from '@/test/utils/render-with-providers';

describe('Show', () => {
  const children = <div data-testid="children" />;
  const fallback = <div data-testid="fallback" />;
  it('should show children', () => {
    renderWithProviders(
      <Show visible fallback={fallback}>
        {children}
      </Show>
    );

    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should show fallback', () => {
    renderWithProviders(
      <Show visible={false} fallback={fallback}>
        {children}
      </Show>
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });
});
