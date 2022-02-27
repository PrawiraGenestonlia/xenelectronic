import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const appStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), ...middlewares]
  });

  sagaMiddleware.run(rootSaga);
  return { store };
};
export const storeInit = (initialValue: any) => appStore(initialValue);
export const store = appStore({});
export type AppDispatch = typeof store.store.dispatch;
export type RootState = ReturnType<typeof store.store.getState>;
