import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GET_DINING_DETAILS,
  GET_DINING_LIST,
  GET_ORDER_DETAILS,
  MY_ORDER_HISTORY,
  MY_ORDER_UP_COMINNG,
  UPLOAD_BILL,
} from '../../../actions/actions';
import {
  getDiningDetailsApi,
  getDiningListApi,
  getHistoryOrdersApi,
  getOrderDetailsApi,
  getUpComingOrderApi,
  uploadBillApi,
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

export const uploadBillMiddleWare = createAsyncThunk(
  UPLOAD_BILL,
  async ({fromData}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(uploadBillApi, fromData, {
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

export const getDiningDetailsMiddleWare = createAsyncThunk(
  GET_DINING_DETAILS,
  async ({DiningBookingID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getDiningDetailsApi, {
        params: {DiningBookingID},
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
