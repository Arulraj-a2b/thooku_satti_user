import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CHANGE_PASSWORD,
  FORGOT_OTP,
  VERIFY_OTP,
} from '../../../actions/actions';
import {
  changePasswordApi,
  emailVerifyOtpApi,
  getForgotEmailOtpApi,
} from '../../../routes/apiRoutes';
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
      if (data && data[0].Status === 'OTP Sent') {
        Toast('Otp sent successfully check your email', 'success', 'TOP');
      } else if (data) {
        Toast(data[0].Status, 'error');
      }
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const emailOtpVerifyMiddleWare = createAsyncThunk(
  VERIFY_OTP,
  async ({EmailAddress, OTP}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(emailVerifyOtpApi, {
        params: {
          EmailAddress,
          OTP,
        },
      });
      if (data && data[0].Status === 'Valid') {
        Toast('Otp verified successfully', 'success', 'TOP');
      } else if (data) {
        Toast(data[0].Status, 'error');
      }
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const changePasswordMiddleWare = createAsyncThunk(
  CHANGE_PASSWORD,
  async ({EmailAddress, OTP, NewPassword}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(changePasswordApi, {
        EmailAddress,
        OTP,
        NewPassword,
      });
      if (data && data[0].Status !== 'Success') {
        Toast(data[0].Status, 'error');
      }
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
