import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {GET_CATEGORY_LIST, GET_FOOD_ITEMS} from '../../../actions/actions';
import {getFoodItemsApi, getCategoryListApi} from '../../../routes/apiRoutes';
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
