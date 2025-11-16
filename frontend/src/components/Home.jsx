import React, { useEffect } from 'react';
import NavBar from './shared/NavBar';
import HeroSection from './HeroSection';
import Category from './Category';
import LatestJob from './LatestJob';
import Footer from './Footer';
import useGetAllJobs from '../hooks/useGetAllJobs';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useGetAllJobs();
  
  const { allJobs } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      
      <NavBar />

      {/* Hero Section */}
      <div className="w-full">
        <HeroSection />
      </div>

      {/* Category Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        <Category />
      </div>

      {/* Latest Jobs Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 mt-5">
        <LatestJob />

        {/* Responsive Job Cards Grid */}
        <div className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-5 
          mt-5"
        >
          {allJobs?.map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
