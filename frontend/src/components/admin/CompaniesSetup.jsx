import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '@/components/ui/button';
import { ArrowLeft, Store } from 'lucide-react';
import { Label } from "@/components/ui/label"
import axios from 'axios';
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { COMPANIES_JOB_END_POINT } from '../../uttils/constant';
import { useSelector } from 'react-redux';
import usegetCompanyById from '../../hooks/useGetCompanyById';


const CompaniesSetup = () => {
  const params = useParams();
  usegetCompanyById(params.id);
  const navigate = useNavigate()
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
    file: null
  });
  const { singleCompany } = useSelector((state) => state.company || { singleCompany: {} });
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input)
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("location", input.location)
    formData.append("logo", input.logo)
    formData.append("website", input.website)

    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      setLoading(true)
      const res = await axios.put(`${COMPANIES_JOB_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong!");

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (singleCompany && Object.keys(singleCompany).length > 0) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        logo: singleCompany.logo || "",
        file: null
      });
    }
  }, []);


  return (
    <div>
      <NavBar />
      <div className='max-w-xl mx-auto mt-22'>
        <form onSubmit={submitHandler}>
          <div className='flex items-center justify-around gap-2 text-gray-600 font-semibold '>
            <Button onClick={() => navigate("/admin/companies")} variant='outline' className='text-zinc-700 flex items-center gap-2 font-semibold '>
              <ArrowLeft />
              <span>Back</span>

            </Button>
            <h1 className='text-black font-sans'>Comapny Setup</h1>
          </div>
          <div className='grid  gap-4  my-10'>
            <Label>Comapny Name</Label>
            <input
              className='rounded-[1.4vh] p-1 border border-zinc-500'
              type='text'
              name='name'
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div className='grid  gap-4  my-10'>
            <Label>Description</Label>
            <input
              className=' rounded-[1.4vh] p-1 border border-zinc-500'
              type='text'
              name='description'
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div className='grid  gap-4  my-10'>
            <Label>Location</Label>
            <input
              className='rounded-[1.4vh] p-1 border border-zinc-500'
              type='text'
              name='location'
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div className='grid  gap-4  my-10'>
            <Label>Logo</Label>
            <input
              className='rounded-[1.4vh] p-1 border border-zinc-500'
              type='file'
              accept='image/*'
              onChange={changeFileHandler}
            />
          </div>
          <div className='grid  gap-4  my-10'>
            <Label>WebSite</Label>
            <input
              className='rounded-[1.4vh] p-1 border border-zinc-500'
              type='text'
              name='website'
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
          {
            loading ? <Button className='w-full my-5'> <Loader2 className='mr-2 h-2 w-4 animate-spin'></Loader2>Plaese wait</Button> : <Button type='submit' className='w-full my-5'>Upadte</Button>
          }
        </form>
      </div>
    </div>
  )
}
export default CompaniesSetup;


