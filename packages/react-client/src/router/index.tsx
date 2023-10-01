import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import loadable from '@/lib/loadable';
import MainLayout from '@/layouts/Main';

const Dashboard = loadable(React.lazy(() => import('../pages/Dashboard')));
const AccountSettings = loadable(React.lazy(() => import('../pages/AccountSettings')));
const NotFound = loadable(React.lazy(() => import('../pages/NotFound')));

const router = createBrowserRouter([
  {
    path: '/',
    element: (<MainLayout />),
    children: [
      {
        path: '',
        element: <Dashboard />,
        // loader: teamLoader,
      },
      {
        path: '/account',
        element: (<AccountSettings />),
      },
    ],
  },
  {
    path: '/login',
    element: <Navigate replace to='/' />,
  },
  {
    path: '/register',
    element: <Navigate replace to='/' />,
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  },
]);

export default router;
