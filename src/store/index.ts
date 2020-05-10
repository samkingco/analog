import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
  key: "analog",
  storage: AsyncStorage,
  whiteList: ["rolls", "cameraBag"],
};

import { reducer as rollsReducer } from "./rolls";
import { reducer as cameraBagReducer } from "./camera-bag";
import { reducer as filmStocksReducer } from "./film-stocks";

const rootReducer = combineReducers({
  rolls: rollsReducer,
  cameraBag: cameraBagReducer,
  filmStocks: filmStocksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export let persistor = persistStore(store);

export type AppState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export type GetState = () => AppState;
