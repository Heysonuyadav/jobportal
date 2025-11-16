import React, { useEffect } from 'react'
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import { setAllJobs, setSearchedQuery } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../uttils/constant';


const useGetAllJobs = () => {
    const dispatch = useDispatch();
     const { searchedQuery } = useSelector((state) => state.job);
    useEffect(() => {
        const FetchAllJobs = async () => { 
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobs?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (err) {
                console.log(err)
            }
        }
        FetchAllJobs();
    },[])
}
export default useGetAllJobs
