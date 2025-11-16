import { useSelector } from "react-redux"
import LatestJobCards from "./LatestJobCards"
import { useNavigate } from "react-router-dom"

const LatestJob = () => {
  const navigate = useNavigate()
  const { allJobs = [] } = useSelector(store => store.job)

  return (
    <div className="flex items-center flex-col gap-10 max-w-7xl mx-auto px-4 my-20">
      
      {/* Responsive Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
        Latest & Top <span className="text-[#0a6140]">Job Opening</span>
      </h1>

      {/* Responsive Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-6 
        w-full
      ">
        {
          allJobs.length <= 0 
          ? <span>No Jobs Available</span>
          : allJobs.slice(0, 6).map((job) => (
              <LatestJobCards 
                key={job._id} 
                job={job} 
                onClick={() => navigate(`/description/${job._id}`)} 
              />
            ))
        }
      </div>

    </div>
  )
}

export default LatestJob
