import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { reducer as rollsReducer } from "./rolls";
import { reducer as cameraBagReducer } from "./camera-bag";
import { reducer as filmStocksReducer } from "./film-stocks";

const rootReducer = combineReducers({
  rolls: rollsReducer,
  cameraBag: cameraBagReducer,
  filmStocks: filmStocksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export type GetState = () => AppState;
