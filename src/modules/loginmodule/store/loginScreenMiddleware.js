import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {CALCULATE_LOCATION, LOGIN} from '../../../actions/actions';
import {
  calculateLocationDistanceApi,
  loginApi,
} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const loginMiddleWare = createAsyncThunk(
  LOGIN,
  async ({Username, Password, DeviceToken}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(loginApi, {
        Username,
        Password,
        DeviceToken,
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const calculateLocationDistanceMiddleWare = createAsyncThunk(
  CALCULATE_LOCATION,
  async ({Latitude, Longtitude}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(calculateLocationDistanceApi, {
        params: {
          Latitude,
          Longtitude,
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
