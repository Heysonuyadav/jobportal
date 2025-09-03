import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  
 
  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }
  const navigate = useNavigate();

  return (
    <div className='text-center'>
      <div className='flex flex-col items-center gap-4 my-20 leading-4'>
        <span className='mx-auto px-4  py-2 text-2xl font-stretch-semi-condensed text-[#101215]'>Explore your career on jobhunt</span>
        <h1 className='text-6xl font-medium p-2 '>Search, Apply && <br />Get Your <span className='text-[#0a6140]'>Dream Job</span></h1>
        <p className='py-6 font-extralight text-zinc-950 border-4'>Find your dream job instantly. Verified listings, top companies, resume tools, career tips  everything you need, all in one place.</p>
      </div>
      <div className='border-none outline-0'>
        <input
          type="text"
          placeholder='Search Your Job'
          onChange={(e) => setQuery(e.target.value)}
          className='outline-none ' />

        <Button onClick={searchJobHandler} className='bg-[#0a6140] rounded-r-full'><Search className='w-5 h-5' /></Button>
      </div>
    </div>
  )
}

export default HeroSection
