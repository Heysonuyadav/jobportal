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
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Check if user already applied
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
        if (isApplied) return toast.error("You have already applied");

        if (!selectedFile) return toast.error("Please select a resume first");

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("resume", selectedFile);

            const res = await axios.post(
                `${APPLICATION_JOB_END_POINT}/apply/${jobId}`,
                formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            if (res.data.success) {
                setIsApplied(true);
                dispatch(setSingleJob({
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }));
                toast.success(res.data.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Top Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between 
                gap-6 mb-6">

                {/* Title + Badge Info */}
                <div className="w-full md:w-auto">
                    <h1 className="font-bold text-2xl sm:text-3xl">{singleJob?.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm sm:text-base">
                        <p className="text-red-600">{singleJob?.position}</p>
                        <p className="text-green-800">{singleJob?.jobType || "Part Time"}</p>
                        <p className="text-black">{singleJob?.salary || "24 LPA"}</p>
                    </div>
                </div>

                {/* File Upload + Apply Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={isApplied || isLoading}
                        className="border p-2 rounded w-full sm:w-auto"
                    />

                    <Button
                        onClick={applyJobHandler}
                        disabled={isApplied || isLoading}
                        className={`rounded-lg w-full sm:w-auto
            ${isApplied
                                ? 'bg-blue-300 text-gray-700 cursor-not-allowed backdrop-blur-sm opacity-60'
                                : 'bg-gray-700 hover:bg-[#142f77]'}`}
                    >
                        {isLoading ? "Applying..." : isApplied ? "Already Applied" : "Apply Now"}
                    </Button>

                </div>

            </div>

            {/* Description Section */}
            <h1 className="font-bold text-xl sm:text-2xl">{singleJob?.description}</h1>

            <div className="p-2 mt-4 space-y-3 text-sm sm:text-base">

                <h1 className="font-bold">
                    Role: <span className="font-normal text-gray-800 pl-2">{singleJob?.title}</span>
                </h1>

                <h1 className="font-bold">
                    Location: <span className="font-normal text-gray-800 pl-2">{singleJob?.location}</span>
                </h1>

                <h1 className="font-bold">
                    Description: <span className="font-normal text-gray-800 pl-2">{singleJob?.description}</span>
                </h1>

                <h1 className="font-bold">
                    Experience: <span className="font-normal text-gray-800 pl-2">{singleJob?.experience}</span>
                </h1>

                <h1 className="font-bold">
                    Project: <span className="font-normal text-gray-800 pl-2">Campus navigation</span>
                </h1>

                <h1 className="font-bold">
                    Apply date:
                    <span className="font-normal text-gray-800 pl-2">
                        {singleJob?.createdAt?.split("T")[0]}
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;
