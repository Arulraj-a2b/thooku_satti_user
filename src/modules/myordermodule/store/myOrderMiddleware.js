import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {GET_ORDER_DETAILS, MY_ORDER_HISTORY, MY_ORDER_UP_COMINNG} from '../../../actions/actions';
import {getHistoryOrdersApi, getOrderDetailsApi, getUpComingOrderApi} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const getUpComingOrderMiddleWare = createAsyncThunk(
  MY_ORDER_UP_COMINNG,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getUpComingOrderApi);
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
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
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getOrderDetailsMiddleWare = createAsyncThunk(
  GET_ORDER_DETAILS,
  async ({OrderID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getOrderDetailsApi,{params:{
        OrderID
      }});
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
