import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {SIGNIN} from '../../../actions/actions';
import {signInApi} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const signInMiddleWare = createAsyncThunk(
  SIGNIN,
  async (
    {Name, EmailAddress, Mobileno, WhatsappNo, Address, Password, City},
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.post(signInApi, {
        Name,
        EmailAddress,
        Mobileno,
        WhatsappNo,
        Address,
        Password,
        City,
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message,'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
