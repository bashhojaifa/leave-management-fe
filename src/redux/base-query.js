// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseURI = "http://localhost:9090/api/v1";
const baseURI = "https://leave-mgt.onrender.com/api/v1";

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURI,
    mode: "cors",

    prepareHeaders(headers, { getState }) {
      const accessToken = getState().auth.accessToken;
      if (accessToken) headers.set("Authorization", "Bearer " + accessToken);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
