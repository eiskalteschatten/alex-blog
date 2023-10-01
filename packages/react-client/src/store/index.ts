import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import { reducer as ui } from './entities/ui';
import { reducer as dialogs } from './entities/dialogs';
import { reducer as account } from './entities/account';

const reducer = combineReducers({
  ui,
  dialogs,
  account,
});

export const store = configureStore({
  reducer,
});

export type State = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

// Shortcuts
export const dispatch: AppDispatch = store.dispatch.bind(store);
export const getState = store.getState.bind(store);

export default store;
