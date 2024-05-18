import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import Stats from './pages/Stats.jsx';
import Subscription from './pages/Subscription.jsx';
import NotFound from './pages/NotFound.jsx';
import User from './pages/User.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
    index: true
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/User',
        element: <User />
      },
      {
        path: '/Subscription',
        element: <Subscription />
      },
      {
        path: '/Stats',
        element: <Stats />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
