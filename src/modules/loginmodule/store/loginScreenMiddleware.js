import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN } from "../../../actions/actions";
import { loginApi } from "../../../routes/apiRoutes";

export const loginMiddleWare = createAsyncThunk(
  LOGIN,
  async ({ Username, Password, DeviceToken }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(loginApi, {
        Username,
        Password,
        DeviceToken,
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  }
);
