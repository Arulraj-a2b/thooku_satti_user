import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CHECK_CART,
  CHECK_OUT,
  DELETE_CART,
  DELETE_CART_LIST,
} from '../../../actions/actions';
import {
  checkCartExistApi,
  checkOutApi,
  deleteCartApi,
  deleteCartListApi,
} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const deleteCartListMiddleWare = createAsyncThunk(
  DELETE_CART_LIST,
  async ({HotelID, ItemID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(deleteCartListApi, {
        HotelID,
        ItemID,
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const deleteCartMiddleWare = createAsyncThunk(
  DELETE_CART,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(deleteCartApi);
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const checkCartExistMiddleWare = createAsyncThunk(
  CHECK_CART,
  async ({HotelID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(checkCartExistApi, {
        params: {
          HotelID,
        },
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const checkOutMiddleWare = createAsyncThunk(
  CHECK_OUT,
  async ({ExtraNotes}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(checkOutApi, {
        ExtraNotes,
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
