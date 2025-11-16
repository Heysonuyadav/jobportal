import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 }
  }
};

const searchBarVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0.5
    }
  }
};

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  return (
    <motion.div
      className="relative w-full text-center px-4 sm:px-6 md:px-10 pt-24 pb-16 md:pb-28 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero text */}
      <motion.div 
        className="flex flex-col items-center gap-4 my-10 md:my-16 leading-6"
        variants={containerVariants}
      >
        <motion.span 
          className="mx-auto px-4 py-2 text-lg sm:text-xl font-medium text-[#101215] bg-green-50 rounded-full"
          variants={itemVariants}
        >
          Explore your career on JobHunt
        </motion.span>

        <motion.h1 
          className="text-3xl sm:text-4xl md:text-6xl font-semibold p-2"
          variants={itemVariants}
        >
          Search, Apply & <br />
          <span className="text-[#0a6140] relative inline-block">
            Get Your Dream Job
            <motion.div 
              className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 bg-[#0a6140]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            />
          </span>
        </motion.h1>

        <motion.p 
          className="px-2 sm:px-0 py-4 font-light text-zinc-700 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg"
          variants={itemVariants}
        >
          Find your dream job instantly. Verified listings, top companies,
          resume tools, and career tips — all in one place.
        </motion.p>
      </motion.div>

      {/* Search bar */}
      <motion.div 
        className="flex items-center max-w-xl sm:max-w-2xl mx-auto rounded-full border border-gray-200 shadow-lg overflow-hidden bg-white"
        variants={searchBarVariants}
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="text"
          placeholder="Search your dream job..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
          className="w-full px-4 py-3 text-base outline-none"
        />

        <Button 
          onClick={searchJobHandler}
          className="bg-[#0a6140] hover:bg-[#084c32] h-full rounded-none rounded-r-full px-6 py-6 text-white"
          disabled={!query.trim()}
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </motion.div>

      {/* Background Shapes - Responsive */}
      <motion.div 
        className="absolute top-24 sm:top-16 left-4 sm:left-10 w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-green-100 opacity-30"
        animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div 
        className="absolute bottom-10 sm:bottom-32 right-4 sm:right-10 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#0a6140] opacity-10"
        animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default HeroSection;
