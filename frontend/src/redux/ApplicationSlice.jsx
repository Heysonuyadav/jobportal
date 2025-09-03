import React from 'react'
import {createSlice} from "@reduxjs/toolkit";
import Applicants from '../components/Applicants';
const ApplicationSlice = createSlice({
    name:'Application',
    initialState:{
        Applicants:[],
},
reducers:{
    setAllApplicants:(state,action)=>{
        state.Applicants = action.payload;
    }
}
})
export const {setAllApplicants}= ApplicationSlice.actions;
export default ApplicationSlice.reducer;