import { configureStore, } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settingsSlice";
import {PersistConfig, persistCombineReducers, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST} from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import { RootState } from "../types";

const persistConfig:PersistConfig<RootState> = {
  key:"root",
  version:1,
  storage:ExpoFileSystemStorage,
}

let persistedReducer = persistCombineReducers(persistConfig, {settings:settingsReducer});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:{
      ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export default store
