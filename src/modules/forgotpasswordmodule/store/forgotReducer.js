import {createSlice} from '@reduxjs/toolkit';
import {
  emailOtpVerifyMiddleWare,
  forgotEamilOtpMiddleWare,
} from './forgotMiddleware';

const initialState = {
  isLoading: false,
  error: '',
  data: [
    {
      OTP: 0,
      ExpiryTime: '',
      Code: 0,
      Status: '',
      Email: '',
    },
  ],
};

const forgotEamilOtpReducer = createSlice({
  name: 'forgotEamilOtp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(forgotEamilOtpMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(forgotEamilOtpMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(forgotEamilOtpMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const initialStateOtpVerify = {
  isLoading: false,
  error: '',
  data: [
    {
      Code: 0,
      Status: '',
      EmailAddress: '',
    },
  ],
};

const emailOtpVerifyReducer = createSlice({
  name: 'emailOtpVerify',
  initialState: initialStateOtpVerify,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(emailOtpVerifyMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(emailOtpVerifyMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(emailOtpVerifyMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const forgotEamilOtpReducers = forgotEamilOtpReducer.reducer;
export const emailOtpVerifyReducers = emailOtpVerifyReducer.reducer;
