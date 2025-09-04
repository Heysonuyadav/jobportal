import React from 'react'
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { User2, LogOut, Briefcase, Home, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { USER_API_ENDPOINT } from '../../uttils/constant';
import { motion, AnimatePresence } from "framer-motion"

const NavBar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Logout failed")
        }
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    const popoverItemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-white shadow-lg fixed top-0 left-0 w-full z-50"
        >
            <div className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Logo with animation */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/">
                        <h1 className="text-2xl font-bold">
                            Job<span className="text-[#0a6140]">Portal</span>
                        </h1>
                    </Link>
                </motion.div>

                <div className="flex items-center gap-4 md:gap-6">
                    {/* Navigation links with staggered animation */}
                    <motion.ul 
                        className="hidden md:flex gap-5 font-medium"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <motion.li 
                                        className="cursor-pointer font-semibold"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to='/admin/companies' className="flex items-center gap-1">
                                            <Briefcase size={16} />
                                            Company
                                        </Link>
                                    </motion.li>
                                    <motion.li 
                                        className="cursor-pointer font-semibold"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to='/admin/jobs' className="flex items-center gap-1">
                                            <Briefcase size={16} />
                                            Jobs
                                        </Link>
                                    </motion.li>
                                </>
                            ) : (
                                <>
                                    <motion.li 
                                        className="cursor-pointer"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to='/' className="flex items-center gap-1">
                                            <Home size={16} />
                                            Home
                                        </Link>
                                    </motion.li>
                                    <motion.li 
                                        className="cursor-pointer"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to='/jobs' className="flex items-center gap-1">
                                            <Briefcase size={16} />
                                            Jobs
                                        </Link>
                                    </motion.li>
                                    <motion.li 
                                        className="cursor-pointer"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to='/browse' className="flex items-center gap-1">
                                            <Search size={16} />
                                            Browse
                                        </Link>
                                    </motion.li>
                                </>
                            )}
                        </AnimatePresence>
                    </motion.ul>

                    {/* Auth buttons or user avatar */}
                    <AnimatePresence mode="wait">
                        {!user ? (
                            <motion.div 
                                className='flex items-center gap-2'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link to='/login'>
                                        <Button className='bg-zinc-700 hover:bg-black text-white' variant='outline'>Login</Button>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link to='/signUp'>
                                        <Button className='p-3 bg-[#0a6140] hover:bg-[#204335]'>Sign Up</Button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Avatar className='cursor-pointer border-2 border-[#0a6140]'>
                                                <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname} />
                                                <AvatarFallback className="bg-[#0a6140] text-white">
                                                    {user?.fullname?.charAt(0) || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </motion.div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-60 p-4" align="end">
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={containerVariants}
                                            className="space-y-4"
                                        >
                                            <motion.div 
                                                className="flex items-center gap-3"
                                                variants={popoverItemVariants}
                                            >
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname} />
                                                    <AvatarFallback className="bg-[#0a6140] text-white">
                                                        {user?.fullname?.charAt(0) || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-sm">{user?.fullname || "Guest"}</p>
                                                    <p className="text-xs text-gray-500">{user?.role}</p>
                                                </div>
                                            </motion.div>
                                            
                                            <div className="border-t pt-3 space-y-2">
                                                {user && user.role === 'student' && (
                                                    <motion.div 
                                                        className="flex items-center gap-2 cursor-pointer text-sm hover:text-[#0a6140]"
                                                        variants={popoverItemVariants}
                                                        whileHover={{ x: 5 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                    >
                                                        <User2 size={16} />
                                                        <Link to='/profileui'>View Profile</Link>
                                                    </motion.div>
                                                )}
                                                
                                                <motion.div 
                                                    className="flex items-center gap-2 cursor-pointer text-sm hover:text-red-600"
                                                    variants={popoverItemVariants}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    onClick={logOutHandler}
                                                >
                                                    <LogOut size={16} />
                                                    <span>Logout</span>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </PopoverContent>
                                </Popover>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    )
}

export default NavBar