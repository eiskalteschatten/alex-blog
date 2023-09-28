import axios, { AxiosHeaders } from 'axios';
import { t } from 'i18next';

import { dispatch, getState } from '@/store';
import { logout, setAccessToken } from '@/store/entities/account';
import { setGlobalError, setIsLoading } from '@/store/entities/ui';

let loadingTimeout: NodeJS.Timeout;

const dispatchIsLoading = (isLoading: boolean) => {
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
  }

  if (isLoading) {
    loadingTimeout = setTimeout(() => dispatch(setIsLoading(isLoading)), 500);
  }
  else {
    dispatch(setIsLoading(isLoading));
  }
};

const instance = axios.create();

instance.interceptors.request.use(config => {
  const accessToken = getState().account.accessToken;

  dispatchIsLoading(true);

  if (config.headers && accessToken) {
    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
},
error => {
  dispatchIsLoading(false);
  dispatch(setGlobalError(error.message));
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  dispatchIsLoading(false);
  return response;
}, async error => {
  const config = error.config;

  const goToLogin = async (): Promise<void> => {
    config._retry = false;
    dispatch(setGlobalError(t('account:sessionExpired')));
    await dispatch(logout());
    return Promise.resolve();
  };

  dispatchIsLoading(false);

  if (error.response.status === 401 && !config._retry) {
    config._retry = true;
    const refreshToken = getState().account.refreshToken || '';

    try {
      const { data: { accessToken } } = await axios.post<{ accessToken: string }>('/api/auth/refresh-access-token', undefined, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      dispatch(setAccessToken(accessToken));

      return instance(config);
    }
    catch (_error) {
      return goToLogin();
    }
  }
  else if (error.response.status === 401) {
    return goToLogin();
  }

  dispatch(setGlobalError(error.message));
  return Promise.reject(error);
});

export default instance;
