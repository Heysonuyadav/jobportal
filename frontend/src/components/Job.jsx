import React from 'react'
import { Button } from "@/components/ui/button";
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge"

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "N/A";

    const createdAt = new Date(mongodbTime);
    const now = new Date();

    const diffMs = now - createdAt;
    const mins = Math.floor(diffMs / (1000 * 60));
    const hrs = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <div className="rounded-xl p-4 shadow-xl bg-white border border-gray-200 
      transition-all duration-200 hover:shadow-2xl 
      w-full">

      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt || job?.createAt)}
        </p>

        <Button variant="outline" size="icon" className="bg-[#0a6140] text-white">
          <Bookmark />
        </Button>
      </div>

      {/* Logo + Company */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 my-4">
        <Button variant="outline" size="icon" className="p-5 rounded-full">
          <Avatar className="w-12 h-12">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>

        <div className="text-center sm:text-left">
          <h1 className="font-bold text-lg">{job?.companyId?.name || "Company Name"}</h1>
          <p className="text-gray-500 text-sm">India</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-2">
        <h1 className="font-semibold text-lg">{job?.title || "Job Title"}</h1>
        <p className="text-gray-600 text-sm mt-1">
          {job?.description || "No description available"}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="font-bold text-blue-600">{job?.position || "Position"}</Badge>
        <Badge className="font-bold text-red-600">{job?.jobType || "Part Time"}</Badge>
        <Badge className="font-bold text-green-600">{job?.salary || "24 LPA"}</Badge>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mt-4">
        <Button 
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>

        <Button className="bg-[#175a63] w-full sm:w-auto">
          Save For Later
        </Button>
      </div>

    </div>
  );
};

export default Job;
