import React, { useState } from 'react';
import NavBar from '../shared/NavBar';
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANIES_JOB_END_POINT } from '../../uttils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import { toast } from 'react-hot-toast';

const CompaniesCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANIES_JOB_END_POINT}/companyregister`,
        { name: companyName },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen">
      <NavBar />

      <div className="flex flex-col gap-6 max-w-4xl mx-auto mt-10 p-4 sm:p-8 md:p-10">

        {/* Title Section */}
        <div>
          <h1 className="font-bold text-2xl sm:text-3xl">Brounjdot</h1>
          <p className="font-sans text-gray-600 mt-1">
            As Your Preferred Name
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <Label>Company Name</Label>
          <input
            type="text"
            className="px-3 py-2 rounded-lg shadow-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search-jobhunt, Microsoft & More..."
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            onClick={registerNewCompany}
            className="w-full sm:w-auto"
          >
            Continue
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CompaniesCreate;
