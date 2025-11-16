import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from './shared/NavBar'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { USER_API_ENDPOINT } from '../uttils/constant'
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
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        Navigate('/');
        toast.success(res.data.message);
      }

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };


  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center px-4 mt-10">

        {/* Responsive Form Container */}
        <form
          onSubmit={submitHandler}
          className="
            w-full 
            max-w-md 
            bg-white 
            border border-gray-300 
            rounded-lg 
            p-6 
            shadow-md
          "
        >
          <h1 className="font-bold text-2xl text-center mb-4">Login</h1>

          {/* Name */}
          <div className="mb-4 flex flex-col">
            <Label className="font-serif mb-1">Name</Label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Name"
              className="
                p-2 
                border 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#0a6140]
                w-full
              "
            />
          </div>

          {/* Email */}
          <div className="mb-4 flex flex-col">
            <Label className="font-serif mb-1">Email</Label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="
                p-2 
                border 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#0a6140]
                w-full
              "
            />
          </div>

          {/* Password */}
          <div className="mb-4 flex flex-col">
            <Label className="font-serif mb-1">Password</Label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              className="
                p-2 
                border 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#0a6140]
                w-full
              "
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <Label className="font-serif mb-2 block">Role</Label>

            <div className="flex gap-6 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <span>Student</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          {/* Button */}
          {
            loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Login
              </Button>
            )
          }

          {/* Register Link */}
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/" className="text-[#0a6140] font-semibold">
              Register
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;
