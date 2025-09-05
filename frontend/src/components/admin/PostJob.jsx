import React, { useState, useEffect } from 'react'
import Navbar from '../shared/NavBar';
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { JOB_API_END_POINT, COMPANIES_JOB_END_POINT } from '../../uttils/constant';

const PostJob = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [companiesLoading, setCompaniesLoading] = useState(true);
    const navigate = useNavigate();

     const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",  
        salary: "",
        location: "",
        jobtype: "",       
        experience: "",
        position: 0,
        companyId: ""
    });

    // Fetch companies on component mount
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANIES_JOB_END_POINT}/getcompany`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setCompanies(res.data.companies || []);
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
                toast.error("Failed to load companies");
            } finally {
                setCompaniesLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validation
        if (!input.companyId && companies.length > 0) {
            toast.error("Please select a company");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/postjob`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message || "Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5 p-20'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border shadow-lg rounded-md'>
                    <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title *</Label>
                            <input
                                className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                type="text"
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                                required
                                placeholder='' />
                        </div>
                        <div>
                            <Label>Description *</Label>
                            <textarea
                                className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                name='description'
                                rows="3"
                                value={input.description}
                                onChange={changeEventHandler}
                                required
                                placeholder=''></textarea>
                        </div>
                        <div>
                            <Label>Requirements *</Label>
                            <textarea
                                className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                name='requirements'
                                rows="3"
                                value={input.requirement}
                                onChange={changeEventHandler}
                                required
                                placeholder=''></textarea>
                        </div>
                        <div>
                            <Label>Salary *</Label>
                            <input
                                className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                type="text"
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                required
                                placeholder='' />
                        </div>
                        <div>
                            <Label>Location *</Label>
                            <input
                                className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                type="text"
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                required
                                placeholder='' />
                        </div>
                        <div>
                            <Label>Job Type *</Label>
                            <select
                                className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                name='jobtype'
                                value={input.jobType}
                                onChange={changeEventHandler}
                                required>
                                <option value="">Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>
                        <div>
                            <Label>Experience Level *</Label>
                            <select
                                className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                name='experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                                required>
                                <option value="">Select Experience Level</option>
                                <option value="Entry">Entry Level</option>
                                <option value="Mid">Mid Level</option>
                                <option value="Senior">Senior Level</option>
                            </select>
                        </div>
                        <div>
                            <Label>Number of Positions *</Label>
                            <input
                                className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                type="number"
                                min="1"
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                                required
                                placeholder='0' />
                        </div>

                        {companiesLoading ? (
                            <div className="col-span-2">
                                <p>Loading companies...</p>
                            </div>
                        ) : companies.length > 0 ? (
                            <div className="col-span-2">
                                <Label>Select Company *</Label>
                                <Select onValueChange={selectChangeHandler} required>
                                    <SelectTrigger className="w-full my-1">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Companies</SelectLabel>
                                            {companies.map((company) => {
                                                const value = company.name?.toLowerCase() || company._id;
                                                const label = company.name || `Company ${company._id}`;
                                                return (
                                                    <SelectItem key={company._id} value={value}>
                                                        {label}
                                                    </SelectItem>
                                                );
                                            })}

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="col-span-2">
                                <Label>Company ID</Label>
                                <input
                                    className='w-full focus-visible:ring-offset-0 focus-visible:ring-1 my-1 border rounded p-2'
                                    type="text"
                                    name='companyId'
                                    value={input.companyId}
                                    onChange={changeEventHandler}
                                    required
                                    placeholder='' />
                                <p className='text-xs text-red-700 my-2 font-bold'>*No companies found. Please enter a company ID manually*</p>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <Button disabled className='w-full my-5'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit' className='w-full my-5'>Post New Job</Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;