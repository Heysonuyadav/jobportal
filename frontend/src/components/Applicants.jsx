import React, { useEffect } from 'react'
import NavBar from './shared/NavBar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_JOB_END_POINT } from '../uttils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../redux/ApplicationSlice'
const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { Applicants } = useSelector(store => store.Application);
    useEffect(() => {
        const fetchAllApplicants = async () => {
            {
                
            }
            try {
                const res = await axios.get(`${APPLICATION_JOB_END_POINT}/${params.id}/applicant`, { withCredentials: true })

                dispatch(setAllApplicants(res.data.job))

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants();
    }, [])

    return (
        <div>
            <NavBar />
            <div className='max-w-7xl mx-auto  mt-22'>
                <h1 className='font-bold'>Applicant {Applicants?.Application?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
