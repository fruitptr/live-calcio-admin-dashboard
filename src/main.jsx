import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IntegratedMenuDrawer from './components/IntegratedMenuDrawer.jsx';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import User from './pages/User.jsx';
import Stats from './pages/Stats.jsx';
import Subscription from './pages/Subscription.jsx';
import NotFound from './pages/NotFound.jsx';
import SignIn from './pages/SignIn.jsx';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <div>
      <IntegratedMenuDrawer />
      <ToastContainer />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/', // This route handles all paths
    element: <Layout />,
    children: [
      {
        // Explicit routes for specific pages
        path: '/',
        element: <App />
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path: '/stats',
        element: <Stats />
      },
      {
        path: '/subscription',
        element: <Subscription />
      },
      {
        path: '/login',
        element: <SignIn />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
