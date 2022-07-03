import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ADD_CART,
  GET_CART_DETAILS,
  GET_CATEGORY_LIST,
  GET_FOOD_ITEMS,
} from '../../../actions/actions';
import {
  getFoodItemsApi,
  getCategoryListApi,
  addCartApi,
  getCartDetailsApi,
} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const getFoodItemsMiddleWare = createAsyncThunk(
  GET_FOOD_ITEMS,
  async ({HotelID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getFoodItemsApi, {
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

export const getCategoryListMiddleWare = createAsyncThunk(
  GET_CATEGORY_LIST,
  async ({HotelID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getCategoryListApi, {
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

export const addCartMiddleWare = createAsyncThunk(
  ADD_CART,
  async ({HotelID, ItemID, Qty, UserID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(addCartApi, {
        HotelID,
        ItemID,
        Qty,
        UserID,
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getCartDetailsMiddleWare = createAsyncThunk(
  GET_CART_DETAILS,
  async ({UserID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getCartDetailsApi, {
        params: {
          UserID,
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
