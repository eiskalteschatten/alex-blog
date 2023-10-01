import React, { useLayoutEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setWindowWidth, setPrefersDarkMode } from '@/store/entities/ui';

import GlobalErrorBoundary from '@/components/GlobalErrorBoundary';
import GlobalInfo from '@/components/GlobalInfo';
import GlobalError from '@/components/GlobalError';
import GlobalLoader from '@/components/GlobalLoader';
import router from '@/router';
import authRouter from '@/router/auth';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken, refreshToken } = useAppSelector(state => state.account);
  const userIsLoggedin = user && accessToken && refreshToken;

  useLayoutEffect(() => {
    dispatch(setPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      dispatch(setPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));
    });

    const handleResize = () => dispatch(setWindowWidth(window.innerWidth));
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <GlobalErrorBoundary>
      <RouterProvider router={userIsLoggedin ? router : authRouter} />
      <GlobalInfo />
      <GlobalError />
      <GlobalLoader />
    </GlobalErrorBoundary>
  );
};

export default App;
