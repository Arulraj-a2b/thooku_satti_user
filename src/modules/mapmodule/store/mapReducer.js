import {createSlice} from '@reduxjs/toolkit';
import {getAddressMiddleWare} from './mapMiddleware';

const initialState = {
  isLoading: false,
  error: '',
  data: {},
};

const getAddressReducer = createSlice({
  name: 'getAddress',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAddressMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getAddressMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAddressMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getAddressReducers = getAddressReducer.reducer;
