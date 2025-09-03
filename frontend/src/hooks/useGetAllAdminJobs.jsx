import React, { useEffect } from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { setallAdminJobs} from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../uttils/constant';


const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setallAdminJobs(res.data.jobs));
                }
            } catch (err) {
                console.log(err)
            }
        }
        FetchAllAdminJobs();
    },[])
}
export default useGetAllAdminJobs
