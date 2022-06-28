import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAddressMiddleWare = createAsyncThunk(
  'getAddressMiddleWare',
  async ({address, key}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address,
            key,
          },
        },
      );
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
