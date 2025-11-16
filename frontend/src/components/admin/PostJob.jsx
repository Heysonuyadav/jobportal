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
} from "@/components/ui/select";
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
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );

        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.companyId && companies.length > 0) {
            toast.error("Please select a company");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(`${JOB_API_END_POINT}/postjob`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            {/* Container */}
            <div className="flex items-center justify-center w-full p-4 md:p-10">

                {/* Responsive Form */}
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-3xl p-6 md:p-10 border shadow-xl rounded-xl bg-white"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                        Post a New Job
                    </h2>

                    {/* Grid = 2 columns on medium screens, 1 column on mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Title */}
                        <div>
                            <Label>Title *</Label>
                            <input
                                className="w-full border rounded p-2 my-1 focus-visible:ring-1"
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label>Description *</Label>
                            <textarea
                                className="w-full border rounded p-2 my-1 focus-visible:ring-1"
                                name="description"
                                rows="3"
                                value={input.description}
                                onChange={changeEventHandler}
                                required
                            ></textarea>
                        </div>

                        {/* Requirements */}
                        <div>
                            <Label>Requirements *</Label>
                            <textarea
                                className="w-full border rounded p-2 my-1 focus-visible:ring-1"
                                name="requirements"
                                rows="3"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                required
                            ></textarea>
                        </div>

                        {/* Salary */}
                        <div>
                            <Label>Salary *</Label>
                            <input
                                className="w-full border rounded p-2 my-1 focus-visible:ring-1"
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <Label>Location *</Label>
                            <input
                                className="w-full border rounded p-2 my-1 focus-visible:ring-1"
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Job Type */}
                        <div>
                            <Label>Job Type *</Label>
                            <select
                                className="w-full border rounded p-2 my-1"
                                name="jobtype"
                                value={input.jobtype}
                                onChange={changeEventHandler}
                                required
                            >
                                <option value="">Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        {/* Experience */}
                        <div>
                            <Label>Experience Level *</Label>
                            <select
                                className="w-full border rounded p-2 my-1"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                required
                            >
                                <option value="">Select Experience Level</option>
                                <option value="Entry">Entry Level</option>
                                <option value="Mid">Mid Level</option>
                                <option value="Senior">Senior Level</option>
                            </select>
                        </div>

                        {/* Position */}
                        <div>
                            <Label>Number of Positions *</Label>
                            <input
                                className="w-full border rounded p-2 my-1"
                                type="number"
                                min="1"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Companies */}
                        <div className="md:col-span-2">
                            {companiesLoading ? (
                                <p className="text-sm">Loading companies...</p>
                            ) : companies.length > 0 ? (
                                <>
                                    <Label>Select Company *</Label>
                                    <Select onValueChange={selectChangeHandler} required>
                                        <SelectTrigger className="w-full my-1">
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Companies</SelectLabel>
                                                {companies.map((company) => (
                                                    <SelectItem
                                                        key={company._id}
                                                        value={company.name.toLowerCase()}
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </>
                            ) : (
                                <>
                                    <Label>Company ID *</Label>
                                    <input
                                        className="w-full border rounded p-2 my-1"
                                        type="text"
                                        name="companyId"
                                        value={input.companyId}
                                        onChange={changeEventHandler}
                                        required
                                    />
                                    <p className="text-xs text-red-600 font-medium">
                                        *No companies found. Enter company ID manually.*
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button disabled className="w-full my-6">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-6">
                            Post New Job
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
