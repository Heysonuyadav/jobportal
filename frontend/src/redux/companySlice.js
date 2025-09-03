import {createSlice} from "@reduxjs/toolkit";


const companySlice = createSlice({
    name:"company",
    initialState:{
        companies:[],
        singleCompany:{},
        searchCompanyByText:"",
        loading:false,
        error:null

    },
    reducers:{
        setSingleCompany:(state,action) =>{
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) =>{
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state,action)=>{
            state.searchCompanyByText = action.payload;
        }
    }
})
export const {setSingleCompany,setCompanies,setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer;