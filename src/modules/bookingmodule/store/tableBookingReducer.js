import {createSlice} from '@reduxjs/toolkit';
import {getDiningHotelListMiddleWare} from './tableBookingMiddleware';

const getDiningHotelListInitialState = {
  isLoading: false,
  error: '',
  data: [],
};

const getDiningHotelListReducer = createSlice({
  name: 'getDiningHotelList',
  initialState: getDiningHotelListInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDiningHotelListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getDiningHotelListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getDiningHotelListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getDiningHotelListReducers = getDiningHotelListReducer.reducer;
