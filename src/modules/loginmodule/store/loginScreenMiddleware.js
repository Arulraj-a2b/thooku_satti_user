import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {LOGIN} from '../../../actions/actions';
import {loginApi} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const loginMiddleWare = createAsyncThunk(
  LOGIN,
  async ({Username, Password, DeviceToken}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(
        loginApi,
        {
          Username,
          Password,
          DeviceToken,
        },
        // {
        //   transformRequest: [
        //     (data, headers) => {
        //       delete headers.common.token;

        //       return data;
        //     },
        //   ],
        // },
      );
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
