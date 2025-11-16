import React, { useState } from 'react'
import NavBar from './shared/NavBar'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { useSelector } from "react-redux";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Contact, Mail, Pen } from 'lucide-react';
import AppliedJobsPortal from './AppliedJobsPortal';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

const Profileui = () => {
  useGetAppliedJobs();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <NavBar />

      <div className="
        bg-zinc-300 
        border 
        max-w-4xl 
        mx-auto 
        border-gray-200 
        my-6 
        rounded-2xl  
        p-6 
        md:p-10
        w-full
      ">
        
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src='https://i.pinimg.com/736x/30/d7/58/30d7588205dde02e0fa0afc9859f508d.jpg' />
            </Avatar>

            <div>
              <h1 className="font-md text-2xl font-serif">
                {user?.fullname || "Full Name"}
              </h1>
              <p className="text-sm">{user?.profile?.bio || "No bio"}</p>
            </div>
          </div>

          {/* Edit Button */}
          <Button 
            variant="outline" 
            onClick={() => setOpen(true)}
            className="self-end md:self-center"
          >
            <Pen />
          </Button>
        </div>

        {/* EMAIL */}
        <div className="flex items-center gap-3 mt-4">
          <Mail className="text-gray-700" />
          <span className="text-gray-800">{user?.email || "NA"}</span>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-3 mt-2">
          <Contact className="text-gray-700" />
          <span className="text-gray-800">{user?.phone || "NA"}</span>
        </div>

        {/* SKILLS */}
        <div className="mt-6">
          <h1 className="text-xl font-semibold mb-2">Skills</h1>

          <div className="flex gap-2 flex-wrap">
            {user?.profile?.Skills?.length > 0 
              ? user.profile.Skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              : <span className="text-gray-700">NA</span>
            }
          </div>
        </div>

        {/* RESUME */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <Label className="text-2xl font-bold">Resume</Label>

          {user?.profile?.resume ? (
            <a
              className="font-mono shadow rounded-xl px-4 py-2 text-blue-600 bg-white w-fit"
              target="blank"
              href={user.profile.resume}
            >
              {user.profile.resumeoriginalname}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>

        {/* APPLIED JOBS */}
        <div className="mt-12">
          <h1 className="text-2xl font-bold mb-3">Applied Jobs</h1>
          <AppliedJobsPortal />
        </div>

        {/* POPUP */}
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profileui;
