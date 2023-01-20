import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user-slice';
import counterReducer from "./stepperCounter-slice";
import uiReducer from "./ui-slice";
import { useEffect } from "react";

const initialState = { 
    counter: { counter:5, isFinished: false},
}

const store = configureStore({
    reducer: { user: userReducer, counter: counterReducer, ui : uiReducer },
   // preloadedState: {initialState}
});

export default store;