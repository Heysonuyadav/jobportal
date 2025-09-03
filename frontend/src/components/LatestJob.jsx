import { useSelector } from "react-redux"
import LatestJobCards from "./LatestJobCards"
import { useNavigate } from "react-router-dom"




const RandomJobs = [1,2,3,4,5,6,7,8,9,10]
const LatestJob = () => {
  const navigate = useNavigate()
  const {allJobs = []} = useSelector(store=>store.job)
  return (
    <div className="flex items-center flex-col gap-10 max-w-7xl mx-auto my-20">
      <h1 className="text-5xl font-semibold">Latest & Top <span className="text-[#0a6140]">Job Opening</span></h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {
           allJobs.length <= 0? <span>No Jobs Availble</span>: allJobs?.slice(0,6).map((job) => <LatestJobCards onClick={()=>navigate(`/description/${job._id}`)}  key={job._id} job={job } />)
        }
      </div>
    </div>
  )
}

export default LatestJob
