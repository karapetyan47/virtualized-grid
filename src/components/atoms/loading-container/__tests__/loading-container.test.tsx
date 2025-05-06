import { screen } from '@testing-library/react';

import { LoadingContainer } from '../loading-container';

import { renderWithProviders } from '@/test/utils/render-with-providers';

describe('LoadingContainer', () => {
  const loader = <span data-testid="loader">Loader</span>;
  const children = <div data-testid="children"></div>;
  it('loader should be rendered', () => {
    renderWithProviders(
      <LoadingContainer loading={true} loader={loader}>
        {children}
      </LoadingContainer>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('children should be rendered', () => {
    renderWithProviders(
      <LoadingContainer loading={false} loader={loader}>
        {children}
      </LoadingContainer>
    );

    expect(screen.getByTestId('children')).toBeInTheDocument();
  });
});
