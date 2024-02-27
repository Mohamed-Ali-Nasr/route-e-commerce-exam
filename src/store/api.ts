import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from ".";
import { Action } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
  key: string;
  payload: RootState;
  err: unknown;
} {
  return action.type === REHYDRATE;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("token", `${token}`);
      }

      return headers;
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      // when persisting the api reducer
      if (action.key === "key used with redux-persist") {
        return action.payload;
      }

      // When persisting the root reducer
      return action.payload?.[reducerPath];
    }
  },
  endpoints: () => ({}),
  tagTypes: ["Cart", "Orders", "Wishlist"],
});
