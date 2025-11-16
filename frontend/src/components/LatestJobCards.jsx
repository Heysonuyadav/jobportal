import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="
        w-full 
        bg-zinc-200 
        shadow-xl 
        rounded-xl 
        p-5 
        cursor-pointer 
        border 
        hover:shadow-2xl 
        transition 
        duration-300
      "
    >

      {/* Company Name */}
      <h2 className="text-xl md:text-2xl font-serif font-semibold text-gray-900">
        {job?.companyId?.name}
      </h2>

      {/* Job Title & Short Description */}
      <div className="mt-2">
        <h3 className="text-lg font-serif font-bold text-[#0a6140]">
          {job?.title}
        </h3>
        <p className="text-sm md:text-base text-gray-700 mt-1 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Badge className="text-[#0a6140] font-bold" variant="ghost">
          {job?.position}
        </Badge>
        <Badge className="text-[#0b0b0b] font-bold" variant="ghost">
          {job?.experience}
        </Badge>
        <Badge className="text-[#ce6b09] font-bold" variant="ghost">
          {job?.salary}
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
