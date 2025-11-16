import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../uttils/constant";
import { toast } from "react-hot-toast";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    Bio: "",
    skills: [],
    file: null,
  });

  useEffect(() => {
    if (user) {
      setInput({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        Bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map((skill) => skill) || [],
        file: user?.profile?.resume || null,
      });
    }
  }, [user]);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setInput((prev) => ({
      ...prev,
      file,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.Bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/update/profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile Updated Successfully");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center sm:text-left">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* NAME */}
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2">
            <Label className="sm:text-right">Name</Label>
            <input
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="col-span-3 border border-zinc-400 shadow py-1 px-2 rounded"
              placeholder="Name"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2">
            <Label className="sm:text-right">Email</Label>
            <input
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="col-span-3 border border-zinc-400 shadow py-1 px-2 rounded"
              placeholder="Email"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2">
            <Label className="sm:text-right">Phone</Label>
            <input
              name="phone"
              value={input.phone}
              onChange={changeEventHandler}
              className="col-span-3 border border-zinc-400 shadow py-1 px-2 rounded"
              placeholder="Phone"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2">
            <Label className="sm:text-right">Bio</Label>
            <input
              name="Bio"
              value={input.Bio}
              onChange={changeEventHandler}
              className="col-span-3 border border-zinc-400 shadow py-1 px-2 rounded"
              placeholder="Bio"
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2">
            <Label className="sm:text-right">Skills</Label>
            <input
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              className="col-span-3 border border-zinc-400 shadow py-1 px-2 rounded"
              placeholder="Skills"
            />
          </div>

          {/* RESUME */}
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2">
            <Label className="sm:text-right">Resume</Label>
            <input
              type="file"
              onChange={changeFileHandler}
              accept="application/pdf"
              className="col-span-3 border border-zinc-400 shadow py-1 px-2 rounded"
            />
          </div>

          {/* BUTTON */}
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-5">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-5">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
