import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

import { ErrorBoundary } from '@/core/layouts/error-boundary';

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        lazy: async () => ({
          Component: (await import('@/pages/gallery')).Gallery,
        }),
      },
      {
        path: '/:id',
        lazy: async () => ({
          Component: (await import('@/pages/photo')).Photo,
        }),
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
