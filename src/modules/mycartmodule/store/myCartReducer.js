import {createSlice} from '@reduxjs/toolkit';
import {
  checkOutMiddleWare,
  getTNCSMiddleWare,
} from './myCartMiddleware';

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

const getTNCState = {
  isLoading: false,
  error: '',
  data: [{TNCMsg: '', NoteMsg: ''}],
};

const getTNCReducer = createSlice({
  name: 'getTNCS',
  initialState: getTNCState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTNCSMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getTNCSMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTNCSMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getCartDataReducer = createSlice({
  name: 'cartData',
  initialState: {data: []},
  reducers: {
    updateCartData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {updateCartData} = getCartDataReducer.actions;

export const checkOutReducers = checkOutReducer.reducer;
export const getTNCReducers = getTNCReducer.reducer;
export const getCartDataReducers = getCartDataReducer.reducer;
