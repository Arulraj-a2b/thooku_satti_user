import {createSlice} from '@reduxjs/toolkit';
import {getUpComingOrderMiddleWare} from './myOrderMiddleware';

const getUpComingOrderState = {
  isLoading: false,
  error: '',
  data: [],
};

const getUpComingOrderReducer = createSlice({
  name: 'getUpComingOrder',
  initialState: getUpComingOrderState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUpComingOrderMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getUpComingOrderMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getUpComingOrderMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getUpComingOrderReducers = getUpComingOrderReducer.reducer;
