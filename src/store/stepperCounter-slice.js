import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter:0, isFinished: false};

const stepperCounterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        setCounter(state,action){
            state.counter = action.payload; 
        },
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        resetCounter(state) {
            state.counter = 0;
            state.isFinished= false;
        },
        finish(state) {
            //state.counter = 0;
            state.isFinished= true;
        }
    }
});

export const counterActions = stepperCounterSlice.actions;
export default stepperCounterSlice.reducer;
