import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({job}) => {
   console.log("Job data in LatestJobCards =>", job);  
const navigate = useNavigate()
  return (
    
    <div onClick={()=>navigate(`/description/${job._id}`)} className='flex justify-center items-center border-gray-500 cursor-pointer rounded-xl bg-zinc-200 shadow-2xl p-4'>
      <div className='font-serif text-2xl'>
        

      <h1>{job?.companyId?.name}</h1>
      <p>{job?.company}</p>
      </div>
      <div className=' font-serif flex gap-4'>
        <h1>{job?.title}</h1>
        <p>{job?.description}...</p>
      </div>
      <div className='font-serif mt-2 gap-6 '>
        <Badge className='text-[#0a6140] font-bold' variant='ghost'>{job?.position}</Badge>
        <Badge className='text-[#0b0b0b] font-bold' variant='ghost'>{job?.experience}</Badge>
        <Badge className='text-[#ce6b09] font-bold' variant='ghost'>{job?.salary}</Badge>
        <Badge className='text-[#040404] font-bold' variant='ghost'>{}</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
