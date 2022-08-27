import {createSlice} from '@reduxjs/toolkit';
import {
  aboutMiddleWare,
  calculateLocationDistanceMiddleWare,
  loginMiddleWare,
} from './loginScreenMiddleware';

const initialState = {
  isLoading: false,
  error: '',
  data: [],
};

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(loginMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(loginMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const calculateLocationDistanceInitialState = {
  isLoading: false,
  error: '',
  data: [],
};

const calculateLocationDistanceReducer = createSlice({
  name: 'calculateLocationDistance',
  initialState: calculateLocationDistanceInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(calculateLocationDistanceMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      calculateLocationDistanceMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(
      calculateLocationDistanceMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const aboutInitialState = {
  isLoading: false,
  error: '',
  data: [{Title: '', FounderName: '', Content: ''}],
};

const aboutReducer = createSlice({
  name: 'about_as',
  initialState: aboutInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(aboutMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(aboutMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(aboutMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getUserDataReducer = createSlice({
  name: 'getUserData',
  initialState: {data: []},
  reducers: {
    updateUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {updateUserData} = getUserDataReducer.actions;

export const loginReducers = loginReducer.reducer;
export const calculateLocationDistanceReducers =
  calculateLocationDistanceReducer.reducer;
export const aboutReducers = aboutReducer.reducer;
export const getUserDataReducers = getUserDataReducer.reducer;
