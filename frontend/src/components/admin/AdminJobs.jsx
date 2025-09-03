import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/UseGetAllAdminJobs';



const AdminJobs = () => {
  useGetAllAdminJobs
  
  const [input, setInput] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])
  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto my-10 p-10">
        <div className="flex items-center justify-between gap-4">


          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />


          <Button onClick={() => navigate("/admin/jobs/create")} className="px-4 py-2 rounded-lg shadow-md">
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>

  )
}

export default AdminJobs
