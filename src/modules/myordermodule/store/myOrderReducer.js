import {createSlice} from '@reduxjs/toolkit';
import {
  getHistoryOrdersMiddleWare,
  getOrderDetailsMiddleWare,
  getUpComingOrderMiddleWare,
} from './myOrderMiddleware';

const getUpComingOrderState = {
  isLoading: false,
  error: '',
  data: [],
};

const getUpComingOrderReducer = createSlice({
  name: 'getUpComingOrder',
  initialState: getUpComingOrderState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUpComingOrderMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getUpComingOrderMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getUpComingOrderMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getHistoryOrdersState = {
  isLoading: false,
  error: '',
  data: [],
};

const getHistoryOrdersReducer = createSlice({
  name: 'getHistoryOrders',
  initialState: getHistoryOrdersState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getHistoryOrdersMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getHistoryOrdersMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getHistoryOrdersMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getOrderDetailsState = {
  isLoading: false,
  error: '',
  data: [],
};

const getOrderDetailsReducer = createSlice({
  name: 'getOrderDetails',
  initialState: getOrderDetailsState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrderDetailsMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getOrderDetailsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getOrderDetailsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getUpComingOrderReducers = getUpComingOrderReducer.reducer;
export const getOrderDetailsReducers = getOrderDetailsReducer.reducer;
export const getHistoryOrdersReducers = getHistoryOrdersReducer.reducer;
