import React from 'react'
import { Button } from "@/components/ui/button";
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge"

const Job = ({ job }) => {

  const navigate = useNavigate();
  // const jobId = 'hkfjndkjnfvjkfv'
  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "N/A";

    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();

    if (isNaN(createdAt.getTime())) return "Invalid Date";

    const diffMs = currentTime - createdAt;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };



  return (
    <div className='rounded-md p-4 shadow-xl bg-white border border-gray-300'>
      <div className='flex items-center justify-between'>

        <p>{daysAgoFunction(job?.createdAt || job?.createAt)}</p>
        <Button varinet='outline' className='rounded-full bg-[#0a6140]' size='icon' ><Bookmark /></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-bold font-serif'>{job?.companyId?.name || "Company Name"}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1>{job?.title || "Job Title"}</h1>
        <p>{job?.description || "No description available"}</p>
      </div>
      <div className='flex items-center gap-3 mt-4'>
        <Badge className={"text-blue-500 font-bold"}>{job?.position || "position"}</Badge>
        <Badge className={"text-red-600 font-bold"}>{job?.jobType || "part time"}</Badge>
        <Badge className={"text-green-400 font-bold"}>{job?.salary || "24LPA"}</Badge>
      </div>
      <div className='flex  justify-between items-center mt-1'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
        <Button className='bg-[#175a63]'>Save For Later</Button>
      </div>
    </div>

  )
}

export default Job
