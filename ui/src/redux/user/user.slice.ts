import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAPI } from './user.api';

export interface CartState {
  status: 'idle' | 'loading' | 'failed',
  error: string,
  [index: string]: any;
}

const initialState: CartState = {
  status: 'idle',
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
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

export const { apiRequest, apiResponse, apiError } = userSlice.actions;

export default userSlice.reducer;
