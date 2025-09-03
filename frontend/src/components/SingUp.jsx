import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './shared/NavBar';
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { USER_API_ENDPOINT } from '../uttils/constant';
import { toast } from "sonner"
import axios from "axios";
import { setLoading } from '../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/Store';
import { Loader2 } from 'lucide-react';


const SignUp = () => {

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    file: null,
  });
  const navigate = useNavigate();
  const{ loading }= useSelector(store=>store.auth);
  const dispatch = useDispatch();



  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput(prev => ({
      ...prev,
      file: e.target.files?.[0] || null
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phone", input.phone)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      console.log("ERROR MESSAGE:", err.message);
      console.log("RESPONSE DATA:", err.response?.data);

    } finally{
      dispatch(setLoading(false))
    }

  };

  return (
    <div>
      <NavBar />
      <div className='flex flex-col items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/3 border border-gray-300 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl flex justify-center items-center'>SignUp</h1>

          <div className='my-2 flex flex-col'>
            <label className='font-serif'>Name</label>
            <input
              type="text"
              name="fullname"
              value={input.fullname || ''}
              onChange={changeEventHandler}
              placeholder="Name"
              className="p-1"
            />
          </div>

          <div className='my-2 flex flex-col'>
            <label className='font-serif'>Gmail</label>
            <input
              type="text"
              name="email"
              value={input.email || ''}
              onChange={changeEventHandler}
              placeholder="Email"
              className="p-1"
            />
          </div>

          <div className='my-2 flex flex-col'>
            <label className='font-serif'>Phone</label>
            <input
              type="text"
              name="phone"
              value={input.phone || ''}
              onChange={changeEventHandler}
              placeholder="Phone"
              className="p-1"
            />
          </div>

          <div className='my-2 flex flex-col'>
            <label className='font-serif'>Password</label>
            <input
              type="password"
              name="password"
              value={input.password || ''}
              onChange={changeEventHandler}
              placeholder="Password"
              className="p-1"
            />
          </div>

          <div>
            <RadioGroup className='flex'>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>

            <div className='flex items-center gap-4 my-4'>
              <label>Profile</label>
              <input
                accept='image/*'
                type="file"
                name='file'
                onChange={changeFileHandler}
                className='cursor-pointer'
              />
            </div>
          </div>
          {
            loading ? <Button className='w-full my-5'> <Loader2 className='mr-2 h-2 w-4 animate-spin'></Loader2> please wait</Button> :<Button type='submit' className='w-full my-5'>Sign Up</Button>
          }

          
          <span>Already have an account? <Link to="/Login" className='text-blue-500'>Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
