import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';
import useGetSingleJobs from '../hooks/useGetSingleJobs';
import axios from 'axios';
import { setSingleJob } from '../redux/jobSlice';
import { JOB_API_END_POINT, APPLICATION_JOB_END_POINT } from '../uttils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner'

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    useGetSingleJobs(jobId);

    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);   

    const isInitiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const [status, setStatus] = useState("");

    const applyJobHandler = async (jobId) => {
        try {
            const res = await axios.post(`${APPLICATION_JOB_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob = { 
                    ...singleJob, 
                    applications: [...singleJob.applications, { applicant: user?._id }] 
                };
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data.message === "Already applied") {
                setStatus("Already Applied");
            } else {
                setStatus("Something went wrong");
            }
            console.log(error);
            toast.error(error.response?.data?.message || "Error applying");
        }
    }

    useEffect(() => {
        const FetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobById/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));  
                    setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
                }
            } catch (err) {
                console.log(err);
            }
        }
        FetchSingleJobs();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto m-22'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-2xl'>{singleJob?.title} Title</h1>
                    <div className='flex items-center gap-6 m-4'>
                        <p className='text-red-600'>{singleJob?.position} Position</p>
                        <p className='text-green-800'>PartTime</p>
                        <p className='text-black'>{singleJob?.salary} 24LPA</p>
                    </div>
                </div>
                <div>
                    <Button
                        onClick={() => applyJobHandler(singleJob?._id)}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-blue-300 text-[#232e] cursor-not-allowed' : 'bg-gray-700 hover:bg-[#142f77]'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>
            <h1 className='font-bold text-xl'>{singleJob?.description} Job Description</h1>
            <div className='p-2'>
                <h1 className='font-bold my-2'>Role:  
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
                </h1>
                <h1 className='font-bold my-2'>Location:  
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span>
                </h1>
                <h1 className='font-bold my-2'>Description:  
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span>
                </h1>
                <h1 className='font-bold my-2'>Experience:  
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span>
                </h1>
                <h1 className='font-bold my-2'>Project:  
                    <span className='pl-4 font-normal text-gray-800'>Campus navigation</span>
                </h1>
                <h1 className='font-bold my-2'>Apply date:  
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span>
                </h1>
            </div>
        </div>
    )
}

export default JobDescription;
