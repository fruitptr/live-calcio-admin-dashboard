import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import authStore from './store/store.js';
import router from './Router.jsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={authStore}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
