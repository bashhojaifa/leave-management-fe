//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    accessToken: localStorage.getItem("accessKey") || "",
    user: {},
  },
  reducers: {
    userLogin: (state, action) => {
      localStorage.setItem("accessKey", action.payload);
      state.accessToken = action.payload;
    },
    userLogout: (state, _action) => {
      localStorage.removeItem("accessKey");
      state.accessToken = "";
    },
    getUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLogin, userLogout, getUserProfile } = authReducer.actions;

export default authReducer.reducer;
