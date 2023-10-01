import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import loadable from '@/lib/loadable';
import LoginRegistration from '@/layouts/LoginRegistration';

const Login = loadable(React.lazy(() => import('../pages/Login')));
const Register = loadable(React.lazy(() => import('../pages/Register')));

const router = createBrowserRouter([
  {
    path: '/',
    element: (<LoginRegistration />),
    children: [
      {
        path: '',
        element: <Navigate replace to='/login' />,
      },
      {
        path: 'login',
        element: (<Login />),
      },
      {
        path: 'register',
        element: (<Register />),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to='/login' />,
  },
]);

export default router;
