import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GET_DINING_LIST,
  GET_ORDER_DETAILS,
  MY_ORDER_HISTORY,
  MY_ORDER_UP_COMINNG,
} from '../../../actions/actions';
import {
  getDiningListApi,
  getHistoryOrdersApi,
  getOrderDetailsApi,
  getUpComingOrderApi,
} from '../../../routes/apiRoutes';

export const getUpComingOrderMiddleWare = createAsyncThunk(
  MY_ORDER_UP_COMINNG,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getUpComingOrderApi);
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getHistoryOrdersMiddleWare = createAsyncThunk(
  MY_ORDER_HISTORY,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getHistoryOrdersApi);
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getOrderDetailsMiddleWare = createAsyncThunk(
  GET_ORDER_DETAILS,
  async ({OrderID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getOrderDetailsApi, {
        params: {
          OrderID,
        },
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getDiningListMiddleWare = createAsyncThunk(
  GET_DINING_LIST,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getDiningListApi);
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
