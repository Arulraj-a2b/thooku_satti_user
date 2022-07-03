import {createSlice} from '@reduxjs/toolkit';
import {
  getCartDetailsMiddleWare,
  getCategoryListMiddleWare,
  getFoodItemsMiddleWare,
} from './hotelListViewMiddleware';

const getFoodItemsState = {
  isLoading: false,
  error: '',
  data: [
    {
      CategoryID: 0,
      CategoryName: '',
      FoodID: 0,
      HotelID: 0,
      FoodName: '',
      Price: 0,
      FoodImage: '',
      Rating: 0,
      IsRecommand: '',
    },
  ],
};

const getFoodItemsReducer = createSlice({
  name: 'getFoodItems',
  initialState: getFoodItemsState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFoodItemsMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getFoodItemsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getFoodItemsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getCategoryListState = {
  isLoading: false,
  error: '',
  data: [
    {
      CategoryID: 0,
      CategoryName: '',
    },
  ],
};

const getCategoryListReducer = createSlice({
  name: 'getFoodItems',
  initialState: getCategoryListState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategoryListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getCategoryListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getCategoryListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getCartDetailsState = {
  isLoading: false,
  error: '',
  data: [
    {
      HotelName: '',
      OrdInfo: {
        ItemName: '',
        ItemPrice: 0,
        ItemCount: 0,
        ItemImage: '',
        ItemID: 0,
        HotelID: 0,
      },
    },
  ],
};

const getCartDetailsReducer = createSlice({
  name: 'getCartDetails',
  initialState: getCartDetailsState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCartDetailsMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getCartDetailsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getCartDetailsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getFoodItemsReducers = getFoodItemsReducer.reducer;
export const getCategoryListReducers = getCategoryListReducer.reducer;
export const getCartDetailsReducers = getCartDetailsReducer.reducer;
