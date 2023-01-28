import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {steps : ['Step 1', 'Step 2', 'Step 3'], counter:0, isFinished: false, completedSteps: []};

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
        completeStep(state,action) {
            if(!state.completedSteps.includes(action.payload))
            {
                state.completedSteps = [...state.completedSteps, action.payload];
            }
        },
        resetCounter(state) {
            state.counter = 0;
            state.isFinished= false;
            state.completedSteps = [];
        },
        finish(state) {
            state.isFinished= true;
        }
    }
});

export const counterActions = stepperCounterSlice.actions;
export default stepperCounterSlice.reducer;
