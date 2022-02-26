import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAPI } from './products.api';

export interface ProductState {
  status: 'idle' | 'loading' | 'failed',
  error: string,
  [index: string]: any;
}

const initialState: ProductState = {
  status: 'idle',
  error: ''
};

export const productsSlice = createSlice({
  name: 'products',
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

export const { apiRequest, apiResponse, apiError } = productsSlice.actions;

export default productsSlice.reducer;
