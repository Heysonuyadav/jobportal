import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User2, LogOut, Briefcase, Home, Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_API_ENDPOINT } from "../../uttils/constant";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Animation
  const fade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={slideDown}
        className="bg-white shadow-lg fixed top-0 left-0 w-full z-50"
      >
        <div className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/">
              <h1 className="text-2xl font-bold">
                Job<span className="text-[#0a6140]">Portal</span>
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li className="cursor-pointer hover:text-[#0a6140]">
                  <Link to="/admin/companies" className="flex items-center gap-1">
                    <Briefcase size={16} />
                    Company
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-[#0a6140]">
                  <Link to="/admin/jobs" className="flex items-center gap-1">
                    <Briefcase size={16} />
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="cursor-pointer hover:text-[#0a6140]">
                  <Link to="/" className="flex items-center gap-1">
                    <Home size={16} />
                    Home
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-[#0a6140]">
                  <Link to="/jobs" className="flex items-center gap-1">
                    <Briefcase size={16} />
                    Jobs
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-[#0a6140]">
                  <Link to="/browse" className="flex items-center gap-1">
                    <Search size={16} />
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right side buttons / avatar */}
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button className="bg-zinc-700 hover:bg-black text-white">Login</Button>
              </Link>
              <Link to="/signUp">
                <Button className="bg-[#0a6140] hover:bg-[#204335]">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-[#0a6140]">
                  <AvatarImage src={user?.profile?.profilephoto} />
                  <AvatarFallback className="bg-[#0a6140] text-white">
                    {user?.fullname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-56 p-4" align="end">
                <motion.div initial="hidden" animate="visible" variants={fade}>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilephoto} />
                      <AvatarFallback className="bg-[#0a6140] text-white">
                        {user?.fullname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{user?.fullname}</p>
                      <p className="text-xs text-gray-500">{user?.role}</p>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    {user.role === "student" && (
                      <Link to="/profileui" className="flex items-center gap-2 text-sm hover:text-[#0a6140]">
                        <User2 size={16} /> View Profile
                      </Link>
                    )}

                    <button
                      onClick={logOutHandler}
                      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </motion.div>
              </PopoverContent>
            </Popover>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden block"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="md:hidden bg-white shadow-md p-5 space-y-5 fixed top-16 left-0 w-full z-40"
          >
            <ul className="space-y-4 text-lg">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies" onClick={() => setMobileOpen(false)}>
                      Company
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" onClick={() => setMobileOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={() => setMobileOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs" onClick={() => setMobileOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse" onClick={() => setMobileOpen(false)}>
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {!user ? (
              <div className="flex gap-3">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-zinc-700 hover:bg-black text-white">Login</Button>
                </Link>
                <Link to="/signUp" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-[#0a6140] hover:bg-[#204335]">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {user.role === "student" && (
                  <Link
                    to="/profileui"
                    className="flex items-center gap-2 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User2 size={18} /> View Profile
                  </Link>
                )}

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logOutHandler();
                  }}
                  className="flex items-center gap-2 text-sm text-red-600"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
