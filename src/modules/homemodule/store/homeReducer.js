import {createSlice} from '@reduxjs/toolkit';
import {getRestaurantListMiddleWare} from './homeMiddleware';

const getRestaurantListState = {
  isLoading: false,
  error: '',
  data: [
    {
      HotelID: 0,
      HotelName: '',
      HotelImage: '',
      ContactPerson: '',
      ContactNo: '',
      Address: '',
    },
  ],
};

const getRestaurantListReducer = createSlice({
  name: 'getRestaurantList',
  initialState: getRestaurantListState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRestaurantListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getRestaurantListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRestaurantListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getRestaurantListReducers = getRestaurantListReducer.reducer;
