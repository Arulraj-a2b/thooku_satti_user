import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {CHECK_OUT, GET_TNC} from '../../../actions/actions';
import {checkOutApi, getTNCApi} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const checkOutMiddleWare = createAsyncThunk(
  CHECK_OUT,
  async ({formData}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(checkOutApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const getTNCSMiddleWare = createAsyncThunk(
  GET_TNC,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getTNCApi);
      return data;
    } catch (error) {
      Toast('Service Unavailable', 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
