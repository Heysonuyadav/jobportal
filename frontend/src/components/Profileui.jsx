import React, { useState } from 'react'
import NavBar from './shared/NavBar'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { useSelector } from "react-redux";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {  Contact, Mail, Pen } from 'lucide-react';
import AppliedJobsPortal from './AppliedJobsPortal';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

const Resume = "http://youtube.com/@sonuydav";
const Skills = [1, 2, 3, 4, 5]

const Profileui = () => {
  useGetAppliedJobs()
     const { user} = useSelector((state) => state.auth); 
  const [open,setOpen] = useState(false)
  return (
    <div className=''>
      <NavBar />
      <div className=' bg-zinc-300 border max-w-4xl mx-auto border-gray-200 my-4 rounded-2xl  mt-22 p-9'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src='https://i.pinimg.com/736x/30/d7/58/30d7588205dde02e0fa0afc9859f508d.jpg' />
            </Avatar>
            <div>
              <h1 className='font-md text-xl font-serif'>{user?.fullname || "Full Name"}</h1>
              <p>{user?.profile?.bio || "No bio"}</p>
            </div>
          </div>
          <Button variant='outline' className='text-right ' onClick={()=>setOpen(true)} ><Pen /></Button>
        </div>
        <div className='flex gap-4 m-4'>
          <Mail />
          <span>{user?.email || "NA"}</span>

        </div>
        <div className='flex gap-4 m-4'>

          <Contact />
          <span>{user?.phone || "NA"}</span>
        </div>
        <h1>Skills</h1>
        <div className='flex gap-2 flex-wrap'>
          {user?.profile?.Skills?.length !== 0
              ? Skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
              : <span>NA</span>
          }
        </div>

        <div className='flex justify-between max-w-sm w-full items-center gap-2'>
          <Label className='text-2xl font-bold'>Resume</Label>
          {
            Resume ? <a className='text-right font-mono shadow rounded-xl px-4 py-2 text-blue-500' target='blank' href={user?.profile?.resume}>{user?.profile?.resumeoriginalname}</a> : <span>NA</span>
          }
        </div>
        <div className='max-w-4xl rounded-xl mx-auto mt-20'>
          <h1 className='text-2xl font-bold '>Applied Jobs</h1>
          {

          }
          <AppliedJobsPortal />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
      </div>
    </div>
  )
}

export default Profileui


