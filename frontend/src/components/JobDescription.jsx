import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setSingleJob } from '../redux/jobSlice';
import { JOB_API_END_POINT, APPLICATION_JOB_END_POINT } from '../uttils/constant';

const JobDescription = () => {
    const { id: jobId } = useParams();
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const [isApplied, setIsApplied] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // Store the actual file
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Check if user has already applied
    useEffect(() => {
        if (singleJob?.applications) {
            const applied = singleJob.applications.some(app => app.applicant === user?._id);
            setIsApplied(applied);
        }
    }, [singleJob, user?._id]);

    // Fetch job details
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobById/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (err) {
                console.log("Error fetching job:", err);
            }
        };
        fetchJob();
    }, [jobId, dispatch]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const applyJobHandler = async () => {
        if (isApplied) {
            toast.error("You have already applied for this job");
            return;
        }

        if (!selectedFile) {
            toast.error("Please select a resume file first");
            return;
        }

        setIsLoading(true);
        
        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append("resume", selectedFile); // Append the actual file

            const res = await axios.post(
                `${APPLICATION_JOB_END_POINT}/apply/${jobId}`,
                formData, 
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (res.data.success) {
                // Update local state and Redux
                setIsApplied(true);
                const updatedJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Application failed:", error);
            setIsApplied(false);
            toast.error(error.response?.data?.message || "Failed to apply. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='max-w-7xl mx-auto m-22'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-2xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-6 m-4'>
                        <p className='text-red-600'>{singleJob?.position}</p>
                        <p className='text-green-800'>PartTime</p>
                        <p className='text-black'>{singleJob?.salary} 24LPA</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {/* File input */}
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={isApplied || isLoading}
                        className="border p-2 rounded"
                    />
                    <Button
                        onClick={applyJobHandler}
                        disabled={isApplied || isLoading || !selectedFile}
                        className={`rounded-lg ${isApplied ? 'bg-blue-300 text-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-[#142f77]'}`}
                    >
                        {isLoading ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>
            
            {/* Rest of your JSX remains the same */}
            <h1 className='font-bold text-xl'>{singleJob?.description}</h1>
            <div className='p-2'>
                <h1 className='font-bold my-2'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-2'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-2'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-2'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
                <h1 className='font-bold my-2'>Project: <span className='pl-4 font-normal text-gray-800'>Campus navigation</span></h1>
                <h1 className='font-bold my-2'>Apply date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    );
};

export default JobDescription;