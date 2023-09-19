import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';
import axios from 'axios';
import type { ChangePasswordData, SerializedUser, UserLoginReply, UserRegistration, UserUpdate } from '@frb/shared';

import customAxios from '@/lib/axios';
import { setGlobalInfo } from './ui';

export interface State {
  user?: SerializedUser;
  accessToken?: string;
  refreshToken?: string;
  isLoading: boolean;
  accountError?: string;
}

const localStorageUser = localStorage.getItem('user');

const initialState: State = {
  isLoading: false,
  user: localStorageUser && JSON.parse(localStorageUser),
  accessToken: localStorage.getItem('accessToken') || undefined,
  refreshToken: localStorage.getItem('refreshToken') || undefined,
};

export interface LoginData {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'account/login',
  async (loginData: LoginData, thunkAPI) => {
    const { data } = await axios.post<UserLoginReply>('/api/auth/login', loginData);
    return data;
  }
);

export const logout = createAsyncThunk(
  'account/logout',
  async (_, thunkAPI) => {
    await customAxios.post<UserLoginReply>('/api/auth/logout');
    // TODO
    // thunkAPI.dispatch(removeAllData());
  }
);

export const register = createAsyncThunk(
  'account/register',
  async (registrationData: UserRegistration, thunkAPI) => {
    const { data } = await axios.post<UserLoginReply>('/api/user/register', { registrationData });
    return data;
  }
);

export const update = createAsyncThunk(
  'account/updateSelf',
  async (updateData: UserUpdate, thunkAPI) => {
    const { data } = await customAxios.put<{ user: SerializedUser }>('/api/user/self', { updateData });
    thunkAPI.dispatch(setGlobalInfo(t('account:accountInfoUpdatedSuccessfully')));
    return data;
  }
);

export const changePassword = createAsyncThunk(
  'account/changePassword',
  async (passwordData: ChangePasswordData, thunkAPI) => {
    await customAxios.patch('/api/user/self-password', { passwordData });
    thunkAPI.dispatch(setGlobalInfo(t('account:passwordChangedSuccessfully')));
  }
);


export const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SerializedUser>) {
      state.user = action.payload;
      localStorage.setItem('user',  JSON.stringify(action.payload));
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
    logout(state) {
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
    clearAccountError(state) {
      state.accountError = undefined;
    },
  },
  extraReducers(builder) {
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));

      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);

      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('refreshToken', action.payload.refreshToken);

      state.isLoading = false;
      state.accountError = undefined;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.accountError = t('account:invalidEmailOrPassword');
      state.isLoading = false;
      console.error(action.error);
    });


    // Logout
    builder.addCase(logout.fulfilled, state => {
      state.user = undefined;
      localStorage.removeItem('user');

      state.accessToken = undefined;
      localStorage.removeItem('accessToken');

      state.refreshToken = undefined;
      localStorage.removeItem('refreshToken');

      state.accountError = undefined;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.user = undefined;
      localStorage.removeItem('user');

      state.accessToken = undefined;
      localStorage.removeItem('accessToken');

      state.refreshToken = undefined;
      localStorage.removeItem('refreshToken');

      console.error(action.error);
    });


    // Registration
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));

      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);

      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('refreshToken', action.payload.refreshToken);

      state.isLoading = false;
      state.accountError = undefined;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.accountError = t('errors:anErrorOccurred');
      state.isLoading = false;
      console.error(action.error);
    });


    // Update
    builder.addCase(update.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(update.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));

      state.isLoading = false;
      state.accountError = undefined;
    });

    builder.addCase(update.rejected, (state, action) => {
      state.accountError = t('errors:anErrorOccurred');
      state.isLoading = false;
      console.error(action.error);
    });


    // Change Password
    builder.addCase(changePassword.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accountError = undefined;
    });

    builder.addCase(changePassword.rejected, (state, action) => {
      state.accountError = t('errors:anErrorOccurred');
      state.isLoading = false;
      console.error(action.error);
    });
  },
});

export const {
  setUser,
  setAccessToken,
  setRefreshToken,
  clearAccountError,
} = slice.actions;

export const reducer = slice.reducer;
