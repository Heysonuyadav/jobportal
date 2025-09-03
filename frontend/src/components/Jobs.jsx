import React, { useEffect, useState } from 'react'
import NavBar from './shared/NavBar'
import FilterCards from './FilterCards'
import Job from './Job'
import { useSelector } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const Jobs = () => {
    const { allJobs,searchedQuery } = useSelector(store => store.job);
    const [filteredjobs,setFilteredjobs] = useState(allJobs)

    useEffect(()=>{
        if(searchedQuery){
            const filteredjobs = allJobs.filter((job)=>{
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase())||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase())||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilteredjobs(filteredjobs)
        }else{
            setFilteredjobs(allJobs)
        }

    },[allJobs,searchedQuery])
    return (
        <div>
            <NavBar />
            <div className='max-w-7xl mx-auto mt-10 p-10'>
                <div className='flex gap-6'>
                    <div className='w-20%'>

                        <FilterCards />
                    </div>
                    {
                        filteredjobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filteredjobs.map((job) => (
                                            <div key={job?._id}>
                                                <Job job={job} />
                                            </div>
                                        ))

                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
