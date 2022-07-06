import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {MY_ORDER_UP_COMINNG} from '../../../actions/actions';
import {getUpComingOrderApi} from '../../../routes/apiRoutes';
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
