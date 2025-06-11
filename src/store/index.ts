import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { listingsApi } from './slices/listings';
import { setupListeners } from '@reduxjs/toolkit/query';

const reducers = combineReducers({
  [listingsApi.reducerPath]: listingsApi.reducer,
});

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: (state, action) => reducers(state, action),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    .concat(listingsApi.middleware)
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
