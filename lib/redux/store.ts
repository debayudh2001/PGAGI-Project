import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import contentReducer from './slices/contentSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
