import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_JOB_END_POINT } from "../uttils/constant";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_JOB_END_POINT}/getjobs`, {withCredentials:true})
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.applications));

                }
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchAppliedJobs()
    },[])
}
export default useGetAppliedJobs;