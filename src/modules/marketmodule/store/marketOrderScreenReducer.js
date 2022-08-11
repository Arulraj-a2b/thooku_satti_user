import {createSlice} from '@reduxjs/toolkit';
import {
  getCustomerInfoMiddleWare,
  getMarketOrdersMiddleWare,
  saveMarketOrderMiddleWare,
} from './marketOrderScreenMiddleware';

const getCustomerInfoState = {
  isLoading: false,
  error: '',
  data: {},
};

const getCustomerInfoReducer = createSlice({
  name: 'getCustomerInfo',
  initialState: getCustomerInfoState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCustomerInfoMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getCustomerInfoMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload[0];
    });
    builder.addCase(getCustomerInfoMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getMarketOrderState = {
  isLoading: false,
  error: '',
  data: {},
};

const getMarketOrderReducer = createSlice({
  name: 'getMarketOrders',
  initialState: getMarketOrderState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMarketOrdersMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getMarketOrdersMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload[0];
    });
    builder.addCase(getMarketOrdersMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const saveMarketOrderState = {
  isLoading: false,
  error: '',
  data: {},
};

const saveMarketOrderReducer = createSlice({
  name: 'saveMarketOrder',
  initialState: saveMarketOrderState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(saveMarketOrderMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(saveMarketOrderMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload[0];
    });
    builder.addCase(saveMarketOrderMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getCustomerInfoReducers = getCustomerInfoReducer.reducer;
export const getMarketOrderReducers = getMarketOrderReducer.reducer;
export const saveMarketOrderReducers = saveMarketOrderReducer.reducer;
