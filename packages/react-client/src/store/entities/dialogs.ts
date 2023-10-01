import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  showAddBookOrList: boolean;
}

const initialState: State = {
  showAddBookOrList: false,
};

export const slice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setShowAddBookOrList(state, action: PayloadAction<boolean>) {
      state.showAddBookOrList = action.payload;
    },
    closeAllDialogs(state) {
      state.showAddBookOrList = false;
    },
  },
});

export const {
  setShowAddBookOrList,
  closeAllDialogs,
} = slice.actions;

export const reducer = slice.reducer;
