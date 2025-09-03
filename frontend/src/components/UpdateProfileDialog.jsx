import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Loader2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../uttils/constant";
import { toast } from 'react-hot-toast';
import {setUser} from "@/redux/authSlice"
import axios from "axios";



const UpdateProfileDialog = ({ open, setOpen }) => {
    const [Loading, setLoading] = useState(false);
    const user = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phone: "",
        Bio: "",
        skills: [],
        file: null
    });
    const [selectedFileName, setSelectedFileName] = useState("");
    // user data update
    useEffect(() => {
        if (user) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phone: user?.phone || "",
                Bio: user?.profile?.bio || "",
                skills: user?.profile?.skills?.map((skill) => skill) || [],
                file: user?.profile?.resume || null
            });
        }
    }, [user]);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        setInput((prev) => ({
            ...prev,
            file
        }));
    };

    const submithandler = async (e) => {
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

                    withCredentials: true
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message || "Profile Update Successfully")
            }
            console.log("Responce =>", res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong");
            setLoading(false);
        }
        finally {
            setLoading(false)
        }
        setOpen(false)
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submithandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <input
                                id="name"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="grid-cols-3 border border-zinc-400 shadow py-1"
                                placeholder="Name"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <input
                                id="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="grid-cols-10 border border-zinc-400 shadow py-1"
                                placeholder="Email"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="phone" className="text-right">phone</Label>
                            <input
                                id="phone"
                                name="phone"
                                value={input.phone}
                                onChange={changeEventHandler}
                                className="grid-cols-10 border border-zinc-400 shadow py-1"
                                placeholder="phone"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <input
                                id="bio"
                                name="Bio"
                                value={input.Bio}
                                onChange={changeEventHandler}
                                className="grid-cols-10 border border-zinc-400 shadow py-1"
                                placeholder="Bio"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="grid-cols-10 border border-zinc-400 shadow py-1"
                                placeholder="Skills"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                onChange={changeFileHandler}
                                accept="application/pdf"
                                className="grid-cols-2 border border-zinc-400 shadow px-4 py-1"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {Loading ? (
                            <Button className="w-full my-5">
                                <Loader2 className="mr-2 h-2 w-4 animate-spin" />
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
