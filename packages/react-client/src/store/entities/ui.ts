import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  windowWidth: number;
  prefersDarkMode: boolean;
  isLoading: boolean;
  mobileSidebarOpen: boolean;
  globalInfo?: string;
  globalError?: string;
}

const initialState: State = {
  windowWidth: window.innerWidth,
  prefersDarkMode: false,
  isLoading: false,
  mobileSidebarOpen: false,
};

export const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setWindowWidth(state, action: PayloadAction<number>) {
      state.windowWidth = action.payload;
    },
    setPrefersDarkMode(state, action: PayloadAction<boolean>) {
      state.prefersDarkMode = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload;
    },
    setGlobalInfo(state, action: PayloadAction<string>) {
      state.globalInfo = action.payload;
    },
    setGlobalError(state, action: PayloadAction<string>) {
      state.globalError = action.payload;
    },
  },
});

export const {
  setWindowWidth,
  setPrefersDarkMode,
  setIsLoading,
  setMobileSidebarOpen,
  setGlobalInfo,
  setGlobalError,
} = slice.actions;

export const reducer = slice.reducer;
