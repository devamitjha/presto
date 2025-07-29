import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Navigate
} from 'react-router';

import Layout from './Layout';
// const Home = lazy(() => import('./pages/Home'));
// const About = lazy(() => import('./pages/About'));
// const Store = lazy(() => import('./pages/Store'));
// const ServiceLayout = lazy(() => import('./pages/ServiceLayout'));
// const DryCleaning = lazy(() => import('./pages/DryCleaning'));
// const Restoration = lazy(() => import('./pages/Restoration'));
// const PrepaidCard = lazy(() => import('./pages/PrepaidCard'));
// const Blog = lazy(() => import('./pages/Blog'));
// const BlogDetail = lazy(() => import('./pages/BlogDetail'));
// const Contact = lazy(() => import('./pages/Contact'));
// const BookNow = lazy(() => import('./pages/BookNow'));
// const Authorization = lazy(() => import('./pages/Authorization'));
// const PageNotFound = lazy(() => import('./pages/PageNotFound'));

import {
  Home,
  About,
  Store,
  ServiceLayout,
  BlogLayout,
  DryCleaning,
  Restoration,
  PrepaidCard,
  Blog,
  DrycleaningLaundry,
  ShoesBAGCare,
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

        {
          path: "blog",
          element: <BlogLayout />,
          children: [
            { index: true, element: <Blog /> }, 
            { path: "dry-cleaning-and-laundry", element: <DrycleaningLaundry /> },
            { path: "shoes-and-bag-care", element: <ShoesBAGCare /> },
          ],
        }, 
        { path: '/blog/:category/:id', element: <BlogDetail /> },
        // Fallback
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: (
//         <>
//           <ScrollRestoration />
//           <Layout />
//         </>
//       ),
//       children: [
//         {
//           index: true,
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <Home />
//             </Suspense>
//           ),
//         },
//         {
//           path: '/about',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <About />
//             </Suspense>
//           ),
//         },
//         {
//           path: '/store',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <Store />
//             </Suspense>
//           ),
//         },
//         {
//           path: 'service',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <ServiceLayout />
//             </Suspense>
//           ),
//           children: [
//             { index: true, element: <Navigate to="/service/dry-cleaning" replace /> },
//             {
//               path: 'dry-cleaning',
//               element: (
//                 <Suspense fallback={<div>Loading...</div>}>
//                   <DryCleaning />
//                 </Suspense>
//               ),
//             },
//             {
//               path: 'shoes-and-bag-restoration',
//               element: (
//                 <Suspense fallback={<div>Loading...</div>}>
//                   <Restoration />
//                 </Suspense>
//               ),
//             },
//           ],
//         },
//         {
//           path: '/prepaid-card',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <PrepaidCard />
//             </Suspense>
//           ),
//         },
//         {
//           path: '/contact',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <Contact />
//             </Suspense>
//           ),
//         },
//         {
//           path: '/book-now',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <BookNow />
//             </Suspense>
//           ),
//         },
//         {
//           path: '/authorization',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <Authorization />
//             </Suspense>
//           ),
//         },
//         {
//           path: '/blog',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <Blog />
//             </Suspense>
//           ),
//         },
//         {
//           path: '/blog/:id',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <BlogDetail />
//             </Suspense>
//           ),
//         },
//         {
//           path: '*',
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <PageNotFound />
//             </Suspense>
//           ),
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

export default App;
