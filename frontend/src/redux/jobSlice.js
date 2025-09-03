import {createSlice} from '@reduxjs/toolkit';

const jobSlice =createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",

    },
   reducers:{
    setAllJobs:(state,actions) =>{
        state.allJobs = actions.payload;
    },
 setSingleJob:(state,action) => {
    state.singleJob = action.payload
 },
 setallAdminJobs:(state,action)=>{
    state.allAdminJobs = action.payload
 },
  searchJobByText:(state,action)=>{
state.searchJobByText = action.payload
  },
  setAllAppliedJobs:(state,action)=>{
state.allAppliedJobs= action.payload
  },
  setSearchedQuery:(state,action) =>{
   state.searchedQuery = action.payload
  }
   }
});

export const {setAllJobs,setSingleJob,setallAdminJobs, searchJobByText,setAllAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;