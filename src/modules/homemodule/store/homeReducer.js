import {createSlice} from '@reduxjs/toolkit';
import {
  checkLatestVersionMiddleWare,
  getHomeDashboardMiddleWare,
  getRestaurantListMiddleWare,
  searchRestaurantandItemsMiddleWare,
} from './homeMiddleware';

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

const checkLatestInitialState = {
  isLoading: false,
  error: '',
  data: [
    {
      VersionNo: '',
      Message: '',
    },
  ],
};

const checkLatestVersionReducer = createSlice({
  name: 'home_version_check',
  initialState: checkLatestInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkLatestVersionMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(checkLatestVersionMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(checkLatestVersionMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getHomeDashboardInitialState = {
  isLoading: false,
  error: '',
  data: [],
};

const getHomeDashboardReducer = createSlice({
  name: 'getHomeDashboard',
  initialState: getHomeDashboardInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getHomeDashboardMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getHomeDashboardMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload[0];
    });
    builder.addCase(getHomeDashboardMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const searchRestaurantandItemsInitialState = {
  isLoading: false,
  error: '',
  data: [],
};

const searchRestaurantandItemsReducer = createSlice({
  name: 'searchRestaurantandItems',
  initialState: searchRestaurantandItemsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchRestaurantandItemsMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(searchRestaurantandItemsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(searchRestaurantandItemsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getRestaurantListReducers = getRestaurantListReducer.reducer;
export const checkLatestVersionReducers = checkLatestVersionReducer.reducer;
export const getHomeDashboardReducers = getHomeDashboardReducer.reducer;
export const searchRestaurantandItemsReducers = searchRestaurantandItemsReducer.reducer;
