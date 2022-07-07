import {createSlice} from '@reduxjs/toolkit';
import {checkCartExistMiddleWare, checkOutMiddleWare} from './myCartMiddleware';

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

const checkCartExistState = {
  isLoading: false,
  error: '',
};

const checkCartExistReducer = createSlice({
  name: 'checkCartExist',
  initialState: checkCartExistState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkCartExistMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(checkCartExistMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(checkCartExistMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const checkOutReducers = checkOutReducer.reducer;
export const checkCartExistReducers = checkCartExistReducer.reducer;
