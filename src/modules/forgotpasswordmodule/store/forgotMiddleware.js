import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {FORGOT_OTP} from '../../../actions/actions';
import {getForgotEmailOtpApi} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const forgotEamilOtpMiddleWare = createAsyncThunk(
  FORGOT_OTP,
  async ({EmailAddress, TypeID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getForgotEmailOtpApi, {
        params: {
          EmailAddress,
          TypeID,
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
