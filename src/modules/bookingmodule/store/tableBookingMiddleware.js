import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {DINININ_BOOKING, GET_DINING_HOTEL_LIST} from '../../../actions/actions';
import {
  diningBookingApi,
  getDiningHotelListpi,
} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const diningBookingMiddleWare = createAsyncThunk(
  DINININ_BOOKING,
  async (
    {
      HotleID,
      NoofAdult,
      Noofchild,
      BookingDate,
      Time,
      GooglepayNo,
      PhonePayNo,
      LocationID,
      Contactno,
      Notes,
    },
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.post(diningBookingApi, {
        HotleID,
        NoofAdult,
        Noofchild,
        BookingDate,
        Time,
        GooglepayNo,
        PhonePayNo,
        LocationID,
        Contactno,
        Notes,
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getDiningHotelListMiddleWare = createAsyncThunk(
  GET_DINING_HOTEL_LIST,
  async ({LocationID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getDiningHotelListpi, {
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
