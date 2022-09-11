import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayoutSuspense from 'components/elements/MainLayoutSuspense';

import ListsRouter from './Lists';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Account = React.lazy(() => import('../pages/Account'));
const FourOhFour = React.lazy(() => import('../pages/FourOhFour'));

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={
        <MainLayoutSuspense>
          <Dashboard />
        </MainLayoutSuspense>
      } />

      <Route path='/lists/*' element={<ListsRouter />} />

      <Route path='/settings' element={
        <MainLayoutSuspense>
          <Settings />
        </MainLayoutSuspense>
      } />

      <Route path='/account' element={
        <MainLayoutSuspense>
          <Account />
        </MainLayoutSuspense>
      } />

      <Route path='*' element={
        <MainLayoutSuspense>
          <FourOhFour />
        </MainLayoutSuspense>
      } />
    </Routes>
  );
};

export default MainRouter;
