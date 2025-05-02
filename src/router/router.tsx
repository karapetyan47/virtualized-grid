import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => ({
      Component: (await import('@/pages/home')).Home,
    }),
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
