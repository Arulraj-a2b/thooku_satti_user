import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {GET_RESTAURANT_LIST} from '../../../actions/actions';
import {getRestaurantListApi} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const getRestaurantListMiddleWare = createAsyncThunk(
  GET_RESTAURANT_LIST,
  async ({LocationID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getRestaurantListApi, {
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
