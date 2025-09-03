import React, { useEffect } from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { setAllJobs, setSingleJob } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../uttils/constant';


const useGetSingleJobs = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobById/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.jobs));
                }
            } catch (err) {
                console.log(err)
            }
        }
        FetchSingleJobs();
    },[])
}
export default useGetSingleJobs
