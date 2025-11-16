import { useDispatch, useSelector } from 'react-redux';
import Job from './Job';
import NavBar from './shared/NavBar';
import { useEffect } from 'react';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-7xl mx-auto my-10 mt-24 px-4">
        <h1 className="font-bold text-xl md:text-2xl text-center mb-6">
          Search Jobs ({allJobs.length})
        </h1>

        {/* Responsive Grid */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-6
        ">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
