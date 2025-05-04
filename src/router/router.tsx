import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => ({
      Component: (await import('@/pages/home')).Home,
    }),
  },
  {
    path: '/:id',
    lazy: async () => ({
      Component: (await import('@/pages/photo')).Photo,
    }),
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
