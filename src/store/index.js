import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user-slice';
import counterReducer from "./stepperCounter-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
    reducer: { user: userReducer, counter: counterReducer, ui : uiReducer },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;