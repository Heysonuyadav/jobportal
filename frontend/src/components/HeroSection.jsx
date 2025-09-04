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
    transition: {
      type: "spring",
      stiffness: 120
    }
  }
};

const searchBarVariants = {
  hidden: { scaleX: 0.8, opacity: 0 },
  visible: {
    scaleX: 1,
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchJobHandler();
    }
  };

  return (
    <motion.div 
      className="text-center px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-col items-center gap-4 my-16 md:my-20 leading-4"
        variants={containerVariants}
      >
        <motion.span 
          className="mx-auto px-4 py-2 text-xl md:text-2xl font-stretch-semi-condensed text-[#101215] bg-green-50 rounded-full"
          variants={itemVariants}
        >
          Explore your career on jobhunt
        </motion.span>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-medium p-2"
          variants={itemVariants}
        >
          Search, Apply & <br /> 
          <motion.span 
            className="text-[#0a6140] relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
          >
            Get Your Dream Job
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-[#0a6140]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="py-6 font-extralight text-zinc-700 max-w-2xl mx-auto text-lg"
          variants={itemVariants}
        >
          Find your dream job instantly. Verified listings, top companies, resume tools, 
          career tips — everything you need, all in one place.
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="flex justify-center items-center max-w-2xl mx-auto rounded-full border border-gray-200 shadow-lg overflow-hidden bg-white"
        variants={searchBarVariants}
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.02 }}
      >
        <input
          type="text"
          placeholder="Search Your Dream Job..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full m-3 outline-none"
        />
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={searchJobHandler} 
            className="bg-[#0a6140] hover:bg-[#084c32] h-full rounded-l-none rounded-r-full px-6 py-6"
            disabled={!query.trim()}
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </motion.div>
      </motion.div>

      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-green-100 opacity-30"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-[#0a6140] opacity-10"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      />
    </motion.div>
  );
};

export default HeroSection;