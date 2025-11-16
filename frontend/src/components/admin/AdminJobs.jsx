import React, { useEffect, useState } from 'react';
import NavBar from '../shared/NavBar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs.jsx';

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto mt-24 p-4 md:p-10">

        {/* Top Controls */}
        <div className="
          flex flex-col md:flex-row 
          items-center md:items-center 
          justify-between 
          gap-4
        ">
          {/* Search / Filter Input */}
          <input
            type="text"
            className="
              border border-gray-300 
              rounded-lg px-4 py-2 
              w-full md:w-1/2 
              focus:outline-none 
              focus:ring-2 focus:ring-blue-500
            "
            placeholder="Filter by job name"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          {/* New Job Button */}
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="
              w-full md:w-auto 
              px-4 py-2 
              rounded-lg shadow-md
              bg-[#0a6140] hover:bg-[#0a4a34]
            "
          >
            New Job
          </Button>
        </div>

        {/* Job Table */}
        <div className="mt-8 w-full overflow-x-auto">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
