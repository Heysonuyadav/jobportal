import React, { useEffect } from 'react'
import NavBar from './shared/NavBar'
import HeroSection from './HeroSection'
import Category from './Category'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
  useGetAllJobs() 
  const { allJobs } = useSelector((state) => state.job);
  const {user} = useSelector(store=>store.auth);
  useEffect(()=>{
    if (user?.role === 'recruiter'){
      navigate("/admin/companies");
    }

  },[])
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Category />
      <LatestJob />
    {allJobs?.map((job) => (
      <LatestJobCards key={job._id} job={job} />
    ))}
    <Footer />
    </div>
  )
}

export default Home
