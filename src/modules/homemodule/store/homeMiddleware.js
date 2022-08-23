import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GET_RESTAURANT_LIST,
  CHECK_LATEST_VERSION,
  CHECK_DASHBOARD,
  SEARCH_RESTAURANT_ITEM,
} from '../../../actions/actions';
import {
  checkVersionApi,
  getHomeDashboardApi,
  getRestaurantListApi,
  searchRestaurantandItemsApi,
} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const getRestaurantListMiddleWare = createAsyncThunk(
  GET_RESTAURANT_LIST,
  async ({LocationID, SearchText, Type}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getRestaurantListApi, {
        params: {
          LocationID,
          SearchText,
          Type,
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
export const searchRestaurantandItemsMiddleWare = createAsyncThunk(
  SEARCH_RESTAURANT_ITEM,
  async ({LocationID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(searchRestaurantandItemsApi, {
        params: {
          LocationID,
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

export const checkLatestVersionMiddleWare = createAsyncThunk(
  CHECK_LATEST_VERSION,
  async ({UserId}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(checkVersionApi, {
        params: {
          UserId,
        },
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getHomeDashboardMiddleWare = createAsyncThunk(
  CHECK_DASHBOARD,
  async ({LocationID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getHomeDashboardApi, {
        params: {
          LocationID,
        },
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
