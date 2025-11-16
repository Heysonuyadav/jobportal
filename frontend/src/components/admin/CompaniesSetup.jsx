import React, { useEffect, useState } from 'react';
import NavBar from '../shared/NavBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { COMPANIES_JOB_END_POINT } from '../../uttils/constant';
import { useSelector } from 'react-redux';
import usegetCompanyById from '../../hooks/useGetCompanyById';

const CompaniesSetup = () => {
  const params = useParams();
  usegetCompanyById(params.id);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
    file: null,
  });

  const { singleCompany } = useSelector((state) => state.company || {});

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("logo", input.logo);
    formData.append("website", input.website);

    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANIES_JOB_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany && Object.keys(singleCompany).length > 0) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        logo: singleCompany.logo || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="w-full min-h-screen">
      <NavBar />

      {/* Main Container */}
      <div className="max-w-xl mx-auto mt-10 px-4 sm:px-6 md:px-10 pb-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Company Setup
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="mt-10 flex flex-col gap-6">

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <Label>Company Name</Label>
            <input
              className="border border-gray-400 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <input
              className="border border-gray-400 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <Label>Location</Label>
            <input
              className="border border-gray-400 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col gap-2">
            <Label>Logo</Label>
            <input
              className="border border-gray-400 rounded-lg p-2 w-full"
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
            />
          </div>

          {/* Website */}
          <div className="flex flex-col gap-2">
            <Label>Website</Label>
            <input
              className="border border-gray-400 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompaniesSetup;
