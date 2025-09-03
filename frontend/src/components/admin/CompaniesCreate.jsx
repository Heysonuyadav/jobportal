import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { Label } from "@/components/ui/label"
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
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <NavBar />
      <div className='flex flex-col gap-10 max-w-4xl mx-auto mt-10 p-10'>
        <h1 className='font-bold text-2xl'>Brounjdot</h1>
        <p className='font-sans text-gray-600'>As Your Prefered Name</p>

        <Label>Company Name</Label>
        <input
          type='text'
          className='my-2 px-1 py-2 rounded-lg shadow-md'
          placeholder='Search-jobhunt, Microsoft & More...'
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className='flex items-center gap-3 my-10'>
          <Button variant='outline' onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CompaniesCreate
