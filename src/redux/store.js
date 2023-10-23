import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice from "./services/auth.slice";

import { isRejectedWithValue, isFulfilled } from "@reduxjs/toolkit";
import { api } from "./base-query";
import { enqueueSnackbar } from "notistack";

//error handler

/**
 * Log a warning and show a toast!
 */
export const successErrorHandler = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error =
      typeof action.payload?.data?.message === "string"
        ? action.payload?.data?.message
        : "Internal Server Error";
    enqueueSnackbar(error, {
      variant: "error",
    });
  }

  if (
    isFulfilled(action) &&
    action.meta.baseQueryMeta.request.method !== "GET"
  ) {
    enqueueSnackbar(action.payload?.message, {
      variant: "success",
    });
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(successErrorHandler),
});

setupListeners(store.dispatch);
