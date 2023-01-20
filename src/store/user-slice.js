import { useEffect } from "react";

import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialUserState = {
    id:'',
    personalInfo: {name: '',email: '',mobile: '',address1: '',address2: '',address3: ''},
    officeInfo: {building: '',city: '',landline: '',address1: '',address2: '',poBox: ''},
    profile: '',
    signature: ''
};
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setId (state, action) {
            state.id = action.payload;
        },
        loadUserInfo(state, action) {
            state.personalInfo = action.payload.personalInfo;
            state.officeInfo = action.payload.officeInfo;
            state.profile = action.payload.profile;
            state.signature= action.payload.signature;
        },
        addUserPersonalInfo(state, action) {
                //state.id = action.payload.id;
                state.personalInfo = {
                    name: action.payload.name,
                    email: action.payload.email,
                    mobile: action.payload.mobile,
                    address1: action.payload.address1,
                    address2: action.payload.address2,
                    address3: action.payload.address3
                }
        },
        addUserOfficeInfo(state, action) {
                state.officeInfo = {
                    building: action.payload.building,
                    city: action.payload.city,
                    landline: action.payload.landline,
                    address1: action.payload.address1,
                    address2: action.payload.address2,
                    poBox: action.payload.poBox
                }
        },
        addUserProfile(state, action) {
            state.profile = action.payload.profile;
            state.signature = action.payload.signature;
        },
        resetUserState(state,action) {
            //state = {initialUserState};
            return initialUserState;
        }
    }

});

export const userActions = userSlice.actions;
export default userSlice.reducer;
