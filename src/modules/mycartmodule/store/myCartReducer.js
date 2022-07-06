import {createSlice} from '@reduxjs/toolkit';
import {checkOutMiddleWare} from './myCartMiddleware';

const checkOutState = {
  isLoading: false,
  error: '',
  data: [{OrderID: ''}],
};

const checkOutReducer = createSlice({
  name: 'checkOut',
  initialState: checkOutState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkOutMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(checkOutMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(checkOutMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const checkOutReducers = checkOutReducer.reducer;
