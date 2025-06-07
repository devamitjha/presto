import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from 'react-router';

import Layout from './Layout';
import {
  Home,
  About,
  Store,
  Service,
  PrepaidCard,
  Blog,
  Contact,
  Login,
  Register,
  PageNotFound,
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
        { path: '/service', element: <Service /> },
        { path: '/prepaid-card', element: <PrepaidCard /> },
        { path: '/contact', element: <Contact /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/blog', element: <Blog /> },
        // Fallback
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
