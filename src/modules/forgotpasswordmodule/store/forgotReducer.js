import { createSlice } from "@reduxjs/toolkit";
import { loginMiddleWare } from "./loginScreenMiddleware";

const initialState = {
  isLoading: false,
  error: "",
  data: [],
};

const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loginMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(loginMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const loginReducers = loginReducer.reducer;
