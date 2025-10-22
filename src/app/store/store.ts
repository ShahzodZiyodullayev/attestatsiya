import { configureStore } from "@reduxjs/toolkit";

import ResultReducer from "@/entities/result/model/result-slice";

export const store = configureStore({
  reducer: {
    result: ResultReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
