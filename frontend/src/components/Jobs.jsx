import React, { useEffect, useState } from 'react'
import NavBar from './shared/NavBar'
import FilterCards from './FilterCards'
import Job from './Job'
import { useSelector } from 'react-redux'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filteredjobs, setFilteredjobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                );
            });
            setFilteredjobs(filtered);
        } else {
            setFilteredjobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <NavBar />

            <div className="max-w-7xl mx-auto mt-6 p-4 sm:p-6">
                
                {/* Responsive Layout */}
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Sidebar - Filters */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <FilterCards />
                    </div>

                    {/* Jobs Section */}
                    <div className="flex-1 h-[80vh] overflow-y-auto pb-8">

                        {filteredjobs.length <= 0 ? (
                            <span className="text-xl font-semibold text-gray-600">
                                Job not found
                            </span>
                        ) : (
                            <div
                                className="
                                    grid 
                                    grid-cols-1 
                                    sm:grid-cols-2 
                                    lg:grid-cols-3 
                                    xl:grid-cols-4 
                                    gap-4
                                "
                            >
                                {filteredjobs.map((job) => (
                                    <div key={job?._id} className="w-full">
                                        <Job job={job} />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
