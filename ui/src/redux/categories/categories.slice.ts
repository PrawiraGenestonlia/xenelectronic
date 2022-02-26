import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAPI } from './categories.api';

export interface CategoriesState {
  status: 'idle' | 'loading' | 'failed',
  error: string,
  [index: string]: any;
}

const initialState: CategoriesState = {
  status: 'idle',
  error: ''
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    apiRequest: (state, action: PayloadAction<{ key: IAPI, query?: Object, body?: Object, path?: Object }>) => {
      state.status = 'loading';
      state.error = '';
    },
    apiResponse: (state, action: AnyAction) => {
      state.status = 'idle';
      state.error = '';
      state[action.key] = action.response;
    },
    apiError: (state, action: AnyAction) => {
      state.error = action.message;
      state.status = 'failed';
    }
  }
});

export const { apiRequest, apiResponse, apiError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
