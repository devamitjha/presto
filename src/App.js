import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Navigate
} from 'react-router';

import Layout from './Layout';
import {
  Home,
  About,
  Store,
  ServiceLayout,
  DryCleaning,
  Restoration,
  PrepaidCard,
  Blog,
  Contact,
  BookNow,
  Authorization,
  PageNotFound,
  BlogDetail
} from './pages';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <ScrollRestoration />
          <Layout />
        </>
      ),
      children: [
        { index: true, element: <Home /> },

        // Category listing
        { path: '/about', element: <About /> },
        { path: '/store', element: <Store /> },
         {
            path: "service",
            element: <ServiceLayout />,
            children: [
              { index: true, element: <Navigate to="/service/dry-cleaning" replace /> }, 
              { path: "dry-cleaning", element: <DryCleaning /> },
              { path: "shoes-and-bag-restoration", element: <Restoration /> },
            ],
          }, 
        { path: '/prepaid-card', element: <PrepaidCard /> },
        { path: '/contact', element: <Contact /> },
        { path: '/book-now', element: <BookNow /> },
        { path: '/authorization', element: <Authorization /> },
        { path: '/blog', element: <Blog /> },
        { path: '/blog/:id', element: <BlogDetail /> },
        // Fallback
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
