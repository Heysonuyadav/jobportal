import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from './shared/NavBar'
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {USER_API_ENDPOINT} from '../uttils/constant'
import axios from 'axios';
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice'
import { Loader2 } from "lucide-react";


const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch()
  
  const loading = useSelector((state) => state.auth.loading)
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: '',
    role: '',
  })

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Login Input:", input);

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        Navigate('/')
        toast.success(res.data.message);
      }

    } catch (err) {
      console.log(err);
    } finally{
      dispatch(setLoading(false))
    }

  };



  return (
    <div>
      <NavBar />
      <div className='flex flex-col items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/3 border border-gray-300 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl flex justify-center items-center'>Login</h1>

          <div className='my-2 flex flex-col'>
            <label className='font-serif'>Name</label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder='Name'
              className='p-1'
            />
          </div>

          <div className='my-2 flex flex-col'>
            <label className='font-serif'>Gmail</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder='Email'
              className='p-1'
            />
          </div>

          <div className='my-2 flex flex-col'>
            <label className='font-serif'>Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder='Password'
              className='p-1'
            />
          </div>

          <div className='my-2'>
            <label className='font-serif block mb-1'>Role</label>
            <div className='flex space-x-4'>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="student">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </div>
          </div>
{
  loading ? <Button className='w-full my-5'> <Loader2 className='mr-2 h-2 w-4 animate-spin'></Loader2>Plaese wait</Button> : <Button type='submit' className='w-full my-5'>Login</Button>
}
          
          <span>You don't have an account? <Link to="/" className='text-[#0a6140]'>Register</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login
