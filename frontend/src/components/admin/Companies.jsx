import React, { useEffect, useState } from 'react';
import NavBar from '../shared/NavBar';
import { Button } from '@/components/ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import usegetAllCompanies from '../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';

const Companies = () => {
  usegetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="w-full min-h-screen">
      <NavBar />

      <div className="max-w-6xl mx-auto my-10 p-4 sm:p-6 md:p-10">
        
        {/* Responsive Filter + Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Button */}
          <Button 
            onClick={() => navigate("/admin/companies/create")}
            className="px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
          >
            New Company
          </Button>
        </div>

        {/* Responsive Table */}
        <div className="mt-6 overflow-x-auto">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
