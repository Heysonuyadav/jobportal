import React from 'react'
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { User2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import {Avatar,AvatarFallback,AvatarImage,} from "@/components/ui/avatar"
import { USER_API_ENDPOINT } from '../../uttils/constant';


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

    return (
        <div className="bg-white shadow fixed top-0 left-0 w-full z-50">
            <div className="flex items-center justify-between h-16 px-8 max-w-7xl mx-auto">


                <h1 className="text-2xl font-bold">
                    Job<span className="text-red-600">Portal</span>
                </h1>


                <div className="flex items-center gap-6">
                    <ul className="flex gap-5 font-mono">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className="cursor-pointer font-semibold"><Link to='/admin/companies'>Company</Link></li>
                                    <li className="cursor-pointer font-semibold"><Link to='/admin/jobs'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className="cursor-pointer"><Link to='/'>Home</Link></li>
                                    <li className="cursor-pointer"><Link to='/jobs'>Jobs</Link></li>
                                    <li className="cursor-pointer"><Link to='/browse'>Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to='/login'>
                                <Button className='bg-zinc-700 hover:bg-black hover:text-white text-white' variant='outline'>login</Button>
                            </Link>
                            <Link to='/signUp'>
                                <Button className='p-3 bg-[#0a6140] hover:bg-[#204335]'>signUp</Button>
                            </Link>
                        </div>



                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilephoto} alt="@shadcn" />

                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className=' gap-2 space-y-2'>

                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilephoto} alt="@shadcn" />
                                    </Avatar>
                                    <p className="text-sm text-black">{user?.fullname || "Guest"}<span className='text-red-800'> MernStack</span></p>
                                   
                                </div>
                                <div className='flex flex-col gap-3 mt-4'>

                                    {
                                        user && user.role === 'student' && (
                                            <div className='flex w-fit gap-2 cursor-pointer'>
                                                <User2 />
                                                <button variant='link'> <Link to='/profileui'>view profile</Link></button>
                                            </div>
                                        )
                                    }


                                    <div className='flex w-fit gap-2 cursor-pointer'>
                                        <LogOut />
                                        <button onClick={logOutHandler} variant='link'>logout</button>
                                    </div>
                                    
                                </div>
                            </PopoverContent>
                        </Popover>
                    )
                    }


                </div>
            </div>
        </div>
    )
}

export default NavBar
