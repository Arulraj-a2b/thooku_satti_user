import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GET_CUSTOMER_INFO,
  GET_MARKET_ORDER,
  GET_MARKET_ORDER_LIST,
  SAVE_MARKET_ORDER,
} from '../../../actions/actions';
import {
  getCustomerInfoApi,
  getMarketOrderListApi,
  getMarketOrdersApi,
  saveMarketOrderApi,
} from '../../../routes/apiRoutes';

export const getCustomerInfoMiddleWare = createAsyncThunk(
  GET_CUSTOMER_INFO,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getCustomerInfoApi);
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const saveMarketOrderMiddleWare = createAsyncThunk(
  SAVE_MARKET_ORDER,
  async ({formData}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(saveMarketOrderApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getMarketOrdersMiddleWare = createAsyncThunk(
  GET_MARKET_ORDER,
  async ({Orderno}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getMarketOrdersApi, {
        params: {
          Orderno,
        },
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getMarketOrderListMiddleWare = createAsyncThunk(
  GET_MARKET_ORDER_LIST,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getMarketOrderListApi);
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
