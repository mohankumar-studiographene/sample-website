import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const About = lazy(() => import('@/pages/About'));
const Home = lazy(() => import('@/pages/Home'));
const Passengers = lazy(() => import('@/pages/Passengers'));
const NotFound = lazy(() => import('@/pages/NotFound'));

import ROUTE_NAME from './utils/url-constant';

function AppRoutes() {
  const element = useRoutes([
    // These are the same as the props you provide to <Route>
    {
      path: ROUTE_NAME.HOME,
      element: <Home />,
    },
    {
      path: ROUTE_NAME.ABOUT,
      element: <About />,
    },
    {
      path: ROUTE_NAME.PASSENGERS,
      element: <Passengers />,
    },
    // Not found routes work as you'd expect
    { path: '*', element: <NotFound /> },
  ]);

  // The returned element will render the entire element
  // hierarchy with all the appropriate context it needs
  return element;
}

export default AppRoutes;
